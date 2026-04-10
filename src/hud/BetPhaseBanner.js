// ─── BetPhaseBanner ───
// Full-screen–style centered panel during the wager window (matches bust / navigate clarity).
// Shown/hidden from main via orchestrator callbacks; pointer-events none.

const FONT_MONO = "'Share Tech Mono', monospace";
const FONT_UI   = "'Rajdhani', sans-serif";

export function init(container) {
  const { overlay, panel } = _build();
  container.appendChild(overlay);

  return {
    show() {
      _show(overlay, panel);
    },
    hide() {
      _hide(overlay);
    },
  };
}

function _show(overlay, panel) {
  overlay.style.display   = 'flex';
  overlay.style.opacity   = '0';
  panel.style.transform   = 'translate(-50%, -50%) scale(0.92)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.35s ease';
      panel.style.transition   = 'transform 0.4s cubic-bezier(0.34,1.4,0.64,1)';
      overlay.style.opacity    = '0.97';
      panel.style.transform    = 'translate(-50%, -50%) scale(1)';
    });
  });
}

function _hide(overlay) {
  overlay.style.transition = 'opacity 0.35s ease';
  overlay.style.opacity    = '0';
  setTimeout(() => { overlay.style.display = 'none'; }, 360);
}

function _build() {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position:       'fixed',
    inset:          '0',
    display:        'none',
    alignItems:     'center',
    justifyContent: 'center',
    background:     'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, rgba(6,14,28,0.72) 55%, rgba(6,14,28,0.88) 100%)',
    zIndex:         '320',
    pointerEvents:  'none',
  });

  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position:       'absolute',
    top:            '50%',
    left:           '50%',
    transform:      'translate(-50%, -50%) scale(0.92)',
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '8px',
    background:     'rgba(6, 14, 28, 0.94)',
    border:         '1px solid rgba(56, 189, 248, 0.5)',
    borderRadius:   '14px',
    padding:        '22px 36px',
    minWidth:       '360px',
    textAlign:      'center',
    boxShadow:      '0 0 40px rgba(56,189,248,0.12), 0 12px 48px rgba(0,0,0,0.55)',
    backdropFilter: 'blur(12px)',
  });

  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;justify-content:center">
      <span style="width:7px;height:7px;border-radius:50%;background:#38bdf8;
                   box-shadow:0 0 10px #38bdf8;animation:cs-bet-pulse 1.1s ease infinite;
                   flex-shrink:0"></span>
      <span style="font-family:${FONT_UI};font-size:12px;font-weight:700;letter-spacing:.22em;
                   color:#38bdf8;text-transform:uppercase">Betting Phase</span>
      <span style="width:7px;height:7px;border-radius:50%;background:#38bdf8;
                   box-shadow:0 0 10px #38bdf8;animation:cs-bet-pulse 1.1s ease infinite;
                   flex-shrink:0"></span>
    </div>
    <div style="font-family:${FONT_UI};font-size:28px;font-weight:800;
                letter-spacing:.1em;color:#e0f2fe;line-height:1.1;
                text-shadow:0 0 24px rgba(56,189,248,0.35)">
      PLACE YOUR WAGER
    </div>
    <div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:.14em;
                color:#94a3b8;text-transform:uppercase;line-height:1.5;max-width:340px">
      Commit a bet before the timer ends &nbsp;·&nbsp; Only players who wager join this round
    </div>
  `;

  overlay.appendChild(panel);

  if (!document.getElementById('cs-bet-banner-style')) {
    const style = document.createElement('style');
    style.id = 'cs-bet-banner-style';
    style.textContent = `
      @keyframes cs-bet-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.45; transform: scale(0.78); }
      }
    `;
    document.head.appendChild(style);
  }

  return { overlay, panel };
}
