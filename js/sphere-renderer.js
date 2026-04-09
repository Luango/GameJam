// ─── Circuit Sphere Hex Tile Renderer ───
// Renders hex tiles on the sphere with materials, colors, and reveal animations.

import { ZONE, TILE, STATUS } from './protocol.js';

// ─── Constants ───

const SHRINK = 0.82;   // Gap between hex tiles
const ZONE_COLORS = {
  [ZONE.SAFE]:     { base: 0x003322, emissive: 0x00ffaa, hidden: 0x112211 },
  [ZONE.CHARGED]:  { base: 0x332200, emissive: 0xffdd00, hidden: 0x221100 },
  [ZONE.CRITICAL]: { base: 0x330000, emissive: 0xff3300, hidden: 0x220000 },
};

const TILE_REVEAL_COLORS = {
  [TILE.SAFE]:   { emissive: 0x00ffaa },
  [TILE.TRAP]:   { emissive: 0xff1111 },
  [TILE.REWARD]: { emissive: 0xffdd00 },
};

// ─── State ───

let tileMeshes = {};  // tileId -> { mesh, material, edgeMesh }
let playerMarkers = {};  // playerId -> mesh
let animationQueue = [];

// ─── Public API ───

/**
 * Build all hex tile meshes from board data and add to the sphere group.
 * @param {object} board - { tiles: [...] }
 * @param {THREE.Group} sphereGroup
 */
