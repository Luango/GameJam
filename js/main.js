// ─── Circuit Sphere Main ───
// Game orchestrator: state machine, init, render loop, message routing.

import { MSG, ACTION, STATUS, PHASE, Msg } from './protocol.js';
import * as Net from './network.js';
import * as LobbyUI from './lobby-ui.js';
import * as HUD from './hud.js';
import * as Scene from './scene.js';
import * as SphereRenderer from './sphere-renderer.js';
import { generateBoard, DEFAULT_CONFIG, getValidMoves, pickStartTiles } from './board.js';
import { createTurnManager } from './turn-manager.js';
import {
  createPlayer, resetPlayerForRound, lobbyView, serializePlayer,
  isActive, isResolved, PLAYER_COLORS
} from './player.js';

// ─── Game State ───

let gamePhase = PHASE.LOBBY;
let board = null;
let players = {};          // id -> player object
let localPlayerId = null;
let turnManager = null;
let config = null;
let selectedTileId = null;
let lockedIn = false;

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

  // Init UI
  LobbyUI.init({
    onGameStart: handleLobbyGameStart,
  });

  HUD.init({
    onCashout: handleCashout,
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
    // Host: generate board and start game
    startGame();
  } else if (msg.type === MSG.GAME_START) {
    // Client: received game-start from host
    onGameStartReceived(msg);
  }
}

/**
 * Host: generate board, assign start tiles, broadcast game-start.
 */
function startGame() {
  const { isHost, myId } = Net.getState();
  if (!isHost) return;

  const seed = Math.floor(Math.random() * 2147483647);
  config = { ...DEFAULT_CONFIG };

  // Generate board
  board = generateBoard(seed, config);

  // Build player objects from lobby list
  const lobbyPlayers = LobbyUI.getPlayers();
  const startTiles = pickStartTiles(board, lobbyPlayers.length);

  const playerOrder = lobbyPlayers.map((p, i) => ({
    id: p.id,
    name: p.name,
    color: PLAYER_COLORS[i % PLAYER_COLORS.length],
    startTileId: startTiles[i],
  }));

  // Initialize local player map
  players = {};
  for (const po of playerOrder) {
    const p = createPlayer(po.id, po.name, playerOrder.indexOf(po));
    resetPlayerForRound(p, po.startTileId);
    players[po.id] = p;
  }

  localPlayerId = myId;

  // Broadcast game-start with full board data
  Net.broadcast(Msg.gameStart({
    seed,
    board,
    playerOrder,
    config: {
      turnTimerMs: config.turnTimerMs,
      voltageRates: config.voltageRates,
      trapDensity: config.trapDensity,
    },
  }));

  // Set up game locally
  setupGame(board, playerOrder, config);

  // Start turn manager
  turnManager = createTurnManager({
    broadcast: Net.broadcast,
    sendToPeer: Net.sendToPeer,
    onTurnReveal: handleTurnReveal,
    onRoundEnd: handleRoundEnd,
    turnTimerMs: config.turnTimerMs,
  });
  turnManager.init(board, players, config);
  turnManager.beginTurn();
}

/**
 * Client: received game-start from host.
 */
function onGameStartReceived(msg) {
  const { myId } = Net.getState();

  board = msg.board;
  config = msg.config;
  localPlayerId = myId;

  // Build player objects
  players = {};
  for (const po of msg.playerOrder) {
    const p = createPlayer(po.id, po.name, msg.playerOrder.indexOf(po));
    resetPlayerForRound(p, po.startTileId);
    players[po.id] = p;
  }

  setupGame(board, msg.playerOrder, config);
}

/**
 * Common game setup (both host and client).
 */
