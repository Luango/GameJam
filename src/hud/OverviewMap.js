import { injectStyles } from './HudStyles.js';
import { on } from '../state/RenderBridge.js';
import { getAllTiles } from '../renderer/HexGrid.js';
import { getTokenPositions } from '../renderer/PlayerToken.js';
import { PLAYER_COLORS } from '../constants/gameConfig.js';

// OverviewMap — top-right minimap panel.
// Renders a full equirectangular projection of the sphere so players
// can see tile states and token positions on the back hemisphere.
// Draws to a 2D canvas each frame (lightweight — no WebGL).

const W = 200;
const H = 100;
const TILE_R = 2.2;
const TOKEN_R = 4;

const ZONE_BASE = { safe: '#00c9a7', charged: '#f59e0b', critical: '#ef4444' };
const ZONE_DIM  = { safe: '#0d3b32', charged: '#3b2a07', critical: '#3b0e0e' };

const STATE_COLOR = {
  hidden:          null,          // use zone dim
  'revealed-safe': '#00c9a7',
  'revealed-trap': '#ef4444',
  reward:          '#fbbf24',
};

const SLOT_HEX = PLAYER_COLORS.map((n) => '#' + n.toString(16).padStart(6, '0'));

let _canvas   = null;
let _ctx      = null;
let _panelEl  = null;
let _labelEl  = null;
let _running  = false;
let _currentZone = 'safe';

// Tile snapshot updated on each relevant event
let _tileSnapshot = [];

// ─── Projection ──────────────────────────────────────────────────────────────
// Equirectangular: lon [-π, π] → x [0, W],  lat [-π/2, π/2] → y [H, 0]
function _project(pos) {
  const norm = pos.clone().normalize();
  const lon  = Math.atan2(norm.x, norm.z);           // -π to π
  const lat  = Math.asin(Math.max(-1, Math.min(1, norm.y))); // -π/2 to π/2
  return {
    x: ((lon / Math.PI) * 0.5 + 0.5) * W,
    y: (0.5 - lat / Math.PI) * H,
  };
}

// ─── Init ─────────────────────────────────────────────────────────────────────
export function init(container) {
  injectStyles();

  const panel = document.createElement('div');
  panel.id = 'cs-overview';
  panel.className = 'cs-panel cs-corner';
  panel.innerHTML = `
    <style>
      #cs-overview {
        top: 14px;
        right: 14px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 224px;
      }

      #cs-overview .ov-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #cs-overview .ov-title {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #00c9a7;
      }

      #cs-ov-canvas {
        border-radius: 3px;
        border: 1px solid rgba(0,201,167,0.15);
        display: block;
        image-rendering: pixelated;
      }

      #cs-ov-zone-panel {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 2px;
      }

      .ov-zone-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
        border-radius: 3px;
        border: 1px solid transparent;
        transition: all 0.35s;
      }
      .ov-zone-row.active-zone {
        background: rgba(255,255,255,0.04);
      }
      .ov-zone-row.active-zone.z-safe     { border-color: rgba(0,201,167,0.3); }
      .ov-zone-row.active-zone.z-charged  { border-color: rgba(245,158,11,0.3); }
      .ov-zone-row.active-zone.z-critical { border-color: rgba(239,68,68,0.3); }

      .ov-zone-dot {
        width: 9px; height: 9px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .ov-zone-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        flex: 1;
        color: #475569;
        transition: color 0.35s;
      }
      .ov-zone-row.active-zone .ov-zone-name { color: #e2e8f0; }

      .ov-zone-mult {
        font-family: 'Share Tech Mono', monospace;
        font-size: 10px;
        color: #334155;
        transition: color 0.35s;
      }
      .ov-zone-row.active-zone .ov-zone-mult { color: #94a3b8; }

      .ov-zone-status {
        font-size: 12px;
        opacity: 0.6;
      }
      .ov-zone-row.active-zone .ov-zone-status { opacity: 1; }

      #cs-ov-legend {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding-top: 2px;
      }
      .ov-leg {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px;
        color: #475569;
      }
      .ov-leg-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
      }
    </style>

    <div class="ov-header">
      <span class="ov-title">Overview</span>
    </div>

    <canvas id="cs-ov-canvas" width="${W}" height="${H}"></canvas>

    <div id="cs-ov-zone-panel">
      <div class="ov-zone-row z-safe active-zone" data-zone="safe">
        <div class="ov-zone-dot" style="background:#00c9a7; box-shadow:0 0 5px #00c9a7"></div>
        <span class="ov-zone-name">Safe</span>
        <span class="ov-zone-mult">1.0–1.5×</span>
        <span class="ov-zone-status">✓</span>
      </div>
      <div class="ov-zone-row z-charged" data-zone="charged">
        <div class="ov-zone-dot" style="background:#f59e0b; box-shadow:0 0 5px #f59e0b"></div>
        <span class="ov-zone-name">Charged</span>
        <span class="ov-zone-mult">1.5–2.5×</span>
        <span class="ov-zone-status">⚡</span>
      </div>
      <div class="ov-zone-row z-critical" data-zone="critical">
        <div class="ov-zone-dot" style="background:#ef4444; box-shadow:0 0 5px #ef4444"></div>
        <span class="ov-zone-name">Critical</span>
        <span class="ov-zone-mult">2.5×+</span>
        <span class="ov-zone-status">🔒</span>
      </div>
    </div>

    <div id="cs-ov-legend">
      <div class="ov-leg"><div class="ov-leg-dot" style="background:#00c9a755"></div>revealed</div>
      <div class="ov-leg"><div class="ov-leg-dot" style="background:#ef444488"></div>trap</div>
      <div class="ov-leg"><div class="ov-leg-dot" style="background:#fbbf2488"></div>reward</div>
    </div>
  `;

  container.appendChild(panel);
  _panelEl = panel;
  _canvas  = panel.querySelector('#cs-ov-canvas');
  _ctx     = _canvas.getContext('2d');

  // Initial blank draw
  _drawBackground();

  // RenderBridge callbacks
  on('onRoundStart', () => {
    _tileSnapshot = getAllTiles();
    _running = true;
    _currentZone = 'safe';
    _updateZonePanel('safe');
  });

  on('onReveal', ({ type }) => {
    _tileSnapshot = getAllTiles(); // refresh snapshot
    const zone = type === 'safe' ? 'safe' : type === 'trap' ? 'critical' : 'charged';
    _currentZone = zone;
    _updateZonePanel(zone);
  });

  on('onRoundEnd', () => {
    _tileSnapshot = getAllTiles();
    _running = false;
  });
}