export function buildTileMeshes(board, sphereGroup) {
  const THREE = window.THREE;
  tileMeshes = {};

  for (const tile of board.tiles) {
    const colors = ZONE_COLORS[tile.zone] || ZONE_COLORS[ZONE.SAFE];

    // Convert vertices to THREE.Vector3
    const verts = tile.vertices.map(v => new THREE.Vector3(v.x, v.y, v.z));
    const center = new THREE.Vector3(tile.center.x, tile.center.y, tile.center.z);
    const normal = center.clone().normalize();

    // Shrink vertices toward center for gap effect
    const shrunkVerts = verts.map(v => {
      const dir = v.clone().sub(center);
      return center.clone().add(dir.multiplyScalar(SHRINK));
    });

    // Triangle fan geometry
    const positions = [];
    const normals = [];
    for (let i = 0; i < shrunkVerts.length; i++) {
      const next = (i + 1) % shrunkVerts.length;
      positions.push(center.x, center.y, center.z);
      positions.push(shrunkVerts[i].x, shrunkVerts[i].y, shrunkVerts[i].z);
      positions.push(shrunkVerts[next].x, shrunkVerts[next].y, shrunkVerts[next].z);
      for (let j = 0; j < 3; j++) normals.push(normal.x, normal.y, normal.z);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

    // Material: hidden state (dark, muted)
    const mat = new THREE.MeshStandardMaterial({
      color: colors.hidden,
      emissive: new THREE.Color(colors.hidden),
      emissiveIntensity: 0.15,
      metalness: 0.6,
      roughness: 0.4,
      transparent: true,
      opacity: 0.7,
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData = { tileId: tile.id, zone: tile.zone, revealed: false };
    sphereGroup.add(mesh);

    // Edge lines
    const edgePositions = [];
    for (let i = 0; i < shrunkVerts.length; i++) {
      const next = (i + 1) % shrunkVerts.length;
      edgePositions.push(
        shrunkVerts[i].x, shrunkVerts[i].y, shrunkVerts[i].z,
        shrunkVerts[next].x, shrunkVerts[next].y, shrunkVerts[next].z
      );
    }
    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: colors.emissive,
      transparent: true,
      opacity: 0.15,
    });
    const edgeMesh = new THREE.LineSegments(edgeGeom, edgeMat);
    sphereGroup.add(edgeMesh);

    tileMeshes[tile.id] = { mesh, material: mat, edgeMesh, edgeMaterial: edgeMat, zone: tile.zone };
  }
}

/**
 * Reveal a tile with animation.
 * @param {number} tileId
 * @param {string} tileState - TILE.SAFE | TILE.TRAP | TILE.REWARD
 */
export function revealTile(tileId, tileState) {
  const entry = tileMeshes[tileId];
  if (!entry || entry.mesh.userData.revealed) return;

  const THREE = window.THREE;
  const colors = TILE_REVEAL_COLORS[tileState] || TILE_REVEAL_COLORS[TILE.SAFE];

  entry.mesh.userData.revealed = true;
  entry.mesh.userData.tileState = tileState;

  // Animate reveal
  animationQueue.push({
    type: 'reveal',
    tileId,
    tileState,
    startTime: performance.now(),
    duration: 600,
    entry,
    targetEmissive: new THREE.Color(colors.emissive),
  });
}

/**
 * Highlight valid move tiles for the local player.
 * @param {number[]} tileIds
 */
export function highlightValidMoves(tileIds) {
  const THREE = window.THREE;

  // Reset all highlights
  for (const entry of Object.values(tileMeshes)) {
    if (!entry.mesh.userData.revealed && !entry.mesh.userData.highlighted) continue;
    if (entry.mesh.userData.highlighted) {
      entry.mesh.userData.highlighted = false;
      const colors = ZONE_COLORS[entry.zone];
      entry.material.emissive.set(colors.hidden);
      entry.material.emissiveIntensity = 0.15;
      entry.material.opacity = 0.7;
    }
  }

  // Highlight valid moves
  for (const id of tileIds) {
    const entry = tileMeshes[id];
    if (!entry) continue;
    entry.mesh.userData.highlighted = true;
    const colors = ZONE_COLORS[entry.zone];
    entry.material.emissive.set(colors.emissive);
    entry.material.emissiveIntensity = 0.5;
    entry.material.opacity = 0.9;
  }
}

/**
 * Clear all highlights.
 */
export function clearHighlights() {
  highlightValidMoves([]);
}

/**
 * Mark a tile as selected (player's choice before lock-in).
 * @param {number} tileId
 */
export function selectTile(tileId) {
  const entry = tileMeshes[tileId];
  if (!entry) return;
  entry.material.emissiveIntensity = 0.8;
  entry.material.opacity = 1.0;
}

/**
 * Update/create a player marker on the sphere.
 * @param {string} playerId
 * @param {number} tileId
 * @param {string} color - Hex color string
 */
export function updatePlayerMarker(playerId, tileId, color) {
  const THREE = window.THREE;
  const tile = tileMeshes[tileId];
  if (!tile) return;

  const center = tile.mesh.userData;
  // Get tile center from board data (approximate from mesh)
  const pos = new THREE.Vector3();
  tile.mesh.geometry.attributes.position;
  // Use the first vertex (center of triangle fan)
  const attr = tile.mesh.geometry.attributes.position;
  pos.set(attr.getX(0), attr.getY(0), attr.getZ(0));

  // Offset slightly above the tile surface
  const normal = pos.clone().normalize();
  const markerPos = pos.clone().add(normal.multiplyScalar(0.3));

  if (!playerMarkers[playerId]) {
    // Create new marker
    const geom = new THREE.SphereGeometry(0.2, 8, 8);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.8,
    });
    const marker = new THREE.Mesh(geom, mat);
    marker.position.copy(markerPos);

    // Add to scene (parent of sphereGroup)
    const parent = tile.mesh.parent;
    if (parent) parent.add(marker);
    playerMarkers[playerId] = marker;
  } else {
    // Move existing marker
    playerMarkers[playerId].position.copy(markerPos);
  }
}

/**
 * Remove a player marker.
 */
export function removePlayerMarker(playerId) {
  if (playerMarkers[playerId]) {
    playerMarkers[playerId].parent.remove(playerMarkers[playerId]);
    playerMarkers[playerId].geometry.dispose();
    playerMarkers[playerId].material.dispose();
    delete playerMarkers[playerId];
  }
}

