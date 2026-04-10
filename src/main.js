import * as THREE from 'three';

// ── P1 board.js uses window.THREE (IcosahedronGeometry) — must be set first ──
window.THREE = THREE;

import { init, render, getScene, getCamera } from './renderer/SphereRenderer.js';
import { buildGrid, updateTiles, setHoverCallback } from './renderer/HexGrid.js';
import { initPathTracer }                     from './renderer/PathTracer.js';
import { initTokens, updateTokens, getTokenPositions } from './renderer/PlayerToken.js';
import {
  init as initBridge, handleTilePick, handleHover, getLocalPlayerId,
} from './state/RenderBridge.js';
import { initHarness } from './dev/MockEventHarness.js';

import { init as initVoltage }             from './hud/VoltageDisplay.js';
import { init as initTimer }               from './hud/TurnTimer.js';
import { init as initCashout, lockIn }     from './hud/CashoutButton.js';
import { init as initLeaderboard }         from './hud/Leaderboard.js';
import { init as initBetInput, getBet }    from './hud/BetInput.js';
import { init as initOverview, updateMap } from './hud/OverviewMap.js';
import { init as initLobby }               from './hud/LobbyOverlay.js';
import { init as initResults }             from './hud/ResultsOverlay.js';
import { init as initGameStartBanner }     from './hud/GameStartBanner.js';
import { init as initBustOverlay }         from './hud/BustOverlay.js';

import {
  init as initOrchestrator,
  createRoom, joinRoom, setReady,
} from './p1bridge/GameOrchestrator.js';

const canvas = document.getElementById('canvas');
const hud    = document.getElementById('hud');
const app    = document.getElementById('app');

// ── Renderer ──────────────────────────────────────────────────────────────────
const { scene, camera } = init(canvas);

// ── 3D scene — Fibonacci grid shown in lobby; replaced by buildFromBoard on game start ──
buildGrid(scene);
initPathTracer(scene);
initTokens(scene);

// ── Event bridge ──────────────────────────────────────────────────────────────
const eventBus = new EventTarget();
initBridge(eventBus);

// ── Game Orchestrator (P1 network + game logic) ───────────────────────────────
let _lobbyControls = null; // { hide, updatePlayers }

initOrchestrator(eventBus, {
  onGameStart: () => {
    // Hide lobby overlay once host broadcasts game-start
    _lobbyControls?.hide();
  },
  onPlayersUpdate: (players) => {
    // Update lobby player list (client-side)
    _lobbyControls?.updatePlayers(players);
  },
  onLobbyUpdate: (players, isHost, roomCode) => {
    // Update lobby player list (host-side)
    _lobbyControls?.updatePlayers(players);
  },
});

// ── Lobby overlay ─────────────────────────────────────────────────────────────
_lobbyControls = initLobby(app, {
  onCreate: (name) => createRoom(name),
  onJoin:   (code, name) => joinRoom(code, name),
  onReady:  () => setReady(),
});

// ── Dev mock harness (only in dev, alongside real network) ────────────────────
if (import.meta.env.DEV) initHarness(eventBus);

// ── Canvas interaction ────────────────────────────────────────────────────────
canvas.addEventListener('pointerup', (e) => {
  const { x, y } = _toNdc(e);
  handleTilePick({ x, y }, camera);
});

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
Object.assign(hud.style, {
  position:            'absolute',
  inset:               '0',
  pointerEvents:       'none',
  display:             'grid',
  gridTemplateColumns: '180px 1fr 180px',
  gridTemplateRows:    '1fr',
  padding:             '14px',
  gap:                 '0',
  boxSizing:           'border-box',
});

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

const hudLeft   = _makeColumn('flex-start');
const hudCenter = _makeColumn('space-between');
const hudRight  = _makeColumn('flex-start');

hud.appendChild(hudLeft);
hud.appendChild(hudCenter);
hud.appendChild(hudRight);

// ── HUD modules ───────────────────────────────────────────────────────────────
initLeaderboard(hudLeft);
initVoltage(hudLeft);

