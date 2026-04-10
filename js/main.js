// ─── Circuit Sphere Main ───
// Game orchestrator: state machine, init, render loop, message routing.

import { MSG, ACTION, STATUS, PHASE, Msg } from './protocol.js';
import * as Net from './network.js';
import * as LobbyUI from './lobby-ui.js';
import * as BettingUI from './betting-ui.js';
import * as HUD from './hud.js';
import * as Audio from './audio.js';
import * as Scene from './scene.js';
import * as SphereRenderer from './sphere-renderer.js';
import { generateBoard, DEFAULT_CONFIG, getValidMoves, pickStartTiles } from './board.js';
import { createTurnManager } from './turn-manager.js';
import {
  createPlayer, resetPlayerForRound, lobbyView, serializePlayer,
  isActive, isResolved, PLAYER_COLORS, INITIAL_BANKROLL
} from './player.js';

// ─── Constants ───

const BETTING_TIMER_MS = 30000;   // 30 seconds for betting phase
const MOVE_TIMER_MS = 10000;      // 10 seconds for move phase

// ─── Game State ───

let gamePhase = PHASE.LOBBY;
let board = null;
let players = {};          // id -> player object
let localPlayerId = null;
let turnManager = null;
let config = null;
let selectedTileId = null;
let lockedIn = false;

// Betting phase state (host only)
let pendingBets = {};      // playerId -> bet amount
let confirmedBets = {};    // playerId -> bet amount (all)
let bettingTimeout = null; // Host-side betting timer

// Three.js references
let sceneRefs = null;
let raycaster = null;
let mouse = null;

// ─── Init ───

export function init() {
  const THREE = window.THREE;

  // Init scene
  const canvas = document.getElementById('game-canvas');
  sceneRefs = Scene.init(canvas);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Init Audio (lazy — context created on first user gesture)
  document.addEventListener('click', () => Audio.init(), { once: true });
  document.addEventListener('keydown', () => Audio.init(), { once: true });

  // Init UI
  LobbyUI.init({
    onGameStart: handleLobbyGameStart,
  });

  BettingUI.init({
    onBetSubmit: handleLocalBetSubmit,
    onTimerExpired: handleLocalBettingTimeout,
  });

  HUD.init({
    onCashout: handleCashout,
    onLockIn: handleLockIn,
  });

  // Network callbacks
  Net.on('onMessage', handleNetworkMessage);
  Net.on('onPlayerLeave', handlePlayerLeave);
  Net.on('onDisconnected', handleDisconnected);

  // Mouse interaction
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('click', onMouseClick);

  // Show lobby
  LobbyUI.show();
  HUD.hide();

  // Start render loop
  requestAnimationFrame(renderLoop);

  console.log('[Main] Circuit Sphere initialized');
}

// ─── Render Loop ───

function renderLoop(time) {
  requestAnimationFrame(renderLoop);
  SphereRenderer.updateAnimations(time);
  Scene.render();
}

// ─── Lobby Handlers ───

function handleLobbyGameStart(msg) {
  if (msg.type === 'start-requested') {
    startBettingPhase();
  } else if (msg.type === MSG.GAME_START) {
    onGameStartReceived(msg);
  }
}

// ─── Betting Phase ───

/**
 * Host: initiate betting phase with 20s timer.
 */
function startBettingPhase() {
  const { isHost, myId } = Net.getState();
  if (!isHost) return;

  gamePhase = PHASE.BETTING;
  localPlayerId = myId;
  pendingBets = {};

  const lobbyPlayers = LobbyUI.getPlayers();

  // Initialize player objects
  players = {};
  for (let i = 0; i < lobbyPlayers.length; i++) {
    const lp = lobbyPlayers[i];
    const p = createPlayer(lp.id, lp.name, i);
    p.bankroll = lp.bankroll || INITIAL_BANKROLL;
    players[lp.id] = p;
  }

  const now = Date.now();
  const timerDeadline = now + BETTING_TIMER_MS;

  // Build player info for betting phase
  const playerList = Object.values(players).map(p => ({
    id: p.id,
    name: p.name,
    color: p.color,
    bankroll: p.bankroll,
    hasBet: false,
  }));

  // Broadcast betting phase start with timer
  Net.broadcast(Msg.betPhase(playerList, timerDeadline, now));

  // Show betting UI locally
  LobbyUI.hide();
  const localPlayer = players[localPlayerId];
  BettingUI.show(localPlayer ? localPlayer.bankroll : INITIAL_BANKROLL);
  BettingUI.startTimer(timerDeadline, now);
  updateBettingPlayerList();

  // Host-side betting timeout
  clearTimeout(bettingTimeout);
  bettingTimeout = setTimeout(() => {
    handleBettingTimeoutHost();
  }, BETTING_TIMER_MS);
}

