import * as THREE from 'three';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { getTilePosition } from './HexGrid.js';

// ── Sprite assets (Vite resolves to hashed public URLs at build time) ──────────
import stripUrl  from '../../assets/vfx/trail-strip.png';
import wispUrl   from '../../assets/vfx/trail-wisp.png';
import sparkUrl  from '../../assets/vfx/trail-spark.png';

// ─────────────────────────────────────────────────────────────────────────────
// PathTracer — 3-layer electric trail system
//
//  Layer 1 (innermost) : thin hot-core tube — MeshBasicMaterial, additive
//  Layer 2 (middle)    : scrolling trail-strip.png texture tube — flows forward
//  Layer 3 (outermost) : wide soft glow halo — fakes bloom without post-FX
//  + lightning-bolt sprites zigzagging around the tube
//  + wisp particles  (trail-wisp.png)  travelling along the curve
//  + spark particles (trail-spark.png) fast jitter around the tube
// ─────────────────────────────────────────────────────────────────────────────

const SPHERE_RADIUS    = 1.0;
const PATH_SEGMENTS    = 32;   // geodesic subdivisions per segment
const TUBE_SEGMENTS    = 8;    // radial faces per tube

// Layer radii
const RADIUS_CORE      = 0.0030;
const RADIUS_STRIP     = 0.0070;
const RADIUS_GLOW      = 0.0200;

// Particle counts per trail segment
const WISP_COUNT   = 22;
const SPARK_COUNT  = 14;

// UV scroll speed (strip texture) — units per second along U axis
const STRIP_SCROLL_SPD = 0.45;

// ── Texture cache ─────────────────────────────────────────────────────────────
const _loader = new THREE.TextureLoader();
let _stripTex = null;
let _wispTex  = null;
let _sparkTex = null;

function _ensureTextures() {
  if (_stripTex) return;

  _stripTex = _loader.load(stripUrl);
  _stripTex.wrapS = THREE.RepeatWrapping;
  _stripTex.wrapT = THREE.RepeatWrapping;
  _stripTex.repeat.set(6, 1); // tile 6× along tube length

  _wispTex  = _loader.load(wispUrl);
  _sparkTex = _loader.load(sparkUrl);
}

// ── Module state ──────────────────────────────────────────────────────────────
let _scene   = null;
let _lastNow = 0;

// playerId → { group: THREE.Group, segments: SegmentData[] }
const _paths = new Map();

export function initPathTracer(scene) {
  _scene = scene;
  _ensureTextures();
}

// ── Geodesic arc ──────────────────────────────────────────────────────────────
function _geodesicPoints(from, to, steps) {
  const f   = from.clone().normalize();
  const t   = to.clone().normalize();
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const a = i / steps;
    pts.push(
      new THREE.Vector3().copy(f).lerp(t, a).normalize()
        .multiplyScalar(SPHERE_RADIUS + 0.007),
    );
  }
  return pts;
}

// ── Perp-frame helper ─────────────────────────────────────────────────────────
// Returns two vectors orthogonal to `tangent` — used for radial offsets.
const _pA = new THREE.Vector3();
const _pB = new THREE.Vector3();
function _perpFrame(tangent) {
  const guess = Math.abs(tangent.y) < 0.9 ? _pA.set(0, 1, 0) : _pA.set(1, 0, 0);
  _pB.crossVectors(tangent, guess).normalize();
  _pA.crossVectors(tangent, _pB).normalize();
  return { a: _pA.clone(), b: _pB.clone() };
}

// ── Layer 1: Hot core ─────────────────────────────────────────────────────────
function _buildCore(curve, color) {
  const geo = new THREE.TubeGeometry(curve, PATH_SEGMENTS, RADIUS_CORE, TUBE_SEGMENTS, false);
  const mat = new THREE.MeshBasicMaterial({
    color:       new THREE.Color(color).multiplyScalar(2.2), // blown-out bright
    transparent: true,
    opacity:     0.92,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  });
  return new THREE.Mesh(geo, mat);
}

