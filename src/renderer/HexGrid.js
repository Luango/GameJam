import * as THREE from 'three';
import { ZONE_BANDS, TILE_COUNT } from '../constants/gameConfig.js';
import { initMaterials, getMaterial, applyState } from './TileMaterials.js';
import * as ZoneLabels from './ZoneLabels.js';

// HexGrid — hex tile mesh projected onto sphere surface.
// Owns the tile state machine: hidden → revealed-safe | revealed-trap | reward.
// Only RenderBridge.js drives state changes via setTileState().

const SPHERE_RADIUS = 1.0;
const TILE_RADIUS = 0.065; // visual size of each hex face (Fibonacci mode)

let _scene = null;
const _tiles = new Map(); // tileId → { mesh, zone, state, animData, center?, tileRadius? }

// P1 board reference — set by buildFromBoard, null in standalone/dev mode
let _p1Board = null;

// ── Neon border strip meshes (permanent, one per tile) ───────────────────────
const _borders = new Map(); // tileId → THREE.Mesh (quad-strip rim)
const ZONE_NEON   = { safe: 0x00e5ff, charged: 0xccff00, critical: 0xff0080 };
const REVEAL_NEON = { 'revealed-safe': 0x00ff55, 'revealed-trap': 0xff3300, reward: 0xffd700 };
let _selectedTime = -Infinity; // performance.now() when last selection happened

// ── Spark particles (local only, spawned on tile selection) ───────────────────
const _sparks = []; // { points, velocities, posAttr, startTime }
const SPARK_LIFE_S = 0.80;

// ── Selectable tile overlay discs ─────────────────────────────────────────────
const _rings = new Map(); // tileId → THREE.Mesh disc
let _hoveredId  = -1;
let _selectedId = -1;

// Hover callback — called when hovered tile changes
let _onHoverChange = null;

const DISC_COLOR_DEFAULT  = 0x38bdf8;
const DISC_COLOR_HOVER    = 0x38bdf8;
const DISC_COLOR_SELECTED = 0x00c9a7;

/**
 * Register a callback that fires when the hovered selectable tile changes.
 * @param {function} fn  — called with { tileId, zone } (zone=null when none)
 */
export function setHoverCallback(fn) {
  _onHoverChange = fn;
}

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
 * Build a neon quad-strip rim mesh for a tile.
 * Creates a flat annular strip between the tile's shrunk edge (82%) and a
 * slightly wider rim (93%), sitting in the gap between adjacent tiles.
 * Uses AdditiveBlending so it glows against dark backgrounds.
 *
 * @param {THREE.Vector3[]} verts   — original (pre-shrunk) tile vertices in world space
 * @param {THREE.Vector3}   center  — tile center in world space
 * @param {THREE.Vector3}   normal  — outward normal of the tile
 * @param {'safe'|'charged'|'critical'} zone
 */
