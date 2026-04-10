import * as THREE from 'three';

// ── P1 board.js uses window.THREE (IcosahedronGeometry) — must be set first ──
window.THREE = THREE;

import { init, render, getScene, getCamera } from './renderer/SphereRenderer.js';
import { buildGrid, updateTiles, setHoverCallback } from './renderer/HexGrid.js';
import { initPathTracer }                     from './renderer/PathTracer.js';
import { initTokens, updateTokens, getTokenPositions } from './renderer/PlayerToken.js';
import { preloadAll as preloadModels } from './renderer/ModelLoader.js';
import {
  init as initBridge,
  handleTilePick,
  handleHover,
  getLocalHudSlot,
  on,
  resetMatchVisualsForLobby,
} from './state/RenderBridge.js';
import { initHarness } from './dev/MockEventHarness.js';
import { startMusic } from './audio/AudioManager.js';
import { initCosmos, updateCosmos } from './renderer/CosmosBackground.js';
import { init as initVoltage }             from './hud/VoltageDisplay.js';
import {
  init as initTimer,
  startBettingCountdown,
  stopBettingCountdown,
} from './hud/TurnTimer.js';
import { init as initCashout, lockIn }     from './hud/CashoutButton.js';
import {
  init as initLeaderboard,
  showBettingRoster,
  updateBettingRoster,
  clearBettingRoster,
} from './hud/Leaderboard.js';
import {
  init as initBetInput,
  enterBettingPhase,
  getBet,
  refreshBalance as refreshBetBalance,
} from './hud/BetInput.js';
import { init as initOverview, updateMap } from './hud/OverviewMap.js';
import { init as initLobby }               from './hud/LobbyOverlay.js';
import { init as initResults }             from './hud/ResultsOverlay.js';
import { init as initGameStartBanner }     from './hud/GameStartBanner.js';
import { init as initBetPhaseBanner }      from './hud/BetPhaseBanner.js';
import { init as initBustOverlay }         from './hud/BustOverlay.js';
import { init as initBustedSpectate }      from './hud/BustedSpectatePrompt.js';

import {
  init as initOrchestrator,
  createRoom, joinRoom, setReady,
  submitBet,
  submitModelPick,
  getLocalId,
  getPhase,
  getIsHost,
  getLocalBankroll,
  hostStartNewGame,
  leaveRoom,
  PHASE,
} from './p1bridge/GameOrchestrator.js';

const canvas = document.getElementById('canvas');
const hud    = document.getElementById('hud');
const app    = document.getElementById('app');

// ── Renderer ──────────────────────────────────────────────────────────────────
const { scene, camera } = init(canvas);

// ── 3D scene — Fibonacci grid shown in lobby; replaced by buildFromBoard on game start ──
initCosmos(scene);
buildGrid(scene);
initPathTracer(scene);
initTokens(scene);

// ── Preload character models (non-blocking) ──────────────────────────────────
preloadModels();

// ── Event bridge ──────────────────────────────────────────────────────────────
const eventBus = new EventTarget();
initBridge(eventBus);

// ── Game Orchestrator ─────────────────────────────────────────────────────────
let _lobbyControls = null;
let _resultsUI = null;
const _betPhaseBanner = initBetPhaseBanner(app);

initOrchestrator(eventBus, {
  onGameStart: () => {
    _betPhaseBanner.hide();
    stopBettingCountdown();
    clearBettingRoster();
    _lobbyControls?.hide();
  },
  onPlayersUpdate: (players) => _lobbyControls?.updatePlayers(players),
  onLobbyUpdate:   (players) => _lobbyControls?.updatePlayers(players),
  onBettingPhaseStart: ({ playerList, timerDeadline }) => {
    _lobbyControls?.hide();
    _betPhaseBanner.show();
    enterBettingPhase();
    refreshBetBalance();
    showBettingRoster(playerList, getLocalId());
    startBettingCountdown(timerDeadline);
  },
  onBettingPhaseUpdate: (playerList) => {
    updateBettingRoster(playerList);
    refreshBetBalance();
  },
  onBettingAbortedToLobby: () => {
    _betPhaseBanner.hide();
    stopBettingCountdown();
    clearBettingRoster();
    _lobbyControls?.show();
  },
  onModelClaimsUpdate: (claims, playerNames) => {
    _lobbyControls?.updateModelClaims(claims, playerNames);
  },
  onRematchLobby: () => {
    resetMatchVisualsForLobby();
    _resultsUI?.hide();
    _betPhaseBanner.hide();
    stopBettingCountdown();
    clearBettingRoster();
    _lobbyControls?.show();
  },
  onLeaveRoom: () => {
    resetMatchVisualsForLobby();
    _resultsUI?.hide();
    _lobbyControls?.resetToEntry();
  },
});

