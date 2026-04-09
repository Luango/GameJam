import { init, render, getScene, getCamera } from './renderer/SphereRenderer.js';
import { buildGrid, updateTiles } from './renderer/HexGrid.js';
import { initPathTracer } from './renderer/PathTracer.js';
import { initTokens, updateTokens, getTokenPositions } from './renderer/PlayerToken.js';
import { init as initBridge, handleTilePick, handleHover, getLocalPlayerId } from './state/RenderBridge.js';
import { initHarness } from './dev/MockEventHarness.js';

import { init as initVoltage }                  from './hud/VoltageDisplay.js';
import { init as initTimer }                    from './hud/TurnTimer.js';
import { init as initCashout, lockIn }          from './hud/CashoutButton.js';
import { init as initLeaderboard }              from './hud/Leaderboard.js';
import { init as initBetInput, getBet }         from './hud/BetInput.js';
import { init as initOverview, updateMap }      from './hud/OverviewMap.js';

import * as THREE from 'three';

const canvas = document.getElementById('canvas');
const hud    = document.getElementById('hud');
const app    = document.getElementById('app');

// ── Renderer ──────────────────────────────────────────────────────────────────
const { scene, camera } = init(canvas);

// ── 3D scene ──────────────────────────────────────────────────────────────────
buildGrid(scene);
initPathTracer(scene);
initTokens(scene);

// ── Event bridge ──────────────────────────────────────────────────────────────
const eventBus = new EventTarget();
initBridge(eventBus);
if (import.meta.env.DEV) initHarness(eventBus);

// ── Canvas interaction ────────────────────────────────────────────────────────
canvas.addEventListener('pointerup', (e) => {
  const { x, y } = _toNdc(e);
  handleTilePick({ x, y }, camera);
});

// Hover — throttled to ~60 fps max
let _hoverScheduled = false;
canvas.addEventListener('pointermove', (e) => {
  if (_hoverScheduled) return;
  _hoverScheduled = true;
  requestAnimationFrame(() => {
    _hoverScheduled = false;
    const { x, y } = _toNdc(e);
    handleHover({ x, y }, camera);
  });
});

function _toNdc(e) {
  const r = canvas.getBoundingClientRect();
  return {
    x:  ((e.clientX - r.left) / r.width)  * 2 - 1,
    y: -((e.clientY - r.top)  / r.height) * 2 + 1,
  };
}

// ── HUD layout ────────────────────────────────────────────────────────────────
// Three-column grid: left panel | sphere (untouched) | right panel
// Panels within each column stack via flexbox — no individual absolute positioning.

Object.assign(hud.style, {
  position:      'absolute',
  inset:         '0',
  pointerEvents: 'none',
  display:       'grid',
  gridTemplateColumns: '180px 1fr 220px',
  gridTemplateRows:    '1fr',
  padding:       '14px',
  gap:           '0',
  boxSizing:     'border-box',
});

/** Flex column that fills its grid cell */
function _makeColumn(justifyContent = 'flex-start') {
  const div = document.createElement('div');
  Object.assign(div.style, {
    display:        'flex',
    flexDirection:  'column',
    gap:            '10px',
    justifyContent,
    pointerEvents:  'none',
    minWidth:       '0',
  });
  return div;
}

const hudLeft   = _makeColumn('flex-start');  // leaderboard + voltage, bet at bottom
const hudCenter = _makeColumn('flex-start');  // timer centered at top
const hudRight  = _makeColumn('flex-start');  // overview + cashout at bottom

hud.appendChild(hudLeft);
hud.appendChild(hudCenter);
hud.appendChild(hudRight);

// ── HUD modules ───────────────────────────────────────────────────────────────
initLeaderboard(hudLeft);
initVoltage(hudLeft);

// Timer sits at top of center column, self-centered
const timerWrap = document.createElement('div');
Object.assign(timerWrap.style, { display: 'flex', justifyContent: 'center', pointerEvents: 'none' });
hudCenter.appendChild(timerWrap);
initTimer(timerWrap, { onLock: lockIn });

// Spacer pushes bet input to the bottom of left column
const leftSpacer = document.createElement('div');
leftSpacer.style.flex = '1';
hudLeft.appendChild(leftSpacer);
initBetInput(hudLeft);

initOverview(hudRight);

// Spacer pushes cashout to the bottom of right column
const rightSpacer = document.createElement('div');
rightSpacer.style.flex = '1';
hudRight.appendChild(rightSpacer);
initCashout(hudRight, { getBet });

// ── Current-position label (world-to-screen) ──────────────────────────────────
const _posLabel = document.createElement('div');
_posLabel.id = 'cs-pos-label';
_posLabel.textContent = 'CURRENT POS.';
Object.assign(_posLabel.style, {
  position:      'absolute',
  pointerEvents: 'none',
  fontFamily:    "'Share Tech Mono', monospace",
  fontSize:      '9px',
  letterSpacing: '0.14em',
  color:         '#38bdf8',
  textShadow:    '0 0 8px #38bdf8',
  background:    'rgba(6,14,28,0.7)',
  border:        '1px solid rgba(56,189,248,0.3)',
  borderRadius:  '3px',
  padding:       '2px 6px',
  whiteSpace:    'nowrap',
  display:       'none',
  transform:     'translate(-50%, -220%)',
});
app.appendChild(_posLabel);

const _vec3 = new THREE.Vector3();

function _updatePosLabel() {
  const positions = getTokenPositions();
  const localId   = getLocalPlayerId();
  const localPos  = positions.get(localId);
  if (!localPos) { _posLabel.style.display = 'none'; return; }

  _vec3.copy(localPos);
  _vec3.project(camera);

  if (_vec3.z > 1) { _posLabel.style.display = 'none'; return; }

  const rect = canvas.getBoundingClientRect();
  _posLabel.style.display = 'block';
  _posLabel.style.left    = `${((_vec3.x + 1) / 2) * rect.width + rect.left}px`;
  _posLabel.style.top     = `${((-_vec3.y + 1) / 2) * rect.height + rect.top}px`;
}

// ── Render loop ───────────────────────────────────────────────────────────────
function loop(now) {
  updateTiles(now);
  updateTokens(now);
  updateMap();
  _updatePosLabel();
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
