import * as THREE from 'three';

// ZoneLabels — billboard sprites showing multiplier ranges for charged/critical zones.
// Two sprites per zone (north + south hemisphere), always face the camera.

const SPHERE_RADIUS = 1.0;
const LABEL_OFFSET  = 0.18; // float above sphere surface

// lat/lon in degrees → 3D point on sphere
function _latLonToVec3(latDeg, lonDeg, r) {
  const lat = latDeg * Math.PI / 180;
  const lon = lonDeg * Math.PI / 180;
  return new THREE.Vector3(
    r * Math.cos(lat) * Math.cos(lon),
    r * Math.sin(lat),
    r * Math.cos(lat) * Math.sin(lon),
  );
}

function _makeLabel(text, hexColor) {
  const W = 256, H = 80;
  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Convert hex number → CSS colour string
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >>  8) & 0xff;
  const b =  hexColor        & 0xff;
  const css = `rgb(${r},${g},${b})`;

  // Rounded-rect background (dark, tinted)
  const radius = 18;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(W - radius, 0);
  ctx.quadraticCurveTo(W, 0, W, radius);
  ctx.lineTo(W, H - radius);
  ctx.quadraticCurveTo(W, H, W - radius, H);
  ctx.lineTo(radius, H);
  ctx.quadraticCurveTo(0, H, 0, H - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(0,0,0,0.55)`;
  ctx.fill();

  // Neon border stroke
  ctx.strokeStyle = css;
  ctx.lineWidth   = 3;
  ctx.shadowBlur  = 12;
  ctx.shadowColor = css;
  ctx.stroke();

  // Text
  ctx.shadowBlur  = 16;
  ctx.shadowColor = css;
  ctx.fillStyle   = css;
  ctx.font        = 'bold 38px "Courier New", monospace';
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, H / 2);

  return new THREE.CanvasTexture(canvas);
}

// Sprite data: { zone, latDeg, lonDeg, text, color, phaseOffset }
const LABEL_DEFS = [
  { text: '1.5–2.5×', color: 0xccff00, latDeg:  53, lonDeg:   0, phaseOffset: 0.0 },
  { text: '1.5–2.5×', color: 0xccff00, latDeg: -53, lonDeg: 180, phaseOffset: 1.1 },
  { text: '2.5–3.0×', color: 0xff0080, latDeg:  78, lonDeg:  90, phaseOffset: 2.2 },
  { text: '2.5–3.0×', color: 0xff0080, latDeg: -78, lonDeg: 270, phaseOffset: 3.3 },
];

const _sprites = [];

export function build(scene) {
  // Clean up any existing sprites first
  dispose(scene);

  const r = SPHERE_RADIUS + LABEL_OFFSET;

  for (const def of LABEL_DEFS) {
    const tex = _makeLabel(def.text, def.color);
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(0.52, 0.165, 1);
    sprite.position.copy(_latLonToVec3(def.latDeg, def.lonDeg, r));
    sprite.userData.phaseOffset = def.phaseOffset;

    scene.add(sprite);
    _sprites.push(sprite);
  }
}

export function update(now) {
  for (const sprite of _sprites) {
    const phase = now * 0.0013 + sprite.userData.phaseOffset;
    sprite.material.opacity = 0.60 + 0.35 * (0.5 + 0.5 * Math.sin(phase));
  }
}

export function dispose(scene) {
  for (const sprite of _sprites) {
    scene.remove(sprite);
    sprite.material.map?.dispose();
    sprite.material.dispose();
  }
  _sprites.length = 0;
}
