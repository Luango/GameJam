import * as THREE from 'three';
import { ZONE_BANDS, TILE_COUNT } from '../constants/gameConfig.js';
import { initMaterials, getMaterial, applyState } from './TileMaterials.js';

// HexGrid — hex tile mesh projected onto sphere surface.
// Owns the tile state machine: hidden → revealed-safe | revealed-trap | reward.
// Only RenderBridge.js drives state changes via setTileState().

const SPHERE_RADIUS = 1.0;
const TILE_RADIUS = 0.065; // visual size of each hex face (Fibonacci mode)

let _scene = null;
const _tiles = new Map(); // tileId → { mesh, zone, state, animData, center?, tileRadius? }

// P1 board reference — set by buildFromBoard, null in standalone/dev mode
let _p1Board = null;

// ── Selectable tile overlay rings ─────────────────────────────────────────────
const _rings = new Map(); // tileId → THREE.Mesh ring
let _hoveredId  = -1;
let _selectedId = -1;

const RING_COLOR_DEFAULT  = 0x38bdf8;
const RING_COLOR_HOVER    = 0xffffff;
const RING_COLOR_SELECTED = 0x00c9a7;

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
 * Build tile meshes from P1 board data (replaces buildGrid for networked games).
 * Tile IDs are identical to P1's board.tiles indices — required for network messages.
 * @param {object} board  — P1 board: { tiles, startTiles, zoneRings }
 * @param {THREE.Scene} scene
 * @param {number} [sourceRadius=6]  — P1 sphere radius to normalise from
 */
