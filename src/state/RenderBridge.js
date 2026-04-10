import { EVENTS, ACTIONS } from '../constants/gameState.js';
import { playSound, playAnnouncement, SFX } from '../audio/AudioManager.js';
import {
  setTileState, resetGrid, pickTile,
  setSelectableTiles, clearSelectables,
  setHoveredTile, setSelectedTile, isSelectable,
  getAdjacentTileIds, getTileIdsByZone, getTilePosition,
  spawnSparks,
} from '../renderer/HexGrid.js';
import { spawnToken, moveToken, bustToken, clearAllTokens, setPlayerModel, clearModelAssignments } from '../renderer/PlayerToken.js';
import { addPathSegment, clearAllPaths } from '../renderer/PathTracer.js';
import { focusOnPosition, stopAutoRotate, resumeAutoRotate } from '../renderer/SphereRenderer.js';

// RenderBridge — the ONLY file in P2 that reads P1 events or emits P1 actions.

/** Move phase length (seconds); keep in sync with GameOrchestrator MOVE_TIMER_MS. */
const MOVE_TIMER_SEC = 30;

let _bus           = null;
let _localPlayerId = 0;
/** HUD / token slot (0–3); distinct from PeerJS id in P1 mode. */
let _localHudSlot  = 0;
let _playerCount   = 2;
let _roundActive   = false;
let _localBusted   = false;
let _lastHoveredSelectableTile = -1;

const _callbacks = {
  onReveal: [], onBust: [], onCashout: [],
  onRoundEnd: [], onRoundStart: [], onTimerSync: [],
  onIdleStrikes: [],
  onLocalMoveTurn: [], onPlayTurn: [],
};

// Last known tile per player (keyed by playerId string in P1 mode, number in dev mode)
const _lastTile = new Map();

// P1 mode: maps string playerId → slot index (0-3) for token/path colour
const _playerSlots = new Map();

// ─── Init ─────────────────────────────────────────────────────────────────────

export function init(eventBus) {
  _bus = eventBus;
  _bus.addEventListener(EVENTS.onRoundStart, (e) => _handleRoundStart(e.detail));
  _bus.addEventListener(EVENTS.onReveal,     (e) => _handleReveal(e.detail));
  _bus.addEventListener(EVENTS.onBust,       (e) => _handleBust(e.detail));
  _bus.addEventListener(EVENTS.onCashout,    (e) => _handleCashout(e.detail));
  _bus.addEventListener(EVENTS.onRoundEnd,   (e) => _handleRoundEnd(e.detail));
  _bus.addEventListener(EVENTS.onTimerSync,  (e) => _handleTimerSync(e.detail));
}

// ─── HUD callbacks ────────────────────────────────────────────────────────────

export function on(event, cb) {
  if (_callbacks[event]) _callbacks[event].push(cb);
}

function _notify(event, payload) {
  _callbacks[event]?.forEach((cb) => cb(payload));
}

// ─── Emit to P1 ───────────────────────────────────────────────────────────────

export function emit(action, payload = {}) {
  if (!_bus) return;
  _bus.dispatchEvent(new CustomEvent(action, { detail: payload }));
}

export function getLocalPlayerId() { return _localPlayerId; }

/** Use for HUD callbacks where playerId is a numeric slot (onReveal, onBust, …). */
export function getLocalHudSlot() { return _localHudSlot; }

// ─── Tile picking & hover (wired in main.js) ─────────────────────────────────

/**
 * Called on canvas pointerup. Only allows picking selectable tiles.
 */
export function handleTilePick(ndcPoint, camera) {
  if (!_roundActive || _localBusted) return;
  const tileId = pickTile(ndcPoint, camera);
  if (tileId === -1) return;
  if (!isSelectable(tileId)) return; // must be an adjacent tile
  setSelectedTile(tileId);
  playSound(SFX.LOCK_IN);   // local only
  spawnSparks(tileId);       // local only
  emit(ACTIONS.MOVE_SELECTED, { tileId });
}

