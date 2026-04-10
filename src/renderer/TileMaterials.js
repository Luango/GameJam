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

// ── Art direction constants ────────────────────────────────────────────────────

// Hidden tiles are inert, matte, heavy — like powered-down circuit panels.
// Each zone gets a slightly different emissive so critical tiles feel more alive
// even before the player interacts with them.
// Slightly higher than before — darker base colours need a touch more self-light
// so each zone stays identifiable even in ambient-only lighting conditions.
const HIDDEN_EMISSIVE = { safe: 0.10, charged: 0.18, critical: 0.26 };
const HIDDEN_ROUGHNESS  = 0.55;  // matte/absorbs light — feels dormant
const HIDDEN_METALNESS  = 0.10;

// Available (selectable) tiles are energised — polished, reflective, alive.
export const AVAILABLE_ROUGHNESS = 0.10;  // near-mirror — neon snaps across the face
export const AVAILABLE_METALNESS = 0.65;

// Revealed tiles: polished but permanent — they've been activated.
const REVEALED_ROUGHNESS = 0.15;
const REVEALED_METALNESS = 0.55;

// Full visual override per revealed state.
// Art-directed colours: safe = cool emerald, bust = rose-red, reward = amber-gold.
// Emissive tints carry a signature warmth/coolness — never raw primaries.
const STATE_LOOK = {
  'revealed-safe': {
    tileColor: 0x10B981, emissive: 0x34D399, intensity: 0.50, opacity: 1.0,
    roughness: REVEALED_ROUGHNESS, metalness: REVEALED_METALNESS,
  },
  'revealed-trap': {
    tileColor: 0xF43F5E, emissive: 0xFF6060, intensity: 0.65, opacity: 1.0,
    roughness: REVEALED_ROUGHNESS, metalness: REVEALED_METALNESS,
  },
  reward: {
    tileColor: 0xFBBF24, emissive: 0xF97316, intensity: 0.80, opacity: 1.0,
    roughness: REVEALED_ROUGHNESS, metalness: REVEALED_METALNESS,
  },
};

function _makeMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness:         HIDDEN_ROUGHNESS,  // start inert/matte; sharpened for available/revealed
    metalness:         HIDDEN_METALNESS,
    emissive:          new THREE.Color(0x000000),
    emissiveIntensity: 0,
    transparent:       false,
    opacity:           1.0,
    depthWrite:        true,
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
  applyState(mat, state, zone);
  return mat;
}

/**
 * Apply a state's visual settings onto an existing material instance.
 * @param {THREE.MeshStandardMaterial} material
 * @param {string} state
 * @param {'safe'|'charged'|'critical'} [zone] — required for zone-aware hidden emissive
 */
export function applyState(material, state, zone = null) {
  const s = STATE_LOOK[state];
  if (!s) {
    // Hidden / unrecognised — inert, dark, zone-aware glow, fully solid
    material.emissive.copy(material.color);
    material.emissiveIntensity = HIDDEN_EMISSIVE[zone] ?? 0.10;
    material.transparent = false;
    material.opacity   = 1.0;
    material.roughness = HIDDEN_ROUGHNESS;
    material.metalness = HIDDEN_METALNESS;
  } else {
    // Revealed state — polished, energised, permanent
    material.color.set(s.tileColor);
    material.emissive.set(s.emissive);
    material.emissiveIntensity = s.intensity;
    material.transparent = false;
    material.opacity   = 1.0;
    material.roughness = s.roughness;
    material.metalness = s.metalness;
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
