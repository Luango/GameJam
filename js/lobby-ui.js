// ─── Circuit Sphere Lobby UI ───
// Manages lobby DOM: create/join room, room code display, player list, ready-up.

import * as Net from './network.js';
import { MSG, Msg } from './protocol.js';
import { PLAYER_COLORS, INITIAL_BANKROLL } from './player.js';

// ─── DOM References ───

let lobbyEl, menuEl, joinSectionEl, roomSectionEl;
let createBtn, joinShowBtn, joinInput, joinBtn, backBtn, startBtn, readyBtn;
let roomCodeDisplay, playerListEl, statusEl, nameInput;

// ─── Callbacks ───

let onGameStart = null;

// ─── State ───

let players = [];
let localReady = false;

// ─── Public API ───

export function init(callbacks = {}) {
  onGameStart = callbacks.onGameStart || null;

  // Grab DOM elements
  lobbyEl         = document.getElementById('lobby');
  menuEl          = document.getElementById('lobby-menu');
  joinSectionEl   = document.getElementById('join-section');
  roomSectionEl   = document.getElementById('room-section');
  createBtn       = document.getElementById('create-btn');
  joinShowBtn     = document.getElementById('join-show-btn');
  joinInput       = document.getElementById('join-input');
  joinBtn         = document.getElementById('join-btn');
  backBtn         = document.getElementById('back-btn');
  startBtn        = document.getElementById('start-btn');
  readyBtn        = document.getElementById('ready-btn');
  roomCodeDisplay = document.getElementById('room-code-display');
  playerListEl    = document.getElementById('player-list');
  statusEl        = document.getElementById('lobby-status');
  nameInput       = document.getElementById('name-input');

  // Bind events
  createBtn.addEventListener('click', handleCreate);
  joinShowBtn.addEventListener('click', handleJoinShow);
  joinBtn.addEventListener('click', handleJoin);
  backBtn.addEventListener('click', handleBack);
  startBtn.addEventListener('click', handleStart);
  readyBtn.addEventListener('click', handleReady);
}

export function show() {
  lobbyEl.classList.remove('hidden');
  menuEl.classList.remove('hidden');
  joinSectionEl.classList.add('hidden');
  roomSectionEl.classList.add('hidden');
  startBtn.classList.add('hidden');
  localReady = false;
}

export function hide() {
  lobbyEl.classList.add('hidden');
}

/**
 * Handle incoming network messages related to lobby.
 */
export function handleMessage(msg) {
  switch (msg.type) {
    case MSG.PLAYERS:
      players = msg.list;
      renderPlayerList();
      updateStartButton();
      break;

    case MSG.GAME_START:
      hide();
      if (onGameStart) onGameStart(msg);
      break;
  }
}

export function getPlayers() {
  return players;
}

// ─── Internal ───

function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

function getPlayerName() {
  return (nameInput && nameInput.value.trim()) || ('Player ' + Math.floor(Math.random() * 999));
}

async function handleCreate() {
  const name = getPlayerName();
  setStatus('Creating room...');

  try {
    const code = await Net.createRoom(name);
    showRoom(code);
    setStatus('Waiting for players...');

    // Add self to players list
    const { myId } = Net.getState();
    players = [{ id: myId, name, ready: false, color: PLAYER_COLORS[0] }];
    renderPlayerList();
  } catch (err) {
    setStatus('Failed to create room: ' + err.type);
  }
}

function handleJoinShow() {
  menuEl.classList.add('hidden');
  joinSectionEl.classList.remove('hidden');
  setStatus('');
}

function handleBack() {
  joinSectionEl.classList.add('hidden');
  menuEl.classList.remove('hidden');
}

async function handleJoin() {
  const code = joinInput.value.trim().toUpperCase();
  if (code.length < 3) {
    setStatus('Enter a valid room code');
    return;
  }

  const name = getPlayerName();
  setStatus('Connecting...');

  try {
    await Net.joinRoom(code, name);
    showRoom(code);
    setStatus('Connected! Waiting for host to start...');
  } catch (err) {
    setStatus('Failed to join: ' + (err.type || err.message));
  }
}

function showRoom(code) {
  menuEl.classList.add('hidden');
  joinSectionEl.classList.add('hidden');
  roomSectionEl.classList.remove('hidden');
  roomCodeDisplay.textContent = code;
}

function handleReady() {
  localReady = !localReady;
  readyBtn.textContent = localReady ? 'UNREADY' : 'READY';
  readyBtn.classList.toggle('ready-active', localReady);
  Net.sendToHost(Msg.ready());
}

function handleStart() {
  const { isHost } = Net.getState();
  if (!isHost || players.length < 2) return;

  // Signal main.js that start was requested (triggers betting phase)
  if (onGameStart) onGameStart({ type: 'start-requested' });
}

function renderPlayerList() {
  if (!playerListEl) return;
  playerListEl.innerHTML = '';

  players.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'player-item';

    const colorDot = `<span class="color-dot" style="background:${p.color}"></span>`;
    const readyBadge = p.ready ? '<span class="ready-badge">READY</span>' : '';
    const hostBadge = i === 0 ? '<span class="host-badge">HOST</span>' : '';

    div.innerHTML = `${colorDot}<span class="player-name">${p.name}</span>${hostBadge}${readyBadge}`;
    playerListEl.appendChild(div);
  });
}

function updateStartButton() {
  const { isHost } = Net.getState();
  if (!startBtn) return;

  if (isHost && players.length >= 2) {
    // Check if all non-host players are ready
    const allReady = players.slice(1).every(p => p.ready);
    startBtn.classList.toggle('hidden', !allReady);
  } else {
    startBtn.classList.add('hidden');
  }
}
