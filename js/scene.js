// ─── Circuit Sphere Scene ───
// Three.js scene setup: renderer, camera, lights, post-processing.

let scene, camera, renderer, controls;
let sphereGroup;

// ─── Public API ───

export function init(canvas) {
  const THREE = window.THREE;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000812, 0.008);

  // Camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 8, 20);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Controls
  const { OrbitControls } = window.THREE_ADDONS || {};
  if (OrbitControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 35;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.target.set(0, 0, 0);
  }

  // Sphere group (all hex tiles go here)
  sphereGroup = new THREE.Group();
  scene.add(sphereGroup);

  // Lighting
  setupLighting(scene);

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer, sphereGroup };
}

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }
export function getSphereGroup() { return sphereGroup; }

export function render() {
  if (controls) controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// ─── Lighting ───

function setupLighting(scene) {
  const THREE = window.THREE;

  // Ambient
  const ambient = new THREE.AmbientLight(0x111122, 0.3);
  scene.add(ambient);

  // Main light (top-down, cool)
  const topLight = new THREE.PointLight(0x4488ff, 1.5, 100);
  topLight.position.set(0, 20, 0);
  scene.add(topLight);

  // Accent lights
  const sideLight1 = new THREE.PointLight(0xff4400, 0.8, 60);
  sideLight1.position.set(15, 5, -10);
  scene.add(sideLight1);

  const sideLight2 = new THREE.PointLight(0x00ffaa, 0.6, 60);
  sideLight2.position.set(-15, 5, 10);
  scene.add(sideLight2);

  // Bottom glow
  const bottomLight = new THREE.PointLight(0x220044, 0.4, 30);
  bottomLight.position.set(0, -10, 0);
  scene.add(bottomLight);
}
