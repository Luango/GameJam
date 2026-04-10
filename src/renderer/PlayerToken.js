import * as THREE from 'three';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { getTilePosition } from './HexGrid.js';
import { cloneModel } from './ModelLoader.js';

// PlayerToken — one token mesh per player slot (0–3).
// Uses GLB character models when a model is assigned; falls back to procedural sphere.

const TOKEN_RADIUS    = 0.04;
const FLOAT_AMPLITUDE = 0.008;
const FLOAT_SPEED     = 1.8;
const MOVE_DURATION   = 0.6;  // seconds for arc animation
const SURFACE_OFFSET  = 1.06; // multiplier to float above hex surface
const SPAWN_DURATION  = 0.50; // seconds
const LAND_DURATION   = 0.40; // seconds
const WOBBLE_DURATION = 0.80; // seconds

let _scene = null;

// playerId → {
//   mesh,        THREE.Group — outer wrapper; receives position + quaternion
//   animTarget,  THREE.Group — inner group; receives scale animations
//   tileId,
//   floatOffset,
//   moveAnim,    null | { from, to, startTime }
//   wobbleAnim,  null | { startTime, duration, type }  type ∈ ['spawn','land','wobble']
//   busted,
//   isModel,
// }
const _tokens = new Map();

// slot → modelId (set before spawnToken is called)
const _modelAssignments = new Map();

// Reusable math objects
const _upVec = new THREE.Vector3(0, 1, 0);
const _quat  = new THREE.Quaternion();

// CSS easeOutElastic — overshoots to ~1.2 then settles at 1.0
function _elasticOut(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
}

export function initTokens(scene) {
  _scene = scene;
}

/**
 * Assign a character model to a player slot. Call before spawnToken.
 */
export function setPlayerModel(slot, modelId) {
  _modelAssignments.set(slot, modelId);
}

export function clearModelAssignments() {
  _modelAssignments.clear();
}

// Returns { obj: outerWrapper, animTarget: innerGroup, isModel }
// outer wrapper → position + surface quaternion
// inner group   → scale animations
function _makeMesh(playerId) {
  const modelId = _modelAssignments.get(playerId);
  if (modelId) {
    const group = cloneModel(modelId);
    if (group) {
      // Soft hemisphere light attached to token — warm from above, cool fill from below
      const hemi = new THREE.HemisphereLight(0xffffff, 0x4488cc, 3);
      group.add(hemi);

      // Make materials translucent/emissive for a soft glowing look
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = 0.85;
          child.material.emissive = child.material.color.clone().multiplyScalar(0.15);
          child.material.emissiveIntensity = 0.4;
        }
      });

      const wrapper = new THREE.Group();
      wrapper.add(group);
      return { obj: wrapper, animTarget: group, isModel: true };
    }
  }

  // Fallback: procedural sphere
  const color = PLAYER_COLORS[playerId] ?? 0xffffff;
  const geo = new THREE.SphereGeometry(TOKEN_RADIUS, 16, 12);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.3,
    roughness: 0.4,
    metalness: 0.6,
  });
  const sphereMesh = new THREE.Mesh(geo, mat);
  const animTarget = new THREE.Group();
  animTarget.add(sphereMesh);
  const wrapper = new THREE.Group();
  wrapper.add(animTarget);
  return { obj: wrapper, animTarget, isModel: false };
}

/**
 * Orient a mesh so its local Y-up aligns with the outward surface normal.
 * This makes models "stand" on the sphere with feet toward center, head outward.
 */
function _orientToSurface(mesh, position) {
  const normal = position.clone().normalize();
  _quat.setFromUnitVectors(_upVec, normal);
  mesh.quaternion.copy(_quat);
}

/**
 * Spawn a token for a player on a tile.
 */
export function spawnToken(playerId, tileId) {
  if (_tokens.has(playerId)) removeToken(playerId);

  const { obj: mesh, animTarget, isModel } = _makeMesh(playerId);
  const pos = getTilePosition(tileId);
  const surfacePos = pos.clone().multiplyScalar(SURFACE_OFFSET);
  mesh.position.copy(surfacePos);

  if (isModel) {
    _orientToSurface(mesh, surfacePos);
  } else {
    mesh.lookAt(surfacePos.clone().multiplyScalar(2));
  }

  _scene.add(mesh);

  _tokens.set(playerId, {
    mesh,
    animTarget,
    tileId,
    floatOffset: playerId * 1.3,
    moveAnim:   null,
    wobbleAnim: null,
    busted:     false,
    isModel,
  });

  // Start invisible and pop in
  animTarget.scale.setScalar(0);
  _tokens.get(playerId).wobbleAnim = {
    startTime: performance.now(),
    duration:  SPAWN_DURATION * 1000,
    type:      'spawn',
  };
}

/**
 * Animate a token arc-moving to a new tile.
 */
export function moveToken(playerId, tileId) {
  const token = _tokens.get(playerId);
  if (!token) return;

  // Cancel any idle wobble so movement cleanly owns the scale; preserve spawn animation
  if (token.wobbleAnim?.type !== 'spawn') token.wobbleAnim = null;

  const from = token.mesh.position.clone();
  const to   = getTilePosition(tileId).clone().multiplyScalar(SURFACE_OFFSET);

  token.moveAnim = { from, to, startTime: performance.now() };
  token.tileId   = tileId;
}

/**
 * Mark a token as busted (grey out, stop animations).
 */
