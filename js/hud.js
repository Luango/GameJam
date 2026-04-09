// ─── Circuit Sphere HUD ───
// DOM-based heads-up display: voltage, timer, player list, phase indicator.

import { STATUS, ZONE } from './protocol.js';
import { getVoltageColor, getZoneColor } from './voltage.js';
import * as Net from './network.js';

// ─── DOM References ───

let hudEl, voltageEl, timerEl, playerListEl, phaseEl;
let cashoutBtn, controlsEl, resultEl;

// ─── State ───

let timerInterval = null;
let currentTimerDeadline = null;

// ─── Callbacks ───

let onCashout = null;
let onTileSelect = null;

// ─── Public API ───

export function init(callbacks = {}) {
  onCashout = callbacks.onCashout || null;
  onTileSelect = callbacks.onTileSelect || null;

  hudEl        = document.getElementById('hud');
  voltageEl    = document.getElementById('voltage-display');
  timerEl      = document.getElementById('timer-display');
  playerListEl = document.getElementById('hud-player-list');
  phaseEl      = document.getElementById('phase-indicator');
  cashoutBtn   = document.getElementById('cashout-btn');
  controlsEl   = document.getElementById('game-controls');
  resultEl     = document.getElementById('result-screen');

  if (cashoutBtn) {
    cashoutBtn.addEventListener('click', () => {
      if (onCashout) onCashout();
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
export function updateVoltage(voltage) {
  if (!voltageEl) return;
  voltageEl.textContent = voltage.toFixed(2) + 'x';
  voltageEl.style.color = getVoltageColor(voltage);
}

/**
 * Start the countdown timer display.
 * @param {number} deadline - Host timestamp when timer expires
 * @param {number} hostTimestamp - Host's Date.now() when turn-begin was sent
 */
export function startTimer(deadline, hostTimestamp) {
  stopTimer();
  currentTimerDeadline = deadline;
  const offset = Net.getClockOffset();

  timerInterval = setInterval(() => {
    const localNow = Date.now();
    const hostNow = localNow + offset;
    const remaining = Math.max(0, currentTimerDeadline - hostNow);
    const seconds = Math.ceil(remaining / 1000);

    if (timerEl) {
      timerEl.textContent = seconds + 's';

      // Color based on urgency
      if (seconds <= 3) {
        timerEl.style.color = '#FF3C1E';
        timerEl.classList.add('timer-urgent');
      } else if (seconds <= 7) {
        timerEl.style.color = '#FF8C00';
        timerEl.classList.remove('timer-urgent');
      } else {
        timerEl.style.color = '#00FFAA';
        timerEl.classList.remove('timer-urgent');
      }
    }

    if (remaining <= 0) {
      stopTimer();
      if (timerEl) timerEl.textContent = '0s';
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
  }
}

/**
 * Reset controls for new turn.
 */
export function resetControls() {
  if (cashoutBtn) {
    cashoutBtn.disabled = false;
    cashoutBtn.textContent = 'CASH OUT';
  }
}

/**
 * Disable controls (player resolved).
 */
export function disableControls() {
  if (cashoutBtn) {
    cashoutBtn.disabled = true;
    cashoutBtn.textContent = 'SPECTATING';
  }
}

/**
 * Show round end results.
 * @param {Array} results - [{id, name, color, finalVoltage, status, payout, rank}]
 * @param {Array} leaderboard - [{id, name, payout, rank}]
 */
export function showResults(results, leaderboard) {
  if (!resultEl) return;
  resultEl.classList.remove('hidden');

  let html = '<h2>ROUND COMPLETE</h2><div class="result-list">';

  for (const entry of leaderboard) {
    const r = results.find(x => x.id === entry.id);
    if (!r) continue;
    const statusLabel = r.status === STATUS.CASHED_OUT ? 'CASHED OUT' :
                        r.status === STATUS.BUSTED ? 'BUSTED' : 'FORFEITED';
    const payoutText = r.payout > 0 ? `$${r.payout.toFixed(2)}` : '$0';

    html += `
      <div class="result-entry ${r.status}">
        <span class="result-rank">#${entry.rank}</span>
        <span class="result-color" style="background:${r.color}"></span>
        <span class="result-name">${r.name}</span>
        <span class="result-voltage">${r.finalVoltage.toFixed(2)}x</span>
        <span class="result-status">${statusLabel}</span>
        <span class="result-payout">${payoutText}</span>
      </div>
    `;
  }

  html += '</div>';
  resultEl.innerHTML = html;
}

export function hideResults() {
  if (resultEl) resultEl.classList.add('hidden');
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
