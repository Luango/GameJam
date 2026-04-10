// ModelLoader — preloads all character GLBs and clones on demand.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const MODEL_LIST = [
  { id: 'catbo',    name: 'Catbo',           file: 'Catbo.glb' },
  { id: 'cowboy',   name: 'Cowboy Blubo',    file: 'Cowboy_Blubo.glb' },
  { id: 'cyber',    name: 'Cyberpunk Blubo', file: 'Cyberpunk_Blubo.glb' },
  { id: 'duckie',   name: 'Duckie Blubo',    file: 'Duckie_Blubo.glb' },
  { id: 'pirate',   name: 'Pirate Blubo',    file: 'Pirate_Blubo.glb' },
  { id: 'tophat',   name: 'Tophat Blubo',    file: 'Tophat_Blubo.glb' },
  { id: 'wizard',   name: 'Wizard Blubo',    file: 'Wizard_Blubo.glb' },
];

const BASE_PATH = 'assets/models/';
const _cache = new Map(); // id → gltf.scene (original, never added to scene directly)
const _loader = new GLTFLoader();

let _ready = false;

export function isReady() { return _ready; }

/**
 * Preload all character models. Call once at startup.
 * @returns {Promise<void>}
 */
export async function preloadAll() {
  const promises = MODEL_LIST.map(({ id, file }) =>
    new Promise((resolve) => {
      _loader.load(
        BASE_PATH + file,
        (gltf) => { _cache.set(id, gltf.scene); resolve(); },
        undefined,
        (err) => { console.warn(`[ModelLoader] Failed to load ${file}:`, err); resolve(); },
      );
    }),
  );
  await Promise.all(promises);
  _ready = true;
  console.log(`[ModelLoader] Loaded ${_cache.size}/${MODEL_LIST.length} models`);
}

const TOKEN_FIT = 0.24; // target bounding-sphere diameter in world units

/**
 * Clone a loaded model by id, scaled to fit the token size.
 * @param {string} id — model id from MODEL_LIST
 * @returns {THREE.Group|null}
 */
export function cloneModel(id) {
  const original = _cache.get(id);
  if (!original) return null;

  const clone = original.clone(true);

  // Deep-clone materials so tinting one token doesn't affect others
  clone.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
    }
  });

  // Compute bounding box to normalize scale
  const box = new THREE.Box3().setFromObject(clone);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const s = TOKEN_FIT / maxDim;
    clone.scale.setScalar(s);
  }

  // Recompute box after scaling
  const scaledBox = new THREE.Box3().setFromObject(clone);
  const center = new THREE.Vector3();
  scaledBox.getCenter(center);

  // Place feet at Y=0: center X/Z, but shift so bottom of bounding box sits at Y=0
  clone.position.set(-center.x, -scaledBox.min.y, -center.z);

  // Wrap in a group so position/rotation can be set independently
  const wrapper = new THREE.Group();
  wrapper.add(clone);

  return wrapper;
}