function setupGame(boardData, playerOrder, gameConfig) {
  gamePhase = PHASE.PLAYING;

  // Hide lobby, show HUD
  LobbyUI.hide();
  HUD.show();

  // Build 3D hex tiles
  SphereRenderer.buildTileMeshes(boardData, sceneRefs.sphereGroup);

  // Place player markers at start positions
  for (const po of playerOrder) {
    SphereRenderer.updatePlayerMarker(po.id, po.startTileId, po.color);
  }

  // Update HUD
  const localPlayer = players[localPlayerId];
  if (localPlayer) {
    HUD.updateVoltage(localPlayer.voltage);
    HUD.updatePhase(localPlayer.deepestZone);
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

  // Route gameplay messages
  const { isHost, myId } = Net.getState();

  switch (msg.type) {
    case MSG.JOIN:
      if (isHost) handleJoin(msg, fromId);
      break;

    case MSG.READY:
      if (isHost) handleReady(fromId);
      break;

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
      // Display timeout info
      console.log('[Main] Turn timeout:', msg.forfeitedPlayers);
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

  // Broadcast updated player list
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
  if (isHost) return; // Host already knows

  lockedIn = false;
  selectedTileId = null;

  // Update player states from turn-begin data
  for (const ap of msg.activePlayers) {
    if (players[ap.id]) {
      players[ap.id].currentTileId = ap.currentTileId;
      players[ap.id].voltage = ap.voltage;
      players[ap.id].status = ap.status;
    }
  }

  // Start timer display
  HUD.startTimer(msg.timerDeadline, msg.hostTimestamp);
  HUD.resetControls();

  // Show valid moves for local player
  const localPlayer = players[localPlayerId];
  if (localPlayer && isActive(localPlayer)) {
    const validMoves = getValidMoves(board, localPlayer.currentTileId);
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
    HUD.showLockedIn();
    SphereRenderer.clearHighlights();
    if (selectedTileId != null) {
      SphereRenderer.selectTile(selectedTileId);
    }
  } else {
    console.warn('[Main] Move rejected:', msg.reason);
    // Reset selection
    selectedTileId = null;
    lockedIn = false;
  }
}

function handleTurnReveal(msg) {
  HUD.stopTimer();

  // Process results
  for (const result of msg.results) {
    const player = players[result.playerId];
    if (!player) continue;

    player.voltage = result.totalVoltage;
    player.status = result.status;

    if (result.action === ACTION.STEP && result.tileId != null) {
      // Update path
      if (!player.path.includes(result.tileId)) {
        player.path.push(result.tileId);
      }
      player.currentTileId = result.tileId;

      // Update marker
      SphereRenderer.updatePlayerMarker(result.playerId, result.tileId, player.color);

      // Draw path
      SphereRenderer.drawPlayerPath(result.playerId, player.path, player.color, sceneRefs.sphereGroup);
    }

    if (result.status === STATUS.BUSTED) {
      SphereRenderer.removePlayerMarker(result.playerId);
    }

    if (result.status === STATUS.CASHED_OUT) {
      player.payout = result.payout;
    }
  }

  // Reveal tiles
  for (const tile of (msg.newlyRevealedTiles || [])) {
    SphereRenderer.revealTile(tile.id, tile.tileState);
  }

  // Update HUD
  const localPlayer = players[localPlayerId];
  if (localPlayer) {
    HUD.updateVoltage(localPlayer.voltage);
  }
  updateHudPlayerList();

  // Reset selection state for next turn
  selectedTileId = null;
  lockedIn = false;
}

function handleRoundEnd(msg) {
  gamePhase = PHASE.ENDED;
  HUD.stopTimer();
  SphereRenderer.clearHighlights();
  HUD.disableControls();
  HUD.showResults(msg.results, msg.leaderboard);
}

function handleCashout() {
  if (lockedIn) return;
  const localPlayer = players[localPlayerId];
  if (!localPlayer || !isActive(localPlayer)) return;

  Net.sendToHost(Msg.move(null, ACTION.CASHOUT));
  lockedIn = true;
  HUD.showLockedIn();
  SphereRenderer.clearHighlights();
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
  // Could show a reconnect UI here
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

  // Raycast to find clicked tile
  raycaster.setFromCamera(mouse, sceneRefs.camera);
  const tileId = SphereRenderer.raycastTile(raycaster, sceneRefs.camera, sceneRefs.sphereGroup);

  if (tileId != null) {
    // Check if it's a valid move
    const validMoves = getValidMoves(board, localPlayer.currentTileId);
    if (validMoves.includes(tileId)) {
      selectedTileId = tileId;
      // Send move to host
      Net.sendToHost(Msg.move(tileId, ACTION.STEP));
    }
  }
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
