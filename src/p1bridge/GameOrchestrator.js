// ─── GameOrchestrator ───
// Bridges P1's pure-logic layer (network, board, player, turn-manager) into P2's renderer.
// Only imports from js/: network, protocol, board, player, turn-manager.
// Never touches js/scene.js, js/hud.js, js/sphere-renderer.js, js/lobby-ui.js.

import { MSG, ACTION, PHASE, Msg } from '../../js/protocol.js';
import * as Net from '../../js/network.js';
import {
  generateBoard, DEFAULT_CONFIG, getValidMoves, pickStartTiles,
} from '../../js/board.js';
import { createTurnManager }                                 from '../../js/turn-manager.js';
import { createPlayer, resetPlayerForRound, isActive }      from '../../js/player.js';

import { buildFromBoard }          from '../renderer/HexGrid.js';
import { getScene }                from '../renderer/SphereRenderer.js';
import {
  handleP1RoundStart, handleP1TurnBegin,
  handleP1TurnReveal, handleP1RoundEnd,
} from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// ─── Module state ─────────────────────────────────────────────────────────────

let _phase        = PHASE.LOBBY;
let _board        = null;
let _players      = {};    // peerId → player object (host only)
let _localId      = null;  // this client's PeerJS ID
let _isHost       = false;
let _turnManager  = null;
let _config       = DEFAULT_CONFIG;

// Callbacks for LobbyOverlay
let _onLobbyUpdate   = () => {};  // (playerList, isHost, roomCode) → void
let _onPlayersUpdate = () => {};  // (playerList) → void  [client side]
let _onGameStart     = () => {};  // () → void  [hide overlay]

// ─── Init ─────────────────────────────────────────────────────────────────────

/**
 * Wire up the orchestrator.
 * @param {EventTarget} eventBus            — shared P2 bus (MOVE_SELECTED originates here)
 * @param {{ onLobbyUpdate, onPlayersUpdate, onGameStart }} callbacks
 */
export function init(eventBus, callbacks = {}) {
  if (callbacks.onLobbyUpdate)   _onLobbyUpdate   = callbacks.onLobbyUpdate;
  if (callbacks.onPlayersUpdate) _onPlayersUpdate = callbacks.onPlayersUpdate;
  if (callbacks.onGameStart)     _onGameStart     = callbacks.onGameStart;

  // Local player picks a tile → relay STEP to host
  eventBus.addEventListener(ACTIONS.MOVE_SELECTED, (e) => {
    if (_phase !== PHASE.PLAYING) return;
    Net.sendToHost(Msg.move(e.detail.tileId, ACTION.STEP));
  });

  // Local player cashes out → relay CASHOUT to host
  eventBus.addEventListener(ACTIONS.CASHOUT, () => {
    if (_phase !== PHASE.PLAYING) return;
    Net.sendToHost(Msg.move(null, ACTION.CASHOUT));
  });

  // Single network message handler (network.js supports one slot)
  Net.on('onMessage',    _handleNetMessage);
  Net.on('onPlayerLeave', _handlePlayerLeave);
  Net.on('onError',      (err) => console.error('[Orch]', err));
}

// ─── Public actions ───────────────────────────────────────────────────────────

/**
 * Host: create room. Returns the room code.
 * @param {string} name
 */
export async function createRoom(name) {
  _isHost = true;
  Net.setName(name);
  const code = await Net.createRoom(name);

  // Host's own PeerJS ID is now available
  _localId = Net.getState().myId;
  _players[_localId] = createPlayer(_localId, name, 0);
  _players[_localId].ready = false;

  _onLobbyUpdate(_getLobbyList(), true, code);
  return code;
}

/**
 * Client: join an existing room.
 * @param {string} code
 * @param {string} name
 */
export async function joinRoom(code, name) {
  _isHost = false;
  Net.setName(name);
  await Net.joinRoom(code, name);
  _localId = Net.getState().myId;
  // Player list arrives from host via MSG.PLAYERS
}

/**
 * Signal readiness.  Host starts the game when all players are ready.
 */
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
 * Cash out the local player (during active round).
 */
export function sendCashout() {
  if (_phase !== PHASE.PLAYING) return;
  Net.sendToHost(Msg.move(null, ACTION.CASHOUT));
}

export function getLocalId() { return _localId; }
export function getIsHost()  { return _isHost;  }
export function getPhase()   { return _phase;   }

// ─── Network message routing ──────────────────────────────────────────────────

function _handleNetMessage(msg, fromId) {
  // Client: update lobby list when host broadcasts it
  if (msg.type === MSG.PLAYERS) {
    _onPlayersUpdate(msg.list);
    return;
  }

  switch (msg.type) {
    case MSG.JOIN:        return _onJoin(msg, fromId);
    case MSG.READY:       return _onReady(fromId);
    case MSG.GAME_START:  return _onGameStart_msg(msg);
    case MSG.TURN_BEGIN:  return _onTurnBegin(msg);
    case MSG.MOVE:        return _onMove(msg, fromId);
    case MSG.TURN_REVEAL: return _onTurnReveal(msg);
    case MSG.ROUND_END:   return _onRoundEnd_msg(msg);
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
  const list = _getLobbyList();
  Net.broadcast(Msg.players(list));
}

function _checkAllReady() {
  if (!_isHost) return;
  const list = Object.values(_players);
  if (list.length < 1) return;
  if (!list.every((p) => p.ready)) return;
  _startGame();
}

// ─── Host: start game ─────────────────────────────────────────────────────────

function _startGame() {
  // window.THREE must already be set in main.js
  const seed  = Date.now() & 0x7fffffff;
  _board = generateBoard(seed, _config);

  const playerList   = Object.values(_players);
  const startTileIds = pickStartTiles(_board, playerList.length);

  const playerOrder = playerList.map((p, i) => ({
    id:          p.id,
    name:        p.name,
    color:       p.color,
    startTileId: startTileIds[i],
  }));

  playerList.forEach((p, i) => resetPlayerForRound(p, startTileIds[i]));

  _turnManager = createTurnManager({
    broadcast:    Net.broadcast,
    sendToPeer:   Net.sendToPeer,
    onTurnReveal: null,   // handled via broadcast → onMessage loop
    onRoundEnd:   null,
    turnTimerMs:  _config.turnTimerMs,
    revealDelayMs: 2500,
  });
  _turnManager.init(_board, _players, _config, 100);

  // Broadcast — also fires onMessage on host (see network.js broadcast())
  Net.broadcast(Msg.gameStart({ seed, board: _board, playerOrder, config: _config }));

  _phase = PHASE.PLAYING;
  _turnManager.beginTurn();
}

// ─── Gameplay message handlers ────────────────────────────────────────────────

function _onGameStart_msg(msg) {
  _board  = msg.board;
  _config = msg.config ?? DEFAULT_CONFIG;
  _phase  = PHASE.PLAYING;

  // Build P2's hex grid geometry from P1's authoritative tile data
  buildFromBoard(_board, getScene());

  // Spawn tokens and focus camera
  handleP1RoundStart(msg.playerOrder, _localId);

  // Hide lobby overlay
  _onGameStart();
}

function _onTurnBegin(msg) {
  // Find local player's current tile from the active-players list
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
  handleP1RoundEnd(msg.results, msg.leaderboard);
}

function _handlePlayerLeave(peerId) {
  if (!_isHost || !_players[peerId]) return;
  _players[peerId].connected = false;
  console.log('[Orch] Player disconnected:', peerId);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _getLobbyList() {
  return Object.values(_players).map((p) => ({
    id: p.id, name: p.name, ready: !!p.ready, color: p.color,
  }));
}
