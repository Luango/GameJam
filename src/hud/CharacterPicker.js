// CharacterPicker — grid of character cards with live 3D model previews.
// First-come-first-serve: once a player claims a model, it's disabled for others.

import * as THREE from 'three';
import { MODEL_LIST, isReady, cloneModel } from '../renderer/ModelLoader.js';

const FONT_UI = "'Rajdhani', sans-serif";
const PREVIEW_SIZE = 100; // px per thumbnail canvas

let _container = null;
let _overlay = null;
let _selectedId = null;
let _localPlayerId = null;
let _onPick = null;
let _cards = new Map(); // modelId → { el, nameEl, claimedEl, canvas, scene, camera, renderer, model }
let _claims = {};
let _animFrame = null;

export function init(container, { onPick } = {}) {
  _container = container;
  _onPick = onPick;
  const { overlay } = _build();
  _overlay = overlay;
  container.appendChild(overlay);

  return {
    show: (localPlayerId) => show(localPlayerId),
    hide,
    updateClaims,
    getSelectedModelId,
    reset,
  };
}

export function show(localPlayerId) {
  _localPlayerId = localPlayerId;
  _selectedId = null;
  _claims = {};
  _cards.forEach(({ el, claimedEl }) => {
    el.classList.remove('selected', 'claimed');
    claimedEl.textContent = '';
    claimedEl.style.display = 'none';
  });
  _overlay.style.display = 'flex';
  requestAnimationFrame(() => {
    _overlay.style.opacity = '1';
  });
  _initPreviews();
  _startLoop();
}

export function hide() {
  _overlay.style.opacity = '0';
  _stopLoop();
  setTimeout(() => { _overlay.style.display = 'none'; }, 300);
}

export function updateClaims(claims, playerNames = {}) {
  _claims = claims || {};
  const modelOwner = {};
  for (const [pid, mid] of Object.entries(_claims)) {
    modelOwner[mid] = pid;
  }

  _cards.forEach(({ el, claimedEl }, modelId) => {
    const owner = modelOwner[modelId];
    if (owner && owner !== _localPlayerId) {
      el.classList.add('claimed');
      el.classList.remove('selected');
      claimedEl.textContent = playerNames[owner] || 'Taken';
      claimedEl.style.display = 'block';
    } else if (owner && owner === _localPlayerId) {
      el.classList.remove('claimed');
      el.classList.add('selected');
      _selectedId = modelId;
      claimedEl.textContent = 'YOU';
      claimedEl.style.display = 'block';
    } else {
      el.classList.remove('claimed');
      if (_selectedId !== modelId) el.classList.remove('selected');
      claimedEl.textContent = '';
      claimedEl.style.display = 'none';
    }
  });
}

export function getSelectedModelId() {
  return _selectedId;
}

export function reset() {
  _selectedId = null;
  _claims = {};
}

// ── 3D preview rendering ────────────────────────────────────────────────────

function _initPreviews() {
  if (!isReady()) {
    // Models not loaded yet — retry shortly
    setTimeout(() => _initPreviews(), 200);
    return;
  }

  _cards.forEach((card, modelId) => {
    if (card.model) return; // already initialized

    const clone = cloneModel(modelId);
    if (!clone) return;

    // Add model to the card's scene
    card.scene.add(clone);
    card.model = clone;
  });
}

function _startLoop() {
  _stopLoop();
  const loop = () => {
    _animFrame = requestAnimationFrame(loop);
    const t = performance.now() / 1000;
    _cards.forEach((card) => {
      if (!card.model || !card.renderer) return;
      // Slow turntable rotation
      card.model.rotation.y = t * 0.8;
      card.renderer.render(card.scene, card.camera);
    });
  };
  _animFrame = requestAnimationFrame(loop);
}

function _stopLoop() {
  if (_animFrame != null) {
    cancelAnimationFrame(_animFrame);
    _animFrame = null;
  }
}

// ── Build DOM ───────────────────────────────────────────────────────────────