export function bustToken(playerId) {
  const token = _tokens.get(playerId);
  if (!token) return;
  token.busted     = true;
  token.wobbleAnim = null;
  if (token.animTarget) token.animTarget.scale.set(1, 1, 1);

  token.mesh.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(0x444444);
      if (child.material.emissive) child.material.emissive.set(0x000000);
      child.material.emissiveIntensity = 0;
    }
  });
}

/**
 * Trigger a damped wobble on a token — for external events (win, reward, etc.)
 */
export function wobbleToken(playerId) {
  const token = _tokens.get(playerId);
  if (!token || !token.animTarget) return;
  token.wobbleAnim = {
    startTime: performance.now(),
    duration:  WOBBLE_DURATION * 1000,
    type:      'wobble',
  };
}

/**
 * Remove a token from the scene.
 */
export function removeToken(playerId) {
  const token = _tokens.get(playerId);
  if (!token) return;
  _scene.remove(token.mesh);

  token.mesh.traverse((child) => {
    if (child.isMesh) {
      child.geometry?.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  });

  _tokens.delete(playerId);
}

export function clearAllTokens() {
  [..._tokens.keys()].forEach(removeToken);
}

/**
 * Call each frame from the render loop.
 */
export function updateTokens(now) {
  const t = now / 1000;

  _tokens.forEach((token) => {
    const { mesh, animTarget, floatOffset, moveAnim, busted, isModel } = token;

    // ── Position / orientation ─────────────────────────────────────────────
    if (moveAnim) {
      const elapsed = (now - moveAnim.startTime) / 1000;
      const alpha   = Math.min(elapsed / MOVE_DURATION, 1);
      const ease    = alpha < 0.5
        ? 2 * alpha * alpha
        : -1 + (4 - 2 * alpha) * alpha;

      const fromDir = moveAnim.from.clone().normalize();
      const toDir   = moveAnim.to.clone().normalize();
      const dir     = new THREE.Vector3().copy(fromDir).lerp(toDir, ease).normalize();
      const radius  = moveAnim.from.length() + Math.sin(Math.PI * ease) * 0.1;
      const newPos  = dir.multiplyScalar(radius);
      mesh.position.copy(newPos);

      if (isModel) {
        _orientToSurface(mesh, newPos);
      } else {
        mesh.lookAt(newPos.clone().multiplyScalar(2));
      }

      // Hop: stretch up at arc peak, compress laterally (squash-stretch)
      if (animTarget) {
        const hopAlpha = Math.sin(Math.PI * alpha);
        const scaleY   = 1 + 0.15 * hopAlpha;
        const scaleXZ  = 1 / Math.sqrt(scaleY);
        animTarget.scale.set(scaleXZ, scaleY, scaleXZ);
      }

      if (alpha >= 1) {
        token.moveAnim = null;
        if (animTarget) animTarget.scale.set(1, 1, 1);
        // Trigger landing squash
        token.wobbleAnim = {
          startTime: performance.now(),
          duration:  LAND_DURATION * 1000,
          type:      'land',
        };
      }

    } else if (!busted) {
      // ── Float ──────────────────────────────────────────────────────────────
      const normal = mesh.position.clone().normalize();
      const base   = normal.clone().multiplyScalar(SURFACE_OFFSET);
      const lift   = normal.clone().multiplyScalar(FLOAT_AMPLITUDE * Math.sin(t * FLOAT_SPEED + floatOffset));
      mesh.position.copy(base).add(lift);

      if (isModel) {
        _orientToSurface(mesh, mesh.position);
      } else {
        mesh.lookAt(mesh.position.clone().multiplyScalar(2));
      }
    }

    // ── Wobble / spawn / land animations (on animTarget only) ──────────────
    // Paused during movement (moveAnim owns scale), never runs on busted tokens
    if (token.wobbleAnim && animTarget && !token.moveAnim && !busted) {
      const wa      = token.wobbleAnim;
      const elapsed = (now - wa.startTime) / 1000;
      const alpha   = Math.min(elapsed / (wa.duration / 1000), 1);

      switch (wa.type) {
        case 'spawn':
          animTarget.scale.setScalar(_elasticOut(alpha));
          break;

        case 'land': {
          let scaleY;
          if (alpha < 0.3) {
            // Fast squash: 1.0 → 0.8
            scaleY = 1.0 - 0.2 * (alpha / 0.3);
          } else {
            // Spring back with slight overshoot: 0.8 → ~1.05 → 1.0
            const t2 = (alpha - 0.3) / 0.7;
            scaleY   = 0.8 + 0.2 * (1 + 0.25 * Math.sin(t2 * Math.PI) * (1 - t2));
          }
          const scaleXZ = 1 / Math.sqrt(Math.max(scaleY, 0.01));
          animTarget.scale.set(scaleXZ, scaleY, scaleXZ);
          break;
        }

        case 'wobble': {
          const dampedSin = Math.sin(elapsed * 14) * Math.exp(-elapsed * 6) * 0.3;
          const scaleY    = 1.0 + dampedSin;
          const scaleXZ   = 1 / Math.sqrt(Math.max(scaleY, 0.01));
          animTarget.scale.set(scaleXZ, scaleY, scaleXZ);
          break;
        }
      }

      if (alpha >= 1) {
        token.wobbleAnim = null;
        animTarget.scale.set(1, 1, 1);
      }
    }
  });
}

/**
 * Returns current world positions of all live tokens (for overview map).
 */
export function getTokenPositions() {
  const out = new Map();
  _tokens.forEach((token, id) => {
    out.set(id, token.mesh.position.clone());
  });
  return out;
}
