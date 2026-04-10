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

// Full visual override per revealed state.
// 'hidden' is handled separately in applyState (self-illuminates with zone colour).
const STATE_LOOK = {
  'revealed-safe': { tileColor: 0x22c55e, emissive: 0x00ff55, intensity: 0.9,  opacity: 1.0 },
  'revealed-trap': { tileColor: 0xff2020, emissive: 0xff0000, intensity: 0.75, opacity: 1.0 },
  reward:          { tileColor: 0xffd700, emissive: 0xffaa00, intensity: 1.3,  opacity: 1.0 },
};

function _makeMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.18,
    metalness: 0.20,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0.92,
    depthWrite: true,
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
  const s = STATE_LOOK[state];
  if (!s) {
    // 'hidden' or unrecognised → self-illuminate with zone colour so all hidden tiles look uniform
    material.emissive.copy(material.color);
    material.emissiveIntensity = 0.55;
    material.opacity = 0.92;
  } else {
    material.color.set(s.tileColor);
    material.emissive.set(s.emissive);
    material.emissiveIntensity = s.intensity;
    material.opacity = s.opacity;
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
