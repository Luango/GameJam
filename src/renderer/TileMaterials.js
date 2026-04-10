import * as THREE from 'three';
import { ZONE_COLORS } from '../constants/gameConfig.js';

// Material slot definitions — all procedural placeholders.
// P3 delivers textures; call setTexture(zone, texture) to swap in-place.
// No other file creates tile materials directly.

const _materials = {
  safe:     null,
  charged:  null,
  critical: null,
};

// State-variant emissive colours (applied on top of base zone material via clone)
const STATE_EMISSIVE = {
  hidden:         { color: 0x000000, intensity: 0 },
  'revealed-safe':  { color: 0x00c9a7, intensity: 0.6 },
  'revealed-trap':  { color: 0x111111, intensity: 0 },
  reward:         { color: 0xffd700, intensity: 1.2 },
};

function _makeMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.10,
    metalness: 0.35,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0.60,
    depthWrite: false,
  });
}

export function initMaterials() {
  _materials.safe     = _makeMaterial(ZONE_COLORS.safe);
  _materials.charged  = _makeMaterial(ZONE_COLORS.charged);
  _materials.critical = _makeMaterial(ZONE_COLORS.critical);
}

/**
 * Returns a cloned material for the given zone, optionally pre-set to a tile state.
 * @param {'safe'|'charged'|'critical'} zone
 * @param {'hidden'|'revealed-safe'|'revealed-trap'|'reward'} [state='hidden']
 */
export function getMaterial(zone, state = 'hidden') {
  const base = _materials[zone] ?? _materials.safe;
  const mat = base.clone();
  applyState(mat, state);
  return mat;
}

/**
 * Apply a state's emissive settings onto an existing material instance.
 */
export function applyState(material, state) {
  if (state === 'hidden') {
    // Self-illuminate with the tile's own zone colour so it's always visible
    // regardless of which way it faces relative to the lights.
    material.emissive.copy(material.color);
    material.emissiveIntensity = 0.4;
  } else {
    const s = STATE_EMISSIVE[state] ?? STATE_EMISSIVE.hidden;
    material.emissive.set(s.color);
    material.emissiveIntensity = s.intensity;
  }
}

/**
 * Swap in a P3-delivered texture for a zone. Hot-reloads in dev.
 * @param {'safe'|'charged'|'critical'} zone
 * @param {THREE.Texture} texture
 */
export function setTexture(zone, texture) {
  if (!_materials[zone]) return;
  _materials[zone].map = texture;
  _materials[zone].needsUpdate = true;
}
