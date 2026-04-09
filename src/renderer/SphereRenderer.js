import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SphereRenderer — owns the Three.js scene, WebGL renderer, camera, and lighting.
// No game logic lives here. Call render() each frame from main.js.

let _renderer = null;
let _scene    = null;
let _camera   = null;
let _controls = null;
let _idleTimer = null;
let _isIdle    = false;

const IDLE_TIMEOUT_MS = 3000;
const AUTO_ROTATE_SPEED = 0.3;

/**
 * Initialise the renderer and attach it to the given canvas.
 * @param {HTMLCanvasElement} canvas
 */
export function init(canvas) {
  _renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  _renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  _renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  _renderer.toneMapping = THREE.ACESFilmicToneMapping;
  _renderer.toneMappingExposure = 1.2;
  _renderer.outputColorSpace = THREE.SRGBColorSpace;

  _scene = new THREE.Scene();
  _scene.background = new THREE.Color(0x0a0a0f);

  // Subtle star-field fog
  _scene.fog = new THREE.FogExp2(0x0a0a0f, 0.08);

  _camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  _camera.position.set(0, 1.2, 3);
  _camera.lookAt(0, 0, 0);

  _controls = new OrbitControls(_camera, canvas);
  _controls.enableDamping = true;
  _controls.dampingFactor = 0.08;
  _controls.minDistance = 1.8;
  _controls.maxDistance = 5;
  _controls.autoRotate = false;

  // Auto-rotate after idle timeout; stop on any interaction
  _controls.addEventListener('start', () => {
    clearTimeout(_idleTimer);
    _controls.autoRotate = false;
    _isIdle = false;
  });
  _controls.addEventListener('end', () => {
    _idleTimer = setTimeout(() => {
      _controls.autoRotate = true;
      _controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
      _isIdle = true;
    }, IDLE_TIMEOUT_MS);
  });

  _addLighting();
  _addWindowResizeHandler(canvas);

  // Start idle timer immediately
  _idleTimer = setTimeout(() => {
    _controls.autoRotate = true;
    _controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
  }, IDLE_TIMEOUT_MS);

  return { scene: _scene, camera: _camera };
}

function _addLighting() {
  // Ambient — low base
  const ambient = new THREE.AmbientLight(0x334155, 0.8);
  _scene.add(ambient);

  // Key light — warm from upper-right
  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(3, 4, 2);
  _scene.add(key);

  // Rim / fill — cool teal from left
  const rim = new THREE.DirectionalLight(0x00c9a7, 0.6);
  rim.position.set(-3, 0, -2);
  _scene.add(rim);

  // Point light inside sphere — gives holographic inner glow
  const inner = new THREE.PointLight(0x6366f1, 0.8, 3);
  inner.position.set(0, 0, 0);
  _scene.add(inner);
}

function _addWindowResizeHandler(canvas) {
  const observer = new ResizeObserver(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    _renderer.setSize(w, h, false);
    _camera.aspect = w / h;
    _camera.updateProjectionMatrix();
  });
  observer.observe(canvas.parentElement);
}

/** Call once per frame from the main render loop. */
export function render() {
  _controls.update();
  _renderer.render(_scene, _camera);
}

export function getScene()    { return _scene; }
export function getCamera()   { return _camera; }
export function getRenderer() { return _renderer; }