/**
 * Client: received bet-phase from host.
 */
function onBetPhaseReceived(msg) {
  const { myId } = Net.getState();
  gamePhase = PHASE.BETTING;
  localPlayerId = myId;

  // Build player objects
  players = {};
  for (let i = 0; i < msg.playerList.length; i++) {
    const pl = msg.playerList[i];
    // Only create player if not an update (hasBet field present = status update)
    if (!players[pl.id]) {
      const p = createPlayer(pl.id, pl.name, i);
      p.bankroll = pl.bankroll;
      players[pl.id] = p;
    }
  }

  // Update player bet status display
  BettingUI.updatePlayerBets(msg.playerList.map(pl => ({
    id: pl.id,
    name: pl.name,
    color: pl.color,
    hasBet: pl.hasBet || false,
  })));

  // Only show UI and start timer on initial bet-phase (has timerDeadline)
  if (msg.timerDeadline) {
    LobbyUI.hide();
    const localPlayer = players[localPlayerId];
    BettingUI.show(localPlayer ? localPlayer.bankroll : INITIAL_BANKROLL);
    BettingUI.startTimer(msg.timerDeadline, msg.hostTimestamp);
  }
}

/**
 * Local player confirmed their bet.
 */
function handleLocalBetSubmit(amount) {
  const { isHost } = Net.getState();
  Audio.playBetPlaced();

  if (isHost) {
    handleBetReceived(localPlayerId, amount);
  } else {
    Net.sendToHost(Msg.betSubmit(amount));
  }
}

/**
 * Local player's betting timer expired without placing a bet.
 */
function handleLocalBettingTimeout() {
  BettingUI.setStatus('TIME UP — NO BET PLACED');
}

/**
 * Host: received a bet from a player.
 */
function handleBetReceived(playerId, amount) {
  if (gamePhase !== PHASE.BETTING) return;

  pendingBets[playerId] = amount;
  broadcastBettingStatus();
  updateBettingPlayerList();

  // Check if ALL players have bet → advance early
  const allPlayerIds = Object.keys(players);
  const allBet = allPlayerIds.every(id => pendingBets[id] != null);

  if (allBet) {
    clearTimeout(bettingTimeout);
    finalizeBetting();
  }
}

/**
 * Host: betting timer expired — start game with whoever bet.
 */
function handleBettingTimeoutHost() {
  if (gamePhase !== PHASE.BETTING) return;
  finalizeBetting();
}

/**
 * Host: finalize betting — collect bets, exclude non-bettors, start game.
 */
function finalizeBetting() {
  // Only players who placed a bet participate
  confirmedBets = { ...pendingBets };

  if (Object.keys(confirmedBets).length === 0) {
    // Nobody bet — go back to lobby (or just end)
    BettingUI.hide();
    BettingUI.setStatus('No bets placed. Returning to lobby...');
    gamePhase = PHASE.LOBBY;
    LobbyUI.show();
    return;
  }

  // Broadcast confirmed bets
  Net.broadcast(Msg.betConfirmed(confirmedBets));

  // Start the actual game with only betting players
  startGameWithBets(confirmedBets);
}

/**
 * Host: broadcast betting status to clients.
 */
function broadcastBettingStatus() {
  const playerList = Object.values(players).map(p => ({
    id: p.id,
    name: p.name,
    color: p.color,
    bankroll: p.bankroll,
    hasBet: pendingBets[p.id] != null,
  }));
  // Send update without timer (timerDeadline=undefined) so clients don't restart timer
  Net.broadcast(Msg.betPhase(playerList, undefined, undefined));
}

/**
 * Update betting UI player list (local).
 */
function updateBettingPlayerList() {
  const list = Object.values(players).map(p => ({
    id: p.id,
    name: p.name,
    color: p.color,
    hasBet: pendingBets[p.id] != null,
  }));
  BettingUI.updatePlayerBets(list);
}

/**
 * Client: received bet-confirmed from host.
 */
function onBetConfirmedReceived(msg) {
  confirmedBets = msg.bets;
}

