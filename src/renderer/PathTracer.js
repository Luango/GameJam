import * as THREE from 'three';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { getTilePosition } from './HexGrid.js';
import lightningUrl from '../../assets/vfx/lightning-bolt.png';

// PathTracer — draws a glowing tube trail along the geodesic path a player has visited,
// with animated lightning-bolt sprites and spark particles wrapping around the tube.

const SPHERE_RADIUS  = 1.0;
const TUBE_RADIUS    = 0.008;
const TUBE_SEGMENTS  = 12;
const PATH_SEGMENTS  = 24;

// How many lightning sprites / sparks per path segment
const SPRITE_COUNT  = 5;
const SPARK_COUNT   = 28;

// ── Texture ────────────────────────────────────────────────────────────────────
const _loader = new THREE.TextureLoader();
let   _lightningTex = null;
function _getTex() {
  if (!_lightningTex) _lightningTex = _loader.load(lightningUrl);
  return _lightningTex;
}

// ── State ──────────────────────────────────────────────────────────────────────
let _scene = null;
let _lastNow = 0;

// playerId → { group: THREE.Group, segments: Array<SegmentData> }
// SegmentData = { tube: Mesh, sprites: Sprite[], sparks: Points, curve: CatmullRomCurve3, sparkData: SparkDatum[] }
const _paths = new Map();

// ── Init ───────────────────────────────────────────────────────────────────────
export function initPathTracer(scene) {
  _scene = scene;
}

// ── Geodesic helpers ───────────────────────────────────────────────────────────
function _geodesicPoints(from, to, segments) {
  const points = [];
  const f = from.clone().normalize();
  const t = to.clone().normalize();
  for (let i = 0; i <= segments; i++) {
    const alpha = i / segments;
    const v = new THREE.Vector3().copy(f).lerp(t, alpha).normalize();
    points.push(v.multiplyScalar(SPHERE_RADIUS + 0.006));
  }
  return points;
}

// ── Tube ───────────────────────────────────────────────────────────────────────
function _buildTube(points, color) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo   = new THREE.TubeGeometry(curve, PATH_SEGMENTS, TUBE_RADIUS, TUBE_SEGMENTS, false);
  const mat   = new THREE.MeshStandardMaterial({
    color,
    emissive:          new THREE.Color(color),
    emissiveIntensity: 0.55,
    roughness:         0.25,
    metalness:         0.6,
    transparent:       true,
    opacity:           0.85,
  });
  return { mesh: new THREE.Mesh(geo, mat), curve };
}

// ── Lightning sprites ──────────────────────────────────────────────────────────
// Each sprite is placed along the curve with a small perpendicular offset so it
// looks like it's orbiting the tube.
function _buildSprites(curve, color, count) {
  const tex      = _getTex();
  const colObj   = new THREE.Color(color);
  const sprites  = [];

  for (let i = 0; i < count; i++) {
    const t       = (i + 0.5) / count;
    const pos     = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();

    // Pick a random perpendicular direction (cross with a "up" guess)
    const guess = Math.abs(tangent.y) < 0.9
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
    const perp = new THREE.Vector3().crossVectors(tangent, guess).normalize();
    const rand = new THREE.Vector3().crossVectors(tangent, perp).normalize();
    const angle = Math.random() * Math.PI * 2;
    const perpOff = new THREE.Vector3()
      .addScaledVector(perp, Math.cos(angle))
      .addScaledVector(rand, Math.sin(angle))
      .multiplyScalar(TUBE_RADIUS * (2 + Math.random() * 1.5));

    pos.add(perpOff);

    const mat = new THREE.SpriteMaterial({
      map:        tex,
      color:      colObj,
      transparent: true,
      opacity:    0.55,
      blending:   THREE.AdditiveBlending,
      depthWrite: false,
      rotation:   Math.random() * Math.PI * 2,
    });

    const sprite     = new THREE.Sprite(mat);
    const baseScale  = 0.022 + Math.random() * 0.018;
    sprite.scale.setScalar(baseScale);
    sprite.position.copy(pos);
    sprite.userData  = {
      baseScale,
      phase:  Math.random() * Math.PI * 2,
      speed:  0.7 + Math.random() * 1.0,
    };
    sprites.push(sprite);
  }
  return sprites;
}

