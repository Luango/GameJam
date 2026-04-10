import { injectStyles } from './HudStyles.js';
import { on, emit, getLocalPlayerId } from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// CashoutButton — right half of the unified bottom panel.
// Shows: current zone name, win amount, cash-out button.
// Active only when round is running and local player hasn't busted/cashed.

let _active    = false;
let _voltage   = 1.0;
let _bet       = 0;
let _zone      = 'safe';
let _locked    = false;

let _zoneEl    = null;
let _winEl     = null;
let _subwinEl  = null;
let _btnEl     = null;

const ZONE_LABELS = { safe: 'GROUND', charged: 'CHARGED', critical: 'CRITICAL' };
const ZONE_COLORS = { safe: '#00c9a7', charged: '#f59e0b', critical: '#ef4444' };

export function init(container, { getBet } = {}) {
  injectStyles();

  const panel = document.createElement('div');
  panel.id = 'cs-cashout';
  panel.className = 'cs-panel cs-corner';
  panel.innerHTML = `
    <style>
      #cs-cashout {
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      #cs-win-panel {
        background: rgba(251, 191, 36, 0.08);
        border: 1px solid rgba(251, 191, 36, 0.25);
        border-radius: 6px;
        padding: 8px 14px;
        text-align: center;
      }

      #cs-win-amount {
        font-family: 'Rajdhani', sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: #fbbf24;
        text-shadow: 0 0 12px #fbbf2466;
        letter-spacing: 0.04em;
        line-height: 1.1;
      }

      #cs-win-sub {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #78716c;
        margin-top: 1px;
        letter-spacing: 0.06em;
      }

      #cs-zone-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-align: center;
        color: #00c9a7;
        text-shadow: 0 0 14px #00c9a7;
        transition: color 0.35s, text-shadow 0.35s;
        line-height: 1;
      }

      #cs-cashout-sub {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #475569;
        text-align: center;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      #cs-btn-cashout {
        width: 100%;
        padding: 12px 0;
        border: none;
        border-radius: 7px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
        background: linear-gradient(135deg, #0d9488, #0891b2);
        color: #fff;
        box-shadow: 0 0 16px rgba(13,148,136,0.45);
      }

      #cs-btn-cashout:hover:not(:disabled) {
        box-shadow: 0 0 28px rgba(13,148,136,0.75);
        transform: translateY(-1px);
      }

      #cs-btn-cashout:disabled {
        background: #1e293b;
        color: #475569;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }

      #cs-current-win {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #475569;
        text-align: center;
        letter-spacing: 0.06em;
      }
    </style>

    <div id="cs-win-panel">
      <div id="cs-win-amount">—</div>
      <div id="cs-win-sub">Current Win</div>
    </div>

    <div>
      <div id="cs-zone-name">GROUND</div>
      <div id="cs-cashout-sub">Current Zone</div>
    </div>

    <button id="cs-btn-cashout" disabled>Cash Out</button>

    <div id="cs-current-win">Place a bet to see your win</div>
  `;

  container.appendChild(panel);

  _zoneEl   = panel.querySelector('#cs-zone-name');
  _winEl    = panel.querySelector('#cs-win-amount');
  _subwinEl = panel.querySelector('#cs-current-win');
  _btnEl    = panel.querySelector('#cs-btn-cashout');

  _btnEl.addEventListener('click', () => {
    if (!_active || _locked) return;
    _locked = true;
    setActive(false);
    emit(ACTIONS.CASHOUT);
  });

  on('onRoundStart', () => {
    _voltage = 1.0;
    _locked  = false;
    _zone    = 'safe';
    _updateZone('safe');
    _updateWin();
    setActive(true);
  });

  on('onReveal', ({ playerId, voltage, type }) => {
    if (playerId === getLocalPlayerId()) {
      _voltage = voltage;
      const zone = type === 'safe' ? 'safe' : type === 'trap' ? 'critical' : 'charged';
      _zone = zone;
      _updateZone(zone);
      _updateWin(getBet?.());
    }
  });

  on('onBust', ({ playerId }) => {
    if (playerId === getLocalPlayerId()) setActive(false);
  });

  on('onCashout', ({ playerId }) => {
    if (playerId === getLocalPlayerId()) setActive(false);
  });

  on('onRoundEnd', () => {
    setActive(false);
    _winEl.textContent = '—';
    _subwinEl.textContent = 'Place a bet to see your win';
  });
}

export function setActive(active) {
  _active = active;
  _btnEl.disabled = !active || _locked;
}

export function lockIn() {
  _locked = true;
  setActive(false);
}

function _updateZone(zone) {
  const label = ZONE_LABELS[zone] ?? 'GROUND';
  const color = ZONE_COLORS[zone] ?? '#00c9a7';
  _zoneEl.textContent = label;
  _zoneEl.style.color = color;
  _zoneEl.style.textShadow = `0 0 14px ${color}`;
}

function _updateWin(bet = 0) {
  const mult = _voltage.toFixed(1);
  if (bet > 0) {
    const win = Math.round(bet * _voltage);
    _winEl.textContent    = `${win.toLocaleString()} CR  ×${mult}`;
    _subwinEl.textContent = `Current Win: ${win.toLocaleString()} CR`;
  } else {
    _winEl.textContent    = `×${mult}`;
    _subwinEl.textContent = 'Place a bet to see your win';
  }
}
