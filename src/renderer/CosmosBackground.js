import * as THREE from 'three';

// CosmosBackground — static galaxy backdrop with stars, nebula dust, and distant planets.
// Everything rotates imperceptibly slowly so the scene feels alive without competing with
// the game sphere in the foreground.

// ─── Sprite textures ──────────────────────────────────────────────────────────

/** Sharp circular dot — used for stars. */
function _makeStarTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const mid = size / 2;
  const grad = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
  grad.addColorStop(0.0,  'rgba(255,255,255,1.0)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.8)');
  grad.addColorStop(0.6,  'rgba(255,255,255,0.1)');
  grad.addColorStop(1.0,  'rgba(255,255,255,0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/** Soft wide glow — used for nebula clouds. */
function _makeNebulaTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const mid = size / 2;
  const grad = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
  grad.addColorStop(0.0,  'rgba(255,255,255,0.6)');
  grad.addColorStop(0.4,  'rgba(255,255,255,0.15)');
  grad.addColorStop(1.0,  'rgba(255,255,255,0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const DRIFT_SPEED = 0.000012; // rad/frame ≈ one full rotation every ~145 min at 60 fps

let _group = null;

// ─── Public API ───────────────────────────────────────────────────────────────

export function initCosmos(scene) {
  _group = new THREE.Group();
  scene.add(_group);

  _buildStars();
  _buildNebula();
  _buildPlanets();
}

/** Call once per frame from the main render loop. */
export function updateCosmos() {
  if (_group) _group.rotation.y += DRIFT_SPEED;
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function _buildStars() {
  // Two layers give depth: many tiny + a handful of brighter ones
  const tex = _makeStarTexture();
  _group.add(_makeStarLayer(3000, 0.38, 48, 62, 0.80, tex));
  _group.add(_makeStarLayer(350,  0.72, 46, 60, 1.00, tex));
}

function _makeStarLayer(count, size, rMin, rMax, opacity, map) {
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  // Realistic stellar colour palette (mostly blue-white / white, rare warm)
  const palette = [
    [1.00, 1.00, 1.00], // pure white
    [0.75, 0.85, 1.00], // blue-white (most common)
    [0.68, 0.80, 1.00], // cool blue
    [1.00, 0.97, 0.85], // warm white
    [1.00, 0.85, 0.65], // orange (rare)
  ];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = rMin + Math.random() * (rMax - rMin);

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    // Rare orange, otherwise pick from white/blue range
    const pick = Math.random() < 0.04 ? 4 : Math.floor(Math.random() * 4);
    const c = palette[pick];
    const b = 0.45 + Math.random() * 0.55; // per-star brightness variation
    colors[i * 3]     = c[0] * b;
    colors[i * 3 + 1] = c[1] * b;
    colors[i * 3 + 2] = c[2] * b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

  const mat = new THREE.PointsMaterial({
    size,
    map,
    vertexColors:    true,
    sizeAttenuation: true,
    fog:             false, // stars must not be fogged out
    transparent:     true,
    opacity,
    depthWrite:      false,
    alphaTest:       0.01,
  });

  return new THREE.Points(geo, mat);
}

// ─── Nebula / galaxy dust ──────────────────────────────────────────────────────

function _buildNebula() {
  const count     = 700;
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  // Muted galaxy palette — blues, purples, teals
  const palette = [
    [0.04, 0.10, 0.40], // deep blue
    [0.18, 0.04, 0.38], // purple
    [0.00, 0.20, 0.32], // teal
    [0.08, 0.04, 0.28], // indigo
    [0.02, 0.18, 0.20], // dark cyan
  ];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 32 + Math.random() * 22;

    // Compress the Y axis to form a galaxy-band shape
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.22;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

  const mat = new THREE.PointsMaterial({
    size:            5.0,
    map:             _makeNebulaTexture(),
    vertexColors:    true,
    sizeAttenuation: true,
    fog:             false,
    transparent:     true,
    opacity:         0.18,
    depthWrite:      false,
    blending:        THREE.AdditiveBlending,
    alphaTest:       0.001,
  });

  _group.add(new THREE.Points(geo, mat));
}

// ─── Distant planets ──────────────────────────────────────────────────────────

function _buildPlanets() {
  // Subtle, dim orbs at varying distances — just enough to suggest depth
  const defs = [
    { pos: [-18,  7, -28], radius: 0.80, color: 0x12082a, emissive: 0x2a0e5c, opacity: 0.60 }, // purple
    { pos: [ 23, -4, -22], radius: 0.45, color: 0x060d1a, emissive: 0x0a2a4a, opacity: 0.55 }, // deep blue
    { pos: [-9,  -11, 26], radius: 0.32, color: 0x1a0808, emissive: 0x3c0f0f, opacity: 0.45 }, // dark red dwarf
    { pos: [ 28,   5,  9], radius: 0.60, color: 0x030f0f, emissive: 0x083030, opacity: 0.50 }, // teal ice giant
  ];

  for (const d of defs) {
    const geo  = new THREE.SphereGeometry(d.radius, 14, 14);
    const mat  = new THREE.MeshBasicMaterial({
      color:       d.emissive, // use emissive colour as flat base — no lighting needed
      fog:         false,
      transparent: true,
      opacity:     d.opacity,
      depthWrite:  false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...d.pos);
    _group.add(mesh);
  }
}