_lobbyControls = initLobby(app, {
  onCreate:    (name) => createRoom(name),
  onJoin:      (code, name) => joinRoom(code, name),
  onReady:     () => setReady(),
  onModelPick: (modelId) => submitModelPick(modelId),
});

if (import.meta.env.DEV) initHarness(eventBus);

// ── Background music — start on first interaction to satisfy autoplay policy ──
let _musicStarted = false;
function _ensureMusic() {
  if (_musicStarted) return;
  _musicStarted = true;
  startMusic();
}

// ── Canvas interaction ────────────────────────────────────────────────────────
canvas.addEventListener('pointerup', (e) => {
  _ensureMusic();
  const { x, y } = _toNdc(e);
  handleTilePick({ x, y }, camera);
});

let _hoverScheduled = false;
canvas.addEventListener('pointermove', (e) => {
  _ensureMusic();
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

// ── HUD layout — left + center only ──────────────────────────────────────────
Object.assign(hud.style, {
  position:            'absolute',
  inset:               '0',
  zIndex:              '330', // above BetPhaseBanner dimmer (320) so bet / leaderboard stay readable
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

// Unified Bet + Cashout shell in the left column
const betCashoutShell = document.createElement('div');
betCashoutShell.id = 'cs-bet-cashout-shell';
Object.assign(betCashoutShell.style, {
  display:        'flex',
  flexDirection:  'column',
  gap:            '0',
  background:     'rgba(6, 14, 28, 0.92)',
  backdropFilter: 'blur(14px)',
  border:         '1px solid rgba(0, 201, 167, 0.30)',
  borderRadius:   '12px',
  boxShadow:      '0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,201,167,0.06)',
  overflow:       'hidden',
  pointerEvents:  'auto',
});
hudLeft.appendChild(betCashoutShell);

const betCashoutOverride = document.createElement('style');
betCashoutOverride.textContent = `
  #cs-bet-cashout-shell #cs-bet,
  #cs-bet-cashout-shell #cs-cashout {
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  #cs-bet-cashout-shell #cs-bet {
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  }
`;
document.head.appendChild(betCashoutOverride);

initBetInput(betCashoutShell, {
  submitBet: (amt) => submitBet(amt),
  isBettingPhase: () => getPhase() === PHASE.BETTING,
  getBankroll: () => getLocalBankroll(),
});
initCashout(betCashoutShell, { getBet });

// ── Timer — fixed top-center of viewport (truly centered, not inside grid column) ──
const timerWrap = document.createElement('div');
Object.assign(timerWrap.style, {
  position:      'fixed',
  top:           '14px',
  left:          '50%',
  transform:     'translateX(-50%)',
  display:       'flex',
  justifyContent:'center',
  pointerEvents: 'none',
  zIndex:        '340',
});
app.appendChild(timerWrap);
initTimer(timerWrap, { onLock: lockIn });

// ── Idle strikes — host counts turn-timer timeouts; bar syncs via onIdleStrikes ──
const IDLE_MAX = 3;
let _idleStreak = 0;

const idleBarWrap = document.createElement('div');
idleBarWrap.id = 'cs-idle-bar';
Object.assign(idleBarWrap.style, {
  position:       'fixed',
  top:            '138px',       // just below the timer panel
  left:           '50%',
  transform:      'translateX(-50%)',
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  gap:            '5px',
  background:     'rgba(6,14,28,0.88)',
  backdropFilter: 'blur(10px)',
  border:         '1px solid rgba(255,255,255,0.08)',
  borderRadius:   '8px',
  padding:        '7px 14px',
  zIndex:         '340',
  pointerEvents:  'none',
  opacity:        '0',
  transition:     'opacity 0.3s',
  minWidth:       '160px',
});
idleBarWrap.innerHTML = `
  <div id="cs-idle-label" style="
    font-family:'Rajdhani',sans-serif;font-size:10px;font-weight:700;
    letter-spacing:0.18em;text-transform:uppercase;color:#f59e0b;text-align:center">
    IDLE BUST RISK
  </div>
  <div style="display:flex;gap:5px;justify-content:center">
    <div class="cs-idle-pip" data-pip="1"></div>
    <div class="cs-idle-pip" data-pip="2"></div>
    <div class="cs-idle-pip" data-pip="3"></div>
  </div>
  <div id="cs-idle-warn" style="
    font-family:'Rajdhani',sans-serif;font-size:10px;font-weight:600;
    color:#94a3b8;text-align:center;letter-spacing:0.06em">
    LET TURN TIMER EXPIRE 3× WITHOUT MOVING → BUST
  </div>
`;

const idlePipStyle = document.createElement('style');
idlePipStyle.textContent = `
  .cs-idle-pip {
    width: 32px; height: 8px; border-radius: 4px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    transition: background 0.3s, box-shadow 0.3s;
  }
  .cs-idle-pip.active-1 { background:#f59e0b; box-shadow:0 0 6px #f59e0b; border-color:#f59e0b; }
  .cs-idle-pip.active-2 { background:#f97316; box-shadow:0 0 6px #f97316; border-color:#f97316; }
  .cs-idle-pip.active-3 { background:#ef4444; box-shadow:0 0 8px #ef4444; border-color:#ef4444; }
`;
document.head.appendChild(idlePipStyle);
app.appendChild(idleBarWrap);

const _idlePips  = idleBarWrap.querySelectorAll('.cs-idle-pip');
const _idleLabel = idleBarWrap.querySelector('#cs-idle-label');
const _idleWarn  = idleBarWrap.querySelector('#cs-idle-warn');

function _updateIdleBar() {
  _idlePips.forEach((pip, i) => {
    pip.className = 'cs-idle-pip';
    if (i < _idleStreak) pip.classList.add(`active-${_idleStreak}`);
  });
  if (_idleStreak === 0) {
    _idleWarn.textContent = 'LET TURN TIMER EXPIRE 3× WITHOUT MOVING → BUST';
    _idleWarn.style.color = '#94a3b8';
    _idleLabel.style.color = '#f59e0b';
  } else if (_idleStreak === 1) {
    _idleWarn.textContent = '2 MORE IDLE TURNS → BUST';
    _idleWarn.style.color = '#f59e0b';
    _idleLabel.style.color = '#f59e0b';
  } else if (_idleStreak === 2) {
    _idleWarn.textContent = '1 MORE IDLE TURN → BUST!';
    _idleWarn.style.color = '#f97316';
    _idleLabel.style.color = '#f97316';
  }
}

on('onRoundStart', () => {
  _idleStreak = 0;
  idleBarWrap.style.opacity = '0';
  _updateIdleBar();
});

on('onIdleStrikes', ({ count }) => {
  _idleStreak = Math.min(Math.max(0, count | 0), IDLE_MAX);
  idleBarWrap.style.opacity = _idleStreak > 0 ? '1' : '0';
  _updateIdleBar();
});

on('onBust', ({ playerId }) => {
  if (playerId === getLocalHudSlot()) {
    _idleStreak = 0;
    idleBarWrap.style.opacity = '0';
    _updateIdleBar();
  }
});

on('onCashout', ({ playerId }) => {
  if (playerId === getLocalHudSlot()) {
    _idleStreak = 0;
    idleBarWrap.style.opacity = '0';
    _updateIdleBar();
  }
});

// Tile hover info panel
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
  minWidth:       '200px',
  textAlign:      'center',
  transition:     'border-color 0.25s',
});
tileInfoEl.appendChild(tileInfoInner);

tileInfoInner.innerHTML = `
  <div id="cs-ti-zone"  style="font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;letter-spacing:0.1em;line-height:1.1"></div>
  <div id="cs-ti-range" style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#e2e8f0"></div>
  <div id="cs-ti-risk"  style="font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;text-transform:uppercase"></div>
  <div style="font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;color:#94a3b8;
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

// (Overview mounted inside sidePanel below)

// ── Zone pill — fixed center-bottom, shows current player zone ────────────────
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
  if (playerId === getLocalHudSlot()) {
    const zone = type === 'safe' ? 'safe' : type === 'trap' ? 'critical' : 'charged';
    _updateZonePill(zone, voltage);
  }
});
on('onBust',    ({ playerId }) => { if (playerId === getLocalHudSlot()) zonePill.style.opacity = '0'; });
on('onCashout', ({ playerId }) => { if (playerId === getLocalHudSlot()) zonePill.style.opacity = '0'; });
on('onRoundEnd', () => { zonePill.style.opacity = '0'; });

function _updateZonePill(zone, voltage) {
  const color = ZONE_PILL_COLORS[zone] ?? '#00c9a7';
  zpDot.style.background   = color;
  zpDot.style.boxShadow    = `0 0 8px ${color}`;
  zpLabel.textContent      = ZONE_PILL_LABELS[zone] ?? 'SAFE ZONE';
  zpLabel.style.color      = color;
  zpLabel.style.textShadow = `0 0 10px ${color}`;
  zpMult.textContent       = `×${voltage.toFixed(1)}`;
  zonePill.style.borderColor = `${color}55`;
}

// ── Right-side panel: Overview (top) + Voltage scale (bottom), unified ───────
const sidePanel = document.createElement('div');
sidePanel.id = 'cs-side-panel';
Object.assign(sidePanel.style, {
  position:       'fixed',
  right:          '14px',
  top:            '14px',
  width:          '200px',
  display:        'flex',
  flexDirection:  'column',
  gap:            '0',
  background:     'rgba(6, 14, 28, 0.92)',
  backdropFilter: 'blur(14px)',
  border:         '1px solid rgba(0, 201, 167, 0.30)',
  borderRadius:   '12px',
  boxShadow:      '0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,201,167,0.06)',
  zIndex:         '330',
  pointerEvents:  'none',
  overflow:       'hidden',
});

const sideOverride = document.createElement('style');
sideOverride.textContent = `
  #cs-side-panel #cs-overview,
  #cs-side-panel #cs-voltage {
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  #cs-side-panel #cs-overview {
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  }
`;
document.head.appendChild(sideOverride);

initOverview(sidePanel);
initVoltage(sidePanel);
app.appendChild(sidePanel);

// ── Overlays ──────────────────────────────────────────────────────────────────
_resultsUI = initResults(app, {
  getIsHost,
  onHostStartNewGame: () => hostStartNewGame(),
  onLeaveRoom: () => leaveRoom(),
});
initGameStartBanner(app);
initBustOverlay(app);

const SPECTATE_AFTER_BUST_MS = 3600;
let _spectatePromptTimer = null;
const _bustedSpectate = initBustedSpectate(app, {
  onSpectate: () => {},
  onLeave: () => leaveRoom(),
});

on('onBust', ({ playerId }) => {
  if (playerId !== getLocalHudSlot()) return;
  clearTimeout(_spectatePromptTimer);
  _spectatePromptTimer = setTimeout(() => {
    if (getPhase() === PHASE.PLAYING) _bustedSpectate.show();
  }, SPECTATE_AFTER_BUST_MS);
});

on('onRoundEnd', () => {
  clearTimeout(_spectatePromptTimer);
  _bustedSpectate.hide();
});

on('onRoundStart', () => {
  clearTimeout(_spectatePromptTimer);
  _bustedSpectate.hide();
});

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
  const localSlot = getLocalHudSlot();
  const localPos  = positions.get(localSlot);
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
  updateCosmos();
  updateTiles(now);
  updateTokens(now);
  updateMap();
  _updatePosLabel();
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
