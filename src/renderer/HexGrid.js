import * as THREE from 'three';
import { ZONE_BANDS, TILE_COUNT } from '../constants/gameConfig.js';
import { initMaterials, getMaterial, applyState } from './TileMaterials.js';

// HexGrid — hex tile mesh projected onto sphere surface.
// Owns the tile state machine: hidden → revealed-safe | revealed-trap | reward.
// Only RenderBridge.js drives state changes via setTileState().

const SPHERE_RADIUS = 1.0;
const TILE_RADIUS = 0.065; // visual size of each hex face

let _scene = null;
const _tiles = new Map(); // tileId → { mesh, zone, state, animData }

// Spherical Fibonacci distribution — roughly uniform coverage of the sphere
function _fibonacciSphere(count) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
  }
  return points;
}

function _latDeg(v) {
  return THREE.MathUtils.radToDeg(Math.asin(v.y));
}

function _getZone(v) {
  const lat = Math.abs(_latDeg(v));
  if (lat < ZONE_BANDS.safe)    return 'safe';
  if (lat < ZONE_BANDS.charged) return 'charged';
  return 'critical';
}

/**
 * Build the hex grid and add all tile meshes to the scene.
 * @param {THREE.Scene} scene
 */
export function buildGrid(scene) {
  _scene = scene;
  initMaterials();

  const positions = _fibonacciSphere(TILE_COUNT);

  positions.forEach((dir, i) => {
    const zone = _getZone(dir);

    // Flat hex geometry oriented toward sphere centre
    const geo = new THREE.CircleGeometry(TILE_RADIUS, 6);
    const mat = getMaterial(zone, 'hidden');
    const mesh = new THREE.Mesh(geo, mat);

    // Place on sphere surface, face outward
    const pos = dir.clone().multiplyScalar(SPHERE_RADIUS + 0.002);
    mesh.position.copy(pos);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    mesh.rotateX(Math.PI); // flip to face outward

    mesh.userData.tileId = i;
    scene.add(mesh);

    _tiles.set(i, { mesh, zone, state: 'hidden', animData: {} });
  });
}

/**
 * Get the world position (on sphere surface) of a tile centre.
 * @param {number} tileId
 * @returns {THREE.Vector3}
 */
export function getTilePosition(tileId) {
  const tile = _tiles.get(tileId);
  return tile ? tile.mesh.position.clone() : new THREE.Vector3();
}

/**
 * Get the tile mesh for a given tileId.
 * @param {number} tileId
 */
export function getTileMesh(tileId) {
  return _tiles.get(tileId)?.mesh ?? null;
}

/**
 * Transition a tile to a new visual state.
 * @param {number} tileId
 * @param {'hidden'|'revealed-safe'|'revealed-trap'|'reward'} state
 */
export function setTileState(tileId, state) {
  const tile = _tiles.get(tileId);
  if (!tile) return;
  tile.state = state;
  tile.animData = { startTime: performance.now() };
  applyState(tile.mesh.material, state);
  tile.mesh.material.needsUpdate = true;
}

/**
 * Call each frame from the render loop to drive tile animations.
 * @param {number} now  — performance.now() timestamp
 */
export function updateTiles(now) {
  _tiles.forEach((tile) => {
    const { state, mesh, animData } = tile;
    if (!animData.startTime) return;

    const elapsed = (now - animData.startTime) / 1000; // seconds

    if (state === 'revealed-safe') {
      // Glow pulse — oscillate emissive intensity
      mesh.material.emissiveIntensity = 0.4 + 0.3 * Math.sin(elapsed * 3);
    } else if (state === 'revealed-trap') {
      // Shake for 0.4 s then settle
      if (elapsed < 0.4) {
        const amp = 0.005 * (1 - elapsed / 0.4);
        mesh.position.x += (Math.random() - 0.5) * amp;
        mesh.position.y += (Math.random() - 0.5) * amp;
        mesh.position.z += (Math.random() - 0.5) * amp;
      }
    } else if (state === 'reward') {
      // Bright burst then settle over 1 s
      mesh.material.emissiveIntensity = elapsed < 1
        ? 1.2 * Math.exp(-elapsed * 3)
        : 0.3;
    }
  });
}

/**
 * Tile picking — returns tileId under pointer, or -1.
 * @param {THREE.Vector2} ndcPoint  — normalised device coords (-1..1)
 * @param {THREE.Camera} camera
 */
export function pickTile(ndcPoint, camera) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(ndcPoint, camera);
  const meshes = [..._tiles.values()].map((t) => t.mesh);
  const hits = raycaster.intersectObjects(meshes);
  return hits.length > 0 ? hits[0].object.userData.tileId : -1;
}

/**
 * Reset all tiles back to hidden state (call on onRoundStart).
 */
export function resetGrid() {
  _tiles.forEach((tile, id) => setTileState(id, 'hidden'));
}