/**
 * Called on canvas pointermove (throttled in main.js).
 */
export function handleHover(ndcPoint, camera) {
  if (!_roundActive) return;
  const tileId = pickTile(ndcPoint, camera);
  setHoveredTile(tileId);
  if (tileId !== -1 && !_localBusted && isSelectable(tileId)) {
    if (tileId !== _lastHoveredSelectableTile) {
      _lastHoveredSelectableTile = tileId;
      playSound(SFX.HOVER);
    }
  } else {
    _lastHoveredSelectableTile = -1;
  }
}

// ─── Event handlers ───────────────────────────────────────────────────────────

function _handleRoundStart({ boardSeed, playerCount = 2, timerDuration = 30, localPlayerId = 0 }) {
  _localPlayerId = localPlayerId;
  _localHudSlot  = localPlayerId;
  _playerCount   = playerCount;
  _roundActive   = true;
  _localBusted   = false;

  resetGrid();
  clearAllPaths();
  clearAllTokens();
  _lastTile.clear(); // clear AFTER renderer reset, BEFORE spawning so _refreshSelectables works

  // Spawn all players on SAFE zone tiles (rule: game starts on safe zone)
  const safeTiles = getTileIdsByZone('safe');
  for (let i = 0; i < playerCount; i++) {
    const startTile = _pickStartTile(safeTiles, boardSeed, i, playerCount);
    spawnToken(i, startTile);
    _lastTile.set(i, startTile);
  }

  // Focus camera on local player's starting tile and stop auto-rotate
  const localStart = _lastTile.get(localPlayerId);
  if (localStart !== undefined) {
    const pos = getTilePosition(localStart);
    focusOnPosition(pos);
    stopAutoRotate();
  }

  // Show adjacent selectable tiles for local player immediately
  _refreshSelectables(localPlayerId);

  _notify('onRoundStart', { boardSeed, playerCount, timerDuration, localPlayerId });

  const canStep = !_localBusted;
  _notify('onPlayTurn', { canStep, spectating: _localBusted });
  if (canStep) {
    playSound(SFX.TURN_START); // local only — it's this player's action turn
    _flashScreen();
    _notify('onLocalMoveTurn', {});
  }
}

function _handleReveal({ tileId, type, playerId, voltage }) {
  const state = type === 'safe' ? 'revealed-safe'
              : type === 'trap' ? 'revealed-trap'
              : 'reward';

  setTileState(tileId, state);

  // Reveal SFX — plays locally on all clients as the event fires
  if (type === 'safe')   playSound(SFX.SAFE_REVEAL);
  else if (type === 'reward') playSound(SFX.REWARD_REVEAL);
  else                   playSound(SFX.TRAP_REVEAL);

  const prev = _lastTile.get(playerId);
  if (prev !== undefined && prev !== tileId) {
    addPathSegment(playerId, prev, tileId);
  }
  moveToken(playerId, tileId);
  _lastTile.set(playerId, tileId);

  if (playerId === _localPlayerId) {
    // Local player just moved — refresh their selectable neighbours
    _refreshSelectables(playerId);
    stopAutoRotate();
    focusOnPosition(getTilePosition(tileId));
  } else {
    // Another player moved — briefly focus on them, then let user control
    focusOnPosition(getTilePosition(tileId));
    resumeAutoRotate();
  }

  _notify('onReveal', { tileId, type, playerId, voltage });
}

function _handleBust({ playerId }) {
  bustToken(playerId);
  if (playerId === _localPlayerId) {
    _localBusted = true;
    clearSelectables();
    resumeAutoRotate();
  }
  _notify('onBust', { playerId });
}

function _handleCashout({ playerId, voltage }) {
  playAnnouncement(SFX.CASH_OUT); // plays for all clients
  if (playerId === _localPlayerId) {
    clearSelectables();
    resumeAutoRotate();
  }
  _notify('onCashout', { playerId, voltage });
}

