import { injectStyles } from './HudStyles.js';
import { on, emit } from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// BetInput — left half of the unified bottom panel.
// Locked once onRoundStart fires.
// Exposes getBet() so CashoutButton can calculate win amounts.

let _bet     = 0;
let _locked  = false;
let _inputEl = null;
let _btnEl   = null;
let _panelEl = null;
let _infoEl  = null;

export function init(container) {
  injectStyles();

  const panel = document.createElement('div');
  panel.id = 'cs-bet';
  panel.className = 'cs-panel';
  panel.innerHTML = `
    <style>
      #cs-bet {
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        transition: opacity 0.3s;
        min-width: 0;
      }

      #cs-bet.locked { opacity: 0.45; pointer-events: none; }

      #cs-bet .bet-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-bet .bet-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      #cs-bet-input {
        flex: 1;
        min-width: 0;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(0,201,167,0.3);
        border-radius: 6px;
        color: #e2e8f0;
        font-family: 'Rajdhani', sans-serif;
        font-size: 18px;
        font-weight: 600;
        padding: 8px 12px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      #cs-bet-input:focus {
        border-color: rgba(0,201,167,0.65);
        box-shadow: 0 0 10px rgba(0,201,167,0.2);
      }
      #cs-bet-input::placeholder {
        color: #64748b;
        font-weight: 600;
      }

      .bet-quick {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .bet-chip {
        font-family: 'Rajdhani', sans-serif;
        font-size: 13px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 4px;
        border: 1px solid rgba(0,201,167,0.25);
        background: rgba(0,201,167,0.06);
        color: #64748b;
        cursor: pointer;
        transition: all 0.15s;
        white-space: nowrap;
      }
      .bet-chip:hover {
        background: rgba(0,201,167,0.15);
        color: #00c9a7;
        border-color: rgba(0,201,167,0.5);
      }

      #cs-btn-bet {
        width: 100%;
        padding: 12px 0;
        border: none;
        border-radius: 7px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        background: linear-gradient(135deg, #0f766e, #0369a1);
        color: #fff;
        box-shadow: 0 0 14px rgba(15,118,110,0.4);
        transition: all 0.2s;
      }
      #cs-btn-bet:hover:not(:disabled) {
        box-shadow: 0 0 22px rgba(15,118,110,0.65);
        transform: translateY(-1px);
      }
      #cs-btn-bet:disabled {
        background: #1e293b;
        color: #475569;
        cursor: not-allowed;
        box-shadow: none;
      }

      #cs-bet-info {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #94a3b8;
        text-align: center;
        letter-spacing: 0.04em;
        min-height: 16px;
      }
    </style>

    <div class="bet-title">Place Your Bet</div>

    <div class="bet-row">
      <input
        id="cs-bet-input"
        type="number"
        min="10"
        step="10"
        placeholder="Enter CR amount"
      />
    </div>

    <div class="bet-quick">
      <button class="bet-chip" data-amount="100">100</button>
      <button class="bet-chip" data-amount="250">250</button>
      <button class="bet-chip" data-amount="500">500</button>
      <button class="bet-chip" data-amount="1000">1K</button>
      <button class="bet-chip" data-amount="2500">2.5K</button>
    </div>

    <button id="cs-btn-bet">Place Bet</button>
    <div id="cs-bet-info">Round starts after all players bet</div>
  `;

  container.appendChild(panel);
  _panelEl = panel;
  _inputEl = panel.querySelector('#cs-bet-input');
  _btnEl   = panel.querySelector('#cs-btn-bet');
  _infoEl  = panel.querySelector('#cs-bet-info');

  panel.querySelectorAll('.bet-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      _inputEl.value = chip.dataset.amount;
    });
  });

  _btnEl.addEventListener('click', () => {
    const amount = parseInt(_inputEl.value);
    if (!amount || amount < 10) {
      _infoEl.textContent = 'Min bet is 10 CR';
      _infoEl.style.color = '#ef4444';
      return;
    }
    _bet = amount;
    emit(ACTIONS.PLACE_BET, { amount });
    _infoEl.textContent = `Bet placed: ${amount.toLocaleString()} CR`;
    _infoEl.style.color = '#00c9a7';
    _btnEl.disabled = true;
  });

  on('onRoundStart', () => lock());
  on('onRoundEnd', () => unlock());
}

export function lock() {
  _locked = true;
  _panelEl.classList.add('locked');
  _btnEl.disabled = true;
}

export function unlock() {
  _locked = false;
  _panelEl.classList.remove('locked');
  _inputEl.value = '';
  _btnEl.disabled = false;
  _infoEl.textContent = 'Round starts after all players bet';
  _infoEl.style.color = '#475569';
  _bet = 0;
}

/** Called by CashoutButton to calculate win amounts */
export function getBet() { return _bet; }
