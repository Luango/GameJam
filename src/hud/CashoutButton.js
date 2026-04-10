import { injectStyles } from './HudStyles.js';
import { on, emit, getLocalHudSlot } from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// CashoutButton — bottom half of the right side panel.
// Shows: current multiplier, win amount, cash-out button.
// Zone name is shown in the zone pill (main.js), not here.

let _active  = false;
let _voltage = 1.0;
let _locked  = false;

let _winEl    = null;
let _multEl   = null;
let _subwinEl = null;
let _btnEl    = null;

export function init(container, { getBet } = {}) {
  injectStyles();

  const panel = document.createElement('div');
  panel.id = 'cs-cashout';
  panel.className = 'cs-panel cs-corner';
  panel.innerHTML = `
    <style>
      #cs-cashout {
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }

      #cs-cashout .co-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-win-panel {
        background: rgba(251, 191, 36, 0.08);
        border: 1px solid rgba(251, 191, 36, 0.25);
        border-radius: 6px;
        padding: 10px 14px;
        text-align: center;
      }

      #cs-win-amount {
        font-family: 'Rajdhani', sans-serif;
        font-size: 22px;
        font-weight: 700;
        color: #fbbf24;
        text-shadow: 0 0 12px #fbbf2455;
        letter-spacing: 0.04em;
        line-height: 1.1;
      }

      #cs-win-mult {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #d4a010;
        margin-top: 2px;
        letter-spacing: 0.06em;
      }

      #cs-btn-cashout {
        width: 100%;
        padding: 10px 0;
        border: none;
        border-radius: 7px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 17px;
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
        color: #64748b;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }

      #cs-current-win {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #94a3b8;
        text-align: center;
        letter-spacing: 0.04em;
      }
    </style>

    <div class="co-title">Cash Out</div>

    <div id="cs-win-panel">
      <div id="cs-win-amount">—</div>
      <div id="cs-win-mult">Multiplier: ×1.0</div>
    </div>

    <button id="cs-btn-cashout" disabled>Cash Out</button>

    <div id="cs-current-win">Place a bet to see your win</div>
  `;

  container.appendChild(panel);

  _winEl    = panel.querySelector('#cs-win-amount');
  _multEl   = panel.querySelector('#cs-win-mult');
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
    _updateWin();
    setActive(true);
  });

  on('onReveal', ({ playerId, voltage }) => {
    if (playerId === getLocalHudSlot()) {
      _voltage = voltage;
      _updateWin(getBet?.());
    }
  });

  on('onBust',    ({ playerId }) => { if (playerId === getLocalHudSlot()) setActive(false); });
  on('onCashout', ({ playerId }) => { if (playerId === getLocalHudSlot()) setActive(false); });

  on('onRoundEnd', () => {
    setActive(false);
    _winEl.textContent    = '—';
    _multEl.textContent   = 'Multiplier: ×1.0';
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

function _updateWin(bet = 0) {
  const mult = _voltage.toFixed(1);
  _multEl.textContent = `Multiplier: ×${mult}`;
  if (bet > 0) {
    const win = Math.round(bet * _voltage);
    _winEl.textContent    = `${win.toLocaleString()} CR`;
    _subwinEl.textContent = `Win if cashed out now: ${win.toLocaleString()} CR`;
  } else {
    _winEl.textContent    = `×${mult}`;
    _subwinEl.textContent = 'Place a bet to see your win';
  }
}
