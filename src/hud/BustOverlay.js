// ─── BustOverlay ───
// Shown only for the local player when they bust.
// Dramatic red screen flash + "CIRCUIT OVERLOADED" panel.
// Auto-dismisses after 3.5 s. Hidden immediately on onRoundStart.

import { on } from '../state/RenderBridge.js';

const FONT_MONO   = "'Share Tech Mono', monospace";
const FONT_UI     = "'Rajdhani', sans-serif";
const AUTO_HIDE_MS = 3500;

export function init(container) {
  let _localSlot = 0;
  let _hideTimer = null;

  const { overlay, panel, bar } = _build();
  container.appendChild(overlay);

  on('onRoundStart', ({ localPlayerId }) => {
    _localSlot = localPlayerId ?? 0;
    clearTimeout(_hideTimer);
    _hide(overlay);
  });

  on('onBust', ({ playerId }) => {
    if (playerId !== _localSlot) return; // only local player
    clearTimeout(_hideTimer);
    _show(overlay, panel, bar);
    _hideTimer = setTimeout(() => _hide(overlay), AUTO_HIDE_MS);
  });
}

// ─── Show / hide ─────────────────────────────────────────────────────────────

function _show(overlay, panel, bar) {
  overlay.style.display  = 'flex';
  overlay.style.opacity  = '0';
  panel.style.transform  = 'scale(0.88)';
  bar.style.width        = '100%';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.25s ease';
      panel.style.transition   = 'transform 0.35s cubic-bezier(0.34,1.4,0.64,1)';
      overlay.style.opacity    = '1';
      panel.style.transform    = 'scale(1)';

      // Animate countdown bar shrinking over AUTO_HIDE_MS
      bar.style.transition     = `width ${AUTO_HIDE_MS}ms linear`;
      requestAnimationFrame(() => { bar.style.width = '0%'; });
    });
  });
}

function _hide(overlay) {
  overlay.style.transition = 'opacity 0.4s ease';
  overlay.style.opacity    = '0';
  setTimeout(() => { overlay.style.display = 'none'; }, 420);
}

// ─── DOM ─────────────────────────────────────────────────────────────────────

function _build() {
  // Full-screen backdrop — red vignette
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position:        'fixed',
    inset:           '0',
    display:         'none',
    alignItems:      'center',
    justifyContent:  'center',
    background:      'radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, rgba(139,0,0,0.45) 100%)',
    zIndex:          '450',
    pointerEvents:   'none',
  });

  // Edge pulse rings
  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position:     'absolute',
    inset:        '0',
    border:       '3px solid rgba(239,68,68,0.6)',
    animation:    'cs-bust-ring 0.3s ease forwards',
    pointerEvents:'none',
  });
  overlay.appendChild(ring);

  // Center panel
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position:       'relative',
    background:     'rgba(8, 4, 4, 0.96)',
    border:         '1px solid rgba(239,68,68,0.55)',
    borderRadius:   '14px',
    padding:        '36px 48px 24px',
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '10px',
    boxShadow:      '0 0 60px rgba(239,68,68,0.3), 0 0 120px rgba(139,0,0,0.2)',
    minWidth:       '320px',
    overflow:       'hidden',
    transform:      'scale(0.88)',
  });

  panel.innerHTML = `
    <!-- Icon -->
    <div style="font-size:40px;line-height:1;filter:drop-shadow(0 0 12px #ef4444);
                animation:cs-bust-shake 0.4s ease">⚡</div>

    <!-- Main label -->
    <div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:.28em;
                color:#ef4444;text-transform:uppercase;margin-top:4px">
      Circuit Overloaded
    </div>
    <div style="font-family:${FONT_UI};font-size:38px;font-weight:800;
                letter-spacing:.12em;color:#fca5a5;
                text-shadow:0 0 24px #ef444488,0 0 48px #ef444444;
                line-height:1">
      BUSTED
    </div>

    <!-- Subtitle -->
    <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:.18em;
                color:#64748b;text-transform:uppercase;margin-top:2px">
      You stepped on a trap
    </div>

    <div style="font-family:${FONT_MONO};font-size:9px;letter-spacing:.14em;
                color:#475569;margin-top:6px">
      spectating remainder of round
    </div>
  `;

  // Countdown bar at bottom of panel
  const barTrack = document.createElement('div');
  Object.assign(barTrack.style, {
    position:     'absolute',
    bottom:       '0',
    left:         '0',
    right:        '0',
    height:       '3px',
    background:   'rgba(255,255,255,0.05)',
  });
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    height:     '100%',
    width:      '100%',
    background: 'linear-gradient(90deg, #ef4444, #f87171)',
    boxShadow:  '0 0 8px #ef4444',
  });
  barTrack.appendChild(bar);
  panel.appendChild(barTrack);

  overlay.appendChild(panel);

  // Inject keyframes once
  if (!document.getElementById('cs-bust-style')) {
    const style = document.createElement('style');
    style.id = 'cs-bust-style';
    style.textContent = `
      @keyframes cs-bust-ring {
        0%   { opacity: 0.9; transform: scale(1); }
        60%  { opacity: 0.5; transform: scale(1.008); }
        100% { opacity: 0;   transform: scale(1.016); }
      }
      @keyframes cs-bust-shake {
        0%,100% { transform: translateX(0) rotate(0deg); }
        20%     { transform: translateX(-4px) rotate(-8deg); }
        40%     { transform: translateX(4px)  rotate(8deg); }
        60%     { transform: translateX(-3px) rotate(-5deg); }
        80%     { transform: translateX(3px)  rotate(5deg); }
      }
    `;
    document.head.appendChild(style);
  }

  return { overlay, panel, bar };
}
