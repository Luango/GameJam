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
import { on } from './state/RenderBridge.js';

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

buildGrid(scene);
initPathTracer(scene);
initTokens(scene);

// ── Event bridge ──────────────────────────────────────────────────────────────
const eventBus = new EventTarget();
initBridge(eventBus);

// ── Game Orchestrator ─────────────────────────────────────────────────────────
let _lobbyControls = null;

initOrchestrator(eventBus, {
  onGameStart:     () => _lobbyControls?.hide(),
  onPlayersUpdate: (players) => _lobbyControls?.updatePlayers(players),
  onLobbyUpdate:   (players) => _lobbyControls?.updatePlayers(players),
});

_lobbyControls = initLobby(app, {
  onCreate: (name) => createRoom(name),
  onJoin:   (code, name) => joinRoom(code, name),
  onReady:  () => setReady(),
});

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

// ── HUD layout — left + center columns only (right column removed) ─────────────
Object.assign(hud.style, {
  position:            'absolute',
  inset:               '0',
  pointerEvents:       'none',
  display:             'grid',
  gridTemplateColumns: '180px 1fr',
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
const hudCenter = _makeColumn('flex-start');

hud.appendChild(hudLeft);
hud.appendChild(hudCenter);

// ── Left column ───────────────────────────────────────────────────────────────
initLeaderboard(hudLeft);
initVoltage(hudLeft);

// ── Center column: timer + tile hover info ────────────────────────────────────
const timerWrap = document.createElement('div');
Object.assign(timerWrap.style, { display: 'flex', justifyContent: 'center', pointerEvents: 'none' });
hudCenter.appendChild(timerWrap);
initTimer(timerWrap, { onLock: lockIn });

// Tile hover info — fades in when hovering a selectable tile
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
  background:     'rgba(6, 14, 28, 0.88)',
  backdropFilter: 'blur(10px)',
  border:         '1px solid rgba(0,201,167,0.25)',
  borderRadius:   '10px',
  padding:        '16px 24px',
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  gap:            '6px',
  minWidth:       '230px',
  textAlign:      'center',
  transition:     'border-color 0.25s',
});
tileInfoEl.appendChild(tileInfoInner);

tileInfoInner.innerHTML = `
  <div id="cs-ti-zone"  style="font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700;letter-spacing:0.1em;line-height:1.1"></div>
  <div id="cs-ti-range" style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;color:#e2e8f0"></div>
  <div id="cs-ti-risk"  style="font-family:'Rajdhani',sans-serif;font-size:16px;font-weight:600;text-transform:uppercase"></div>
  <div style="font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:600;color:#94a3b8;
       border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;margin-top:2px;width:100%">
    Higher risk = bigger multiplier
  </div>
`;

const tiZoneEl  = tileInfoInner.querySelector('#cs-ti-zone');
const tiRangeEl = tileInfoInner.querySelector('#cs-ti-range');
const tiRiskEl  = tileInfoInner.querySelector('#cs-ti-risk');

setHoverCallback(({ zone }) => {
  if (!zone) { tileInfoEl.style.opacity = '0'; return; }
  const info = ZONE_INFO[zone];
  tiZoneEl.textContent  = `${info.icon}  ${info.label}`;
  tiZoneEl.style.color  = info.color;
  tiZoneEl.style.textShadow = `0 0 10px ${info.color}`;
  tileInfoInner.style.borderColor = `${info.color}55`;
  tiRangeEl.textContent = info.range;
  tiRangeEl.style.color = info.color;
  tiRiskEl.textContent  = info.risk;
  tiRiskEl.style.color  = info.color;
  tileInfoEl.style.opacity = '1';
});

// ── Zone pill — fixed, center-bottom, shows current player zone ───────────────
// Sits just below the sphere so the player always knows what zone they're in.
const zonePill = document.createElement('div');
zonePill.id = 'cs-zone-pill';
Object.assign(zonePill.style, {
  position:       'fixed',
  bottom:         '22px',
  left:           '50%',
  transform:      'translateX(-50%)',
  display:        'flex',
  alignItems:     'center',
  gap:            '10px',
  background:     'rgba(6, 14, 28, 0.88)',
  backdropFilter: 'blur(10px)',
  border:         '1px solid rgba(0,201,167,0.35)',
  borderRadius:   '50px',
  padding:        '10px 24px',
  zIndex:         '150',
  pointerEvents:  'none',
  opacity:        '0',
  transition:     'opacity 0.3s, border-color 0.3s',
});