// ── Spark particles ────────────────────────────────────────────────────────────
// Small glowing dots that travel along the curve and wobble outward.
function _buildSparks(curve, color, count) {
  const positions = new Float32Array(count * 3);
  const sparkData = [];

  for (let i = 0; i < count; i++) {
    const t   = Math.random();
    const pos = curve.getPoint(t);
    positions[i * 3]     = pos.x;
    positions[i * 3 + 1] = pos.y;
    positions[i * 3 + 2] = pos.z;

    sparkData.push({
      progress:  t,
      speed:     0.015 + Math.random() * 0.07,   // how fast the spark travels along the path
      wobble:    Math.random() * Math.PI * 2,     // phase for radial wobble
      wobbleSpd: 2.5 + Math.random() * 3.0,
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color:          new THREE.Color(color).multiplyScalar(1.6),
    size:           0.007,
    transparent:    true,
    opacity:        0.85,
    blending:       THREE.AdditiveBlending,
    depthWrite:     false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  return { points, sparkData };
}

// ── Path management ────────────────────────────────────────────────────────────
function _getOrCreatePath(playerId) {
  if (!_paths.has(playerId)) {
    const group = new THREE.Group();
    _scene.add(group);
    _paths.set(playerId, { group, segments: [] });
  }
  return _paths.get(playerId);
}

/**
 * Add a path segment for a player between two tile positions.
 * @param {number} playerId   — slot index 0–3
 * @param {number} fromTileId
 * @param {number} toTileId
 */
export function addPathSegment(playerId, fromTileId, toTileId) {
  const path  = _getOrCreatePath(playerId);
  const from  = getTilePosition(fromTileId);
  const to    = getTilePosition(toTileId);
  const pts   = _geodesicPoints(from, to, PATH_SEGMENTS);
  const color = PLAYER_COLORS[playerId] ?? 0xffffff;

  const { mesh, curve }  = _buildTube(pts, color);
  const sprites          = _buildSprites(curve, color, SPRITE_COUNT);
  const { points, sparkData } = _buildSparks(curve, color, SPARK_COUNT);

  path.group.add(mesh);
  sprites.forEach(s => path.group.add(s));
  path.group.add(points);

  path.segments.push({ tube: mesh, sprites, sparks: points, sparkData, curve });

  // Track last point for chaining
  path.points = path.points ?? [];
  path.points.push(to.clone());
}

// ── Animation loop ─────────────────────────────────────────────────────────────
const _perpA = new THREE.Vector3();
const _perpB = new THREE.Vector3();

/**
 * Call once per frame from main.js loop(now).
 * @param {number} now — DOMHighResTimeStamp in milliseconds
 */
export function updateTrails(now) {
  const t  = now / 1000;          // seconds
  const dt = Math.min((now - _lastNow) / 1000, 0.05); // capped delta (s)
  _lastNow = now;

  _paths.forEach((path) => {
    path.segments.forEach(({ sprites, sparks, sparkData, curve }) => {

      // ── Sprites — pulse opacity & scale ──────────────────────────────────
      sprites.forEach((sprite) => {
        const { phase, speed, baseScale } = sprite.userData;
        const pulse = 0.5 + 0.5 * Math.sin(t * speed * Math.PI * 2 + phase);
        sprite.material.opacity = 0.25 + 0.55 * pulse;
        sprite.scale.setScalar(baseScale * (0.7 + 0.6 * pulse));
      });

      // ── Sparks — travel along curve, wobble radially ──────────────────────
      const posAttr = sparks.geometry.attributes.position;

      sparkData.forEach((sd, i) => {
        sd.progress = (sd.progress + sd.speed * dt) % 1;

        const pos     = curve.getPoint(sd.progress);
        const tangent = curve.getTangent(sd.progress).normalize();

        // Build two arbitrary perpendicular axes to the tangent
        const guess = Math.abs(tangent.y) < 0.9
          ? _perpA.set(0, 1, 0)
          : _perpA.set(1, 0, 0);
        _perpB.crossVectors(tangent, guess).normalize();
        _perpA.crossVectors(tangent, _perpB).normalize();

        const wobbleAngle  = t * sd.wobbleSpd + sd.wobble;
        const wobbleRadius = TUBE_RADIUS * (0.8 + 0.8 * Math.abs(Math.sin(t * 1.3 + sd.wobble)));

        pos.addScaledVector(_perpB, Math.cos(wobbleAngle) * wobbleRadius);
        pos.addScaledVector(_perpA, Math.sin(wobbleAngle) * wobbleRadius);

        posAttr.setXYZ(i, pos.x, pos.y, pos.z);
      });

      posAttr.needsUpdate = true;

      // Flicker the overall spark cloud opacity
      sparks.material.opacity = 0.55 + 0.35 * Math.sin(t * 5.3);
    });
  });
}

// ── Cleanup ────────────────────────────────────────────────────────────────────
export function clearPlayer(playerId) {
  const path = _paths.get(playerId);
  if (!path) return;
  path.group.clear();
  path.segments = [];
  path.points   = [];
}

export function clearAllPaths() {
  _paths.forEach((_, id) => clearPlayer(id));
}