// Timer — top of center column
const timerWrap = document.createElement('div');
Object.assign(timerWrap.style, { display: 'flex', justifyContent: 'center', pointerEvents: 'none' });
hudCenter.appendChild(timerWrap);
initTimer(timerWrap, { onLock: lockIn });

// Tile hover info panel — middle of center column, shows on tile hover
const ZONE_INFO = {
  safe:     { label: 'SAFE ZONE',     range: '1.0× – 1.5×', risk: 'Low Risk',    color: '#00c9a7', icon: '◎' },
  charged:  { label: 'CHARGED ZONE',  range: '1.5× – 2.5×', risk: 'Medium Risk', color: '#f59e0b', icon: '⚡' },
  critical: { label: 'CRITICAL ZONE', range: '2.5× – 3.0×', risk: 'High Risk',   color: '#ef4444', icon: '☢' },
};

const tileInfoEl = document.createElement('div');
tileInfoEl.id = 'cs-tile-info';
Object.assign(tileInfoEl.style, {
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  justifyContent: 'center',
  flex:           '1',
  pointerEvents:  'none',
  opacity:        '0',
  transition:     'opacity 0.25s ease',
});
hudCenter.appendChild(tileInfoEl);

const tileInfoInner = document.createElement('div');
Object.assign(tileInfoInner.style, {
  background:     'rgba(6, 14, 28, 0.85)',
  backdropFilter: 'blur(10px)',
  border:         '1px solid rgba(0,201,167,0.25)',
  borderRadius:   '8px',
  padding:        '14px 22px',
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  gap:            '6px',
  minWidth:       '240px',
  textAlign:      'center',
  transition:     'border-color 0.25s',
});
tileInfoEl.appendChild(tileInfoInner);

tileInfoInner.innerHTML = `
  <div id="cs-ti-zone" style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;
       letter-spacing:0.12em;color:#00c9a7;text-shadow:0 0 10px #00c9a7;line-height:1.1"></div>
  <div id="cs-ti-range" style="font-family:'Share Tech Mono',monospace;font-size:15px;
       color:#e2e8f0;letter-spacing:0.06em"></div>
  <div id="cs-ti-risk" style="font-family:'Share Tech Mono',monospace;font-size:12px;
       color:#64748b;letter-spacing:0.1em;text-transform:uppercase"></div>
  <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:#475569;
       letter-spacing:0.08em;margin-top:2px;border-top:1px solid rgba(255,255,255,0.05);
       padding-top:6px;width:100%">Higher risk = bigger multiplier</div>
`;

const tiZoneEl  = tileInfoInner.querySelector('#cs-ti-zone');
const tiRangeEl = tileInfoInner.querySelector('#cs-ti-range');
const tiRiskEl  = tileInfoInner.querySelector('#cs-ti-risk');

setHoverCallback(({ zone }) => {
  if (!zone) {
    tileInfoEl.style.opacity = '0';
    return;
  }
  const info = ZONE_INFO[zone];
  tiZoneEl.textContent = `${info.icon}  ${info.label}`;
  tiZoneEl.style.color = info.color;
  tiZoneEl.style.textShadow = `0 0 10px ${info.color}`;
  tileInfoInner.style.borderColor = `${info.color}55`;
  tiRangeEl.textContent = info.range;
  tiRangeEl.style.color = info.color;
  tiRiskEl.textContent = info.risk;
  tiRiskEl.style.color = info.color;
  tileInfoEl.style.opacity = '1';
});

// Bet + Cashout — bottom of center column, side by side
const centerBottom = document.createElement('div');
centerBottom.id = 'cs-center-bottom';
Object.assign(centerBottom.style, {
  display:        'flex',
  flexDirection:  'row',
  gap:            '12px',
  alignItems:     'flex-end',
  pointerEvents:  'auto',
  justifyContent: 'center',
});
hudCenter.appendChild(centerBottom);

initBetInput(centerBottom);
initCashout(centerBottom, { getBet });

// Overview map — right column top
initOverview(hudRight);

// Results overlay — mounts over everything, shown on onRoundEnd
initResults(app);

// Game-start banner — drops from top with instructions on onRoundStart
initGameStartBanner(app);

// Bust overlay — full-screen red flash when local player busts
initBustOverlay(app);

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
