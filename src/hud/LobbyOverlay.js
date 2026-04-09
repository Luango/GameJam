// ─── LobbyOverlay ───
// Minimal pre-game overlay: name → host or join → ready.
// Sits on top of the canvas; hidden the moment the game starts.
// All DOM created in JS — no new HTML needed.

import { injectStyles } from './HudStyles.js';

const FONT_MONO = "'Share Tech Mono', monospace";
const FONT_UI   = "'Rajdhani', sans-serif";

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Mount the lobby overlay.
 * @param {HTMLElement} container  — typically document.getElementById('app')
 * @param {{ onCreate, onJoin, onReady }} callbacks
 *   onCreate(name)        → Promise<roomCode>
 *   onJoin(code, name)    → Promise<void>
 *   onReady()             → void
 * @returns {{ hide, updatePlayers }}
 */
export function init(container, { onCreate, onJoin, onReady }) {
  injectStyles();

  const overlay = _buildOverlay();
  container.appendChild(overlay);

  // ── Sections ──────────────────────────────────────────────────────────────
  const nameSection   = overlay.querySelector('#lob-name-section');
  const actionSection = overlay.querySelector('#lob-action-section');
  const lobbySection  = overlay.querySelector('#lob-lobby-section');
  const statusEl      = overlay.querySelector('#lob-status');
  const playerListEl  = overlay.querySelector('#lob-players');
  const roomCodeEl    = overlay.querySelector('#lob-room-code');

  // ── Name → choose host/join ───────────────────────────────────────────────
  const nameInput   = overlay.querySelector('#lob-name');
  const hostBtn     = overlay.querySelector('#lob-host-btn');
  const joinBtn     = overlay.querySelector('#lob-join-btn');
  const codeInput   = overlay.querySelector('#lob-code');
  const confirmJoin = overlay.querySelector('#lob-join-confirm');
  const readyBtn    = overlay.querySelector('#lob-ready-btn');

  let _inLobby = false;

  function _showStatus(msg, isError = false) {
    statusEl.textContent = msg;
    statusEl.style.color = isError ? '#ff4444' : '#94a3b8';
  }

  // Host
  hostBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim() || 'Player';
    hostBtn.disabled = true;
    joinBtn.disabled = true;
    _showStatus('Creating room…');
    try {
      const code = await onCreate(name);
      roomCodeEl.textContent = code;
      nameSection.style.display   = 'none';
      actionSection.style.display = 'none';
      lobbySection.style.display  = 'flex';
      _inLobby = true;
    } catch (err) {
      _showStatus('Failed to create room: ' + err.message, true);
      hostBtn.disabled = false;
      joinBtn.disabled = false;
    }
  });

  // Show join code input
  joinBtn.addEventListener('click', () => {
    codeInput.parentElement.style.display = 'flex';
    joinBtn.style.display = 'none';
  });

  // Confirm join
  confirmJoin.addEventListener('click', async () => {
    const name = nameInput.value.trim() || 'Player';
    const code = codeInput.value.trim().toUpperCase();
    if (!code) { _showStatus('Enter a room code', true); return; }

    confirmJoin.disabled = true;
    _showStatus('Joining room ' + code + '…');
    try {
      await onJoin(code, name);
      roomCodeEl.textContent = code;
      nameSection.style.display   = 'none';
      actionSection.style.display = 'none';
      lobbySection.style.display  = 'flex';
      _inLobby = true;
    } catch (err) {
      _showStatus('Failed to join: ' + err.message, true);
      confirmJoin.disabled = false;
    }
  });

  // Ready
  readyBtn.addEventListener('click', () => {
    readyBtn.disabled = true;
    readyBtn.textContent = 'WAITING…';
    onReady();
  });

  // ── Public interface ──────────────────────────────────────────────────────

  /** Hide the overlay (game started). */
  function hide() {
    overlay.style.opacity    = '0';
    overlay.style.transition = 'opacity 0.4s ease';
    setTimeout(() => { overlay.style.display = 'none'; }, 450);
  }

  /**
   * Update the player list in the lobby section.
   * @param {Array<{id, name, ready, color}>} players
   */
  function updatePlayers(players) {
    if (!_inLobby) return;
    playerListEl.innerHTML = '';
    players.forEach((p) => {
      const row = document.createElement('div');
      Object.assign(row.style, {
        display:     'flex',
        alignItems:  'center',
        gap:         '8px',
        padding:     '4px 0',
        fontFamily:  FONT_UI,
        fontSize:    '13px',
        color:       '#cbd5e1',
      });
      const dot = document.createElement('span');
      Object.assign(dot.style, {
        width:        '8px',
        height:       '8px',
        borderRadius: '50%',
        background:   p.color ?? '#666',
        flexShrink:   '0',
      });
      const name = document.createElement('span');
      name.textContent = p.name;
      name.style.flex  = '1';
      const badge = document.createElement('span');
      badge.textContent = p.ready ? 'READY' : '…';
      badge.style.color = p.ready ? '#00c9a7' : '#64748b';
      badge.style.fontSize = '10px';
      row.append(dot, name, badge);
      playerListEl.appendChild(row);
    });
  }

  return { hide, updatePlayers };
}