zonePill.innerHTML = `
  <div id="cs-zp-dot" style="width:10px;height:10px;border-radius:50%;background:#00c9a7;
       box-shadow:0 0 8px #00c9a7;flex-shrink:0"></div>
  <div id="cs-zp-label" style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;
       letter-spacing:0.12em;color:#00c9a7;text-shadow:0 0 10px #00c9a7"></div>
  <div id="cs-zp-mult" style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:600;
       color:#e2e8f0;letter-spacing:0.06em"></div>
`;
app.appendChild(zonePill);

const zpDot   = zonePill.querySelector('#cs-zp-dot');
const zpLabel = zonePill.querySelector('#cs-zp-label');
const zpMult  = zonePill.querySelector('#cs-zp-mult');

const ZONE_PILL_COLORS = { safe: '#00c9a7', charged: '#f59e0b', critical: '#ef4444' };
const ZONE_PILL_LABELS = { safe: 'SAFE ZONE', charged: 'CHARGED ZONE', critical: 'CRITICAL ZONE' };

on('onRoundStart', () => {
  _updateZonePill('safe', 1.0);
  zonePill.style.opacity = '1';
});
on('onReveal', ({ playerId, voltage, type }) => {
  if (playerId === getLocalPlayerId()) {
    const zone = type === 'safe' ? 'safe' : type === 'trap' ? 'critical' : 'charged';
    _updateZonePill(zone, voltage);
  }
});
on('onBust',    ({ playerId }) => { if (playerId === getLocalPlayerId()) zonePill.style.opacity = '0'; });
on('onCashout', ({ playerId }) => { if (playerId === getLocalPlayerId()) zonePill.style.opacity = '0'; });
on('onRoundEnd', () => { zonePill.style.opacity = '0'; });

function _updateZonePill(zone, voltage) {
  const color = ZONE_PILL_COLORS[zone] ?? '#00c9a7';
  zpDot.style.background  = color;
  zpDot.style.boxShadow   = `0 0 8px ${color}`;
  zpLabel.textContent     = ZONE_PILL_LABELS[zone] ?? 'SAFE ZONE';
  zpLabel.style.color     = color;
  zpLabel.style.textShadow = `0 0 10px ${color}`;
  zpMult.textContent      = `×${voltage.toFixed(1)}`;
  zonePill.style.borderColor = `${color}55`;
}

// ── Right-side panel: Bet (top) + Cashout (bottom) ────────────────────────────
const sidePanel = document.createElement('div');
sidePanel.id = 'cs-side-panel';
Object.assign(sidePanel.style, {
  position:       'fixed',
  right:          '20px',
  top:            '50%',
  transform:      'translateY(-50%)',
  width:          '280px',
  display:        'flex',
  flexDirection:  'column',
  gap:            '0',
  background:     'rgba(6, 14, 28, 0.92)',
  backdropFilter: 'blur(14px)',
  border:         '1px solid rgba(0, 201, 167, 0.30)',
  borderRadius:   '12px',
  boxShadow:      '0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,201,167,0.06)',
  zIndex:         '200',
  pointerEvents:  'auto',
  overflow:       'hidden',
});

// Strip individual panel backgrounds so they merge into the side panel shell
const sideOverride = document.createElement('style');
sideOverride.textContent = `
  #cs-side-panel #cs-bet,
  #cs-side-panel #cs-cashout {
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  #cs-side-panel #cs-bet {
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  }
`;
document.head.appendChild(sideOverride);

initBetInput(sidePanel);
initCashout(sidePanel, { getBet });
app.appendChild(sidePanel);

// Results + banners
initResults(app);
initGameStartBanner(app);
initBustOverlay(app);

// ── Current-position label (world-to-screen) ──────────────────────────────────
const _posLabel = document.createElement('div');
_posLabel.id = 'cs-pos-label';
_posLabel.textContent = 'CURRENT POS.';
Object.assign(_posLabel.style, {
  position:      'absolute',
  pointerEvents: 'none',
  fontFamily:    "'Rajdhani', sans-serif",
  fontSize:      '13px',
  fontWeight:    '600',
  letterSpacing: '0.1em',
  color:         '#38bdf8',
  textShadow:    '0 0 8px #38bdf8',
  background:    'rgba(6,14,28,0.75)',
  border:        '1px solid rgba(56,189,248,0.3)',
  borderRadius:  '4px',
  padding:       '3px 8px',
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
