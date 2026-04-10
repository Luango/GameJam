import { EVENTS, ACTIONS } from '../constants/gameState.js';
import { playSound, playAnnouncement, SFX } from '../audio/AudioManager.js';
import {
  setTileState, resetGrid, pickTile,
  setSelectableTiles, clearSelectables,
  setHoveredTile, setSelectedTile, isSelectable,
  getAdjacentTileIds, getTileIdsByZone, getTilePosition,
  spawnSparks, playClash, startTileCharge, stopTileCharge, spawnShockwave,
} from '../renderer/HexGrid.js';
import { PLAYER_COLORS } from '../constants/gameConfig.js';
import { spawnToken, moveToken, bustToken, clearAllTokens, setPlayerModel, clearModelAssignments } from '../renderer/PlayerToken.js';
import { addPathSegment, clearAllPaths } from '../renderer/PathTracer.js';
import { focusOnPosition, stopAutoRotate, resumeAutoRotate, shakeCamera } from '../renderer/SphereRenderer.js';

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
let _revealInProgress = false;

/** Promise-based delay for sequencing async animations. */
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

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

async function _handleReveal({ tileId, type, playerId, voltage }) {
  const state = type === 'safe' ? 'revealed-safe'
              : type === 'trap' ? 'revealed-trap'
              : 'reward';

  // ── PHASE 1: THE WALK — move token blind ──
  const prev = _lastTile.get(playerId);
  if (prev !== undefined && prev !== tileId) {
    addPathSegment(playerId, prev, tileId);
  }
  moveToken(playerId, tileId);
  _lastTile.set(playerId, tileId);
  focusOnPosition(getTilePosition(tileId));

  await _delay(650); // wait for token arc

  // ── PHASE 2: DRUM ROLL — what did they step on? (1.4–2.0s randomised) ──
  const drumRollMs = 1400 + Math.random() * 600;
  const waves = 3;
  const waveGap = drumRollMs / waves;

  playSound(SFX.REVEAL_START);
  _showVignette();
  startTileCharge(tileId);

  for (let w = 0; w < waves; w++) {
    spawnSparks(tileId);
    await _delay(waveGap);
  }

  // ── PHASE 3: THE FLIP ──
  stopTileCharge(tileId);
  setTileState(tileId, state);

  if (type === 'safe')   playSound(SFX.SAFE_REVEAL);
  else if (type === 'reward') playSound(SFX.REWARD_REVEAL);
  else                   playSound(SFX.TRAP_REVEAL);

  const swColor = type === 'trap' ? 0xff3300 : type === 'reward' ? 0xffd700 : 0x00ff55;
  spawnShockwave(tileId, swColor);

  if (type === 'trap') _flashScreen('#ff2020', 0.25, 150, 600);
  else if (type === 'reward') _flashScreen('#ffd700', 0.15, 200, 700);
  else _flashScreen('#22c55e', 0.12, 200, 600);

  await _delay(200);

  // ── PHASE 4: PAYOFF ──
  _notify('onReveal', { tileId, type, playerId, voltage });

  if (type === 'trap') {
    // Dramatic bust VFX
    shakeCamera(0.015, 500);
    _flashScreen('#ff2020', 0.35, 100, 300);
    setTimeout(() => _flashScreen('#ff2020', 0.20, 80, 500), 200);
    spawnSparks(tileId);
    setTimeout(() => spawnSparks(tileId), 120);
    _fadeVignette(1000);
  } else {
    // Win celebration — always confetti on survive
    spawnSparks(tileId);
    setTimeout(() => spawnSparks(tileId), 150);
    _spawnConfetti();
    if (type === 'reward') {
      _flashScreen('#ffd700', 0.12, 100, 800);
    } else {
      _flashScreen('#22c55e', 0.08, 100, 400);
    }
    _fadeVignette(600);
  }

  if (playerId === _localPlayerId) {
    _refreshSelectables(playerId);
    stopAutoRotate();
  } else {
    resumeAutoRotate();
  }
}

function _handleBust({ playerId }) {
  // Heavy bust VFX first
  shakeCamera(0.015, 500);
  _flashScreen('#ff2020', 0.35, 100, 300);
  setTimeout(() => _flashScreen('#ff2020', 0.20, 80, 500), 200);
  bustToken(playerId);
  playAnnouncement(SFX.BUST);
  if (playerId === _localPlayerId) {
    _localBusted = true;
    clearSelectables();
    resumeAutoRotate();
  }
  // Delay bust UI so VFX plays out first
  setTimeout(() => _notify('onBust', { playerId }), 800);
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
function _flashScreen(color = 'white', peakOpacity = 0.15, fadeInMs = 400, fadeOutMs = 1100) {
  if (!_flashEl) {
    _flashEl = document.createElement('div');
    Object.assign(_flashEl.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      opacity: '0',
      zIndex: '9998',
    });
    document.body.appendChild(_flashEl);
  }
  _flashEl.style.background = color;
  _flashEl.style.transition = `opacity ${fadeInMs}ms ease-in`;
  _flashEl.style.opacity = String(peakOpacity);
  setTimeout(() => {
    _flashEl.style.transition = `opacity ${fadeOutMs}ms ease-out`;
    _flashEl.style.opacity = '0';
  }, fadeInMs);
}

