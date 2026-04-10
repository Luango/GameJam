import { EVENTS, ACTIONS } from '../constants/gameState.js';

// MockEventHarness — dev-only floating panel to fire P1 events without P1 running.
// Stripped from production builds via import.meta.env.DEV guard in main.js.
// Fires CustomEvents onto the shared eventBus that RenderBridge listens to.

const TILE_COUNT = 200;
const PLAYER_COUNT = 4;

let _bus = null;
let _roundActive = false;
let _playerCount = 2;
let _lastSeed = 42;
let _localBusted = false;
let _autoProgressTimer = null;

export function initHarness(eventBus) {
  _bus = eventBus;
  _mountPanel();

  // Toggle visibility with backtick ` key (dev secret)
  document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
      const panel = document.getElementById('mock-harness');
      if (!panel) return;
      const hidden = panel.dataset.hidden === 'true';
      panel.dataset.hidden = hidden ? 'false' : 'true';
      panel.style.display  = hidden ? 'block' : 'none';
    }
  });

  // ── Auto-progression: timer expired → end round → start next round ──────────
  _bus.addEventListener(ACTIONS.LOCK_IN, () => {
    if (!_roundActive) return;
    clearTimeout(_autoProgressTimer);

    // Short pause then fire onRoundEnd (player stayed — status 'active', not bust/cashout)
    _autoProgressTimer = setTimeout(() => {
      _roundActive = false;
      const results = Array.from({ length: _playerCount }, (_, i) => ({
        playerId: i,
        voltage:  1.0,
        status:   'active',   // idle streak adjudicated by main.js inactivity logic
      }));
      _fire(EVENTS.onRoundEnd, { results });

      // Wait for inactivity logic in main.js to run (may dispatch onBust),
      // then start next round unless local player busted.
      _autoProgressTimer = setTimeout(() => {
        if (_localBusted) return;
        _roundActive = true;
        _lastSeed = (_lastSeed + 1) % 9999;
        _fire(EVENTS.onRoundStart, {
          boardSeed:     _lastSeed,
          playerCount:   _playerCount,
          timerDuration: 30,
          localPlayerId: 0,
        });
      }, 1500);
    }, 500);
  });

  // Track local bust so auto-progression stops after idle exhaustion
  _bus.addEventListener(EVENTS.onBust, (e) => {
    if (e.detail?.playerId === 0) _localBusted = true;
  });

  // Reset bust flag when a new round is manually started
  _bus.addEventListener(EVENTS.onRoundStart, () => {
    // Only reset if harness itself fired it (manual button click resets bust state)
  });
}

function _fire(eventName, detail) {
  _bus.dispatchEvent(new CustomEvent(eventName, { detail }));
}

// ─── Panel HTML ──────────────────────────────────────────────────────────────

