// ─── GameStartBanner ───
// Slides in from the top on onRoundStart with game instructions.
// Auto-dismisses after 4 seconds. Hidden immediately on onRoundEnd.

import { on } from '../state/RenderBridge.js';

const FONT_MONO = "'Share Tech Mono', monospace";
const FONT_UI   = "'Rajdhani', sans-serif";
const AUTO_HIDE_MS = 4200;

export function init(container) {
  const banner = _build();
  container.appendChild(banner);

  let _hideTimer = null;

  on('onRoundStart', () => {
    clearTimeout(_hideTimer);
    _show(banner);
    _hideTimer = setTimeout(() => _hide(banner), AUTO_HIDE_MS);
  });

  on('onRoundEnd', () => {
    clearTimeout(_hideTimer);
    _hide(banner);
  });
}

// ─── Show / hide ─────────────────────────────────────────────────────────────

function _show(banner) {
  banner.style.display    = 'flex';
  banner.style.opacity    = '0';
  banner.style.transform  = 'translateY(-28px)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      banner.style.transition  = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      banner.style.opacity     = '1';
      banner.style.transform   = 'translateY(0)';
    });
  });
}

function _hide(banner) {
  banner.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  banner.style.opacity    = '0';
  banner.style.transform  = 'translateY(-16px)';
  setTimeout(() => { banner.style.display = 'none'; }, 380);
}

// ─── DOM ─────────────────────────────────────────────────────────────────────

function _build() {
  const banner = document.createElement('div');
  Object.assign(banner.style, {
    position:        'fixed',
    top:             '18px',
    left:            '50%',
    transform:       'translateX(-50%) translateY(-28px)',
    display:         'none',
    flexDirection:   'column',
    alignItems:      'center',
    gap:             '6px',
    background:      'rgba(6, 14, 28, 0.92)',
    border:          '1px solid rgba(0, 201, 167, 0.45)',
    borderRadius:    '10px',
    padding:         '14px 28px',
    pointerEvents:   'none',
    zIndex:          '300',
    boxShadow:       '0 0 32px rgba(0,201,167,0.15), 0 4px 24px rgba(0,0,0,0.5)',
    backdropFilter:  'blur(8px)',
    minWidth:        '320px',
    textAlign:       'center',
  });

  banner.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;justify-content:center">
      <span style="width:6px;height:6px;border-radius:50%;background:#00c9a7;
                   box-shadow:0 0 8px #00c9a7;animation:cs-pulse 1s ease infinite;
                   flex-shrink:0"></span>
      <span style="font-family:${FONT_MONO};font-size:10px;letter-spacing:.22em;
                   color:#00c9a7;text-transform:uppercase">Round Started</span>
      <span style="width:6px;height:6px;border-radius:50%;background:#00c9a7;
                   box-shadow:0 0 8px #00c9a7;animation:cs-pulse 1s ease infinite;
                   flex-shrink:0"></span>
    </div>
    <div style="font-family:${FONT_UI};font-size:20px;font-weight:700;
                letter-spacing:.08em;color:#e2e8f0;line-height:1.1">
      NAVIGATE THE SPHERE
    </div>
    <div style="font-family:${FONT_MONO};font-size:9px;letter-spacing:.16em;
                color:#64748b;text-transform:uppercase;line-height:1.6">
      Click glowing tiles to move &nbsp;·&nbsp; Avoid traps &nbsp;·&nbsp; Cash out to win
    </div>
  `;

  // Inject pulse keyframe once
  if (!document.getElementById('cs-gsb-style')) {
    const style = document.createElement('style');
    style.id = 'cs-gsb-style';
    style.textContent = `
      @keyframes cs-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.75); }
      }
    `;
    document.head.appendChild(style);
  }

  return banner;
}