function _build() {
  const overlay = document.createElement('div');
  overlay.id = 'cs-char-picker';
  Object.assign(overlay.style, {
    display:        'none',
    opacity:        '0',
    transition:     'opacity 0.3s ease',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '12px',
    pointerEvents:  'auto',
    zIndex:         '325',
    padding:        '0 10px',
  });

  const title = document.createElement('div');
  Object.assign(title.style, {
    fontFamily:     FONT_UI,
    fontSize:       '13px',
    fontWeight:     '700',
    letterSpacing:  '0.18em',
    textTransform:  'uppercase',
    color:          '#38bdf8',
    textShadow:     '0 0 10px rgba(56,189,248,0.4)',
    textAlign:      'center',
  });
  title.textContent = 'Choose Your Character';
  overlay.appendChild(title);

  const grid = document.createElement('div');
  Object.assign(grid.style, {
    display:         'flex',
    flexWrap:        'wrap',
    justifyContent:  'center',
    gap:             '8px',
    maxWidth:        '510px',
    width:           '100%',
  });
  overlay.appendChild(grid);

  if (!document.getElementById('cs-char-picker-style')) {
    const style = document.createElement('style');
    style.id = 'cs-char-picker-style';
    style.textContent = `
      .cs-char-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 6px 8px;
        background: rgba(15, 23, 42, 0.85);
        border: 1.5px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        width: 118px;
        flex-shrink: 0;
      }
      .cs-char-card:hover:not(.claimed) {
        border-color: rgba(56,189,248,0.5);
        background: rgba(15, 23, 42, 0.95);
        box-shadow: 0 0 16px rgba(56,189,248,0.15);
        transform: translateY(-2px);
      }
      .cs-char-card.selected {
        border-color: #38bdf8;
        background: rgba(56,189,248,0.12);
        box-shadow: 0 0 20px rgba(56,189,248,0.25);
      }
      .cs-char-card.claimed {
        opacity: 0.4;
        pointer-events: none;
        filter: grayscale(0.6);
      }
      .cs-char-preview {
        width: ${PREVIEW_SIZE}px;
        height: ${PREVIEW_SIZE}px;
        border-radius: 8px;
        flex-shrink: 0;
      }
      .cs-char-name {
        font-family: ${FONT_UI};
        font-size: 11px;
        font-weight: 600;
        color: #cbd5e1;
        text-align: center;
        letter-spacing: 0.04em;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
      .cs-char-claimed {
        font-family: ${FONT_UI};
        font-size: 9px;
        font-weight: 700;
        color: #f59e0b;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        position: absolute;
        top: 4px;
        right: 6px;
      }
    `;
    document.head.appendChild(style);
  }

  MODEL_LIST.forEach(({ id, name }) => {
    const card = document.createElement('div');
    card.className = 'cs-char-card';

    // 3D preview canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'cs-char-preview';
    canvas.width = PREVIEW_SIZE * 2;  // 2x for retina
    canvas.height = PREVIEW_SIZE * 2;

    // Mini Three.js scene per card
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(PREVIEW_SIZE * 2, PREVIEW_SIZE * 2);
    renderer.setPixelRatio(1); // already 2x via canvas size
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 10);
    camera.position.set(0, 0.15, 0.65);
    camera.lookAt(0, 0.1, 0);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(1, 2, 2);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x88ccff, 1.0);
    fillLight.position.set(-1, 0.5, -1);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0x00c9a7, 0.6);
    rimLight.position.set(0, -1, -2);
    scene.add(rimLight);

    const claimedEl = document.createElement('div');
    claimedEl.className = 'cs-char-claimed';
    claimedEl.style.display = 'none';

    const nameEl = document.createElement('div');
    nameEl.className = 'cs-char-name';
    nameEl.textContent = name;

    card.appendChild(claimedEl);
    card.appendChild(canvas);
    card.appendChild(nameEl);
    grid.appendChild(card);

    _cards.set(id, { el: card, nameEl, claimedEl, canvas, scene, camera, renderer, model: null });

    card.addEventListener('click', () => {
      if (card.classList.contains('claimed')) return;
      _cards.forEach(({ el }) => {
        if (!el.classList.contains('claimed')) el.classList.remove('selected');
      });
      card.classList.add('selected');
      _selectedId = id;
      if (_onPick) _onPick(id);
    });
  });

  const randomBtn = document.createElement('div');
  Object.assign(randomBtn.style, {
    fontFamily:     FONT_UI,
    fontSize:       '10px',
    fontWeight:     '600',
    letterSpacing:  '0.1em',
    color:          '#64748b',
    textAlign:      'center',
    cursor:         'pointer',
    transition:     'color 0.15s',
    textTransform:  'uppercase',
  });
  randomBtn.textContent = 'or skip for random';
  randomBtn.addEventListener('mouseenter', () => { randomBtn.style.color = '#94a3b8'; });
  randomBtn.addEventListener('mouseleave', () => { randomBtn.style.color = '#64748b'; });
  randomBtn.addEventListener('click', () => {
    _selectedId = null;
    _cards.forEach(({ el }) => {
      if (!el.classList.contains('claimed')) el.classList.remove('selected');
    });
  });
  overlay.appendChild(randomBtn);

  return { overlay };
}