function _buildBorderMesh(verts, center, normal, zone) {
  const INNER_S = 0.82; // inner edge of rim — matches tile SHRINK, sits flush with face edge
  const OUTER_S = 0.93; // outer edge of rim — extends into the gap between tiles
  const LIFT    = 0.002; // lift slightly above tile surface to avoid z-fighting

  const positions = [];
  const n = verts.length;

  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    const d1 = verts[i].clone().sub(center);
    const d2 = verts[next].clone().sub(center);

    const i1 = center.clone().add(d1.clone().multiplyScalar(INNER_S)).addScaledVector(normal, LIFT);
    const i2 = center.clone().add(d2.clone().multiplyScalar(INNER_S)).addScaledVector(normal, LIFT);
    const o1 = center.clone().add(d1.clone().multiplyScalar(OUTER_S)).addScaledVector(normal, LIFT);
    const o2 = center.clone().add(d2.clone().multiplyScalar(OUTER_S)).addScaledVector(normal, LIFT);

    // Two triangles per edge segment (quad)
    positions.push(i1.x, i1.y, i1.z,  i2.x, i2.y, i2.z,  o1.x, o1.y, o1.z);
    positions.push(i2.x, i2.y, i2.z,  o2.x, o2.y, o2.z,  o1.x, o1.y, o1.z);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const mat = new THREE.MeshBasicMaterial({
    color: ZONE_NEON[zone] ?? 0x00c9a7,
    transparent: true,
    opacity: 0.40,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  return new THREE.Mesh(geo, mat);
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
  _borders.forEach((border) => {
    border.geometry.dispose();
    border.material.dispose();
    scene.remove(border);
  });
  _borders.clear();
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

    // Visual size from actual vertex extent (needed for discs)
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

    const border = _buildBorderMesh(verts, center, normal, zone);
    scene.add(border);
    _borders.set(tile.id, border);

    _tiles.set(tile.id, { mesh, zone, state: 'hidden', animData: {}, center, tileRadius });
  }

  ZoneLabels.build(scene);
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

  ZoneLabels.build(scene);
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

  // Swap border neon to the reveal colour so the tube matches the tile
  const border = _borders.get(tileId);
  if (border && REVEAL_NEON[state]) {
    border.material.color.set(REVEAL_NEON[state]);
  }
}

/**
 * Spawn a brief spark burst at the selected tile (local player only).
 * Particles spread outward along the tile's surface normal and fade out.
 * @param {number} tileId
 */
export function spawnSparks(tileId) {
  const tile = _tiles.get(tileId);
  if (!tile || !_scene) return;

  const center = tile.center ?? tile.mesh.position;
  const normal = center.clone().normalize();

  // Two tangent axes spanning the tile face plane
  const up    = Math.abs(normal.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const tang1 = new THREE.Vector3().crossVectors(normal, up).normalize();
  const tang2 = new THREE.Vector3().crossVectors(normal, tang1).normalize();

  // Two layers: sharp fast sparks + slower drifting embers
  const FAST_COUNT  = 40;
  const EMBER_COUNT = 20;
  const COUNT = FAST_COUNT + EMBER_COUNT;
  const posArr = new Float32Array(COUNT * 3);
  const velocities = [];

  for (let i = 0; i < COUNT; i++) {
    posArr[i * 3]     = center.x;
    posArr[i * 3 + 1] = center.y;
    posArr[i * 3 + 2] = center.z;

    const theta = Math.random() * Math.PI * 2;
    const isEmber = i >= FAST_COUNT;
    // Fast sparks shoot out wide; embers drift slowly in a tighter cone
    const phi   = isEmber
      ? Math.random() * Math.PI * 0.3
      : Math.random() * Math.PI * 0.65;
    const speed = isEmber
      ? 0.002 + Math.random() * 0.004
      : 0.007 + Math.random() * 0.013;

    velocities.push(
      new THREE.Vector3()
        .addScaledVector(normal, Math.cos(phi))
        .addScaledVector(tang1,  Math.sin(phi) * Math.cos(theta))
        .addScaledVector(tang2,  Math.sin(phi) * Math.sin(theta))
        .multiplyScalar(speed),
    );
  }

  const geo = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(posArr, 3);
  posAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('position', posAttr);

  const mat = new THREE.PointsMaterial({
    color: 0x00e5ff,
    size: 0.022,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  _scene.add(points);
  _sparks.push({ points, velocities, posAttr, startTime: performance.now() });
}

/**
 * Call each frame from the render loop to drive tile + disc animations.
 * @param {number} now  — performance.now() timestamp
 */
export function updateTiles(now) {
  _tiles.forEach((tile) => {
    const { state, mesh, animData } = tile;
    if (!animData.startTime) return;

    const elapsed = (now - animData.startTime) / 1000; // seconds

    if (state === 'revealed-safe') {
      // Gentle breathe on the green glow
      mesh.material.emissiveIntensity = 0.75 + 0.20 * Math.sin(elapsed * 2.5);
    } else if (state === 'revealed-trap') {
      // Quick shake on reveal, then stays sharp red
      if (elapsed < 0.4) {
        const amp = 0.005 * (1 - elapsed / 0.4);
        mesh.position.x += (Math.random() - 0.5) * amp;
        mesh.position.y += (Math.random() - 0.5) * amp;
        mesh.position.z += (Math.random() - 0.5) * amp;
      } else {
        mesh.material.emissiveIntensity = 0.75;
      }
    } else if (state === 'reward') {
      // Sparkle flash on reveal, then steady golden shimmer
      mesh.material.emissiveIntensity = elapsed < 1
        ? 1.3 * Math.exp(-elapsed * 2.5)
        : 0.8 + 0.45 * Math.abs(Math.sin(elapsed * 4));
    }
  });

  // Update spark particles
  for (let i = _sparks.length - 1; i >= 0; i--) {
    const spark = _sparks[i];
    const age = (now - spark.startTime) / 1000;
    if (age >= SPARK_LIFE_S) {
      spark.points.geometry.dispose();
      spark.points.material.dispose();
      _scene.remove(spark.points);
      _sparks.splice(i, 1);
      continue;
    }
    spark.points.material.opacity = 1.0 - age / SPARK_LIFE_S;
    const arr = spark.posAttr.array;
    for (let j = 0; j < spark.velocities.length; j++) {
      arr[j * 3]     += spark.velocities[j].x;
      arr[j * 3 + 1] += spark.velocities[j].y;
      arr[j * 3 + 2] += spark.velocities[j].z;
    }
    spark.posAttr.needsUpdate = true;
  }

  // Animate neon border rim strips
  const t = now / 1000;
  _borders.forEach((border, id) => {
    if (id === _selectedId) {
      // Selection VFX: instant full flash, then settle to strong steady glow
      const elapsed = (now - _selectedTime) / 1000;
      border.material.opacity = elapsed < 0.25 ? 1.0 : 0.85;
    } else if (id === _hoveredId && _rings.has(id)) {
      // Hover: fast bright pulse
      border.material.opacity = 0.72 + 0.25 * Math.sin(t * 7);
    } else if (_rings.has(id)) {
      // Selectable: slow looping flash — clearly signals "you can go here"
      border.material.opacity = 0.50 + 0.50 * (0.5 + 0.5 * Math.sin(t * 3.5));
    } else {
      const tileData = _tiles.get(id);
      if (tileData && tileData.state !== 'hidden') {
        // Revealed tile — steady bright glow; reward tile gets an extra sparkle
        if (tileData.state === 'reward') {
          border.material.opacity = 0.60 + 0.38 * Math.abs(Math.sin(t * 5 + id * 0.7));
        } else {
          border.material.opacity = 0.72 + 0.18 * Math.sin(t * 1.8 + id * 0.5);
        }
      } else {
        // Hidden: semi-bright ambient glow with subtle organic shimmer
        const shimmer = Math.sin(t * 2.3 + id * 1.1) * Math.sin(t * 4.7 + id * 2.3);
        border.material.opacity = 0.35 + 0.08 * shimmer;
      }
    }
  });

  // Animate selectable discs + tile face glow
  _rings.forEach((disc, id) => {
    const tile = _tiles.get(id);
    if (id === _selectedId) {
      disc.material.opacity = 0.90;
      disc.material.color.set(DISC_COLOR_SELECTED);
      if (tile) tile.mesh.material.emissiveIntensity = 1.4;
    } else if (id === _hoveredId) {
      disc.material.opacity = 0.95;
      disc.material.color.set(DISC_COLOR_HOVER);
      if (tile) tile.mesh.material.emissiveIntensity = 1.8 + 0.20 * Math.sin(t * 6);
    } else {
      disc.material.opacity = 0.50 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2.5 + id * 0.8));
      disc.material.color.set(DISC_COLOR_DEFAULT);
      // Strong pulse glow on the tile face — pops against the dark hidden tiles
      if (tile) tile.mesh.material.emissiveIntensity = 1.20 + 0.60 * (0.5 + 0.5 * Math.sin(t * 3.5));
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

// ── Selectable tile filled discs ──────────────────────────────────────────────

function _buildDisc(tile) {
  // Small circle dot centered on tile — 32 segments for smooth round look
  const r  = tile.tileRadius ?? TILE_RADIUS;
  const geo = new THREE.CircleGeometry(r * 0.38, 32);
  const mat = new THREE.MeshBasicMaterial({
    color: DISC_COLOR_DEFAULT,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
    depthTest: false,
  });
  const disc = new THREE.Mesh(geo, mat);
  // Sit just above tile surface to avoid z-fighting
  const center = tile.center ?? tile.mesh.position;
  disc.position.copy(center).multiplyScalar(1.004);
  disc.lookAt(0, 0, 0);
  disc.rotateX(Math.PI);
  return disc;
}

/**
 * Highlight a set of tiles as selectable (disc overlay + cursor change).
 * @param {number[]} tileIds
 */
export function setSelectableTiles(tileIds) {
  clearSelectables();
  tileIds.forEach((id) => {
    const tile = _tiles.get(id);
    if (!tile) return;
    const disc = _buildDisc(tile);
    _scene.add(disc);
    _rings.set(id, disc);
  });
  // Cursor hint on canvas
  const cv = document.getElementById('canvas');
  if (cv) cv.style.cursor = tileIds.length ? 'crosshair' : 'default';
}

/** Remove all selectable discs and restore tile face emissive to hidden baseline. */
export function clearSelectables() {
  _rings.forEach((disc, id) => {
    // Restore tile face back to the standard hidden glow before removing the ring
    const tile = _tiles.get(id);
    if (tile && tile.state === 'hidden') tile.mesh.material.emissiveIntensity = 0.10;
    disc.geometry.dispose();
    disc.material.dispose();
    _scene.remove(disc);
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

  const zone = _hoveredId !== -1 ? (_tiles.get(_hoveredId)?.zone ?? null) : null;
  _onHoverChange?.({ tileId: _hoveredId, zone });
}

/**
 * Mark a tile as selected (turns disc teal, others dim).
 * @param {number} tileId
 */
export function setSelectedTile(tileId) {
  _selectedId = tileId;
  _selectedTime = performance.now();
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