export function buildFromBoard(board, scene, sourceRadius = 6) {
  _scene = scene;
  initMaterials();

  // Tear down any existing tiles (dev grid or previous round)
  _tiles.forEach(({ mesh }) => {
    mesh.geometry.dispose();
    scene.remove(mesh);
  });
  _tiles.clear();
  clearSelectables();

  _p1Board = board;
  const scale = SPHERE_RADIUS / sourceRadius; // 1/6
  const SHRINK = 0.82; // gap between hex faces

  for (const tile of board.tiles) {
    const zone   = tile.zone; // 'safe'|'charged'|'critical' — matches our constants
    const center = new THREE.Vector3(tile.center.x, tile.center.y, tile.center.z).multiplyScalar(scale);
    const normal = center.clone().normalize();

    const verts = tile.vertices.map(
      (v) => new THREE.Vector3(v.x, v.y, v.z).multiplyScalar(scale)
    );

    // Visual size from actual vertex extent (needed for rings)
    const tileRadius = verts.reduce((max, v) => Math.max(max, center.distanceTo(v)), 0);

    // Shrink vertices toward center for gap effect (same as sphere-renderer.js)
    const shrunk = verts.map((v) => {
      const dir = v.clone().sub(center);
      return center.clone().add(dir.multiplyScalar(SHRINK));
    });

    // Triangle-fan BufferGeometry (vertices already in world space; mesh stays at origin)
    const positions = [];
    const normals   = [];
    for (let i = 0; i < shrunk.length; i++) {
      const next = (i + 1) % shrunk.length;
      positions.push(center.x, center.y, center.z);
      positions.push(shrunk[i].x, shrunk[i].y, shrunk[i].z);
      positions.push(shrunk[next].x, shrunk[next].y, shrunk[next].z);
      for (let j = 0; j < 3; j++) normals.push(normal.x, normal.y, normal.z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal',   new THREE.Float32BufferAttribute(normals,   3));

    const mat  = getMaterial(zone, 'hidden');
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.tileId = tile.id;
    scene.add(mesh);

    _tiles.set(tile.id, { mesh, zone, state: 'hidden', animData: {}, center, tileRadius });
  }
}

/**
 * Build the hex grid and add all tile meshes to the scene.
 * Used in standalone / dev mode (Fibonacci sphere, no network).
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
 * Works for both buildGrid (mesh.position) and buildFromBoard (stored center).
 * @param {number} tileId
 * @returns {THREE.Vector3}
 */
export function getTilePosition(tileId) {
  const tile = _tiles.get(tileId);
  if (!tile) return new THREE.Vector3();
  // buildFromBoard tiles store an explicit center; buildGrid tiles use mesh.position
  return tile.center ? tile.center.clone() : tile.mesh.position.clone();
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
 * Call each frame from the render loop to drive tile + ring animations.
 * @param {number} now  — performance.now() timestamp
 */
export function updateTiles(now) {
  _tiles.forEach((tile) => {
    const { state, mesh, animData } = tile;
    if (!animData.startTime) return;

    const elapsed = (now - animData.startTime) / 1000; // seconds

    if (state === 'revealed-safe') {
      mesh.material.emissiveIntensity = 0.4 + 0.3 * Math.sin(elapsed * 3);
    } else if (state === 'revealed-trap') {
      if (elapsed < 0.4) {
        const amp = 0.005 * (1 - elapsed / 0.4);
        mesh.position.x += (Math.random() - 0.5) * amp;
        mesh.position.y += (Math.random() - 0.5) * amp;
        mesh.position.z += (Math.random() - 0.5) * amp;
      }
    } else if (state === 'reward') {
      mesh.material.emissiveIntensity = elapsed < 1
        ? 1.2 * Math.exp(-elapsed * 3)
        : 0.3;
    }
  });

  // Animate selectable rings
  const t = now / 1000;
  _rings.forEach((ring, id) => {
    if (id === _selectedId) {
      ring.material.opacity = 0.9;
      ring.material.color.set(RING_COLOR_SELECTED);
    } else if (id === _hoveredId) {
      ring.material.opacity = 1.0;
      ring.material.color.set(RING_COLOR_HOVER);
    } else {
      ring.material.opacity = 0.35 + 0.3 * Math.sin(t * 2.5 + id * 0.8);
      ring.material.color.set(RING_COLOR_DEFAULT);
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
 * Reset all tiles back to hidden state (call on onRoundStart / new round).
 * Does NOT tear down geometry — call buildFromBoard again for a new board seed.
 */
export function resetGrid() {
  clearSelectables();
  _tiles.forEach((tile, id) => setTileState(id, 'hidden'));
}

// ── Selectable tile rings ─────────────────────────────────────────────────────

function _buildRing(tile) {
  // Use stored tileRadius (P1 board) or fallback constant (Fibonacci grid)
  const r  = tile.tileRadius ?? TILE_RADIUS;
  const geo = new THREE.RingGeometry(r * 1.1, r * 1.55, tile.tileRadius ? 6 : 6);
  const mat = new THREE.MeshBasicMaterial({
    color: RING_COLOR_DEFAULT,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
    depthTest: false,
  });
  const ring = new THREE.Mesh(geo, mat);
  // Use stored center for P1 tiles; mesh.position for Fibonacci tiles
  const center = tile.center ?? tile.mesh.position;
  ring.position.copy(center).multiplyScalar(1.006);
  ring.lookAt(0, 0, 0);
  ring.rotateX(Math.PI);
  return ring;
}

/**
 * Highlight a set of tiles as selectable (ring overlay + cursor change).
 * @param {number[]} tileIds
 */
export function setSelectableTiles(tileIds) {
  clearSelectables();
  tileIds.forEach((id) => {
    const tile = _tiles.get(id);
    if (!tile) return;
    const ring = _buildRing(tile);
    _scene.add(ring);
    _rings.set(id, ring);
  });
  // Cursor hint on canvas
  const cv = document.getElementById('canvas');
  if (cv) cv.style.cursor = tileIds.length ? 'crosshair' : 'default';
}

/** Remove all selectable rings. */
export function clearSelectables() {
  _rings.forEach((ring) => {
    ring.geometry.dispose();
    ring.material.dispose();
    _scene.remove(ring);
  });
  _rings.clear();
  _hoveredId  = -1;
  _selectedId = -1;
  const cv = document.getElementById('canvas');
  if (cv) cv.style.cursor = 'default';
}

/**
 * Update hover state (call on pointermove from RenderBridge).
 * @param {number} tileId  — -1 to clear
 */
export function setHoveredTile(tileId) {
  _hoveredId = _rings.has(tileId) ? tileId : -1;
  const cv = document.getElementById('canvas');
  if (cv) cv.style.cursor = _hoveredId !== -1 ? 'pointer' : 'crosshair';
}

/**
 * Mark a tile as selected (turns ring teal, others dim).
 * @param {number} tileId
 */
export function setSelectedTile(tileId) {
  _selectedId = tileId;
}

/**
 * Returns whether a tileId is currently in the selectable set.
 * @param {number} tileId
 */
export function isSelectable(tileId) {
  return _rings.has(tileId);
}

/**
 * Returns tile IDs adjacent to fromTileId.
 * When P1 board is active: uses the authoritative adjacency graph from board.js.
 * In Fibonacci/dev mode: falls back to angular distance filter.
 * @param {number} fromTileId
 * @param {number} [maxAngleDeg=22]  — only used in dev/Fibonacci mode
 */
export function getAdjacentTileIds(fromTileId, maxAngleDeg = 22) {
  // P1 board mode — use exact adjacency from board generation
  if (_p1Board) {
    const tile = _p1Board.tiles[fromTileId];
    return tile ? [...tile.adjacency] : [];
  }

  // Dev mode — angular distance fallback
  const tile = _tiles.get(fromTileId);
  if (!tile) return [];
  const maxAngle = THREE.MathUtils.degToRad(maxAngleDeg);
  const dir = tile.mesh.position.clone().normalize();
  const result = [];
  _tiles.forEach(({ mesh }, id) => {
    if (id === fromTileId) return;
    if (dir.angleTo(mesh.position.clone().normalize()) < maxAngle) result.push(id);
  });
  return result;
}

/**
 * Returns all tile IDs in a given zone ('safe' | 'charged' | 'critical').
 * @param {string} zone
 */
export function getTileIdsByZone(zone) {
  const ids = [];
  _tiles.forEach((tile, id) => { if (tile.zone === zone) ids.push(id); });
  return ids;
}

/**
 * Returns a snapshot of all tiles for the overview map.
 * @returns {Array<{ id, position: THREE.Vector3, zone, state }>}
 */
export function getAllTiles() {
  const out = [];
  _tiles.forEach((tile, id) => {
    out.push({ id, position: tile.mesh.position.clone(), zone: tile.zone, state: tile.state });
  });
  return out;
}
