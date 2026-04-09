import { EVENTS, ACTIONS } from '../constants/gameState.js';
import { setTileState, resetGrid, pickTile } from '../renderer/HexGrid.js';
import { spawnToken, moveToken, bustToken, clearAllTokens } from '../renderer/PlayerToken.js';
import { addPathSegment, clearAllPaths } from '../renderer/PathTracer.js';

// RenderBridge — the ONLY file in P2 that reads P1 events or emits P1 actions.
// All other P2 files that need game-state changes must go through callbacks
// registered here, never by reading the event bus directly.
//
// Event bus contract: native EventTarget.
//   P1 dispatches: new CustomEvent(EVENTS.onReveal, { detail: payload })
//   P2 dispatches: new CustomEvent(ACTIONS.CASHOUT, { detail: payload })

let _bus = null;
let _localPlayerId = 0;

// Callbacks registered by HUD modules (Phase 3)
const _callbacks = {
  onReveal:     [],
  onBust:       [],
  onCashout:    [],
  onRoundEnd:   [],
  onRoundStart: [],
  onTimerSync:  [],
};

// Last known tile per player for path tracing
const _lastTile = new Map();

// ─── Init ────────────────────────────────────────────────────────────────────

/**
 * @param {EventTarget} eventBus   — shared bus, also used by P1 and MockEventHarness
 */
export function init(eventBus) {
  _bus = eventBus;

  _bus.addEventListener(EVENTS.onRoundStart, (e) => _handleRoundStart(e.detail));
  _bus.addEventListener(EVENTS.onReveal,     (e) => _handleReveal(e.detail));
  _bus.addEventListener(EVENTS.onBust,       (e) => _handleBust(e.detail));
  _bus.addEventListener(EVENTS.onCashout,    (e) => _handleCashout(e.detail));
  _bus.addEventListener(EVENTS.onRoundEnd,   (e) => _handleRoundEnd(e.detail));
  _bus.addEventListener(EVENTS.onTimerSync,  (e) => _handleTimerSync(e.detail));
}

// ─── Register HUD callbacks ──────────────────────────────────────────────────

/**
 * HUD modules call this to receive game state changes.
 * Only RenderBridge drives these — HUD modules never touch the event bus.
 * @param {keyof typeof EVENTS} event
 * @param {Function} cb
 */
export function on(event, cb) {
  if (_callbacks[event]) _callbacks[event].push(cb);
}

function _notify(event, payload) {
  _callbacks[event]?.forEach((cb) => cb(payload));
}

// ─── Emit actions to P1 ──────────────────────────────────────────────────────

/**
 * Emit one of the three P2 → P1 actions.
 * @param {string} action — one of ACTIONS.*
 * @param {object} [payload]
 */
export function emit(action, payload = {}) {
  if (!_bus) return;
  _bus.dispatchEvent(new CustomEvent(action, { detail: payload }));
}

// ─── Tile picking (wired to canvas click in main.js) ────────────────────────

/**
 * Call from main.js on canvas pointer-up to let player select a tile.
 * @param {THREE.Vector2} ndcPoint
 * @param {THREE.Camera} camera
 */
export function handleTilePick(ndcPoint, camera) {
  const tileId = pickTile(ndcPoint, camera);
  if (tileId !== -1) emit(ACTIONS.MOVE_SELECTED, { tileId });
}

// ─── Event handlers ──────────────────────────────────────────────────────────

function _handleRoundStart({ boardSeed, playerCount = 2, timerDuration = 30, localPlayerId = 0 }) {
  _localPlayerId = localPlayerId;
  _lastTile.clear();

  resetGrid();
  clearAllPaths();
  clearAllTokens();

  // Spawn tokens at deterministic starting tiles based on board seed
  for (let i = 0; i < playerCount; i++) {
    const startTile = _seedTile(boardSeed, i);
    spawnToken(i, startTile);
    _lastTile.set(i, startTile);
  }

  _notify('onRoundStart', { boardSeed, playerCount, timerDuration, localPlayerId });
}

function _handleReveal({ tileId, type, playerId, voltage }) {
  // type: 'safe' | 'trap' | 'reward'
  const state = type === 'safe'   ? 'revealed-safe'
              : type === 'trap'   ? 'revealed-trap'
              : /* reward */        'reward';

  setTileState(tileId, state);

  const prev = _lastTile.get(playerId);
  if (prev !== undefined && prev !== tileId) {
    addPathSegment(playerId, prev, tileId);
  }
  moveToken(playerId, tileId);
  _lastTile.set(playerId, tileId);

  _notify('onReveal', { tileId, type, playerId, voltage });
}

function _handleBust({ playerId }) {
  bustToken(playerId);
  _notify('onBust', { playerId });
}

function _handleCashout({ playerId, voltage }) {
  _notify('onCashout', { playerId, voltage });
}

function _handleRoundEnd({ results }) {
  _notify('onRoundEnd', { results });
}

function _handleTimerSync({ remaining }) {
  _notify('onTimerSync', { remaining });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Simple seeded starting tile — spread players evenly around sphere equator
function _seedTile(seed, playerIndex) {
  const TILE_COUNT = 200;
  return Math.abs((seed + Math.floor(playerIndex * TILE_COUNT / 4))) % TILE_COUNT;
}
