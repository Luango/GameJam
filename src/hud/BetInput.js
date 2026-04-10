import { injectStyles } from './HudStyles.js';
import { on, emit } from '../state/RenderBridge.js';
import { ACTIONS } from '../constants/gameState.js';

// BetInput — bottom-left pre-round panel.
// Visible only before a round starts. Locked once onRoundStart fires.
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
        width: 100%;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: opacity 0.3s;
      }

      #cs-bet.locked { opacity: 0.4; pointer-events: none; }

      #cs-bet .bet-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-bet .bet-row {
        display: flex;
        gap: 6px;
        align-items: center;
      }

      #cs-bet-input {
        flex: 1;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(0,201,167,0.25);
        border-radius: 4px;
        color: #e2e8f0;
        font-family: 'Share Tech Mono', monospace;
        font-size: 16px;
        padding: 8px 12px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      #cs-bet-input:focus {
        border-color: rgba(0,201,167,0.6);
        box-shadow: 0 0 8px rgba(0,201,167,0.2);
      }
      #cs-bet-input::placeholder { color: #334155; }

      .bet-quick {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }

      .bet-chip {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        padding: 4px 9px;
        border-radius: 3px;
        border: 1px solid rgba(0,201,167,0.2);
        background: rgba(0,201,167,0.05);
        color: #64748b;
        cursor: pointer;
        transition: all 0.15s;
      }
      .bet-chip:hover {
        background: rgba(0,201,167,0.12);
        color: #00c9a7;
        border-color: rgba(0,201,167,0.4);
      }

      #cs-btn-bet {
        width: 100%;
        padding: 12px 0;
        border: none;
        border-radius: 5px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        background: linear-gradient(135deg, #0f766e, #0369a1);
        color: #fff;
        box-shadow: 0 0 10px rgba(15,118,110,0.35);
        transition: all 0.2s;
      }
      #cs-btn-bet:hover:not(:disabled) {
        box-shadow: 0 0 18px rgba(15,118,110,0.6);
        transform: translateY(-1px);
      }
      #cs-btn-bet:disabled {
        background: #1e293b;
        color: #334155;
        cursor: not-allowed;
        box-shadow: none;
      }

      #cs-bet-info {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        color: #334155;
        text-align: center;
        letter-spacing: 0.06em;
        min-height: 12px;
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

  // Quick chips
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
  _infoEl.style.color = '#334155';
  _bet = 0;
}

/** Called by CashoutButton to calculate win amounts */
export function getBet() { return _bet; }
