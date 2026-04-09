import * as THREE from 'three';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { getTilePosition } from './HexGrid.js';

// PlayerToken — one token mesh per player slot (0–3).
// Fallback: procedural sphere. P3 delivers a GLB via loadGLB(url).
// Idle float animation runs in the render loop via updateTokens().

const TOKEN_RADIUS = 0.04;
const FLOAT_AMPLITUDE = 0.008;
const FLOAT_SPEED = 1.8;
const MOVE_DURATION = 0.6; // seconds for arc animation

let _scene = null;

// playerId → { mesh, tileId, floatOffset, moveAnim: { from, to, startTime } | null, busted }
const _tokens = new Map();

export function initTokens(scene) {
  _scene = scene;
}

function _makeMesh(playerId) {
  const color = PLAYER_COLORS[playerId] ?? 0xffffff;
  const geo = new THREE.SphereGeometry(TOKEN_RADIUS, 16, 12);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.3,
    roughness: 0.4,
    metalness: 0.6,
  });
  return new THREE.Mesh(geo, mat);
}

/**
 * Spawn a token for a player on a tile.
 * @param {number} playerId
 * @param {number} tileId
 */
export function spawnToken(playerId, tileId) {
  if (_tokens.has(playerId)) removeToken(playerId);

  const mesh = _makeMesh(playerId);
  const pos = getTilePosition(tileId);
  mesh.position.copy(pos.clone().multiplyScalar(1.06));
  _scene.add(mesh);

  _tokens.set(playerId, {
    mesh,
    tileId,
    floatOffset: playerId * 1.3, // stagger phases
    moveAnim: null,
    busted: false,
  });
}

/**
 * Animate a token arc-moving to a new tile.
 * @param {number} playerId
 * @param {number} tileId
 */
export function moveToken(playerId, tileId) {
  const token = _tokens.get(playerId);
  if (!token) return;

  const from = token.mesh.position.clone();
  const to   = getTilePosition(tileId).clone().multiplyScalar(1.06);

  token.moveAnim = { from, to, startTime: performance.now() };
  token.tileId = tileId;
}

/**
 * Mark a token as busted (grey out, no float).
 * @param {number} playerId
 */
export function bustToken(playerId) {
  const token = _tokens.get(playerId);
  if (!token) return;
  token.busted = true;
  token.mesh.material.color.set(0x444444);
  token.mesh.material.emissiveIntensity = 0;
}

/**
 * Remove a token from the scene.
 * @param {number} playerId
 */
export function removeToken(playerId) {
  const token = _tokens.get(playerId);
  if (!token) return;
  _scene.remove(token.mesh);
  token.mesh.geometry.dispose();
  token.mesh.material.dispose();
  _tokens.delete(playerId);
}

/**
 * Remove all tokens (call on onRoundStart).
 */
export function clearAllTokens() {
  [..._tokens.keys()].forEach(removeToken);
}

/**
 * Call each frame from the render loop.
 * @param {number} now — performance.now()
 */
export function updateTokens(now) {
  const t = now / 1000;

  _tokens.forEach((token) => {
    const { mesh, floatOffset, moveAnim, busted } = token;

    if (moveAnim) {
      const elapsed = (now - moveAnim.startTime) / 1000;
      const alpha = Math.min(elapsed / MOVE_DURATION, 1);
      const ease = alpha < 0.5
        ? 2 * alpha * alpha
        : -1 + (4 - 2 * alpha) * alpha; // ease-in-out

      // Slerp on sphere surface (great-circle arc)
      const fromDir = moveAnim.from.clone().normalize();
      const toDir   = moveAnim.to.clone().normalize();
      const dir = new THREE.Vector3().copy(fromDir).lerp(toDir, ease).normalize();
      const radius = moveAnim.from.length() + Math.sin(Math.PI * ease) * 0.1; // arc lift
      mesh.position.copy(dir.multiplyScalar(radius));

      if (alpha >= 1) token.moveAnim = null;
    } else if (!busted) {
      // Idle float — subtle Y-axis oscillation along surface normal
      const normal = mesh.position.clone().normalize();
      const base   = normal.clone().multiplyScalar(1.06);
      const lift   = normal.clone().multiplyScalar(FLOAT_AMPLITUDE * Math.sin(t * FLOAT_SPEED + floatOffset));
      mesh.position.copy(base).add(lift);
    }
  });
}

/**
 * Returns current world positions of all live tokens (for overview map).
 * @returns {Map<number, THREE.Vector3>}  playerId → position
 */
export function getTokenPositions() {
  const out = new Map();
  _tokens.forEach((token, id) => {
    out.set(id, token.mesh.position.clone());
  });
  return out;
}

/**
 * Hot-swap token mesh from a GLB loaded by P3.
 * Preserves per-slot tint and animation state.
 * @param {number} playerId
 * @param {THREE.Object3D} glbScene — the root object from GLTFLoader
 */
export function loadGLB(playerId, glbScene) {
  const token = _tokens.get(playerId);
  if (!token) return;

  const color = PLAYER_COLORS[playerId] ?? 0xffffff;
  glbScene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.set(color);
    }
  });

  glbScene.position.copy(token.mesh.position);
  _scene.remove(token.mesh);
  _scene.add(glbScene);
  token.mesh = glbScene;
}
