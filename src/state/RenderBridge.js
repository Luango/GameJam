import { EVENTS, ACTIONS } from '../constants/gameState.js';
import { playSound } from '../audio/AudioManager.js';
import {
  setTileState, resetGrid, pickTile,
  setSelectableTiles, clearSelectables,
  setHoveredTile, setSelectedTile, isSelectable,
  getAdjacentTileIds, getTileIdsByZone, getTilePosition,
} from '../renderer/HexGrid.js';
import { spawnToken, moveToken, bustToken, clearAllTokens } from '../renderer/PlayerToken.js';
import { addPathSegment, clearAllPaths } from '../renderer/PathTracer.js';
import { focusOnPosition, stopAutoRotate, resumeAutoRotate } from '../renderer/SphereRenderer.js';

// RenderBridge — the ONLY file in P2 that reads P1 events or emits P1 actions.

let _bus           = null;
let _localPlayerId = 0;
let _playerCount   = 2;
let _roundActive   = false;
let _localBusted   = false;
let _lastHoveredSelectableTile = -1;

const _callbacks = {
  onReveal: [], onBust: [], onCashout: [],
  onRoundEnd: [], onRoundStart: [], onTimerSync: [],
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
      playSound('assets/sfx/Hover select tile.mp3');
    }
  } else {
    _lastHoveredSelectableTile = -1;
  }
}

// ─── Event handlers ───────────────────────────────────────────────────────────

function _handleRoundStart({ boardSeed, playerCount = 2, timerDuration = 30, localPlayerId = 0 }) {
  _localPlayerId = localPlayerId;
  _playerCount   = playerCount;
  _roundActive   = true;
  _localBusted   = false;
  _lastTile.clear();

  resetGrid();
  clearAllPaths();
  clearAllTokens();

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
}

function _handleReveal({ tileId, type, playerId, voltage }) {
  const state = type === 'safe' ? 'revealed-safe'
              : type === 'trap' ? 'revealed-trap'
              : 'reward';

  setTileState(tileId, state);

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
  if (playerId === _localPlayerId) {
    clearSelectables();
    resumeAutoRotate();
  }
  _notify('onCashout', { playerId, voltage });
}

function _handleRoundEnd({ results }) {
  _roundActive = false;
  clearSelectables();
  resumeAutoRotate();
  _notify('onRoundEnd', { results });
}

function _handleTimerSync({ remaining }) {
  _notify('onTimerSync', { remaining });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
 */
export function handleP1RoundStart(playerOrder, localId) {
  _localPlayerId = localId;
  _playerCount   = playerOrder.length;
  _roundActive   = true;
  _localBusted   = false;
  _lastTile.clear();
  _playerSlots.clear();

  resetGrid();
  clearAllPaths();
  clearAllTokens();

  // Assign slots and spawn tokens
  playerOrder.forEach((p, slot) => {
    _playerSlots.set(p.id, slot);
    _lastTile.set(p.id, p.startTileId);
    spawnToken(slot, p.startTileId);
  });

  // Focus on local player's starting position
  const localSlot = _playerSlots.get(localId) ?? 0;
  const localEntry = playerOrder.find((p) => p.id === localId);
  if (localEntry != null) {
    focusOnPosition(getTilePosition(localEntry.startTileId));
    stopAutoRotate();
  }

  // Notify HUDs — use slot index as playerId for consistent HUD map keys
  _notify('onRoundStart', { playerCount: playerOrder.length, localPlayerId: localSlot });
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
  _notify('onTimerSync', { remaining: Math.max(0, timerDeadline - Date.now()) });
}

/**
 * Called by GameOrchestrator on MSG.TURN_REVEAL.
 * @param {object[]} results            — per-player turn results from TurnManager
 * @param {object[]} newlyRevealedTiles — [{id, tileState}]
 */
export function handleP1TurnReveal(results, newlyRevealedTiles) {
  // 1. Reveal tile visuals
  for (const t of newlyRevealedTiles) {
    const state =
      t.tileState === 'trap'   ? 'revealed-trap' :
      t.tileState === 'reward' ? 'reward'         :
                                 'revealed-safe';
    setTileState(t.id, state);
  }

  // 2. Process per-player results — normalise playerId to slot index for HUD maps
  for (const result of results) {
    const { playerId, action, tileId, tileState, totalVoltage, status } = result;
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
      if (playerId === _localPlayerId) {
        _localBusted = true;
        clearSelectables();
        resumeAutoRotate();
      }
      _notify('onBust', { playerId: slot });
    } else if (status === 'cashed_out') {
      if (playerId === _localPlayerId) {
        clearSelectables();
        resumeAutoRotate();
      }
      _notify('onCashout', { playerId: slot, voltage: totalVoltage });
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
export function handleP1RoundEnd(results, leaderboard) {
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

  _notify('onRoundEnd', { results: normResults, leaderboard });
}
