// ─── Circuit Sphere Board Generation ───
// Hex-sphere generation using icosahedron dual, zone classification,
// tile assignment (trap/safe/reward), and adjacency graph.
// Ported from Test/index.html hex sphere algorithm.

import { ZONE, TILE } from './protocol.js';

// ─── Seeded PRNG (Mulberry32) ───

export function mulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Default Config ───

export const DEFAULT_CONFIG = {
  sphereRadius: 6,
  subdivisions: 3,
  turnTimerMs: 30000,
  // 96% RTP (Enforced) — multiplicative voltage, 4% house edge per step
  // stepMultiplier = targetRTP / P(survive), where P(survive) = 1 - trapDensity
  // See docs/RTP_DESIGN.md for full derivation and verification
  trapDensity: { safe: 0.12, charged: 0.25, critical: 0.35 },
  rewardDensity: { safe: 0.10, charged: 0.12, critical: 0.15 },
  voltageRates: {
    targetRTP: 0.96,
    rewardBonus: 1.15,
    safe:     { base: 1.09091, follower: 0.96 },  // 0.96 / 0.88
    charged:  { base: 1.28000, follower: 0.96 },  // 0.96 / 0.75
    critical: { base: 1.47692, follower: 0.96 },  // 0.96 / 0.65
  },
  // Zone boundaries (latitude angle from equator, in radians)
  // Safe:     |lat| <= 0.4    (~23 degrees from equator)
  // Charged:  0.4 < |lat| <= 0.9  (~51 degrees)
  // Critical: |lat| > 0.9    (polar regions)
  zoneBounds: {
    safeMaxLat: 0.4,
    chargedMaxLat: 0.9,
  },
};

// ─── Hex Sphere Generation ───

/**
 * Generate the hex-sphere board from a seed.
 * Returns { tiles, startTiles, zoneRings, adjacency }.
 *
 * tiles: array of { id, center:{x,y,z}, zone, tileType, rewardValue, adjacency:[id], vertices:[{x,y,z}], sides }
 */
export function generateBoard(seed, config = DEFAULT_CONFIG) {
  const rng = mulberry32(seed);
  const { sphereRadius, subdivisions, zoneBounds, trapDensity, rewardDensity } = config;

  // Step 1: Build icosahedron dual panels (hex + pent)
  const panels = buildIcosahedronDual(sphereRadius, subdivisions);

  // Step 2: Build adjacency graph
  const adjacencyMap = buildAdjacency(panels, sphereRadius);

  // Step 3: Classify zones by latitude (y-axis as poles)
  const tiles = panels.map((panel, idx) => {
    // Latitude = asin(y / radius), normalized to [0, PI/2]
    const lat = Math.abs(Math.asin(panel.center.y / sphereRadius));
    let zone;
    if (lat <= zoneBounds.safeMaxLat) {
      zone = ZONE.SAFE;
    } else if (lat <= zoneBounds.chargedMaxLat) {
      zone = ZONE.CHARGED;
    } else {
      zone = ZONE.CRITICAL;
    }

    return {
      id: idx,
      center: { x: panel.center.x, y: panel.center.y, z: panel.center.z },
      zone,
      tileType: TILE.SAFE,      // Default, assigned below
      rewardValue: null,
      adjacency: adjacencyMap[idx] || [],
      vertices: panel.vertices.map(v => ({ x: v.x, y: v.y, z: v.z })),
      sides: panel.sides,
    };
  });

  // Step 4: Assign trap/reward tiles using PRNG
  for (const tile of tiles) {
    const roll = rng();
    const trapChance = trapDensity[tile.zone];
    const rewardChance = rewardDensity[tile.zone];

    if (roll < trapChance) {
      tile.tileType = TILE.TRAP;
    } else if (roll < trapChance + rewardChance) {
      tile.tileType = TILE.REWARD;
      // Reward bonus multiplier (zone-independent)
      tile.rewardValue = config.voltageRates.rewardBonus ?? 1.15;
    }
    // else stays SAFE
  }

  // Step 5: Determine starting tiles — pick 8 maximally spread safe-zone tiles
  const safeTiles = tiles.filter(t => t.zone === ZONE.SAFE);
  const startTiles = _pickSpreadTiles(safeTiles, 8).map(t => t.id);

  // Ensure start tiles are always safe (never traps)
  for (const stId of startTiles) {
    tiles[stId].tileType = TILE.SAFE;
    tiles[stId].rewardValue = null;
  }

  // Step 6: Zone rings info
  const zoneRings = {
    safe: { minLat: 0, maxLat: zoneBounds.safeMaxLat },
    charged: { minLat: zoneBounds.safeMaxLat, maxLat: zoneBounds.chargedMaxLat },
    critical: { minLat: zoneBounds.chargedMaxLat, maxLat: Math.PI / 2 },
  };

  return { tiles, startTiles, zoneRings };
}

