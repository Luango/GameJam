// ─── GameOrchestrator ───
// Bridges P1's pure-logic layer (network, protocol, board, player, turn-manager) into P2's renderer.
// Betting phase (PR #4 parity): 20s wager window → only players who bet play; 30s move timer.

import { MSG, ACTION, PHASE, Msg } from '../../js/protocol.js';
import * as Net from '../../js/network.js';
import {
  generateBoard, DEFAULT_CONFIG, getValidMoves, pickStartTiles,
} from '../../js/board.js';
import { createTurnManager } from '../../js/turn-manager.js';
import {
  createPlayer,
  resetPlayerForRound,
  resetPlayerForLobby,
  isResolved,
  INITIAL_BANKROLL,
} from '../../js/player.js';

import { buildFromBoard } from '../renderer/HexGrid.js';
import { getScene } from '../renderer/SphereRenderer.js';
import {
  handleP1RoundStart, handleP1TurnBegin,
  handleP1TurnReveal, handleP1RoundEnd,
} from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

export { PHASE };

const BETTING_TIMER_MS = 20000;
const MOVE_TIMER_MS = 30000;

// ─── Module state ─────────────────────────────────────────────────────────────

let _phase = PHASE.LOBBY;
let _board = null;
let _players = {};
let _localId = null;
let _isHost = false;
let _turnManager = null;
let _config = DEFAULT_CONFIG;

let _pendingBets = {};
let _bettingTimeout = null;
/** Last bet-phase roster (bankroll caps for clients). */
let _bettingRoster = [];

/** Increments when host starts a new match; shown in ROUND_END as roundNumber. */
let _matchDisplayNumber = 1;

let _onLobbyUpdate = () => {};
let _onPlayersUpdate = () => {};
let _onGameStart = () => {};
let _onBettingPhaseStart = () => {};
let _onBettingPhaseUpdate = () => {};
let _onBettingAbortedToLobby = () => {};
let _onRematchLobby = () => {};
let _onLeaveRoom = () => {};

// ─── Init ─────────────────────────────────────────────────────────────────────

/**
 * @param {EventTarget} eventBus
 * @param {{
 *   onLobbyUpdate?, onPlayersUpdate?, onGameStart?,
 *   onBettingPhaseStart?, onBettingPhaseUpdate?, onBettingAbortedToLobby?,
 *   onRematchLobby?, onLeaveRoom?
 * }} callbacks
 */
export function init(eventBus, callbacks = {}) {
  if (callbacks.onLobbyUpdate) _onLobbyUpdate = callbacks.onLobbyUpdate;
  if (callbacks.onPlayersUpdate) _onPlayersUpdate = callbacks.onPlayersUpdate;
  if (callbacks.onGameStart) _onGameStart = callbacks.onGameStart;
  if (callbacks.onBettingPhaseStart) _onBettingPhaseStart = callbacks.onBettingPhaseStart;
  if (callbacks.onBettingPhaseUpdate) _onBettingPhaseUpdate = callbacks.onBettingPhaseUpdate;
  if (callbacks.onBettingAbortedToLobby) _onBettingAbortedToLobby = callbacks.onBettingAbortedToLobby;
  if (callbacks.onRematchLobby) _onRematchLobby = callbacks.onRematchLobby;
  if (callbacks.onLeaveRoom) _onLeaveRoom = callbacks.onLeaveRoom;

  eventBus.addEventListener(ACTIONS.MOVE_SELECTED, (e) => {
    if (_phase !== PHASE.PLAYING) return;
    Net.sendToHost(Msg.move(e.detail.tileId, ACTION.STEP));
  });

  eventBus.addEventListener(ACTIONS.CASHOUT, () => {
    if (_phase !== PHASE.PLAYING) return;
    Net.sendToHost(Msg.move(null, ACTION.CASHOUT));
  });

  Net.on('onMessage', _handleNetMessage);
  Net.on('onPlayerLeave', _handlePlayerLeave);
  Net.on('onError', (err) => console.error('[Orch]', err));
}