// ── Vignette overlay (drama spotlight framing) ───────────────────────────────
let _vignetteEl = null;
function _showVignette() {
  if (!_vignetteEl) {
    _vignetteEl = document.createElement('div');
    Object.assign(_vignetteEl.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      opacity: '0',
      zIndex: '9997',
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
    });
    document.body.appendChild(_vignetteEl);
  }
  _vignetteEl.style.transition = 'opacity 0.4s ease-in';
  _vignetteEl.style.opacity = '1';
}

function _fadeVignette(fadeMs = 600) {
  if (_vignetteEl) {
    _vignetteEl.style.transition = `opacity ${fadeMs}ms ease-out`;
    _vignetteEl.style.opacity = '0';
  }
}

/**
 * Sharp electric screen flash for Voltage Clash events.
 * Hits harder and faster than the gentle turn-start breath — a cyan-white crack.
 */
function _flashScreenClash() {
  if (!_flashEl) {
    _flashEl = document.createElement('div');
    Object.assign(_flashEl.style, {
      position: 'fixed', inset: '0',
      pointerEvents: 'none', opacity: '0', zIndex: '9998',
    });
    document.body.appendChild(_flashEl);
  }
  // Radial burst from centre — electric cyan to white
  _flashEl.style.background =
    'radial-gradient(ellipse at center, #ffffff 0%, #00e5ff 35%, transparent 75%)';
  _flashEl.style.transition = 'opacity 0.06s ease-in';
  _flashEl.style.opacity = '0.55';

  // Two-phase: hold bright briefly, then fade hard
  setTimeout(() => {
    _flashEl.style.transition = 'opacity 0.55s ease-out';
    _flashEl.style.opacity = '0';
  }, 90);
  // Reset gradient so next turn-start breath uses plain white
  setTimeout(() => { _flashEl.style.background = 'white'; }, 700);
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
/**
 * Pick maximally spread start tiles for all players, then return the one for playerIndex.
 * Uses greedy farthest-point sampling based on 3D tile positions.
 */
function _pickStartTile(safeTiles, seed, playerIndex, playerCount) {
  if (!safeTiles.length) return playerIndex * 20; // fallback

  // Cache the spread result for this seed+playerCount combo
  const cacheKey = `${seed}_${playerCount}`;
  if (!_pickStartTile._cache) _pickStartTile._cache = {};
  if (!_pickStartTile._cache[cacheKey]) {
    // Build position lookup for farthest-point sampling
    const positions = safeTiles.map(id => ({ id, pos: getTilePosition(id) }));

    // Seed the first pick deterministically
    const first = positions[seed % positions.length];
    const picked = [first];
    const used = new Set([first.id]);

    while (picked.length < playerCount) {
      let bestItem = null;
      let bestMinDist = -1;
      for (const c of positions) {
        if (used.has(c.id)) continue;
        let minDist = Infinity;
        for (const p of picked) {
          const dx = c.pos.x - p.pos.x;
          const dy = c.pos.y - p.pos.y;
          const dz = c.pos.z - p.pos.z;
          const d = dx * dx + dy * dy + dz * dz;
          if (d < minDist) minDist = d;
        }
        if (minDist > bestMinDist) {
          bestMinDist = minDist;
          bestItem = c;
        }
      }
      picked.push(bestItem);
      used.add(bestItem.id);
    }
    _pickStartTile._cache[cacheKey] = picked.map(p => p.id);
  }
  return _pickStartTile._cache[cacheKey][playerIndex];
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
 * Orchestrates a dramatic reveal: Move → Drum Roll → Flip → Payoff.
 * Player moves to the tile FIRST (blind), then the tile reveals what's underneath.
 * @param {object[]} results            — per-player turn results from TurnManager
 * @param {object[]} newlyRevealedTiles — [{id, tileState}]
 */
export async function handleP1TurnReveal(results, newlyRevealedTiles) {
  // Guard: if already mid-reveal, fall through to instant (prevents visual overlap)
  if (_revealInProgress) {
    _instantReveal(results, newlyRevealedTiles);
    return;
  }
  _revealInProgress = true;

  clearSelectables();

  // ── PHASE 1: THE WALK (600ms) ─────────────────────────────────────────────
  // Player tokens move to their chosen tiles BLIND — no result shown yet.
  // This is the commitment: you've stepped on it, no going back.
  for (const result of results) {
    const { playerId, action, tileId } = result;
    if (action !== 'step' || tileId == null) continue;

    const slot = _playerSlots.size > 0
      ? (_playerSlots.get(playerId) ?? 0)
      : (typeof playerId === 'number' ? playerId : 0);

    const prev = _lastTile.get(playerId);
    if (prev !== undefined && prev !== tileId) {
      addPathSegment(slot, prev, tileId);
    }
    moveToken(slot, tileId);
    _lastTile.set(playerId, tileId);

    // Camera follows local player to destination
    if (playerId === _localPlayerId) {
      focusOnPosition(getTilePosition(tileId));
      stopAutoRotate();
    }
  }

  // Wait for token arc animation to finish (MOVE_DURATION = 0.6s)
  await _delay(650);

  // ── PHASE 2: THE DRUM ROLL (2000–2800ms, randomised) ───────────────────────
  // Player is standing on the tile. What did they step on?
  // Charging VFX builds under their feet. Variable timing keeps it unpredictable.
  const drumRollMs = 1400 + Math.random() * 600; // 1.4s – 2.0s
  const waves = 3;
  const waveGap = drumRollMs / waves;

  playSound(SFX.REVEAL_START);
  _showVignette();

  for (const t of newlyRevealedTiles) startTileCharge(t.id);

  // Staggered spark waves — each burst accelerates the tension
  for (let w = 0; w < waves; w++) {
    for (const t of newlyRevealedTiles) spawnSparks(t.id);
    await _delay(waveGap);
  }

  // ── PHASE 3: THE FLIP (200ms) ─────────────────────────────────────────────
  // The tile under the player cracks open — moment of truth.
  const hasBust   = results.some(r => r.status === 'busted');
  const hasReward = newlyRevealedTiles.some(t => t.tileState === 'reward');

  for (const t of newlyRevealedTiles) {
    stopTileCharge(t.id);

    const state =
      t.tileState === 'trap'   ? 'revealed-trap' :
      t.tileState === 'reward' ? 'reward'         :
                                 'revealed-safe';
    setTileState(t.id, state);

    if (state === 'revealed-safe') playSound(SFX.SAFE_REVEAL);
    else if (state === 'reward')   playSound(SFX.REWARD_REVEAL);
    else                           playSound(SFX.TRAP_REVEAL);

    const swColor = state === 'revealed-trap' ? 0xff3300
                  : state === 'reward'        ? 0xffd700
                  :                             0x00ff55;
    spawnShockwave(t.id, swColor);
  }

  // Screen flash — color-coded emotional punch
  if (hasBust)        _flashScreen('#ff2020', 0.30, 120, 500);
  else if (hasReward) _flashScreen('#ffd700', 0.20, 150, 600);
  else                _flashScreen('#22c55e', 0.15, 150, 500);

  await _delay(200);

  // ── PHASE 4: THE PAYOFF ───────────────────────────────────────────────────
  // Emotional result: celebration or devastation.
  // Collect bust/cashout notifications to fire AFTER VFX plays.
  const deferredBusts    = [];
  const deferredCashouts = [];

  for (const result of results) {
    const { playerId, action, tileId, tileState, totalVoltage, status, idleStrikes } = result;
    const slot = _playerSlots.size > 0
      ? (_playerSlots.get(playerId) ?? 0)
      : (typeof playerId === 'number' ? playerId : 0);

    if (action === 'step' && tileId != null) {
      _notify('onReveal', {
        tileId,
        type: tileState === 'trap' ? 'trap' : tileState === 'reward' ? 'reward' : 'safe',
        playerId: slot,
        voltage: totalVoltage,
      });

      // ── WIN: celebration VFX — confetti on every survive ──
      if (status !== 'busted') {
        spawnSparks(tileId);
        setTimeout(() => spawnSparks(tileId), 150);
        _spawnConfetti();

        if (tileState === 'reward') {
          _flashScreen('#ffd700', 0.12, 100, 800);
        } else {
          _flashScreen('#22c55e', 0.08, 100, 400);
        }
      }
    }

    if (status === 'busted') {
      // ── BUST VFX: heavy shake + double red flash + grey out ──
      shakeCamera(0.015, 500);                         // harder, longer shake
      _flashScreen('#ff2020', 0.35, 100, 300);         // first hard red punch
      setTimeout(() => _flashScreen('#ff2020', 0.20, 80, 500), 200); // second red aftershock
      bustToken(slot);
      playAnnouncement(SFX.BUST);
      // Burst of red-tinted sparks at bust location
      if (tileId != null) {
        spawnSparks(tileId);
        setTimeout(() => spawnSparks(tileId), 120);
      }

      if (playerId === _localPlayerId) {
        _localBusted = true;
        clearSelectables();
        resumeAutoRotate();
      }
      // Defer bust HUD notification — show AFTER VFX has impact
      deferredBusts.push({ playerId: slot });
    } else if (status === 'cashed_out') {
      playAnnouncement(SFX.CASH_OUT);
      if (playerId === _localPlayerId) {
        clearSelectables();
        resumeAutoRotate();
      }
      deferredCashouts.push({ playerId: slot, voltage: totalVoltage });
    }

    if (action === 'timeout' && playerId === _localPlayerId && idleStrikes != null) {
      _notify('onIdleStrikes', { count: idleStrikes });
    }
  }

  // ── Voltage Clash — fire when 2+ players land on the same tile ───────────
  const clashMap = new Map(); // tileId → slot[]
  for (const result of results) {
    if (result.isSimultaneousClaim && result.tileId != null && result.action === 'step') {
      const slot = _playerSlots.size > 0
        ? (_playerSlots.get(result.playerId) ?? 0)
        : (typeof result.playerId === 'number' ? result.playerId : 0);
      if (!clashMap.has(result.tileId)) clashMap.set(result.tileId, []);
      clashMap.get(result.tileId).push(slot);
    }
  }
  clashMap.forEach((slots, tileId) => {
    if (slots.length < 2) return;
    const colors = slots.map((s) => PLAYER_COLORS[s] ?? 0xffffff);
    playClash(tileId, colors);
    _flashScreenClash();
    playAnnouncement(SFX.COLLISION); // plays for every client — it's a shared moment
  });

  _fadeVignette(hasBust ? 1000 : 600);

  // Let the bust VFX (shake + flash + sparks) play out before showing UI
  if (deferredBusts.length > 0) {
    await _delay(800); // bust VFX plays for ~800ms before overlay appears
  }

  // Now fire deferred HUD notifications
  for (const b of deferredBusts)    _notify('onBust', b);
  for (const c of deferredCashouts) _notify('onCashout', c);

  await _delay(deferredBusts.length > 0 ? 300 : 500);
  _revealInProgress = false;
}

/**
 * Instant reveal fallback — used when a second reveal arrives mid-animation.
 * Moves tokens + reveals tiles synchronously with no drama sequence.
 */
function _instantReveal(results, newlyRevealedTiles) {
  // Move tokens first
  for (const result of results) {
    const { playerId, action, tileId } = result;
    if (action !== 'step' || tileId == null) continue;
    const slot = _playerSlots.size > 0
      ? (_playerSlots.get(playerId) ?? 0)
      : (typeof playerId === 'number' ? playerId : 0);
    const prev = _lastTile.get(playerId);
    if (prev !== undefined && prev !== tileId) addPathSegment(slot, prev, tileId);
    moveToken(slot, tileId);
    _lastTile.set(playerId, tileId);
  }
  // Reveal tiles
  for (const t of newlyRevealedTiles) {
    stopTileCharge(t.id);
    const state =
      t.tileState === 'trap'   ? 'revealed-trap' :
      t.tileState === 'reward' ? 'reward'         :
                                 'revealed-safe';
    setTileState(t.id, state);
  }
  // Process results
  for (const result of results) {
    const { playerId, action, tileId, tileState, totalVoltage, status, idleStrikes } = result;
    const slot = _playerSlots.size > 0
      ? (_playerSlots.get(playerId) ?? 0)
      : (typeof playerId === 'number' ? playerId : 0);

    if (action === 'step' && tileId != null) {
      _notify('onReveal', { tileId, type: tileState === 'trap' ? 'trap' : tileState === 'reward' ? 'reward' : 'safe', playerId: slot, voltage: totalVoltage });
    }
    if (status === 'busted') {
      bustToken(slot);
      playAnnouncement(SFX.BUST);
      if (playerId === _localPlayerId) { _localBusted = true; clearSelectables(); resumeAutoRotate(); }
      _notify('onBust', { playerId: slot });
    } else if (status === 'cashed_out') {
      playAnnouncement(SFX.CASH_OUT);
      if (playerId === _localPlayerId) { clearSelectables(); resumeAutoRotate(); }
      _notify('onCashout', { playerId: slot, voltage: totalVoltage });
    }
    if (action === 'timeout' && playerId === _localPlayerId && idleStrikes != null) _notify('onIdleStrikes', { count: idleStrikes });
    if (playerId === _localPlayerId && tileId != null) focusOnPosition(getTilePosition(tileId));
  }
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