function _handleRoundEnd({ results, matchNumber }) {
  _roundActive = false;
  clearSelectables();
  resumeAutoRotate();
  _notify('onRoundEnd', { results, matchNumber: matchNumber ?? 1 });
}

function _handleTimerSync({ remaining }) {
  _notify('onTimerSync', { remaining });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Brief white breath flash — signals the start of the local player's action turn.
 * Creates (or reuses) a fixed overlay div, snaps it to semi-opaque white, then
 * fades it out via CSS transition.
 */
let _flashEl = null;
function _flashScreen() {
  if (!_flashEl) {
    _flashEl = document.createElement('div');
    Object.assign(_flashEl.style, {
      position: 'fixed',
      inset: '0',
      background: 'white',
      pointerEvents: 'none',
      opacity: '0',
      zIndex: '9998',
    });
    document.body.appendChild(_flashEl);
  }
  // Gentle breath: soft fade-in to a low peak, then a slow fade-out
  _flashEl.style.transition = 'opacity 0.4s ease-in';
  _flashEl.style.opacity = '0.15';
  setTimeout(() => {
    _flashEl.style.transition = 'opacity 1.1s ease-out';
    _flashEl.style.opacity = '0';
  }, 400);
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
const _CONFETTI_COLORS = [
  '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4',
  '#45B7D1', '#A78BFA', '#F472B6', '#86EFAC',
];

function _spawnConfetti() {
  // Inject keyframes once
  if (!document.getElementById('cs-confetti-style')) {
    const s = document.createElement('style');
    s.id = 'cs-confetti-style';
    s.textContent = `
      @keyframes cs-confetti-fall {
        0%   { transform: translateY(-10px) rotate(0deg)   scaleX(1);   opacity: 1; }
        50%  { scaleX(-1); }
        100% { transform: translateY(105vh) rotate(780deg) scaleX(-1);  opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }

  const wrap = document.createElement('div');
  Object.assign(wrap.style, {
    position: 'fixed', inset: '0',
    pointerEvents: 'none', zIndex: '9997', overflow: 'hidden',
  });
  document.body.appendChild(wrap);

  for (let i = 0; i < 90; i++) {
    const el = document.createElement('div');
    const w  = 5 + Math.random() * 7;
    const h  = Math.random() > 0.45 ? w : w * 0.35; // mix squares + ribbons
    const dur   = 1.4 + Math.random() * 1.4;
    const delay = Math.random() * 0.6;
    const color = _CONFETTI_COLORS[Math.floor(Math.random() * _CONFETTI_COLORS.length)];
    Object.assign(el.style, {
      position:     'absolute',
      top:          '-12px',
      left:         `${Math.random() * 100}%`,
      width:        `${w}px`,
      height:       `${h}px`,
      background:   color,
      borderRadius: h === w ? '2px' : '1px',
      animation:    `cs-confetti-fall ${dur}s ease-in ${delay}s forwards`,
    });
    wrap.appendChild(el);
  }

  setTimeout(() => wrap.remove(), 3600);
}

/** Show selectable (adjacent) tiles for a player. */
function _refreshSelectables(playerId) {
  const tileId = _lastTile.get(playerId);
  if (tileId === undefined) return;
  const adjacent = getAdjacentTileIds(tileId);
  setSelectableTiles(adjacent);
}

/**
 * Pick a starting tile from the safe zone, spreading players evenly.
 * Players always start in the safe zone (|lat| < 30°).
 */
function _pickStartTile(safeTiles, seed, playerIndex, playerCount) {
  if (!safeTiles.length) return playerIndex * 20; // fallback
  const spread = Math.floor(safeTiles.length / playerCount);
  return safeTiles[(seed + playerIndex * spread) % safeTiles.length];
}

// ─── Direct P1 Integration Methods ───────────────────────────────────────────
// Called by GameOrchestrator when real network messages arrive.
// These bypass the dev event bus and drive the same underlying renderer state.

/**
 * Called by GameOrchestrator once the board is built and game starts.
 * @param {Array<{id:string, name:string, color:string, startTileId:number}>} playerOrder
 * @param {string} localId  — this client's PeerJS/player ID
 * @param {Record<string, number>} [bets]  — peerId → wager (authoritative for HUD)
 */
export function handleP1RoundStart(playerOrder, localId, bets = {}, modelAssignments = {}) {
  _localPlayerId = localId;
  _playerCount   = playerOrder.length;
  _roundActive   = true;
  _localBusted   = false;
  _playerSlots.clear();

  resetGrid();
  clearAllPaths();
  clearAllTokens();
  clearModelAssignments();
  _lastTile.clear(); // clear AFTER renderer reset, BEFORE spawning

  // Apply model assignments: map playerId → slot, then set model per slot
  playerOrder.forEach((p, slot) => {
    _playerSlots.set(p.id, slot);
    if (modelAssignments[p.id]) {
      setPlayerModel(slot, modelAssignments[p.id]);
    }
  });

  // Assign slots and spawn tokens
  playerOrder.forEach((p, slot) => {
    _lastTile.set(p.id, p.startTileId);
    spawnToken(slot, p.startTileId);
  });

  // Focus on local player's starting position
  const localSlot = _playerSlots.get(localId) ?? 0;
  _localHudSlot = localSlot;
  const localEntry = playerOrder.find((p) => p.id === localId);
  if (localEntry != null) {
    focusOnPosition(getTilePosition(localEntry.startTileId));
    stopAutoRotate();
  }

  // Notify HUDs — use slot index as playerId; include name/color per slot
  const players = playerOrder.map((p, slot) => ({
    playerId: slot,
    name:     p.name ?? `P${slot}`,
    color:    p.color ?? null,
  }));
  const betAmount = bets[localId] ?? 0;
  const timerSec = MOVE_TIMER_SEC;
  _notify('onRoundStart', {
    playerCount: playerOrder.length,
    localPlayerId: localSlot,
    players,
    betAmount,
    timerDuration: timerSec,
  });
}

/**
 * Called by GameOrchestrator on MSG.TURN_BEGIN.
 * @param {number[]} validMoves       — tile IDs the local player may step to
 * @param {number}   timerDeadline    — Date.now() ms when the turn timer expires
 */
export function handleP1TurnBegin(validMoves, timerDeadline) {
  clearSelectables();

  if (!_localBusted && validMoves.length > 0) {
    setSelectableTiles(validMoves);
    stopAutoRotate();
  }

  // Sync the turn timer — remaining time accounts for any latency
  const remaining = Math.max(0, (timerDeadline - Date.now()) / 1000);
  _notify('onTimerSync', { remaining });

  const canStep = validMoves.length > 0 && !_localBusted;
  _notify('onPlayTurn', { canStep, spectating: _localBusted });
  if (canStep) {
    playSound(SFX.TURN_START); // local only — it's this player's action turn
    _flashScreen();
    _notify('onLocalMoveTurn', {});
  }
}

/**
 * Called by GameOrchestrator on MSG.TURN_REVEAL.
 * @param {object[]} results            — per-player turn results from TurnManager
 * @param {object[]} newlyRevealedTiles — [{id, tileState}]
 */
export function handleP1TurnReveal(results, newlyRevealedTiles) {
  // 1. Reveal tile visuals + reveal SFX (plays locally on all clients)
  for (const t of newlyRevealedTiles) {
    const state =
      t.tileState === 'trap'   ? 'revealed-trap' :
      t.tileState === 'reward' ? 'reward'         :
                                 'revealed-safe';
    setTileState(t.id, state);

    if (state === 'revealed-safe') playSound(SFX.SAFE_REVEAL);
    else if (state === 'reward')   playSound(SFX.REWARD_REVEAL);
    else                           playSound(SFX.TRAP_REVEAL);
  }

  // 2. Process per-player results — normalise playerId to slot index for HUD maps
  for (const result of results) {
    const { playerId, action, tileId, tileState, totalVoltage, status, idleStrikes } = result;
    // slot is the numeric index HUDs use; fall back to 0 in dev/mock mode where
    // _playerSlots is empty and playerId is already a number
    const slot = _playerSlots.size > 0
      ? (_playerSlots.get(playerId) ?? 0)
      : (typeof playerId === 'number' ? playerId : 0);

    if (action === 'step' && tileId != null) {
      const prev = _lastTile.get(playerId);
      if (prev !== undefined && prev !== tileId) {
        addPathSegment(slot, prev, tileId);
      }
      moveToken(slot, tileId);
      _lastTile.set(playerId, tileId);

      // Notify HUD with slot as playerId so HUD maps find the entry
      _notify('onReveal', {
        tileId,
        type:     tileState === 'trap' ? 'trap' : tileState === 'reward' ? 'reward' : 'safe',
        playerId: slot,
        voltage:  totalVoltage,
      });
    }

    if (status === 'busted') {
      bustToken(slot);
      playAnnouncement(SFX.BUST); // announcement — plays on every client
      if (playerId === _localPlayerId) {
        _localBusted = true;
        clearSelectables();
        resumeAutoRotate();
      }
      _notify('onBust', { playerId: slot });
    } else if (status === 'cashed_out') {
      playAnnouncement(SFX.CASH_OUT); // announcement — plays on every client
      if (playerId === _localPlayerId) {
        clearSelectables();
        resumeAutoRotate();
      }
      _notify('onCashout', { playerId: slot, voltage: totalVoltage });
    }

    if (action === 'timeout' && playerId === _localPlayerId && idleStrikes != null) {
      _notify('onIdleStrikes', { count: idleStrikes });
    }

    // Focus camera on local player's move
    if (playerId === _localPlayerId && tileId != null) {
      focusOnPosition(getTilePosition(tileId));
    }
  }

  // Selectables are reset — GameOrchestrator restores them on next TURN_BEGIN
  clearSelectables();
}

/**
 * Called by GameOrchestrator on MSG.ROUND_END.
 * @param {object[]} results    — final per-player results
 * @param {object[]} leaderboard
 */
/**
 * Tear down board/tokens between matches (lobby / rematch).
 */
export function resetMatchVisualsForLobby() {
  _roundActive = false;
  _localBusted = false;
  clearSelectables();
  resumeAutoRotate();
  resetGrid();
  clearAllPaths();
  clearAllTokens();
  _lastTile.clear();
  _playerSlots.clear();
}

export function handleP1RoundEnd(results, leaderboard, matchNumber = 1) {
  _roundActive = false;
  clearSelectables();
  resumeAutoRotate();

  // Normalise P1 result shape → HUD-expected shape
  // P1:  { id, name, color, finalVoltage, status:'busted'|'cashed_out'|'forfeited', payout }
  // HUD: { playerId (slot), name, voltage, status:'active'|'bust'|'cashout', payout }
  const STATUS_MAP = { busted: 'bust', cashed_out: 'cashout', forfeited: 'bust', active: 'active' };

  const normResults = (results ?? []).map((r) => {
    const slot = _playerSlots.size > 0
      ? (_playerSlots.get(r.id) ?? 0)
      : (typeof r.id === 'number' ? r.id : 0);
    return {
      playerId: slot,
      name:     r.name ?? `P${slot}`,
      voltage:  r.finalVoltage ?? r.voltage ?? 1.0,
      status:   STATUS_MAP[r.status] ?? r.status ?? 'bust',
      payout:   r.payout ?? 0,
    };
  });

  _notify('onRoundEnd', { results: normResults, leaderboard, matchNumber });
}