/** Call each frame from main.js render loop to keep minimap live */
export function updateMap() {
  _drawBackground();
  _drawTiles();
  _drawTokens();
  _drawGrid();
}

// ─── Draw calls ──────────────────────────────────────────────────────────────

function _drawBackground() {
  _ctx.fillStyle = '#060e1c';
  _ctx.fillRect(0, 0, W, H);
}

function _drawGrid() {
  // Subtle longitude/latitude lines
  _ctx.strokeStyle = 'rgba(0,201,167,0.06)';
  _ctx.lineWidth = 0.5;

  for (let i = 1; i < 4; i++) {
    const x = (i / 4) * W;
    _ctx.beginPath();
    _ctx.moveTo(x, 0);
    _ctx.lineTo(x, H);
    _ctx.stroke();
  }
  for (let i = 1; i < 2; i++) {
    const y = (i / 2) * H;
    _ctx.beginPath();
    _ctx.moveTo(0, y);
    _ctx.lineTo(W, y);
    _ctx.stroke();
  }
}

function _drawTiles() {
  _tileSnapshot.forEach(({ position, zone, state }) => {
    const { x, y } = _project(position);
    const color = STATE_COLOR[state] ?? ZONE_DIM[zone] ?? '#111';
    const alpha = state === 'hidden' ? 0.5 : 1.0;

    _ctx.globalAlpha = alpha;
    _ctx.beginPath();
    _ctx.arc(x, y, TILE_R, 0, Math.PI * 2);
    _ctx.fillStyle = color;
    _ctx.fill();

    // Glow for revealed tiles
    if (state !== 'hidden') {
      _ctx.globalAlpha = 0.35;
      _ctx.beginPath();
      _ctx.arc(x, y, TILE_R + 2, 0, Math.PI * 2);
      _ctx.fillStyle = color;
      _ctx.fill();
    }

    _ctx.globalAlpha = 1;
  });
}

function _drawTokens() {
  const positions = getTokenPositions();
  positions.forEach((pos, playerId) => {
    const { x, y } = _project(pos);
    const hex = SLOT_HEX[playerId] ?? '#ffffff';

    // Outer glow ring
    _ctx.globalAlpha = 0.4;
    _ctx.beginPath();
    _ctx.arc(x, y, TOKEN_R + 3, 0, Math.PI * 2);
    _ctx.fillStyle = hex;
    _ctx.fill();

    // Token dot
    _ctx.globalAlpha = 1;
    _ctx.beginPath();
    _ctx.arc(x, y, TOKEN_R, 0, Math.PI * 2);
    _ctx.fillStyle = hex;
    _ctx.fill();

    // Player number
    _ctx.fillStyle = '#000';
    _ctx.font = `bold ${TOKEN_R + 1}px monospace`;
    _ctx.textAlign = 'center';
    _ctx.textBaseline = 'middle';
    _ctx.fillText(playerId, x, y);
  });
  _ctx.globalAlpha = 1;
}

// ─── Zone panel ───────────────────────────────────────────────────────────────

function _updateZonePanel(zone) {
  _panelEl.querySelectorAll('.ov-zone-row').forEach((row) => {
    row.classList.toggle('active-zone', row.dataset.zone === zone);
  });
}