// ─── DOM Builder ──────────────────────────────────────────────────────────────

function _buildOverlay() {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position:       'fixed',
    inset:          '0',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    background:     'rgba(6, 10, 20, 0.88)',
    backdropFilter: 'blur(12px)',
    zIndex:         '1000',
  });

  const panel = document.createElement('div');
  Object.assign(panel.style, {
    background:   'rgba(12, 20, 40, 0.92)',
    border:       '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: '12px',
    padding:      '36px 40px',
    minWidth:     '320px',
    maxWidth:     '400px',
    width:        '90vw',
    display:      'flex',
    flexDirection:'column',
    gap:          '18px',
  });

  panel.innerHTML = `
    <div style="text-align:center">
      <div style="font-family:${FONT_MONO};font-size:22px;letter-spacing:.18em;
                  color:#38bdf8;text-shadow:0 0 16px #38bdf8aa;margin-bottom:4px">
        CIRCUIT SPHERE
      </div>
      <div style="font-family:${FONT_UI};font-size:12px;letter-spacing:.12em;
                  color:#475569;text-transform:uppercase">
        Multiplayer Hex Sphere
      </div>
    </div>

    <!-- Name -->
    <div id="lob-name-section" style="display:flex;flex-direction:column;gap:8px">
      <label style="font-family:${FONT_UI};font-size:11px;letter-spacing:.1em;
                    color:#64748b;text-transform:uppercase">Your Name</label>
      <input id="lob-name" type="text" placeholder="Player"
        style="background:rgba(30,41,59,0.9);border:1px solid rgba(56,189,248,0.2);
               border-radius:6px;padding:9px 12px;color:#e2e8f0;
               font-family:${FONT_UI};font-size:14px;outline:none;width:100%;box-sizing:border-box" />
    </div>

    <!-- Host / Join -->
    <div id="lob-action-section" style="display:flex;flex-direction:column;gap:10px">
      <button id="lob-host-btn" style="${_btnStyle('#0ea5e9','#075985')}">HOST ROOM</button>

      <div style="display:flex;flex-direction:column;gap:6px">
        <button id="lob-join-btn" style="${_btnStyle('#334155','#1e293b')}">JOIN ROOM</button>
        <div style="display:none;align-items:center;gap:6px" id="lob-join-row">
          <input id="lob-code" type="text" placeholder="ROOM CODE" maxlength="5"
            style="flex:1;background:rgba(30,41,59,0.9);border:1px solid rgba(56,189,248,0.2);
                   border-radius:6px;padding:8px 10px;color:#e2e8f0;
                   font-family:${FONT_MONO};font-size:14px;letter-spacing:.1em;
                   text-transform:uppercase;outline:none;box-sizing:border-box" />
          <button id="lob-join-confirm" style="${_btnStyle('#0ea5e9','#075985')}padding:8px 14px;">JOIN</button>
        </div>
      </div>
    </div>

    <!-- In lobby -->
    <div id="lob-lobby-section" style="display:none;flex-direction:column;gap:12px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-family:${FONT_UI};font-size:11px;letter-spacing:.1em;
                     color:#64748b;text-transform:uppercase">Room</span>
        <span id="lob-room-code"
          style="font-family:${FONT_MONO};font-size:18px;letter-spacing:.2em;
                 color:#38bdf8;text-shadow:0 0 12px #38bdf8aa"></span>
      </div>
      <div id="lob-players" style="display:flex;flex-direction:column;gap:4px;
                                    min-height:40px"></div>
      <button id="lob-ready-btn" style="${_btnStyle('#00c9a7','#047857')}margin-top:4px">
        READY
      </button>
    </div>

    <!-- Status line -->
    <div id="lob-status"
      style="font-family:${FONT_UI};font-size:12px;color:#64748b;
             text-align:center;min-height:16px"></div>
  `;

  overlay.appendChild(panel);
  return overlay;
}

function _btnStyle(bg, bgHover) {
  return `background:${bg};border:none;border-radius:6px;padding:10px 0;width:100%;
          color:#fff;font-family:'Rajdhani',sans-serif;font-size:13px;
          letter-spacing:.12em;font-weight:600;cursor:pointer;`;
}
