// ─── Circuit Sphere HUD ───
// DOM-based heads-up display: voltage, timer, player list, phase indicator.

import { STATUS, ZONE } from './protocol.js';
import { getVoltageColor, getZoneColor } from './voltage.js';
import * as Net from './network.js';
import * as Audio from './audio.js';

// ─── DOM References ───

let hudEl, voltageEl, timerEl, playerListEl, phaseEl;
let cashoutBtn, lockinBtn, controlsEl, resultEl;
let bankrollEl, betEl, potentialPayoutEl, turnBannerEl;

// ─── State ───

let timerInterval = null;
let currentTimerDeadline = null;
let lastTickSecond = -1;

// ─── Callbacks ───

let onCashout = null;
let onTileSelect = null;
let onLockIn = null;

// ─── Public API ───

export function init(callbacks = {}) {
  onCashout = callbacks.onCashout || null;
  onTileSelect = callbacks.onTileSelect || null;
  onLockIn = callbacks.onLockIn || null;

  hudEl        = document.getElementById('hud');
  voltageEl    = document.getElementById('voltage-display');
  timerEl      = document.getElementById('timer-display');
  playerListEl = document.getElementById('hud-player-list');
  phaseEl      = document.getElementById('phase-indicator');
  cashoutBtn   = document.getElementById('cashout-btn');
  lockinBtn    = document.getElementById('lockin-btn');
  controlsEl   = document.getElementById('game-controls');
  resultEl     = document.getElementById('result-screen');
  bankrollEl   = document.getElementById('hud-bankroll');
  betEl        = document.getElementById('hud-bet');
  potentialPayoutEl = document.getElementById('hud-potential-payout');
  turnBannerEl = document.getElementById('turn-banner');

  if (cashoutBtn) {
    cashoutBtn.addEventListener('click', () => {
      if (onCashout) onCashout();
    });
  }
  if (lockinBtn) {
    lockinBtn.addEventListener('click', () => {
      if (onLockIn) onLockIn();
    });
  }
}

export function show() {
  if (hudEl) hudEl.classList.remove('hidden');
  if (controlsEl) controlsEl.classList.remove('hidden');
}

export function hide() {
  if (hudEl) hudEl.classList.add('hidden');
  if (controlsEl) controlsEl.classList.add('hidden');
  stopTimer();
}

/**
 * Update the voltage display for the local player.
 */
export function updateVoltage(voltage, bet) {
  if (!voltageEl) return;
  voltageEl.textContent = voltage.toFixed(2) + 'x';
  voltageEl.style.color = getVoltageColor(voltage);

  // Update potential payout if bet is provided
  if (bet != null && potentialPayoutEl) {
    const payout = Math.floor(bet * voltage);
    potentialPayoutEl.textContent = payout.toLocaleString();
  }
}

/**
 * Update the bankroll display.
 */
export function updateBankroll(amount) {
  if (bankrollEl) bankrollEl.textContent = amount.toLocaleString();
}

/**
 * Update the bet display.
 */
export function updateBet(amount) {
  if (betEl) betEl.textContent = amount.toLocaleString();
}

/**
 * Start the countdown timer display.
 * @param {number} deadline - Host timestamp when timer expires
 * @param {number} hostTimestamp - Host's Date.now() when turn-begin was sent
 */