/**
 * Host: start the actual game with only players who bet.
 */
function startGameWithBets(bets) {
  const { isHost, myId } = Net.getState();
  if (!isHost) return;

  const seed = Math.floor(Math.random() * 2147483647);
  config = { ...DEFAULT_CONFIG };

  // Override turn timer to 10 seconds
  config.turnTimerMs = MOVE_TIMER_MS;

  // Generate board
  board = generateBoard(seed, config);

  // Only include players who placed a bet
  const bettingPlayerIds = Object.keys(bets);
  const startTiles = pickStartTiles(board, bettingPlayerIds.length);

  const playerOrder = bettingPlayerIds.map((id, i) => ({
    id,
    name: players[id].name,
    color: players[id].color,
    startTileId: startTiles[i],
    bankroll: players[id].bankroll,
  }));

  // Deduct bets and set up round
  for (const po of playerOrder) {
    const p = players[po.id];
    const betAmount = bets[po.id] || 100;
    p.bankroll -= betAmount;
    p.bet = betAmount;
    resetPlayerForRound(p, po.startTileId);
  }

  // Remove non-betting players from active game
  const gamePlayers = {};
  for (const po of playerOrder) {
    gamePlayers[po.id] = players[po.id];
  }
  players = gamePlayers;

  localPlayerId = myId;
  confirmedBets = bets;

  // Broadcast game-start
  Net.broadcast(Msg.gameStart({
    seed,
    board,
    playerOrder,
    bets,
    config: {
      turnTimerMs: MOVE_TIMER_MS,
      voltageRates: config.voltageRates,
      trapDensity: config.trapDensity,
    },
  }));

  // Hide betting UI, set up game locally
  BettingUI.hide();
  Audio.playRoundStart();
  setupGame(board, playerOrder, config);

  // Start turn manager with 10s timer
  turnManager = createTurnManager({
    broadcast: Net.broadcast,
    sendToPeer: Net.sendToPeer,
    onTurnReveal: handleTurnReveal,
    onRoundEnd: handleRoundEnd,
    turnTimerMs: MOVE_TIMER_MS,
  });
  turnManager.init(board, players, config, bets);
  turnManager.beginTurn();
}

/**
 * Client: received game-start from host.
 */
function onGameStartReceived(msg) {
  const { myId } = Net.getState();

  board = msg.board;
  config = msg.config;
  confirmedBets = msg.bets || {};
  localPlayerId = myId;

  // Build player objects (only betting players are in playerOrder)
  players = {};
  for (const po of msg.playerOrder) {
    const p = createPlayer(po.id, po.name, msg.playerOrder.indexOf(po));
    const betAmount = confirmedBets[po.id] || 100;
    p.bankroll = (po.bankroll || INITIAL_BANKROLL) - betAmount;
    p.bet = betAmount;
    resetPlayerForRound(p, po.startTileId);
    players[po.id] = p;
  }

  BettingUI.hide();
  Audio.playRoundStart();
  setupGame(board, msg.playerOrder, config);
}

/**
 * Common game setup (both host and client).
 */
function setupGame(boardData, playerOrder, gameConfig) {
  gamePhase = PHASE.PLAYING;

  LobbyUI.hide();
  HUD.show();

  SphereRenderer.buildTileMeshes(boardData, sceneRefs.sphereGroup);

  for (const po of playerOrder) {
    SphereRenderer.updatePlayerMarker(po.id, po.startTileId, po.color);
  }

  const localPlayer = players[localPlayerId];
  if (localPlayer) {
    HUD.updateVoltage(localPlayer.voltage, localPlayer.bet);
    HUD.updatePhase(localPlayer.deepestZone);
    HUD.updateBankroll(localPlayer.bankroll);
    HUD.updateBet(localPlayer.bet);
  }

  updateHudPlayerList();
}

// ─── Network Message Router ───