/**
 * Draw a path line for a player.
 * @param {string} playerId
 * @param {number[]} path - Tile IDs in order
 * @param {string} color
 * @param {THREE.Group} sphereGroup
 */
export function drawPlayerPath(playerId, path, color, sphereGroup) {
  const THREE = window.THREE;
  if (path.length < 2) return;

  // Remove existing path line
  const existingId = `path-${playerId}`;
  const existing = sphereGroup.getObjectByName(existingId);
  if (existing) sphereGroup.remove(existing);

  // Build path points from tile centers
  const points = [];
  for (const tileId of path) {
    const entry = tileMeshes[tileId];
    if (!entry) continue;
    const attr = entry.mesh.geometry.attributes.position;
    const pos = new THREE.Vector3(attr.getX(0), attr.getY(0), attr.getZ(0));
    const normal = pos.clone().normalize();
    points.push(pos.add(normal.multiplyScalar(0.15))); // Slight offset above surface
  }

  if (points.length < 2) return;

  const geom = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.6,
    linewidth: 2,
  });

  const line = new THREE.Line(geom, mat);
  line.name = existingId;
  sphereGroup.add(line);
}

/**
 * Update animations (call each frame).
 */
export function updateAnimations(time) {
  const THREE = window.THREE;

  for (let i = animationQueue.length - 1; i >= 0; i--) {
    const anim = animationQueue[i];
    const elapsed = time - anim.startTime;
    const t = Math.min(1, elapsed / anim.duration);

    if (anim.type === 'reveal') {
      const entry = anim.entry;
      // Ease out
      const ease = 1 - Math.pow(1 - t, 3);

      entry.material.emissive.lerp(anim.targetEmissive, ease);
      entry.material.emissiveIntensity = 0.15 + 0.7 * ease;
      entry.material.opacity = 0.7 + 0.3 * ease;
      entry.edgeMaterial.opacity = 0.15 + 0.5 * ease;

      // Trap tiles pulse red
      if (anim.tileState === TILE.TRAP && t >= 0.5) {
        const pulse = Math.sin((t - 0.5) * Math.PI * 6) * 0.3;
        entry.material.emissiveIntensity = 0.85 + pulse;
      }
    }

    if (t >= 1) {
      animationQueue.splice(i, 1);
    }
  }

  // Ambient animation: subtle pulse on unrevealed tiles
  for (const entry of Object.values(tileMeshes)) {
    if (entry.mesh.userData.revealed) continue;
    if (entry.mesh.userData.highlighted) continue;
    const wave = Math.sin(time * 0.001 + entry.mesh.userData.tileId * 0.5) * 0.05;
    entry.material.emissiveIntensity = 0.15 + wave;
  }
}

/**
 * Get tile ID from a raycaster intersection.
 * @param {THREE.Raycaster} raycaster
 * @param {THREE.Camera} camera
 * @param {THREE.Group} sphereGroup
 * @returns {number|null} tileId or null
 */
export function raycastTile(raycaster, camera, sphereGroup) {
  const meshes = Object.values(tileMeshes).map(e => e.mesh);
  const intersects = raycaster.intersectObjects(meshes);
  if (intersects.length > 0) {
    return intersects[0].object.userData.tileId;
  }
  return null;
}

/**
 * Clean up all meshes.
 */
export function dispose(sphereGroup) {
  for (const entry of Object.values(tileMeshes)) {
    sphereGroup.remove(entry.mesh);
    sphereGroup.remove(entry.edgeMesh);
    entry.mesh.geometry.dispose();
    entry.material.dispose();
    entry.edgeMesh.geometry.dispose();
    entry.edgeMaterial.dispose();
  }
  for (const marker of Object.values(playerMarkers)) {
    marker.parent.remove(marker);
    marker.geometry.dispose();
    marker.material.dispose();
  }
  tileMeshes = {};
  playerMarkers = {};
  animationQueue = [];
}
