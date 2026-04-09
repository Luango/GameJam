// ─── Circuit Sphere Betting UI ───
// Manages the betting phase overlay: bet selection, countdown timer, player bet status.

import { INITIAL_BANKROLL } from './player.js';
import * as Net from './network.js';
import * as Audio from './audio.js';

// ─── DOM References ───

let phaseEl, bankrollEl, betDisplay, betDecBtn, betIncBtn, placeBetBtn;
let playerListEl, statusEl, timerEl;

// ─── Callbacks ───

let onBetSubmit = null;
let onTimerExpired = null;

// ─── State ───

let currentBet = 100;
let playerBankroll = INITIAL_BANKROLL;
let locked = false;
let timerInterval = null;
let lastTickSecond = -1;
const BET_OPTIONS = [50, 100, 250, 500, 1000];

// ─── Public API ───

export function init(callbacks = {}) {
  onBetSubmit = callbacks.onBetSubmit || null;
  onTimerExpired = callbacks.onTimerExpired || null;

  phaseEl      = document.getElementById('betting-phase');
  bankrollEl   = document.getElementById('betting-bankroll');
  betDisplay   = document.getElementById('bet-display');
  betDecBtn    = document.getElementById('bet-dec-btn');
  betIncBtn    = document.getElementById('bet-inc-btn');
  placeBetBtn  = document.getElementById('place-bet-btn');
  playerListEl = document.getElementById('betting-player-list');
  statusEl     = document.getElementById('betting-status');
  timerEl      = document.getElementById('betting-timer');

  if (betDecBtn) betDecBtn.addEventListener('click', () => changeBet(-1));
  if (betIncBtn) betIncBtn.addEventListener('click', () => changeBet(1));
  if (placeBetBtn) placeBetBtn.addEventListener('click', handlePlaceBet);
}

/**
 * Show the betting phase overlay.
 * @param {number} bankroll - Player's current bankroll
 */
export function show(bankroll) {
  playerBankroll = bankroll;
  currentBet = 100;
  locked = false;
  lastTickSecond = -1;

  // Ensure default bet doesn't exceed bankroll
  while (currentBet > playerBankroll && currentBet > BET_OPTIONS[0]) {
    const idx = BET_OPTIONS.indexOf(currentBet);
    currentBet = BET_OPTIONS[Math.max(0, idx - 1)];
  }

  updateBetDisplay();
  updateBankrollDisplay();

  if (placeBetBtn) {
    placeBetBtn.disabled = false;
    placeBetBtn.textContent = 'PLACE BET';
  }
  if (statusEl) statusEl.textContent = '';
  if (playerListEl) playerListEl.innerHTML = '';
  if (timerEl) {
    timerEl.textContent = '20s';
    timerEl.style.color = '#00FFAA';
    timerEl.classList.remove('timer-urgent');
  }
  if (phaseEl) {
    phaseEl.classList.remove('hidden');
    phaseEl.classList.add('phase-flash');
    setTimeout(() => phaseEl.classList.remove('phase-flash'), 600);
  }
}

export function hide() {
  stopTimer();
  if (phaseEl) phaseEl.classList.add('hidden');
}

/**
 * Start the betting countdown timer.
 * @param {number} deadline - Host timestamp when timer expires
 * @param {number} hostTimestamp - Host's Date.now() when bet phase started
 */
export function startTimer(deadline, hostTimestamp) {
  stopTimer();
  lastTickSecond = -1;
  const offset = Net.getClockOffset();

  timerInterval = setInterval(() => {
    const localNow = Date.now();
    const hostNow = localNow + offset;
    const remaining = Math.max(0, deadline - hostNow);
    const seconds = Math.ceil(remaining / 1000);

    if (timerEl) {
      timerEl.textContent = seconds + 's';

      // Color + urgency
      if (seconds <= 3) {
        timerEl.style.color = '#FF3C1E';
        timerEl.classList.add('timer-urgent');
      } else if (seconds <= 5) {
        timerEl.style.color = '#FF8C00';
        timerEl.classList.remove('timer-urgent');
        timerEl.classList.add('timer-warning');
      } else {
        timerEl.style.color = '#00FFAA';
        timerEl.classList.remove('timer-urgent');
        timerEl.classList.remove('timer-warning');
      }
    }

    // Audio feedback per second
    if (seconds !== lastTickSecond && seconds > 0) {
      lastTickSecond = seconds;
      if (seconds <= 3) {
        Audio.playUrgent();
      } else if (seconds <= 5) {
        Audio.playWarning();
      } else {
        Audio.playTick();
      }
    }

    if (remaining <= 0) {
      stopTimer();
      if (timerEl) timerEl.textContent = '0s';
      Audio.playTimeUp();

      // Auto-expire: if not locked, notify timeout
      if (!locked && onTimerExpired) {
        onTimerExpired();
      }
    }
  }, 100);
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/**
 * Update the player bet status list.
 * @param {Array} players - [{id, name, color, hasBet}]
 */
export function updatePlayerBets(players) {
  if (!playerListEl) return;
  playerListEl.innerHTML = '';

  for (const p of players) {
    const div = document.createElement('div');
    div.className = 'betting-player-item' + (p.hasBet ? ' bet-placed' : '');
    const icon = p.hasBet ? '&#9989;' : '&#8987;';
    div.innerHTML = `
      <span class="color-dot" style="background:${p.color}"></span>
      <span class="player-name">${p.name}</span>
      <span class="bet-status-icon">${icon}</span>
    `;
    playerListEl.appendChild(div);
  }
}

export function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

// ─── Internal ───

function handlePlaceBet() {
  if (locked) return;
  if (currentBet > playerBankroll) return;

  locked = true;
  if (placeBetBtn) {
    placeBetBtn.disabled = true;
    placeBetBtn.textContent = 'BET PLACED';
  }
  if (betDecBtn) betDecBtn.disabled = true;
  if (betIncBtn) betIncBtn.disabled = true;

  Audio.playBetPlaced();
  if (onBetSubmit) onBetSubmit(currentBet);
}

function changeBet(direction) {
  if (locked) return;
  const idx = BET_OPTIONS.indexOf(currentBet);
  const newIdx = Math.max(0, Math.min(BET_OPTIONS.length - 1, idx + direction));
  const newBet = BET_OPTIONS[newIdx];

  if (newBet > playerBankroll) return;

  currentBet = newBet;
  updateBetDisplay();
}

function updateBetDisplay() {
  if (betDisplay) betDisplay.textContent = currentBet;
  const idx = BET_OPTIONS.indexOf(currentBet);
  if (betDecBtn) betDecBtn.disabled = locked || idx === 0;
  if (betIncBtn) {
    const nextBet = idx < BET_OPTIONS.length - 1 ? BET_OPTIONS[idx + 1] : Infinity;
    betIncBtn.disabled = locked || idx === BET_OPTIONS.length - 1 || nextBet > playerBankroll;
  }
}

function updateBankrollDisplay() {
  if (bankrollEl) bankrollEl.textContent = playerBankroll.toLocaleString();
}
