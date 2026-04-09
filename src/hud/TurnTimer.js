import { injectStyles } from './HudStyles.js';
import { on, emit } from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// TurnTimer — SVG countdown ring, top-center.
// Authority: P1 sends onTimerSync every second; P2 interpolates between ticks.
// On zero: emits LOCK_IN to P1, disables cashout.

const DEFAULT_DURATION = 30;
const URGENCY_THRESHOLD = 5; // seconds

let _duration  = DEFAULT_DURATION;
let _remaining = DEFAULT_DURATION;
let _running   = false;
let _lastSyncTime = 0;
let _lastSyncRemaining = DEFAULT_DURATION;
let _raf = null;

// External callback so CashoutButton can disable on lock
let _onLock = null;

let _ringEl    = null;
let _textEl    = null;
let _labelEl   = null;
let _panelEl   = null;

const RADIUS = 28;
const CIRC   = 2 * Math.PI * RADIUS;

export function init(container, { onLock } = {}) {
  injectStyles();
  _onLock = onLock ?? null;

  const panel = document.createElement('div');
  panel.id = 'cs-timer';
  panel.className = 'cs-panel';
  panel.innerHTML = `
    <style>
      #cs-timer {
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        min-width: 100px;
      }

      #cs-timer .t-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #475569;
      }

      #cs-timer svg { display: block; overflow: visible; }

      #cs-timer-track {
        fill: none;
        stroke: #1e293b;
        stroke-width: 4;
      }

      #cs-timer-ring {
        fill: none;
        stroke: #00c9a7;
        stroke-width: 4;
        stroke-linecap: round;
        stroke-dasharray: ${CIRC};
        stroke-dashoffset: 0;
        transform: rotate(-90deg);
        transform-origin: 36px 36px;
        transition: stroke-dashoffset 0.4s linear, stroke 0.3s;
        filter: drop-shadow(0 0 4px #00c9a7);
      }

      #cs-timer-ring.urgent {
        stroke: #ef4444;
        filter: drop-shadow(0 0 6px #ef4444);
        animation: timer-pulse 0.5s ease-in-out infinite alternate;
      }

      @keyframes timer-pulse {
        from { filter: drop-shadow(0 0 4px #ef4444); }
        to   { filter: drop-shadow(0 0 12px #ef4444); }
      }

      #cs-timer-text {
        font-family: 'Share Tech Mono', monospace;
        font-size: 14px;
        fill: #e2e8f0;
        text-anchor: middle;
        dominant-baseline: middle;
      }

      #cs-timer-text.urgent { fill: #ef4444; }

      #cs-turn-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #38bdf8;
        text-align: center;
      }
    </style>

    <div class="t-label">Turn Timer</div>
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle id="cs-timer-track" cx="36" cy="36" r="${RADIUS}" />
      <circle id="cs-timer-ring"  cx="36" cy="36" r="${RADIUS}" />
      <text   id="cs-timer-text"  x="36"  y="36">${DEFAULT_DURATION}</text>
    </svg>
    <div id="cs-turn-label">Waiting…</div>
  `;

  container.appendChild(panel);
  _panelEl  = panel;
  _ringEl   = panel.querySelector('#cs-timer-ring');
  _textEl   = panel.querySelector('#cs-timer-text');
  _labelEl  = panel.querySelector('#cs-turn-label');

  // RenderBridge callbacks
  on('onRoundStart', ({ timerDuration }) => {
    start(timerDuration ?? DEFAULT_DURATION);
  });

  on('onTimerSync', ({ remaining }) => {
    sync(remaining);
  });

  on('onRoundEnd', () => {
    _running = false;
    _setDisplay(0);
    _labelEl.textContent = 'Round Over';
  });
}

export function start(duration) {
  _duration  = duration;
  _remaining = duration;
  _lastSyncTime = performance.now();
  _lastSyncRemaining = duration;
  _running   = true;
  _labelEl.textContent = 'Your Turn';
  _tick();
}

export function sync(remaining) {
  _lastSyncTime = performance.now();
  _lastSyncRemaining = remaining;
  _remaining = remaining;
  _setDisplay(remaining);
}

function _tick() {
  if (!_running) return;

  const now = performance.now();
  const elapsed = (now - _lastSyncTime) / 1000;
  const interpolated = Math.max(0, _lastSyncRemaining - elapsed);

  _setDisplay(interpolated);

  if (interpolated <= 0) {
    _running = false;
    _onLock?.();
    emit(ACTIONS.LOCK_IN);
    _labelEl.textContent = 'Locked In';
    return;
  }

  _raf = requestAnimationFrame(_tick);
}

function _setDisplay(remaining) {
  const pct = Math.max(0, Math.min(1, remaining / _duration));
  const offset = CIRC * (1 - pct);
  _ringEl.style.strokeDashoffset = offset;

  const seconds = Math.ceil(remaining);
  _textEl.textContent = seconds;

  const urgent = remaining <= URGENCY_THRESHOLD;
  _ringEl.classList.toggle('urgent', urgent);
  _textEl.classList.toggle('urgent', urgent);
}