// ─── Greedy farthest-point sampling ───
// Picks `count` tiles from `pool` that are maximally spread apart on the sphere.
function _pickSpreadTiles(pool, count) {
  if (pool.length <= count) return pool.slice();

  // Start with the tile closest to equator as first pick
  const sorted = pool.slice().sort((a, b) => Math.abs(a.center.y) - Math.abs(b.center.y));
  const picked = [sorted[0]];
  const used = new Set([sorted[0].id]);

  while (picked.length < count) {
    let bestTile = null;
    let bestMinDist = -1;
    for (const candidate of pool) {
      if (used.has(candidate.id)) continue;
      // Find the minimum distance from this candidate to any already-picked tile
      let minDist = Infinity;
      for (const p of picked) {
        const dx = candidate.center.x - p.center.x;
        const dy = candidate.center.y - p.center.y;
        const dz = candidate.center.z - p.center.z;
        const d = dx * dx + dy * dy + dz * dz;
        if (d < minDist) minDist = d;
      }
      if (minDist > bestMinDist) {
        bestMinDist = minDist;
        bestTile = candidate;
      }
    }
    picked.push(bestTile);
    used.add(bestTile.id);
  }
  return picked;
}

// ─── Icosahedron Dual Algorithm ───
// Ported from Test/index.html lines 108-164

function buildIcosahedronDual(radius, subdivisions) {
  // We need Three.js for IcosahedronGeometry, but since this module
  // may be used before Three.js loads, we use a lightweight approach.
  // Import THREE dynamically or expect it as global.
  const THREE = window.THREE;
  if (!THREE) {
    throw new Error('THREE.js must be loaded before board.js');
  }

  const icoGeom = new THREE.IcosahedronGeometry(radius, subdivisions);
  const icoPos = icoGeom.attributes.position;

  // Deduplicate vertices
  const vertMap = new Map();
  const verts = [];
  const vertKey = (x, y, z) => `${(x * 1000 | 0)},${(y * 1000 | 0)},${(z * 1000 | 0)}`;

  function getVertIdx(x, y, z) {
    const k = vertKey(x, y, z);
    if (vertMap.has(k)) return vertMap.get(k);
    const idx = verts.length;
    verts.push(new THREE.Vector3(x, y, z));
    vertMap.set(k, idx);
    return idx;
  }

  // Extract faces
  const faces = [];
  const triCount = icoPos.count / 3;
  for (let i = 0; i < triCount; i++) {
    const ai = i * 3, bi = i * 3 + 1, ci = i * 3 + 2;
    faces.push([
      getVertIdx(icoPos.getX(ai), icoPos.getY(ai), icoPos.getZ(ai)),
      getVertIdx(icoPos.getX(bi), icoPos.getY(bi), icoPos.getZ(bi)),
      getVertIdx(icoPos.getX(ci), icoPos.getY(ci), icoPos.getZ(ci)),
    ]);
  }

  // Map vertices to touching faces
  const vertFaces = new Map();
  faces.forEach((f, fi) => f.forEach(vi => {
    if (!vertFaces.has(vi)) vertFaces.set(vi, []);
    vertFaces.get(vi).push(fi);
  }));

  // Compute face centroids
  const faceCentroids = faces.map(f => {
    const c = new THREE.Vector3();
    f.forEach(vi => c.add(verts[vi]));
    return c.divideScalar(3).normalize().multiplyScalar(radius);
  });

  // Build panels (dual: each original vertex → one hex/pent panel)
  const panels = [];
  vertFaces.forEach((faceIndices, vi) => {
    const center = verts[vi].clone().normalize().multiplyScalar(radius);
    const normal = center.clone().normalize();
    const up = Math.abs(normal.y) < 0.99
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
    const tU = new THREE.Vector3().crossVectors(normal, up).normalize();
    const tV = new THREE.Vector3().crossVectors(normal, tU).normalize();

    const pts = faceIndices.map(fi => {
      const p = faceCentroids[fi].clone().sub(center);
      return { angle: Math.atan2(p.dot(tV), p.dot(tU)), pos: faceCentroids[fi].clone() };
    });
    pts.sort((a, b) => a.angle - b.angle);

    if (pts.length >= 5) {
      panels.push({
        center,
        normal,
        vertices: pts.map(p => p.pos),
        sides: pts.length,
      });
    }
  });

  icoGeom.dispose();
  return panels;
}

