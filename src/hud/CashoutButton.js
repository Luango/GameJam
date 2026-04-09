import { injectStyles } from './HudStyles.js';
import { on, emit, getLocalPlayerId } from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// CashoutButton — bottom-right panel.
// Shows: current zone name (like "GROUND/CHARGED" from image), win amount, cash-out button.
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
        bottom: 14px;
        right: 14px;
        width: 180px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      #cs-cashout .co-balance-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      #cs-cashout .co-bal-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #475569;
      }

      #cs-cashout .co-bal-val {
        font-family: 'Share Tech Mono', monospace;
        font-size: 12px;
        color: #e2e8f0;
      }

      #cs-win-panel {
        background: rgba(251, 191, 36, 0.1);
        border: 1px solid rgba(251, 191, 36, 0.3);
        border-radius: 4px;
        padding: 6px 10px;
        text-align: center;
      }

      #cs-win-amount {
        font-family: 'Share Tech Mono', monospace;
        font-size: 16px;
        color: #fbbf24;
        text-shadow: 0 0 10px #fbbf2488;
        letter-spacing: 0.04em;
      }

      #cs-win-sub {
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: #78716c;
        margin-top: 2px;
      }

      #cs-zone-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-align: center;
        color: #00c9a7;
        text-shadow: 0 0 12px #00c9a7;
        transition: color 0.4s, text-shadow 0.4s;
        line-height: 1;
      }

      #cs-cashout-sub {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        color: #475569;
        text-align: center;
        letter-spacing: 0.1em;
      }

      #cs-btn-cashout {
        width: 100%;
        padding: 9px 0;
        border: none;
        border-radius: 5px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
        background: linear-gradient(135deg, #0d9488, #0891b2);
        color: #fff;
        box-shadow: 0 0 12px rgba(13,148,136,0.4);
      }

      #cs-btn-cashout:hover:not(:disabled) {
        box-shadow: 0 0 20px rgba(13,148,136,0.7);
        transform: translateY(-1px);
      }

      #cs-btn-cashout:disabled {
        background: #1e293b;
        color: #334155;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }

      #cs-current-win {
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: #475569;
        text-align: center;
        letter-spacing: 0.08em;
      }
    </style>

    <div id="cs-win-panel">
      <div id="cs-win-amount">—</div>
      <div id="cs-win-sub">CURRENT WIN</div>
    </div>

    <div>
      <div id="cs-zone-name">GROUND</div>
      <div id="cs-cashout-sub">CASH OUT</div>
    </div>

    <button id="cs-btn-cashout" disabled>CASH OUT</button>

    <div id="cs-current-win">CURRENT WIN: —</div>
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

  // RenderBridge callbacks
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
    _subwinEl.textContent = 'CURRENT WIN: —';
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
  _zoneEl.style.textShadow = `0 0 12px ${color}`;
}

function _updateWin(bet = 0) {
  const mult = _voltage.toFixed(1);
  if (bet > 0) {
    const win = Math.round(bet * _voltage);
    _winEl.textContent   = `${win.toLocaleString()} CR (${mult}×)`;
    _subwinEl.textContent = `CURRENT WIN: ${win.toLocaleString()} CR`;
  } else {
    _winEl.textContent   = `${mult}×`;
    _subwinEl.textContent = 'PLACE A BET TO SEE WIN';
  }
}