function _mountPanel() {
  const panel = document.createElement('div');
  panel.id = 'mock-harness';
  panel.innerHTML = `
    <style>
      #mock-harness {
        position: fixed;
        top: 12px;
        right: 12px;
        z-index: 9000;
        background: rgba(10,10,20,0.92);
        border: 1px solid #334155;
        border-radius: 10px;
        padding: 14px 16px;
        font-family: 'Segoe UI', system-ui, monospace;
        font-size: 12px;
        color: #94a3b8;
        min-width: 220px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.6);
        user-select: none;
      }
      #mock-harness h3 {
        color: #e2e8f0;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 10px;
        padding-bottom: 6px;
        border-bottom: 1px solid #1e293b;
      }
      #mock-harness .row {
        display: flex;
        gap: 6px;
        align-items: center;
        margin-bottom: 6px;
      }
      #mock-harness label {
        font-size: 11px;
        min-width: 56px;
        color: #64748b;
      }
      #mock-harness select, #mock-harness input[type=number] {
        background: #1e293b;
        border: 1px solid #334155;
        color: #e2e8f0;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 11px;
        flex: 1;
      }
      #mock-harness button {
        width: 100%;
        margin-top: 4px;
        padding: 5px 0;
        border: none;
        border-radius: 5px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.15s;
        letter-spacing: 0.03em;
      }
      #mock-harness button:hover { opacity: 0.8; }
      #mock-harness .btn-start    { background: #16a34a; color: #fff; }
      #mock-harness .btn-safe     { background: #0d9488; color: #fff; }
      #mock-harness .btn-trap     { background: #b45309; color: #fff; }
      #mock-harness .btn-reward   { background: #7c3aed; color: #fff; }
      #mock-harness .btn-bust     { background: #dc2626; color: #fff; }
      #mock-harness .btn-cashout  { background: #0ea5e9; color: #fff; }
      #mock-harness .btn-end      { background: #374151; color: #e2e8f0; }
      #mock-harness .divider {
        border-top: 1px solid #1e293b;
        margin: 8px 0;
      }
      #mock-harness .tag {
        display: inline-block;
        background: #f59e0b22;
        color: #f59e0b;
        border-radius: 3px;
        padding: 1px 5px;
        font-size: 10px;
        margin-bottom: 8px;
      }
    </style>

    <h3>Mock Event Harness</h3>
    <span class="tag">DEV ONLY</span>

    <div class="row">
      <label>Players</label>
      <select id="mh-players">
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>

    <div class="row">
      <label>Seed</label>
      <input type="number" id="mh-seed" value="42" min="0" max="9999" />
    </div>

    <button class="btn-start" id="mh-round-start">▶ onRoundStart</button>

    <div class="divider"></div>

    <div class="row">
      <label>Tile ID</label>
      <input type="number" id="mh-tile" value="10" min="0" max="199" />
    </div>
    <div class="row">
      <label>Player</label>
      <select id="mh-player">
        <option value="0">Slot 0</option>
        <option value="1">Slot 1</option>
        <option value="2">Slot 2</option>
        <option value="3">Slot 3</option>
      </select>
    </div>
    <div class="row">
      <label>Voltage</label>
      <input type="number" id="mh-voltage" value="1.5" min="1" max="10" step="0.1" />
    </div>

    <button class="btn-safe"   id="mh-reveal-safe">⬡ onReveal — safe</button>
    <button class="btn-trap"   id="mh-reveal-trap">⬡ onReveal — trap</button>
    <button class="btn-reward" id="mh-reveal-reward">⬡ onReveal — reward</button>
    <button class="btn-bust"   id="mh-bust">✕ onBust</button>
    <button class="btn-cashout" id="mh-cashout">$ onCashout</button>

    <div class="divider"></div>

    <div class="row">
      <label>Timer</label>
      <input type="number" id="mh-timer" value="15" min="1" max="60" />
    </div>
    <button class="btn-end" id="mh-timer-sync">⏱ onTimerSync</button>
    <button class="btn-end" id="mh-round-end">■ onRoundEnd</button>
  `;

  // Hidden by default — press ` (backtick) to toggle
  panel.dataset.hidden = 'true';
  panel.style.display  = 'none';
  document.body.appendChild(panel);

  // ─── Wire buttons ─────────────────────────────────────────────────────────

  const $  = (id) => panel.querySelector('#' + id);

  $('mh-round-start').addEventListener('click', () => {
    _playerCount  = parseInt($('mh-players').value);
    _lastSeed     = parseInt($('mh-seed').value) || 42;
    _roundActive  = true;
    _localBusted  = false;   // manual restart resets bust state
    clearTimeout(_autoProgressTimer);
    _fire(EVENTS.onRoundStart, {
      boardSeed:     _lastSeed,
      playerCount:   _playerCount,
      timerDuration: 30,
      localPlayerId: 0,
    });
  });

  const fireReveal = (type) => {
    if (!_roundActive) return;
    _fire(EVENTS.onReveal, {
      tileId:   parseInt($('mh-tile').value),
      type,
      playerId: parseInt($('mh-player').value),
      voltage:  parseFloat($('mh-voltage').value),
    });
    // Auto-increment tile for quick testing
    const tileInput = $('mh-tile');
    tileInput.value = (parseInt(tileInput.value) + 7) % TILE_COUNT;
  };

  $('mh-reveal-safe').addEventListener('click',   () => fireReveal('safe'));
  $('mh-reveal-trap').addEventListener('click',   () => fireReveal('trap'));
  $('mh-reveal-reward').addEventListener('click', () => fireReveal('reward'));

  $('mh-bust').addEventListener('click', () => {
    if (!_roundActive) return;
    _fire(EVENTS.onBust, { playerId: parseInt($('mh-player').value) });
  });

  $('mh-cashout').addEventListener('click', () => {
    if (!_roundActive) return;
    _fire(EVENTS.onCashout, {
      playerId: parseInt($('mh-player').value),
      voltage:  parseFloat($('mh-voltage').value),
    });
  });

  $('mh-timer-sync').addEventListener('click', () => {
    _fire(EVENTS.onTimerSync, { remaining: parseInt($('mh-timer').value) });
  });

  $('mh-round-end').addEventListener('click', () => {
    _roundActive = false;
    // Build a fake results array
    const results = Array.from({ length: _playerCount }, (_, i) => ({
      playerId: i,
      voltage:  +(1 + Math.random() * 3).toFixed(2),
      status:   i === 0 ? 'cashout' : 'bust',
    }));
    _fire(EVENTS.onRoundEnd, { results });
  });
}
