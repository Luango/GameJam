// ─── ResultsOverlay ───
// End-of-round results screen. Slides in on onRoundEnd, hides on onRoundStart.
// Shows ranked standings, payouts, and a dismiss button.

import { on } from '../state/RenderBridge.js';

const SLOT_HEX = ['#38bdf8', '#f472b6', '#a78bfa', '#fb923c'];
const FONT_MONO = "'Share Tech Mono', monospace";
const FONT_UI   = "'Rajdhani', sans-serif";

const RANK_LABELS = ['1ST', '2ND', '3RD', '4TH'];
const STATUS_LABEL = { bust: 'BUST', cashout: 'CASHED OUT', active: 'ACTIVE' };
const STATUS_COLOR = { bust: '#ef4444', cashout: '#38bdf8', active: '#00c9a7' };

export function init(container) {
  const overlay = _build();
  container.appendChild(overlay);

  const inner   = overlay.querySelector('#ro-inner');
  const listEl  = overlay.querySelector('#ro-list');
  const closeBtn = overlay.querySelector('#ro-close');

  // Hide on dismiss
  closeBtn.addEventListener('click', () => _hide(overlay));

  // Show on round end
  on('onRoundEnd', ({ results }) => {
    _populate(listEl, results ?? []);
    _show(overlay, inner);
  });

  // Auto-hide when a new round starts
  on('onRoundStart', () => _hide(overlay));
}

// ─── Show / hide ─────────────────────────────────────────────────────────────

function _show(overlay, inner) {
  overlay.style.display  = 'flex';
  overlay.style.opacity  = '0';
  inner.style.transform  = 'translateY(24px)';

  requestAnimationFrame(() => {
    overlay.style.transition = 'opacity 0.35s ease';
    inner.style.transition   = 'transform 0.35s ease';
    overlay.style.opacity    = '1';
    inner.style.transform    = 'translateY(0)';
  });
}

function _hide(overlay) {
  overlay.style.opacity = '0';
  setTimeout(() => { overlay.style.display = 'none'; }, 380);
}

// ─── Content ─────────────────────────────────────────────────────────────────

function _populate(listEl, results) {
  listEl.innerHTML = '';

  // Sort: cashout (payout desc) first, then bust
  const sorted = [...results].sort((a, b) => {
    const rankA = a.status === 'cashout' ? 0 : 1;
    const rankB = b.status === 'cashout' ? 0 : 1;
    if (rankA !== rankB) return rankA - rankB;
    return (b.payout ?? b.voltage ?? 0) - (a.payout ?? a.voltage ?? 0);
  });

  sorted.forEach((r, i) => {
    const slot       = r.playerId ?? i;
    const color      = SLOT_HEX[slot] ?? '#94a3b8';
    const rankLabel  = RANK_LABELS[i] ?? `${i + 1}TH`;
    const statusText = STATUS_LABEL[r.status] ?? r.status?.toUpperCase() ?? '—';
    const statusClr  = STATUS_COLOR[r.status] ?? '#94a3b8';
    const voltTxt    = (r.voltage ?? 1).toFixed(2) + '×';
    const payoutTxt  = r.payout > 0
      ? `${Math.round(r.payout).toLocaleString()} CR`
      : '—';

    const row = document.createElement('div');
    Object.assign(row.style, {
      display:      'flex',
      alignItems:   'center',
      gap:          '12px',
      padding:      '10px 14px',
      borderRadius: '8px',
      background:   i === 0 ? 'rgba(251,191,36,0.07)' : 'rgba(255,255,255,0.03)',
      border:       `1px solid ${i === 0 ? 'rgba(251,191,36,0.22)' : 'rgba(255,255,255,0.07)'}`,
    });

    row.innerHTML = `
      <span style="font-family:${FONT_MONO};font-size:10px;color:${i === 0 ? '#fbbf24' : '#475569'};
                   width:32px;text-align:center">${rankLabel}</span>
      <span style="width:10px;height:10px;border-radius:50%;background:${color};
                   box-shadow:0 0 6px ${color}88;flex-shrink:0;display:inline-block"></span>
      <span style="font-family:${FONT_UI};font-size:14px;font-weight:600;
                   color:#e2e8f0;flex:1">${r.name ?? `P${slot}`}</span>
      <span style="font-family:${FONT_MONO};font-size:11px;color:${statusClr};
                   min-width:80px;text-align:right">${statusText}</span>
      <span style="font-family:${FONT_MONO};font-size:12px;color:#cbd5e1;
                   min-width:52px;text-align:right">${voltTxt}</span>
      <span style="font-family:${FONT_MONO};font-size:13px;
                   color:${r.status === 'cashout' ? '#fbbf24' : '#475569'};
                   min-width:90px;text-align:right;
                   text-shadow:${r.status === 'cashout' ? '0 0 8px #fbbf2477' : 'none'}">
        ${payoutTxt}
      </span>
    `;

    listEl.appendChild(row);
  });

  if (sorted.length === 0) {
    listEl.innerHTML = `<div style="text-align:center;color:#475569;
      font-family:${FONT_MONO};font-size:11px;padding:20px 0">No results</div>`;
  }
}

// ─── DOM ─────────────────────────────────────────────────────────────────────

function _build() {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position:       'fixed',
    inset:          '0',
    display:        'none',
    alignItems:     'center',
    justifyContent: 'center',
    background:     'rgba(4, 8, 18, 0.82)',
    backdropFilter: 'blur(10px)',
    zIndex:         '500',
    pointerEvents:  'auto',
  });

  const inner = document.createElement('div');
  inner.id = 'ro-inner';
  Object.assign(inner.style, {
    background:   'rgba(10, 18, 36, 0.96)',
    border:       '1px solid rgba(56, 189, 248, 0.18)',
    borderRadius: '14px',
    padding:      '32px 36px',
    minWidth:     '480px',
    maxWidth:     '620px',
    width:        '90vw',
    maxHeight:    '80vh',
    overflowY:    'auto',
    display:      'flex',
    flexDirection:'column',
    gap:          '20px',
  });

  inner.innerHTML = `
    <!-- Header -->
    <div style="text-align:center">
      <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:.22em;
                  color:#475569;text-transform:uppercase;margin-bottom:6px">Round Complete</div>
      <div style="font-family:${FONT_UI};font-size:28px;font-weight:700;
                  letter-spacing:.1em;color:#e2e8f0">FINAL STANDINGS</div>
    </div>

    <!-- Column headers -->
    <div style="display:flex;align-items:center;gap:12px;
                padding:0 14px;font-family:${FONT_MONO};font-size:8px;
                letter-spacing:.14em;color:#334155;text-transform:uppercase">
      <span style="width:32px;text-align:center">Rank</span>
      <span style="width:10px"></span>
      <span style="flex:1">Player</span>
      <span style="min-width:80px;text-align:right">Result</span>
      <span style="min-width:52px;text-align:right">Mult</span>
      <span style="min-width:90px;text-align:right">Payout</span>
    </div>

    <!-- Results list -->
    <div id="ro-list" style="display:flex;flex-direction:column;gap:8px"></div>

    <!-- Actions -->
    <div style="display:flex;justify-content:center;padding-top:4px">
      <button id="ro-close"
        style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.3);
               border-radius:6px;padding:10px 32px;color:#38bdf8;
               font-family:${FONT_UI};font-size:13px;font-weight:600;letter-spacing:.12em;
               cursor:pointer;transition:all 0.2s">
        CONTINUE
      </button>
    </div>
  `;

  overlay.appendChild(inner);
  return overlay;
}
