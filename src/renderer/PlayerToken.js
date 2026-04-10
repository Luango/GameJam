import * as THREE from 'three';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { getTilePosition } from './HexGrid.js';
import { cloneModel } from './ModelLoader.js';

// PlayerToken — one token mesh per player slot (0–3).
// Uses GLB character models when a model is assigned; falls back to procedural sphere.

const TOKEN_RADIUS = 0.04;
const FLOAT_AMPLITUDE = 0.008;
const FLOAT_SPEED = 1.8;
const MOVE_DURATION = 0.6; // seconds for arc animation
const SURFACE_OFFSET = 1.06; // multiplier to float above hex surface

let _scene = null;

// playerId → { mesh, tileId, floatOffset, moveAnim, busted, isModel }
const _tokens = new Map();

// slot → modelId (set before spawnToken is called)
const _modelAssignments = new Map();

// Reusable math objects
const _upVec = new THREE.Vector3(0, 1, 0);
const _quat = new THREE.Quaternion();

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

      return { obj: group, isModel: true };
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
  return { obj: new THREE.Mesh(geo, mat), isModel: false };
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

  const { obj: mesh, isModel } = _makeMesh(playerId);
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
    tileId,
    floatOffset: playerId * 1.3,
    moveAnim: null,
    busted: false,
    isModel,
  });
}

/**
 * Animate a token arc-moving to a new tile.
 */
export function moveToken(playerId, tileId) {
  const token = _tokens.get(playerId);
  if (!token) return;

  const from = token.mesh.position.clone();
  const to   = getTilePosition(tileId).clone().multiplyScalar(SURFACE_OFFSET);

  token.moveAnim = { from, to, startTime: performance.now() };
  token.tileId = tileId;
}

/**
 * Mark a token as busted (grey out, no float).
 */
export function bustToken(playerId) {
  const token = _tokens.get(playerId);
  if (!token) return;
  token.busted = true;

  token.mesh.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(0x444444);
      if (child.material.emissive) child.material.emissive.set(0x000000);
      child.material.emissiveIntensity = 0;
    }
  });
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
    const { mesh, floatOffset, moveAnim, busted, isModel } = token;

    if (moveAnim) {
      const elapsed = (now - moveAnim.startTime) / 1000;
      const alpha = Math.min(elapsed / MOVE_DURATION, 1);
      const ease = alpha < 0.5
        ? 2 * alpha * alpha
        : -1 + (4 - 2 * alpha) * alpha;

      const fromDir = moveAnim.from.clone().normalize();
      const toDir   = moveAnim.to.clone().normalize();
      const dir = new THREE.Vector3().copy(fromDir).lerp(toDir, ease).normalize();
      const radius = moveAnim.from.length() + Math.sin(Math.PI * ease) * 0.1;
      const newPos = dir.multiplyScalar(radius);
      mesh.position.copy(newPos);

      if (isModel) {
        _orientToSurface(mesh, newPos);
      } else {
        mesh.lookAt(newPos.clone().multiplyScalar(2));
      }

      if (alpha >= 1) token.moveAnim = null;
    } else if (!busted) {
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