// ── Layer 2: Scrolling energy strip ───────────────────────────────────────────
function _buildStrip(curve, color) {
  // Clone so each segment scrolls independently
  const tex       = _stripTex.clone();
  tex.needsUpdate = true;

  const geo = new THREE.TubeGeometry(curve, PATH_SEGMENTS, RADIUS_STRIP, TUBE_SEGMENTS, false);
  const mat = new THREE.MeshBasicMaterial({
    map:         tex,
    color:       new THREE.Color(color),
    transparent: true,
    opacity:     0.88,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  });
  return { mesh: new THREE.Mesh(geo, mat), tex };
}

// ── Layer 3: Soft outer glow halo ─────────────────────────────────────────────
function _buildGlow(curve, color) {
  const geo = new THREE.TubeGeometry(curve, PATH_SEGMENTS, RADIUS_GLOW, TUBE_SEGMENTS, false);
  const mat = new THREE.MeshBasicMaterial({
    color:       new THREE.Color(color),
    transparent: true,
    opacity:     0.07,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  });
  return new THREE.Mesh(geo, mat);
}

// ── Wisp particles (trail-wisp.png) ──────────────────────────────────────────
// Soft glowing orbs that travel along the curve — slow, dreamy.
function _buildWisps(curve, color, count) {
  const positions = new Float32Array(count * 3);
  const wispData  = [];

  for (let i = 0; i < count; i++) {
    const prog = Math.random();
    const pos  = curve.getPoint(prog);
    positions[i * 3]     = pos.x;
    positions[i * 3 + 1] = pos.y;
    positions[i * 3 + 2] = pos.z;
    wispData.push({
      progress:  prog,
      speed:     0.018 + Math.random() * 0.055,
      wobble:    Math.random() * Math.PI * 2,
      wobbleSpd: 1.8 + Math.random() * 2.0,
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    map:             _wispTex,
    color:           new THREE.Color(color).multiplyScalar(1.6),
    size:            0.024,
    transparent:     true,
    opacity:         0.70,
    blending:        THREE.AdditiveBlending,
    depthWrite:      false,
    sizeAttenuation: true,
    alphaTest:       0.01,
  });

  return { points: new THREE.Points(geo, mat), wispData };
}

// ── Spark particles (trail-spark.png) ─────────────────────────────────────────
// Fast-moving white-hot sparks — jitter and crackle around the tube.
function _buildSparks(curve, count) {
  const positions = new Float32Array(count * 3);
  const sparkData = [];

  for (let i = 0; i < count; i++) {
    const prog = Math.random();
    const pos  = curve.getPoint(prog);
    positions[i * 3]     = pos.x;
    positions[i * 3 + 1] = pos.y;
    positions[i * 3 + 2] = pos.z;
    sparkData.push({
      progress:  prog,
      speed:     0.07 + Math.random() * 0.14,  // sparks travel faster
      wobble:    Math.random() * Math.PI * 2,
      wobbleSpd: 5.0 + Math.random() * 5.0,    // rapid electric jitter
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    map:             _sparkTex,
    color:           0xffffff,   // pure white — hot sparks are colourless
    size:            0.013,
    transparent:     true,
    opacity:         0.92,
    blending:        THREE.AdditiveBlending,
    depthWrite:      false,
    sizeAttenuation: true,
    alphaTest:       0.01,
  });

  return { points: new THREE.Points(geo, mat), sparkData };
}

// ── Segment factory ───────────────────────────────────────────────────────────
function _buildSegment(fromPos, toPos, color) {
  const pts   = _geodesicPoints(fromPos, toPos, PATH_SEGMENTS);
  const curve = new THREE.CatmullRomCurve3(pts);

  const core                          = _buildCore(curve, color);
  const { mesh: stripMesh, tex }      = _buildStrip(curve, color);
  const glow                          = _buildGlow(curve, color);
  const { points: wisps, wispData }   = _buildWisps(curve, color, WISP_COUNT);
  const { points: sparks, sparkData } = _buildSparks(curve, SPARK_COUNT);

  return { core, stripMesh, stripTex: tex, glow, wisps, wispData, sparks, sparkData, curve };
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
 * Add a trail segment for a player moving between two tiles.
 * @param {number} playerId   — slot 0–3
 * @param {number} fromTileId
 * @param {number} toTileId
 */
export function addPathSegment(playerId, fromTileId, toTileId) {
  _ensureTextures();

  const path  = _getOrCreatePath(playerId);
  const color = PLAYER_COLORS[playerId] ?? 0xffffff;
  const from  = getTilePosition(fromTileId);
  const to    = getTilePosition(toTileId);
  const seg   = _buildSegment(from, to, color);

  path.group.add(seg.core);
  path.group.add(seg.stripMesh);
  path.group.add(seg.glow);
  path.group.add(seg.wisps);
  path.group.add(seg.sparks);

  path.segments.push(seg);
}

// ── Animation loop ────────────────────────────────────────────────────────────
/**
 * Call once per frame from the main render loop.
 * @param {number} now — DOMHighResTimeStamp (ms)
 */
export function updateTrails(now) {
  const t  = now / 1000;
  const dt = Math.min((now - _lastNow) / 1000, 0.05);
  _lastNow = now;

  _paths.forEach((path) => {
    path.segments.forEach((seg) => {
      const { core, stripTex, glow, wisps, wispData, sparks, sparkData, curve } = seg;

      // ── Layer 1: core flicker ─────────────────────────────────────────────
      core.material.opacity = 0.80 + 0.18 * Math.sin(t * 8.7);

      // ── Layer 2: scroll strip texture ────────────────────────────────────
      if (stripTex) stripTex.offset.x -= STRIP_SCROLL_SPD * dt;

      // ── Layer 3: glow breathe ─────────────────────────────────────────────
      glow.material.opacity = 0.05 + 0.04 * Math.sin(t * 2.1);

      // ── Wisps: travel + radial wobble ────────────────────────────────────
      const wAttr = wisps.geometry.attributes.position;
      wispData.forEach((wd, i) => {
        wd.progress = (wd.progress + wd.speed * dt) % 1;

        const pos = curve.getPoint(wd.progress);
        const tan = curve.getTangent(wd.progress).normalize();
        const { a, b } = _perpFrame(tan);

        const angle  = t * wd.wobbleSpd + wd.wobble;
        const radius = RADIUS_STRIP * (1.2 + 0.8 * Math.abs(Math.sin(t * 1.3 + wd.wobble)));
        pos.addScaledVector(a, Math.cos(angle) * radius);
        pos.addScaledVector(b, Math.sin(angle) * radius);

        wAttr.setXYZ(i, pos.x, pos.y, pos.z);
      });
      wAttr.needsUpdate       = true;
      wisps.material.opacity  = 0.50 + 0.25 * Math.sin(t * 2.9);

      // ── Sparks: fast travel + electric jitter ────────────────────────────
      const sAttr = sparks.geometry.attributes.position;
      sparkData.forEach((sd, i) => {
        sd.progress = (sd.progress + sd.speed * dt) % 1;

        const pos = curve.getPoint(sd.progress);
        const tan = curve.getTangent(sd.progress).normalize();
        const { a, b } = _perpFrame(tan);

        const angle  = t * sd.wobbleSpd + sd.wobble;
        const radius = RADIUS_STRIP * (2.0 + 1.8 * Math.abs(Math.sin(t * 2.7 + sd.wobble)));
        pos.addScaledVector(a, Math.cos(angle) * radius);
        pos.addScaledVector(b, Math.sin(angle) * radius);

        sAttr.setXYZ(i, pos.x, pos.y, pos.z);
      });
      sAttr.needsUpdate       = true;
      // Electric stutter on the spark cloud as a whole
      sparks.material.opacity = Math.random() > 0.08
        ? 0.75 + 0.20 * Math.sin(t * 11.3)
        : 0.10; // rare full-cloud flicker-off
    });
  });
}

// ── Cleanup ───────────────────────────────────────────────────────────────────
export function clearPlayer(playerId) {
  const path = _paths.get(playerId);
  if (!path) return;

  path.segments.forEach((seg) => {
    [seg.core, seg.stripMesh, seg.glow, seg.wisps, seg.sparks].forEach((obj) => {
      obj.geometry?.dispose();
      obj.material?.dispose();
      path.group.remove(obj);
    });
    seg.stripTex?.dispose();
  });

  path.group.clear();
  path.segments = [];
}

export function clearAllPaths() {
  _paths.forEach((_, id) => clearPlayer(id));
}