export function startTimer(deadline, hostTimestamp) {
  stopTimer();
  currentTimerDeadline = deadline;
  lastTickSecond = -1;
  const offset = Net.getClockOffset();

  // Phase start flash
  if (hudEl) {
    hudEl.classList.add('phase-flash');
    setTimeout(() => hudEl.classList.remove('phase-flash'), 600);
  }

  timerInterval = setInterval(() => {
    const localNow = Date.now();
    const hostNow = localNow + offset;
    const remaining = Math.max(0, currentTimerDeadline - hostNow);
    const seconds = Math.ceil(remaining / 1000);

    if (timerEl) {
      timerEl.textContent = seconds + 's';

      // Color + urgency
      if (seconds <= 3) {
        timerEl.style.color = '#FF3C1E';
        timerEl.classList.add('timer-urgent');
        timerEl.classList.remove('timer-warning');
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
 * Update the player list in the HUD.
 * @param {Array} players - [{id, name, color, voltage, status}]
 * @param {string} localPlayerId - ID of the local player
 */
export function updatePlayerList(players, localPlayerId) {
  if (!playerListEl) return;
  playerListEl.innerHTML = '';

  for (const p of players) {
    const div = document.createElement('div');
    div.className = 'hud-player';
    if (p.id === localPlayerId) div.classList.add('local-player');
    if (p.status === STATUS.BUSTED) div.classList.add('busted');
    if (p.status === STATUS.CASHED_OUT) div.classList.add('cashed-out');

    const statusIcon = getStatusIcon(p.status);
    const voltageText = p.voltage ? p.voltage.toFixed(2) + 'x' : '1.00x';

    div.innerHTML = `
      <span class="hud-color-dot" style="background:${p.color}"></span>
      <span class="hud-player-name">${p.name}</span>
      <span class="hud-player-voltage" style="color:${getVoltageColor(p.voltage || 1)}">${voltageText}</span>
      <span class="hud-player-status">${statusIcon}</span>
    `;
    playerListEl.appendChild(div);
  }
}

/**
 * Update the zone/phase indicator.
 */
export function updatePhase(zone) {
  if (!phaseEl) return;
  const labels = {
    [ZONE.SAFE]: 'SAFE ZONE',
    [ZONE.CHARGED]: 'CHARGED ZONE',
    [ZONE.CRITICAL]: 'CRITICAL ZONE',
  };
  phaseEl.textContent = labels[zone] || '';
  phaseEl.style.color = getZoneColor(zone);
}

/**
 * Show "locked in" indicator.
 */
export function showLockedIn() {
  if (cashoutBtn) {
    cashoutBtn.disabled = true;
    cashoutBtn.textContent = 'LOCKED IN';
    cashoutBtn.classList.remove('btn-ready');
  }
  if (lockinBtn) {
    lockinBtn.disabled = true;
    lockinBtn.textContent = 'LOCKED';
    lockinBtn.classList.remove('btn-pulse');
    lockinBtn.classList.add('hidden');
  }

  // Screen flash VFX
  playLockInFlash();
  Audio.playLockIn();
}

/**
 * Brief screen flash on lock-in.
 */
function playLockInFlash() {
  if (!hudEl) return;
  const flash = document.createElement('div');
  flash.className = 'lockin-flash';
  hudEl.appendChild(flash);
  setTimeout(() => flash.remove(), 400);
}

/**
 * Reset controls for new turn — show "YOUR MOVE" banner and pulse button.
 */
export function resetControls() {
  if (cashoutBtn) {
    cashoutBtn.disabled = false;
    cashoutBtn.textContent = 'CASH OUT';
    cashoutBtn.classList.add('btn-ready');
  }
  if (lockinBtn) {
    lockinBtn.classList.add('hidden');
    lockinBtn.disabled = false;
    lockinBtn.textContent = 'LOCK IN';
    lockinBtn.classList.remove('btn-pulse');
  }

  // Show "YOUR MOVE" banner
  if (turnBannerEl) {
    turnBannerEl.classList.remove('hidden');
    const clone = turnBannerEl.cloneNode(true);
    turnBannerEl.parentNode.replaceChild(clone, turnBannerEl);
    turnBannerEl = clone;
    setTimeout(() => {
      turnBannerEl.classList.add('hidden');
    }, 1200);
  }

  Audio.playTurnStart();
}

/**
 * Show that a tile has been selected (not yet locked).
 * Reveals the LOCK IN button with a pulse.
 */
export function showTileSelected() {
  if (lockinBtn) {
    lockinBtn.classList.remove('hidden');
    lockinBtn.classList.add('btn-pulse');
    lockinBtn.disabled = false;
    lockinBtn.textContent = 'LOCK IN';
  }
  // Hide the ready pulse on cashout since player picked a tile
  if (cashoutBtn) {
    cashoutBtn.classList.remove('btn-ready');
  }
}

/**
 * Disable controls (player resolved).
 */
export function disableControls() {
  if (cashoutBtn) {
    cashoutBtn.disabled = true;
    cashoutBtn.textContent = 'SPECTATING';
    cashoutBtn.classList.remove('btn-ready');
  }
  if (lockinBtn) {
    lockinBtn.classList.add('hidden');
    lockinBtn.classList.remove('btn-pulse');
  }
}

/**
 * Show round end results with per-player bets.
 * @param {Array} results - [{id, name, color, finalVoltage, status, payout, bet, bankroll}]
 * @param {Array} leaderboard - [{id, name, payout, rank}]
 * @param {string} localPlayerId - ID of the local player
 */
export function showResults(results, leaderboard, localPlayerId) {
  if (!resultEl) return;
  resultEl.classList.remove('hidden');

  let html = '<h2>ROUND COMPLETE</h2><div class="result-list">';

  for (const entry of leaderboard) {
    const r = results.find(x => x.id === entry.id);
    if (!r) continue;
    const playerBet = r.bet || 100;
    const statusLabel = r.status === STATUS.CASHED_OUT ? 'CASHED OUT' :
                        r.status === STATUS.BUSTED ? 'BUSTED' : 'FORFEITED';
    const payoutText = r.payout > 0 ? `${Math.floor(r.payout).toLocaleString()}` : '0';
    const profit = r.payout > 0 ? Math.floor(r.payout) - playerBet : -playerBet;
    const profitClass = profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : '';
    const profitText = profit >= 0 ? `+${profit.toLocaleString()}` : profit.toLocaleString();

    html += `
      <div class="result-entry ${r.status}">
        <span class="result-rank">#${entry.rank}</span>
        <span class="result-color" style="background:${r.color}"></span>
        <span class="result-name">${r.name}</span>
        <span class="result-voltage">${r.finalVoltage.toFixed(2)}x</span>
        <span class="result-status">${statusLabel}</span>
        <span class="result-payout">${payoutText}</span>
        <span class="result-profit ${profitClass}">${profitText}</span>
      </div>
    `;
  }

  html += '</div>';

  // Show local player's updated bankroll
  const localResult = results.find(r => r.id === localPlayerId);
  if (localResult && localResult.bankroll != null) {
    html += `<div class="result-bankroll">BANKROLL: <span>${Math.floor(localResult.bankroll).toLocaleString()}</span></div>`;
  }

  resultEl.innerHTML = html;
}

export function hideResults() {
  if (resultEl) resultEl.classList.add('hidden');
}

/**
 * Show floating voltage gain notification.
 * @param {number} gain - Voltage gained this step
 * @param {string} tileState - 'safe' | 'reward'
 */
export function showVoltageGain(gain, tileState) {
  if (!hudEl) return;
  const el = document.createElement('div');
  el.className = 'voltage-gain-popup';
  if (tileState === 'reward') el.classList.add('reward-gain');
  el.textContent = `+${gain.toFixed(2)}x`;
  hudEl.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

/**
 * Show payout notification when player cashes out.
 * @param {number} payout - Amount won
 */
export function showPayoutNotification(payout) {
  if (!hudEl) return;
  const el = document.createElement('div');
  el.className = 'payout-popup';
  el.textContent = `CASHED OUT: ${Math.floor(payout).toLocaleString()}`;
  hudEl.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

/**
 * Show bust notification.
 */
export function showBustNotification() {
  if (!hudEl) return;
  const el = document.createElement('div');
  el.className = 'bust-popup';
  el.textContent = 'BUSTED!';
  hudEl.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

// ─── Internal ───

function getStatusIcon(status) {
  switch (status) {
    case STATUS.ACTIVE:     return '&#9889;';  // ⚡
    case STATUS.BUSTED:     return '&#10060;';  // ❌
    case STATUS.CASHED_OUT: return '&#9989;';   // ✅
    case STATUS.FORFEITED:  return '&#8987;';   // ⏳
    default:                return '';
  }
}
