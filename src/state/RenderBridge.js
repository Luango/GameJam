import { EVENTS, ACTIONS } from '../constants/gameState.js';
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

const _callbacks = {
  onReveal: [], onBust: [], onCashout: [],
  onRoundEnd: [], onRoundStart: [], onTimerSync: [],
};

// Last known tile per player
const _lastTile = new Map();

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
