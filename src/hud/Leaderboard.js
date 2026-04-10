import { injectStyles } from './HudStyles.js';
import { on, getLocalHudSlot } from '../state/RenderBridge.js';

// Leaderboard — top-left panel.
// Shows all players sorted by voltage, with bust/cashout badges.
// Visible to all players and spectators. Persists until onRoundEnd.

const SLOT_HEX = ['#38bdf8', '#f472b6', '#a78bfa', '#fb923c'];

let _players   = new Map(); // playerId → { voltage, status }
let _listEl    = null;
let _roundEl   = null;
let _roundNum  = 0;

/** Pre-round roster from host (PeerJS ids), cleared on round start. */
let _bettingRoster = null;
let _bettingLocalPeerId = null;

export function init(container) {
  injectStyles();

  const panel = document.createElement('div');
  panel.id = 'cs-leaderboard';
  panel.className = 'cs-panel';
  panel.innerHTML = `
    <style>
      #cs-leaderboard {
        width: 100%;
        padding: 10px 12px;
      }

      #cs-leaderboard .lb-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      #cs-leaderboard .lb-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-round-num {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        color: #334155;
        letter-spacing: 0.06em;
      }

      #cs-lb-list { display: flex; flex-direction: column; gap: 5px; }

      .lb-row {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 5px 8px;
        border-radius: 4px;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.05);
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
      }

      /* Gold shimmer for leader */
      .lb-row.leader::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(251,191,36,0.06), transparent);
        pointer-events: none;
      }
      .lb-row.leader { border-color: rgba(251,191,36,0.25); }

      .lb-row.you {
        border-color: rgba(0,201,167,0.2);
        background: rgba(0,201,167,0.04);
      }

      .lb-row.bust    { opacity: 0.35; }
      .lb-row.cashout { opacity: 0.55; }

      .lb-rank {
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: #334155;
        width: 12px;
        text-align: center;
      }
      .lb-row.leader .lb-rank { color: #fbbf24; }

      .lb-dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .lb-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 12px;
        font-weight: 600;
        flex: 1;
        color: #94a3b8;
        white-space: nowrap;
        overflow: hidden;
      }
      .lb-row.you .lb-name { color: #e2e8f0; }

      .lb-voltage {
        font-family: 'Share Tech Mono', monospace;
        font-size: 12px;
        color: #e2e8f0;
      }
      .lb-row.leader .lb-voltage { color: #fbbf24; text-shadow: 0 0 6px #fbbf2488; }

      .lb-badge {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        padding: 1px 4px;
        border-radius: 2px;
      }
      .lb-badge.bust-badge    { background: #7f1d1d33; color: #ef4444; }
      .lb-badge.cashout-badge { background: #0c4a6e33; color: #38bdf8; }
      .lb-badge.you-badge     { background: rgba(0,201,167,0.1); color: #00c9a7; font-size: 7px; }
      .lb-badge.bet-wait      { background: rgba(71,85,105,0.2); color: #64748b; font-size: 7px; }
      .lb-badge.bet-ok        { background: rgba(0,201,167,0.12); color: #00c9a7; font-size: 7px; }

      #cs-lb-empty {
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: #334155;
        text-align: center;
        padding: 8px 0;
        letter-spacing: 0.08em;
      }
    </style>

    <div class="lb-header">
      <span class="lb-title">Players</span>
      <span id="cs-round-num">ROUND —</span>
    </div>
    <div id="cs-lb-list">
      <div id="cs-lb-empty">Waiting for round…</div>
    </div>
  `;

  container.appendChild(panel);
  _listEl  = panel.querySelector('#cs-lb-list');
  _roundEl = panel.querySelector('#cs-round-num');

  on('onRoundStart', ({ playerCount, players }) => {
    _bettingRoster = null;
    _bettingLocalPeerId = null;
    _roundNum++;
    _roundEl.textContent = `ROUND ${_roundNum}`;
    _players.clear();
    if (players?.length) {
      // Named players from P1 bridge
      players.forEach(({ playerId, name }) => {
        _players.set(playerId, { voltage: 1.0, status: 'active', name });
      });
    } else {
      // Mock harness / fallback — no names provided
      for (let i = 0; i < playerCount; i++) {
        _players.set(i, { voltage: 1.0, status: 'active', name: `P${i}` });
      }
    }
    _render();
  });

  on('onReveal', ({ playerId, voltage }) => {
    const p = _players.get(playerId);
    if (p) p.voltage = voltage;
    _render();
  });

  on('onBust', ({ playerId }) => {
    const p = _players.get(playerId);
    if (p) p.status = 'bust';
    _render();
  });

  on('onCashout', ({ playerId, voltage }) => {
    const p = _players.get(playerId);
    if (p) { p.status = 'cashout'; if (voltage) p.voltage = voltage; }
    _render();
  });

  on('onRoundEnd', ({ results }) => {
    results?.forEach(({ playerId, voltage, status, name }) => {
      const p = _players.get(playerId);
      if (p) {
        p.voltage = voltage;
        p.status  = status;
        if (name) p.name = name; // keep name if result includes it
      }
    });
    _render();
  });
}