// ─── Public actions ───────────────────────────────────────────────────────────

export async function createRoom(name) {
  _isHost = true;
  Net.setName(name);
  const code = await Net.createRoom(name);
  _localId = Net.getState().myId;
  _matchDisplayNumber = 1;
  _players[_localId] = createPlayer(_localId, name, 0);
  _players[_localId].ready = false;
  _onLobbyUpdate(_getLobbyList(), true, code);
  return code;
}

export async function joinRoom(code, name) {
  _isHost = false;
  Net.setName(name);
  await Net.joinRoom(code, name);
  _localId = Net.getState().myId;
}

export function setReady() {
  if (_isHost) {
    if (_players[_localId]) _players[_localId].ready = true;
    _broadcastPlayerList();
    _checkAllReady();
  } else {
    Net.sendToHost(Msg.ready());
  }
}

/**
 * Submit wager during BETTING (host applies locally; client sends to host).
 * @returns {boolean} accepted for send / apply
 */
export function submitBet(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n) || n < 10) return false;
  if (_phase !== PHASE.BETTING) return false;
  const cap = _localBankrollCap();
  if (n > cap) return false;
  if (_isHost) _handleBetReceived(_localId, n);
  else Net.sendToHost(Msg.betSubmit(n));
  return true;
}

export function sendCashout() {
  if (_phase !== PHASE.PLAYING) return;
  Net.sendToHost(Msg.move(null, ACTION.CASHOUT));
}

export function getLocalId() { return _localId; }
export function getIsHost() { return _isHost; }
export function getPhase() { return _phase; }

/**
 * Host only, after a finished match: same room, lobby + ready → betting again.
 */
export function hostStartNewGame() {
  if (!_isHost || _phase !== PHASE.ENDED) return;
  _turnManager?.destroy();
  _turnManager = null;
  _board = null;
  _pendingBets = {};
  _bettingRoster = [];

  const drop = [];
  for (const id of Object.keys(_players)) {
    const p = _players[id];
    if (!p.connected) drop.push(id);
    else resetPlayerForLobby(p);
  }
  drop.forEach((id) => delete _players[id]);

  _matchDisplayNumber += 1;
  _broadcastPlayerList();
  Net.broadcast(Msg.newGame());
}

/** Disconnect and clear local session (any role). */
export function leaveRoom() {
  _turnManager?.destroy();
  _turnManager = null;
  _board = null;
  _players = {};
  _pendingBets = {};
  _bettingRoster = [];
  _phase = PHASE.LOBBY;
  _isHost = false;
  _localId = null;
  _matchDisplayNumber = 1;
  Net.disconnect();
  _onLeaveRoom();
}

// ─── Network message routing ──────────────────────────────────────────────────

function _handleNetMessage(msg, fromId) {
  if (msg.type === MSG.PLAYERS) {
    _onPlayersUpdate(msg.list);
    return;
  }

  switch (msg.type) {
    case MSG.JOIN: return _onJoin(msg, fromId);
    case MSG.READY: return _onReady(fromId);
    case MSG.BET_PHASE: return _onBetPhaseMsg(msg);
    case MSG.BET_SUBMIT: return _onBetSubmitMsg(msg, fromId);
    case MSG.GAME_START: return _onGameStart_msg(msg);
    case MSG.TURN_BEGIN: return _onTurnBegin(msg);
    case MSG.MOVE: return _onMove(msg, fromId);
    case MSG.TURN_REVEAL: return _onTurnReveal(msg);
    case MSG.ROUND_END: return _onRoundEnd_msg(msg);
    case MSG.NEW_GAME: return _onNewGame_msg();
    default: break;
  }
}

// ─── Lobby ────────────────────────────────────────────────────────────────────

function _onJoin(msg, fromId) {
  if (!_isHost) return;
  const slot = Object.keys(_players).length;
  _players[fromId] = createPlayer(fromId, msg.name, slot);
  _broadcastPlayerList();
  _onLobbyUpdate(_getLobbyList(), true, Net.getState().roomCode);
}

