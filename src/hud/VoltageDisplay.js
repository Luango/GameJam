import { injectStyles } from './HudStyles.js';
import { on } from '../state/RenderBridge.js';
import { PLAYER_COLORS } from '../constants/gameConfig.js';

// VoltageDisplay — left sidebar.
// Top: multiplier scale bar (1.0× → 3.0×) with current value highlighted.
// Bottom: compact per-player voltage cards.

const SCALE_MIN = 1.0;
const SCALE_MAX = 3.0;
const SCALE_STEPS = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0];

// Per-player state tracked locally
const _players = new Map(); // playerId → { voltage, status: 'active'|'bust'|'cashout' }

let _container = null;
let _scaleEl   = null;
let _cardsEl   = null;
let _localId   = 0;

export function init(container) {
  injectStyles();
  _container = container;

  const panel = document.createElement('div');
  panel.className = 'cs-panel cs-corner';
  panel.id = 'cs-voltage';
  panel.innerHTML = `
    <style>
      #cs-voltage {
        width: 100%;
        padding: 12px 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      #cs-voltage .v-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #00c9a7;
        text-align: center;
        margin-bottom: 2px;
      }

      #cs-volt-scale {
        display: flex;
        flex-direction: column-reverse;
        gap: 3px;
      }

      .v-step {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 3px 6px;
        border-radius: 3px;
        transition: all 0.25s ease;
        border: 1px solid transparent;
      }

      .v-step .v-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        color: #334155;
        flex: 1;
        text-align: right;
        transition: color 0.25s;
      }

      .v-step .v-bar {
        width: 4px;
        height: 12px;
        border-radius: 2px;
        background: #1e293b;
        transition: background 0.25s, box-shadow 0.25s;
      }

      .v-step.active {
        border-color: rgba(0, 201, 167, 0.4);
        background: rgba(0, 201, 167, 0.08);
      }
      .v-step.active .v-label { color: #e2e8f0; font-size: 13px; font-weight: bold; }
      .v-step.active .v-bar   { background: #00c9a7; box-shadow: 0 0 6px #00c9a7; }

      .v-step.below-safe .v-bar     { background: #00c9a7aa; }
      .v-step.below-charged .v-bar  { background: #f59e0baa; }
      .v-step.below-critical .v-bar { background: #ef4444aa; }

      #cs-volt-cards { display: flex; flex-direction: column; gap: 4px; }

      .v-card {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 4px 6px;
        border-radius: 4px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        transition: opacity 0.3s;
      }
      .v-card.bust    { opacity: 0.35; }
      .v-card.cashout { opacity: 0.6; }

      .v-card .v-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .v-card .v-name {
        font-size: 9px;
        color: #64748b;
        font-family: 'Share Tech Mono', monospace;
        flex: 1;
      }
      .v-card .v-val {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        color: #e2e8f0;
      }
      .v-card .v-badge {
        font-size: 8px;
        padding: 1px 3px;
        border-radius: 2px;
        background: #1e293b;
        color: #64748b;
      }
      .v-card.bust .v-badge    { background: #7f1d1d33; color: #ef4444; }
      .v-card.cashout .v-badge { background: #0c4a6e33; color: #38bdf8; }
    </style>

    <div class="v-title">Voltage<br>Scale</div>
    <div id="cs-volt-scale"></div>
    <hr class="cs-divider">
    <div id="cs-volt-cards"></div>
  `;

  container.appendChild(panel);
  _scaleEl = panel.querySelector('#cs-volt-scale');
  _cardsEl = panel.querySelector('#cs-volt-cards');

  _buildScale(1.0);

  // RenderBridge callbacks
  on('onRoundStart', ({ playerCount, localPlayerId }) => {
    _localId = localPlayerId;
    _players.clear();
    for (let i = 0; i < playerCount; i++) {
      _players.set(i, { voltage: 1.0, status: 'active' });
    }
    _renderCards();
    _buildScale(1.0);
  });

  on('onReveal', ({ playerId, voltage }) => {
    const p = _players.get(playerId);
    if (p) { p.voltage = voltage; }
    _renderCards();
    if (playerId === _localId) _buildScale(voltage);
  });

  on('onBust', ({ playerId }) => {
    const p = _players.get(playerId);
    if (p) p.status = 'bust';
    _renderCards();
  });

  on('onCashout', ({ playerId }) => {
    const p = _players.get(playerId);
    if (p) p.status = 'cashout';
    _renderCards();
  });

  on('onRoundEnd', () => {
    _players.clear();
    _renderCards();
    _buildScale(1.0);
  });
}

function _buildScale(currentVoltage) {
  _scaleEl.innerHTML = '';
  SCALE_STEPS.forEach((step) => {
    const div = document.createElement('div');
    div.className = 'v-step';

    const zone = step < 1.5 ? 'safe' : step < 2.5 ? 'charged' : 'critical';
    const isActive = Math.abs(step - currentVoltage) < 0.15;

    if (isActive) {
      div.classList.add('active');
    } else if (step < currentVoltage) {
      div.classList.add(`below-${zone}`);
    }

    div.innerHTML = `
      <div class="v-bar"></div>
      <span class="v-label">${step.toFixed(1)}×</span>
    `;
    _scaleEl.appendChild(div);
  });
}

const SLOT_HEX = ['#38bdf8', '#f472b6', '#a78bfa', '#fb923c'];

function _renderCards() {
  _cardsEl.innerHTML = '';
  _players.forEach(({ voltage, status }, id) => {
    const card = document.createElement('div');
    card.className = `v-card ${status !== 'active' ? status : ''}`;

    const badge = status === 'bust'    ? 'BUST'
                : status === 'cashout' ? 'OUT'
                : '';

    const you = id === _localId ? ' (YOU)' : '';

    card.innerHTML = `
      <div class="v-dot" style="background:${SLOT_HEX[id] ?? '#fff'}"></div>
      <span class="v-name">P${id}${you}</span>
      ${badge
        ? `<span class="v-badge">${badge}</span>`
        : `<span class="v-val">${voltage.toFixed(1)}×</span>`
      }
    `;
    _cardsEl.appendChild(card);
  });
}