export function update(results) {
  results?.forEach(({ playerId, voltage, status }) => {
    const p = _players.get(playerId);
    if (p) { p.voltage = voltage; p.status = status; }
  });
  _render();
}

/**
 * Pre-game betting phase — same panel, shows who has locked a wager.
 * @param {Array<{id:string,name:string,color:string,hasBet?:boolean}>} playerList
 * @param {string} localPeerId
 */
export function showBettingRoster(playerList, localPeerId) {
  _bettingRoster = playerList ?? [];
  _bettingLocalPeerId = localPeerId;
  _roundEl.textContent = 'WAGERS';
  _renderBetting();
}

export function updateBettingRoster(playerList) {
  if (!_bettingRoster && !playerList) return;
  _bettingRoster = playerList ?? [];
  _renderBetting();
}

export function clearBettingRoster() {
  _bettingRoster = null;
  _bettingLocalPeerId = null;
}

function _renderBetting() {
  if (!_listEl || !_bettingRoster) return;
  _listEl.innerHTML = '';

  _bettingRoster.forEach((p, i) => {
    const isYou = p.id === _bettingLocalPeerId;
    const row = document.createElement('div');
    row.className = `lb-row ${isYou ? 'you' : ''}`;
    const betBadge = p.hasBet
      ? '<span class="lb-badge bet-ok">IN</span>'
      : '<span class="lb-badge bet-wait">…</span>';
    row.innerHTML = `
      <span class="lb-rank">${i + 1}</span>
      <div class="lb-dot" style="background:${p.color ?? '#94a3b8'};box-shadow:0 0 5px ${p.color ?? '#fff'}44"></div>
      <span class="lb-name">${p.name ?? 'Player'}${isYou ? ' <span class="lb-badge you-badge">YOU</span>' : ''}</span>
      ${betBadge}
    `;
    _listEl.appendChild(row);
  });
}

function _render() {
  _listEl.innerHTML = '';

  if (_players.size === 0) {
    _listEl.innerHTML = '<div id="cs-lb-empty">Waiting for round…</div>';
    return;
  }

  const localSlot = getLocalHudSlot();

  // Sort: active by voltage desc, then cashout, then bust
  const sorted = [..._players.entries()].sort(([, a], [, b]) => {
    const rank = (s) => s === 'active' ? 0 : s === 'cashout' ? 1 : 2;
    if (rank(a.status) !== rank(b.status)) return rank(a.status) - rank(b.status);
    return b.voltage - a.voltage;
  });

  sorted.forEach(([id, { voltage, status, name }], rank) => {
    const isLeader  = rank === 0 && status === 'active';
    const isYou     = id === localSlot;
    const row = document.createElement('div');
    row.className = `lb-row ${isLeader ? 'leader' : ''} ${isYou ? 'you' : ''} ${status !== 'active' ? status : ''}`;

    const badge = isYou       ? '<span class="lb-badge you-badge">YOU</span>' : '';
    const statusBadge = status === 'bust'    ? '<span class="lb-badge bust-badge">BUST</span>'
                       : status === 'cashout' ? '<span class="lb-badge cashout-badge">OUT</span>'
                       : '';

    row.innerHTML = `
      <span class="lb-rank">${rank + 1}</span>
      <div class="lb-dot" style="background:${SLOT_HEX[id] ?? '#fff'}; box-shadow: 0 0 5px ${SLOT_HEX[id] ?? '#fff'}44"></div>
      <span class="lb-name">${name ?? `P${id}`} ${badge}</span>
      ${statusBadge || `<span class="lb-voltage">${voltage.toFixed(1)}×</span>`}
    `;
    _listEl.appendChild(row);
  });
}