function handleNetworkMessage(msg, fromId) {
  // Route lobby messages
  if (msg.type === MSG.PLAYERS || msg.type === MSG.GAME_START) {
    LobbyUI.handleMessage(msg);
    if (msg.type === MSG.GAME_START) {
      onGameStartReceived(msg);
    }
    return;
  }

  const { isHost, myId } = Net.getState();

  switch (msg.type) {
    case MSG.JOIN:
      if (isHost) handleJoin(msg, fromId);
      break;

    case MSG.READY:
      if (isHost) handleReady(fromId);
      break;

    // ── Betting Phase ──
    case MSG.BET_PHASE:
      if (!isHost) onBetPhaseReceived(msg);
      break;

    case MSG.BET_SUBMIT:
      if (isHost) handleBetReceived(fromId, msg.amount);
      break;

    case MSG.BET_CONFIRMED:
      if (!isHost) onBetConfirmedReceived(msg);
      break;

    // ── Gameplay ──
    case MSG.MOVE:
      if (isHost && turnManager) {
        const result = turnManager.handleMove(fromId, msg.tileId, msg.action);
        Net.sendToPeer(fromId, Msg.moveAck(result.ok, result.reason));
      }
      break;

    case MSG.MOVE_ACK:
      handleMoveAck(msg);
      break;

    case MSG.TURN_BEGIN:
      handleTurnBegin(msg);
      break;

    case MSG.TURN_REVEAL:
      handleTurnReveal(msg);
      break;

    case MSG.TURN_TIMEOUT:
      console.log('[Main] Turn timeout (auto-cashout):', msg.forfeitedPlayers);
      break;

    case MSG.ROUND_END:
      handleRoundEnd(msg);
      break;

    case MSG.PLAYER_DISCONNECTED:
      handlePlayerDisconnectNotice(msg);
      break;

    case MSG.PLAYER_RECONNECTED:
      console.log(`[Main] Player reconnected: ${msg.playerId}`);
      break;
  }
}

// ─── Lobby Message Handlers (Host) ───

function handleJoin(msg, fromId) {
  const existingIds = Object.values(players).map(p => p.id);
  const colorIndex = existingIds.length;
  const p = createPlayer(fromId, msg.name, colorIndex);
  players[fromId] = p;

  const list = Object.values(players).map(p => lobbyView(p));
  Net.broadcast(Msg.players(list));
}

function handleReady(fromId) {
  if (players[fromId]) {
    players[fromId].ready = !players[fromId].ready;
    const list = Object.values(players).map(p => lobbyView(p));
    Net.broadcast(Msg.players(list));
  }
}

// ─── Gameplay Handlers ───

function handleTurnBegin(msg) {
  const { isHost } = Net.getState();
  if (isHost) return;

  lockedIn = false;
  selectedTileId = null;

  for (const ap of msg.activePlayers) {
    if (players[ap.id]) {
      players[ap.id].currentTileId = ap.currentTileId;
      players[ap.id].voltage = ap.voltage;
      players[ap.id].status = ap.status;
    }
  }

  HUD.startTimer(msg.timerDeadline, msg.hostTimestamp);
  HUD.resetControls();

  const localPlayer = players[localPlayerId];
  if (localPlayer && isActive(localPlayer)) {
    const validMoves = getValidMoves(board, localPlayer.currentTileId, localPlayer.path);
    SphereRenderer.highlightValidMoves(validMoves);
  } else {
    SphereRenderer.clearHighlights();
    HUD.disableControls();
  }

  updateHudPlayerList();
}

function handleMoveAck(msg) {
  if (msg.ok) {
    lockedIn = true;
    HUD.showLockedIn();      // Handles VFX flash + audio
    SphereRenderer.clearHighlights();
  } else {
    console.warn('[Main] Move rejected:', msg.reason);
    // Reset selection so player can pick again
    selectedTileId = null;
    lockedIn = false;
    HUD.resetControls();
  }
}

function handleTurnReveal(msg) {
  HUD.stopTimer();

  let localResult = null;

  for (const result of msg.results) {
    const player = players[result.playerId];
    if (!player) continue;

    player.voltage = result.totalVoltage;
    player.status = result.status;

    if (result.playerId === localPlayerId) {
      localResult = result;
    }

    if (result.action === ACTION.STEP && result.tileId != null) {
      if (!player.path.includes(result.tileId)) {
        player.path.push(result.tileId);
      }
      player.currentTileId = result.tileId;
      SphereRenderer.updatePlayerMarker(result.playerId, result.tileId, player.color);
      SphereRenderer.drawPlayerPath(result.playerId, player.path, player.color, sceneRefs.sphereGroup);
    }

    if (result.status === STATUS.BUSTED) {
      SphereRenderer.removePlayerMarker(result.playerId);
      if (result.playerId === localPlayerId) Audio.playBust();
    }

    if (result.status === STATUS.CASHED_OUT) {
      player.payout = result.payout;
      if (result.playerId === localPlayerId) Audio.playCashout();
    }
  }

  // Reveal tiles with their types
  for (const tile of (msg.newlyRevealedTiles || [])) {
    SphereRenderer.revealTile(tile.id, tile.tileState);
  }

  // Update local player HUD
  const localPlayer = players[localPlayerId];
  if (localPlayer) {
    HUD.updateVoltage(localPlayer.voltage, localPlayer.bet);
    HUD.updatePhase(localPlayer.deepestZone);

    // Show voltage gain feedback
    if (localResult && localResult.action === ACTION.STEP && localResult.voltageGain > 1) {
      HUD.showVoltageGain(localResult.voltageGain, localResult.tileState);
    }

    // Show payout feedback on cashout
    if (localResult && localResult.status === STATUS.CASHED_OUT && localResult.payout > 0) {
      HUD.showPayoutNotification(localResult.payout);
    }

    // Show bust feedback
    if (localResult && localResult.status === STATUS.BUSTED) {
      HUD.showBustNotification();
    }
  }

  updateHudPlayerList();

  selectedTileId = null;
  lockedIn = false;
}

