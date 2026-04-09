import * as THREE from 'three';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { getTilePosition } from './HexGrid.js';

// PathTracer — draws a tube along the geodesic path a player has visited.
// One tube group per player slot; each new segment appends to the path.

const SPHERE_RADIUS = 1.0;
const TUBE_RADIUS = 0.008;
const TUBE_SEGMENTS = 12;
const PATH_SEGMENTS = 24; // curve resolution per segment

let _scene = null;

// playerId → { points: Vector3[], group: THREE.Group }
const _paths = new Map();

export function initPathTracer(scene) {
  _scene = scene;
}

/**
 * Geodesic arc between two sphere-surface points (great-circle slerp).
 */
function _geodesicPoints(from, to, segments) {
  const points = [];
  const f = from.clone().normalize();
  const t = to.clone().normalize();
  for (let i = 0; i <= segments; i++) {
    const alpha = i / segments;
    const v = new THREE.Vector3().copy(f).lerp(t, alpha).normalize();
    points.push(v.multiplyScalar(SPHERE_RADIUS + 0.005));
  }
  return points;
}

function _buildTube(points, color) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, PATH_SEGMENTS, TUBE_RADIUS, TUBE_SEGMENTS, false);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.4,
    roughness: 0.3,
    metalness: 0.5,
  });
  return new THREE.Mesh(geo, mat);
}

function _getOrCreatePath(playerId) {
  if (!_paths.has(playerId)) {
    const group = new THREE.Group();
    _scene.add(group);
    _paths.set(playerId, { points: [], group });
  }
  return _paths.get(playerId);
}

/**
 * Add a path segment for a player between two tile positions.
 * @param {number} playerId   — slot index 0–3
 * @param {number} fromTileId
 * @param {number} toTileId
 */
export function addPathSegment(playerId, fromTileId, toTileId) {
  const path = _getOrCreatePath(playerId);
  const from = getTilePosition(fromTileId);
  const to   = getTilePosition(toTileId);
  const pts  = _geodesicPoints(from, to, PATH_SEGMENTS);

  const color = PLAYER_COLORS[playerId] ?? 0xffffff;
  const tube = _buildTube(pts, color);
  path.group.add(tube);

  // Track last point for chaining future segments
  path.points.push(to.clone());
}

/**
 * Remove all path geometry for a player (e.g. on round reset).
 * @param {number} playerId
 */
export function clearPlayer(playerId) {
  const path = _paths.get(playerId);
  if (!path) return;
  path.group.clear();
  path.points = [];
}

/**
 * Reset all player paths (call on onRoundStart).
 */
export function clearAllPaths() {
  _paths.forEach((_, id) => clearPlayer(id));
}