function _onReady(fromId) {
  if (!_isHost) return;
  if (_players[fromId]) _players[fromId].ready = true;
  _broadcastPlayerList();
  _checkAllReady();
}

function _broadcastPlayerList() {
  Net.broadcast(Msg.players(_getLobbyList()));
}

function _checkAllReady() {
  if (!_isHost) return;
  const list = Object.values(_players);
  if (list.length < 1) return;
  if (!list.every((p) => p.ready)) return;
  _startBettingPhase();
}

// ─── Betting phase (host) ─────────────────────────────────────────────────────

function _startBettingPhase() {
  if (!_isHost) return;
  _pendingBets = {};
  _phase = PHASE.BETTING;

  const playerList = Object.values(_players).map((p) => ({
    id: p.id,
    name: p.name,
    color: p.color,
    bankroll: p.bankroll,
    hasBet: false,
  }));

  const now = Date.now();
  const deadline = now + BETTING_TIMER_MS;

  _bettingRoster = playerList;
  Net.broadcast(Msg.betPhase(playerList, deadline, now));

  clearTimeout(_bettingTimeout);
  _bettingTimeout = setTimeout(() => _finalizeBetting(), BETTING_TIMER_MS);
}

function _broadcastBettingStatus() {
  if (!_isHost) return;
  const playerList = Object.values(_players).map((p) => ({
    id: p.id,
    name: p.name,
    color: p.color,
    bankroll: p.bankroll,
    hasBet: _pendingBets[p.id] != null,
  }));
  _bettingRoster = playerList;
  Net.broadcast(Msg.betPhase(playerList, undefined, undefined));
}

function _onBetSubmitMsg(msg, fromId) {
  if (!_isHost || _phase !== PHASE.BETTING) return;
  const n = Number(msg.amount);
  if (!Number.isFinite(n)) return;
  _handleBetReceived(fromId, n);
}

function _handleBetReceived(playerId, amount) {
  if (_phase !== PHASE.BETTING) return;
  const p = _players[playerId];
  if (!p) return;
  if (amount < 10 || amount > p.bankroll) return;

  _pendingBets[playerId] = amount;
  _broadcastBettingStatus();

  const ids = Object.keys(_players);
  if (ids.length > 0 && ids.every((id) => _pendingBets[id] != null)) {
    clearTimeout(_bettingTimeout);
    _bettingTimeout = null;
    _finalizeBetting();
  }
}

function _finalizeBetting() {
  if (!_isHost) return;
  clearTimeout(_bettingTimeout);
  _bettingTimeout = null;

  const confirmed = { ..._pendingBets };
  if (Object.keys(confirmed).length === 0) {
    _abortBettingToLobby();
    return;
  }

  Net.broadcast(Msg.betConfirmed(confirmed));
  _startGameWithBets(confirmed);
}

function _abortBettingToLobby() {
  _phase = PHASE.LOBBY;
  _pendingBets = {};
  for (const p of Object.values(_players)) p.ready = false;
  _broadcastPlayerList();
  _onBettingAbortedToLobby();
}

function _wirePlayConfig(base) {
  return {
    turnTimerMs: MOVE_TIMER_MS,
    voltageRates: base.voltageRates,
    trapDensity: base.trapDensity,
  };
}