function handleRoundEnd(msg) {
  gamePhase = PHASE.ENDED;
  HUD.stopTimer();
  SphereRenderer.clearHighlights();
  HUD.disableControls();

  for (const r of msg.results) {
    const player = players[r.id];
    if (!player) continue;
    player.bankroll += (r.payout || 0);
    r.bankroll = player.bankroll;
    r.bet = player.bet;
  }

  const localPlayer = players[localPlayerId];
  if (localPlayer) {
    HUD.updateBankroll(localPlayer.bankroll);
  }

  HUD.showResults(msg.results, msg.leaderboard, localPlayerId);
}

function handleCashout() {
  if (lockedIn) return;
  const localPlayer = players[localPlayerId];
  if (!localPlayer || !isActive(localPlayer)) return;

  Net.sendToHost(Msg.move(null, ACTION.CASHOUT));
  lockedIn = true;
  HUD.showLockedIn();
  SphereRenderer.clearHighlights();
  Audio.playCashout();
}

function handlePlayerLeave(peerId) {
  const { isHost } = Net.getState();
  if (!isHost) return;

  if (players[peerId]) {
    const graceDeadline = Date.now() + 30000;
    players[peerId].connected = false;
    players[peerId].disconnectedAt = Date.now();
    players[peerId].graceDeadline = graceDeadline;
    Net.broadcast(Msg.playerDisconnected(peerId, graceDeadline));
  }
}

function handlePlayerDisconnectNotice(msg) {
  console.log(`[Main] Player disconnected: ${msg.playerId}, grace until: ${new Date(msg.graceDeadline).toLocaleTimeString()}`);
}

function handleDisconnected() {
  console.warn('[Main] Disconnected from network');
}

// ─── Mouse Interaction ───

function onMouseMove(event) {
  if (gamePhase !== PHASE.PLAYING || lockedIn) return;
  const rect = event.target.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function onMouseClick(event) {
  if (gamePhase !== PHASE.PLAYING || lockedIn) return;
  const localPlayer = players[localPlayerId];
  if (!localPlayer || !isActive(localPlayer)) return;

  raycaster.setFromCamera(mouse, sceneRefs.camera);
  const tileId = SphereRenderer.raycastTile(raycaster, sceneRefs.camera, sceneRefs.sphereGroup);

  if (tileId != null) {
    const validMoves = getValidMoves(board, localPlayer.currentTileId, localPlayer.path);
    if (validMoves.includes(tileId)) {
      // Preview selection — don't send to host yet
      selectedTileId = tileId;
      SphereRenderer.selectTile(tileId);
      HUD.showTileSelected();
      Audio.playTick();
    }
  }
}

/**
 * Player clicked LOCK IN — send selected tile to host.
 */
function handleLockIn() {
  if (lockedIn || selectedTileId == null) return;
  const localPlayer = players[localPlayerId];
  if (!localPlayer || !isActive(localPlayer)) return;

  // Now actually send the move
  Net.sendToHost(Msg.move(selectedTileId, ACTION.STEP));
}

// ─── Helpers ───

function updateHudPlayerList() {
  const list = Object.values(players).map(p => ({
    id: p.id,
    name: p.name,
    color: p.color,
    voltage: p.voltage,
    status: p.status,
  }));
  HUD.updatePlayerList(list, localPlayerId);
}

// ─── Export for index.html ───

window.CircuitSphere = { init };