// ─── Adjacency Graph ───

/**
 * Build adjacency: two panels are adjacent if their centers are close enough.
 * For subdivision 3, adjacent hex centers are roughly 2 * radius * sin(PI / (5 * 2^subdiv)) apart.
 */
function buildAdjacency(panels, radius) {
  // Threshold: panels sharing an edge have centers at a predictable distance.
  // For subdiv 3, ~320 panels on radius 6 sphere. Adjacent center distance ≈ 1.5-2.5.
  // Use a generous threshold and pick the closest N neighbors.
  const adjacency = {};
  const maxNeighbors = 6; // Hexagons have 6, pentagons have 5

  for (let i = 0; i < panels.length; i++) {
    const ci = panels[i].center;
    const distances = [];

    for (let j = 0; j < panels.length; j++) {
      if (i === j) continue;
      const cj = panels[j].center;
      const dx = ci.x - cj.x, dy = ci.y - cj.y, dz = ci.z - cj.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      distances.push({ id: j, dist });
    }

    distances.sort((a, b) => a.dist - b.dist);

    // Take closest neighbors up to maxNeighbors, with a distance cutoff
    // Adjacent panels on subdiv 3 sphere (r=6) are ~1.8 apart; use 2.5 as cutoff
    const cutoff = radius * 0.45;
    adjacency[i] = distances
      .filter(d => d.dist < cutoff)
      .slice(0, maxNeighbors)
      .map(d => d.id);
  }

  return adjacency;
}

// ─── Helpers ───

/**
 * Get a tile by ID from the board.
 */
export function getTile(board, tileId) {
  return board.tiles[tileId] || null;
}

/**
 * Check if tileId is adjacent to currentTileId.
 */
export function isAdjacent(board, currentTileId, targetTileId) {
  const tile = board.tiles[currentTileId];
  if (!tile) return false;
  return tile.adjacency.includes(targetTileId);
}

/**
 * Check if moving to targetTile is "forward" (same or deeper zone).
 */
export function isForwardMove(board, currentTileId, targetTileId) {
  const current = board.tiles[currentTileId];
  const target = board.tiles[targetTileId];
  if (!current || !target) return false;

  const zoneDepth = { [ZONE.SAFE]: 0, [ZONE.CHARGED]: 1, [ZONE.CRITICAL]: 2 };
  return zoneDepth[target.zone] >= zoneDepth[current.zone];
}

/**
 * Get valid moves for a player at a given tile.
 * Returns array of adjacent tile IDs that satisfy forward-only rule
 * and excludes tiles the player has already visited.
 * @param {object} board
 * @param {number} currentTileId
 * @param {number[]} [visitedTileIds] - tiles the player has already walked
 */
export function getValidMoves(board, currentTileId, visitedTileIds = []) {
  const tile = board.tiles[currentTileId];
  if (!tile) return [];

  const visited = new Set(visitedTileIds);
  return tile.adjacency.filter(adjId => {
    if (visited.has(adjId)) return false;
    return isForwardMove(board, currentTileId, adjId);
  });
}

/**
 * Pick N spread-out start tiles for players from the startTiles pool.
 * Uses greedy farthest-point sampling on the pre-spread pool.
 */
export function pickStartTiles(board, playerCount) {
  const pool = board.startTiles;
  if (playerCount >= pool.length) return pool.slice(0, playerCount);

  // Use farthest-point sampling on the pool tiles
  const tiles = pool.map(id => board.tiles[id]);
  return _pickSpreadTiles(tiles, playerCount).map(t => t.id);
}