function _startGameWithBets(bets) {
  const seed = (Date.now() ^ (Math.random() * 0x7fffffff)) >>> 0;
  const playConfig = { ...DEFAULT_CONFIG, ..._config, turnTimerMs: MOVE_TIMER_MS };
  _board = generateBoard(seed, playConfig);

  const bettingIds = Object.keys(bets);
  const startTiles = pickStartTiles(_board, bettingIds.length);

  const playerOrder = bettingIds.map((id, i) => {
    const p = _players[id];
    const amt = bets[id];
    p.bankroll -= amt;
    p.bet = amt;
    resetPlayerForRound(p, startTiles[i]);
    return {
      id,
      name: p.name,
      color: p.color,
      startTileId: startTiles[i],
      bankroll: p.bankroll,
    };
  });

  const nextPlayers = {};
  bettingIds.forEach((id) => { nextPlayers[id] = _players[id]; });
  _players = nextPlayers;

  _turnManager = createTurnManager({
    broadcast: Net.broadcast,
    sendToPeer: Net.sendToPeer,
    onTurnReveal: null,
    onRoundEnd: null,
    turnTimerMs: MOVE_TIMER_MS,
    revealDelayMs: 2500,
    getMatchNumber: () => _matchDisplayNumber,
  });
  _turnManager.init(_board, _players, playConfig, bets);

  const wireConfig = _wirePlayConfig(playConfig);
  Net.broadcast(Msg.gameStart({
    seed,
    board: _board,
    playerOrder,
    bets,
    config: wireConfig,
  }));

  // Host: onMessage runs synchronously here → _onGameStart_msg sets _phase PLAYING + renderer.
  _turnManager.beginTurn();
}

// ─── Betting phase (all peers, from network) ─────────────────────────────────

function _onBetPhaseMsg(msg) {
  if (!msg.playerList) return;
  _bettingRoster = msg.playerList;

  if (msg.timerDeadline != null) {
    _phase = PHASE.BETTING;
    _onBettingPhaseStart({
      playerList: msg.playerList,
      timerDeadline: msg.timerDeadline,
      hostTimestamp: msg.hostTimestamp ?? Date.now(),
    });
  }
  _onBettingPhaseUpdate(msg.playerList);
}

function _localBankrollCap() {
  if (_isHost) return _players[_localId]?.bankroll ?? INITIAL_BANKROLL;
  const row = _bettingRoster.find((p) => p.id === _localId);
  return row?.bankroll ?? INITIAL_BANKROLL;
}

// ─── Gameplay message handlers ────────────────────────────────────────────────

function _onGameStart_msg(msg) {
  _board = msg.board;
  _config = { ...DEFAULT_CONFIG, ...(msg.config ?? {}) };
  _phase = PHASE.PLAYING;

  buildFromBoard(_board, getScene());

  const bets = msg.bets || {};
  handleP1RoundStart(msg.playerOrder, _localId, bets);

  _onGameStart();
}

function _onTurnBegin(msg) {
  const myEntry = msg.activePlayers?.find((p) => p.id === _localId);
  const validMoves = (myEntry && _board)
    ? getValidMoves(_board, myEntry.currentTileId)
    : [];

  handleP1TurnBegin(validMoves, msg.timerDeadline);
}

function _onMove(msg, fromId) {
  if (!_isHost || !_turnManager) return;
  _turnManager.handleMove(fromId, msg.tileId, msg.action);
}

function _onTurnReveal(msg) {
  handleP1TurnReveal(msg.results, msg.newlyRevealedTiles);
}

function _onRoundEnd_msg(msg) {
  _phase = PHASE.ENDED;
  if (_isHost && msg.results) {
    for (const r of msg.results) {
      const p = _players[r.id];
      if (p && r.status === 'cashed_out' && (r.payout ?? 0) > 0) {
        p.bankroll += r.payout;
      }
    }
  }
  handleP1RoundEnd(msg.results, msg.leaderboard, msg.roundNumber ?? 1);
}

function _onNewGame_msg() {
  _phase = PHASE.LOBBY;
  _pendingBets = {};
  _bettingRoster = [];
  _turnManager?.destroy();
  _turnManager = null;
  _board = null;
  _onRematchLobby();
}

function _handlePlayerLeave(peerId) {
  if (!_isHost || !_players[peerId]) return;
  const p = _players[peerId];
  p.connected = false;
  const drop = isResolved(p) || _phase !== PHASE.PLAYING;
  if (drop) delete _players[peerId];
  if (_phase === PHASE.LOBBY || _phase === PHASE.ENDED || _phase === PHASE.BETTING) {
    _broadcastPlayerList();
  }
  console.log('[Orch] Player disconnected:', peerId);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _getLobbyList() {
  return Object.values(_players).map((p) => ({
    id: p.id, name: p.name, ready: !!p.ready, color: p.color,
  }));
}
