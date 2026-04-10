// ─── HowToPlayPanel ───
// One-time tutorial overlay shown during the first betting phase.
// Explains the 3 core mechanics: Spread, Junction, Cash Out.
// Dismissed via button; localStorage prevents it from showing again.

const SEEN_KEY  = 'cs_howtoplay_seen';
const FONT_MONO = "'Share Tech Mono', monospace";
const FONT_UI   = "'Rajdhani', sans-serif";

const MECHANICS = [
  {
    icon:  '◎',
    title: 'SPREAD',
    color: '#00c9a7',
    glow:  'rgba(0,201,167,0.25)',
    body:  'Explore the grid into Safe, Charge, and Critical zones. Each carries a different multiplier — the deeper you go, the higher the risk and reward.',
  },
  {
    icon:  '⚡',
    title: 'JUNCTION',
    color: '#f59e0b',
    glow:  'rgba(245,158,11,0.25)',
    body:  'Invade another player\'s tile to merge multipliers together. The combined voltage can be massive — if you both survive.',
  },
  {
    icon:  '✦',
    title: 'CASH OUT',
    color: '#ef4444',
    glow:  'rgba(239,68,68,0.25)',
    body:  'Trust your gut and lock in your winnings. Wait too long chasing a higher multiplier and you risk losing everything.',
  },
];

export function init(container) {
  const { overlay, panel } = _build();
  container.appendChild(overlay);

  return {
    showIfFirstTime() {
      if (localStorage.getItem(SEEN_KEY)) return;
      _show(overlay, panel);
    },
    hide() {
      _hide(overlay);
    },
  };
}

function _show(overlay, panel) {
  overlay.style.display  = 'flex';
  overlay.style.opacity  = '0';
  panel.style.transform  = 'translate(-50%, -50%) scale(0.92)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.35s ease';
      panel.style.transition   = 'transform 0.4s cubic-bezier(0.34,1.4,0.64,1)';
      overlay.style.opacity    = '1';
      panel.style.transform    = 'translate(-50%, -50%) scale(1)';
    });
  });
}

function _hide(overlay) {
  overlay.style.transition = 'opacity 0.3s ease';
  overlay.style.opacity    = '0';
  setTimeout(() => { overlay.style.display = 'none'; }, 320);
}

function _build() {
  // ── Inject keyframe styles once ─────────────────────────────────────────────
  if (!document.getElementById('cs-htp-style')) {
    const style = document.createElement('style');
    style.id = 'cs-htp-style';
    style.textContent = `
      @keyframes cs-htp-glow {
        0%, 100% { opacity: 0.7; }
        50%       { opacity: 1; }
      }
      #cs-htp-dismiss:hover {
        background: rgba(0,201,167,0.18) !important;
        border-color: rgba(0,201,167,0.9) !important;
        color: #e0f2fe !important;
      }
      #cs-htp-dismiss:active {
        transform: scale(0.96);
      }
    `;
    document.head.appendChild(style);
  }

  // ── Overlay backdrop ─────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position:        'fixed',
    inset:           '0',
    display:         'none',
    alignItems:      'center',
    justifyContent:  'center',
    background:      'radial-gradient(ellipse at center, rgba(0,201,167,0.05) 0%, rgba(6,14,28,0.78) 55%, rgba(6,14,28,0.92) 100%)',
    zIndex:          '400',
    pointerEvents:   'auto',
  });

  // ── Center panel ─────────────────────────────────────────────────────────────
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position:        'absolute',
    top:             '50%',
    left:            '50%',
    transform:       'translate(-50%, -50%) scale(0.92)',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    gap:             '20px',
    background:      'rgba(6, 14, 28, 0.96)',
    border:          '1px solid rgba(0,201,167,0.35)',
    borderRadius:    '16px',
    padding:         '28px 32px 24px',
    width:           'min(600px, 92vw)',
    boxShadow:       '0 0 60px rgba(0,201,167,0.08), 0 20px 60px rgba(0,0,0,0.6)',
    backdropFilter:  'blur(14px)',
  });

  // ── Header ───────────────────────────────────────────────────────────────────
  const header = document.createElement('div');
  Object.assign(header.style, {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '4px',
  });
  header.innerHTML = `
    <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:.26em;
                color:#00c9a7;text-transform:uppercase;opacity:0.8;
                animation:cs-htp-glow 2s ease infinite">
      — VOLTEX —
    </div>
    <div style="font-family:${FONT_UI};font-size:26px;font-weight:800;
                letter-spacing:.12em;color:#e0f2fe;line-height:1.1;
                text-shadow:0 0 20px rgba(0,201,167,0.2)">
      HOW TO PLAY
    </div>
  `;

  // ── Mechanic cards ───────────────────────────────────────────────────────────
  const cards = document.createElement('div');
  Object.assign(cards.style, {
    display:   'flex',
    gap:       '12px',
    width:     '100%',
  });

  MECHANICS.forEach(({ icon, title, color, glow, body }) => {
    const card = document.createElement('div');
    Object.assign(card.style, {
      flex:           '1',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      gap:            '8px',
      background:     `rgba(6, 14, 28, 0.6)`,
      border:         `1px solid ${color}40`,
      borderRadius:   '10px',
      padding:        '16px 12px',
      textAlign:      'center',
      boxShadow:      `0 0 20px ${glow}`,
    });
    card.innerHTML = `
      <div style="font-size:22px;line-height:1;color:${color};
                  text-shadow:0 0 14px ${color}80">${icon}</div>
      <div style="font-family:${FONT_UI};font-size:13px;font-weight:700;
                  letter-spacing:.18em;color:${color};text-transform:uppercase">${title}</div>
      <div style="font-family:${FONT_MONO};font-size:10.5px;line-height:1.55;
                  color:#94a3b8;letter-spacing:.03em">${body}</div>
    `;
    cards.appendChild(card);
  });

  // ── Divider ──────────────────────────────────────────────────────────────────
  const divider = document.createElement('div');
  Object.assign(divider.style, {
    width:           '100%',
    height:          '1px',
    background:      'linear-gradient(90deg, transparent, rgba(0,201,167,0.2), transparent)',
  });

  // ── Dismiss button ───────────────────────────────────────────────────────────
  const btn = document.createElement('button');
  btn.id = 'cs-htp-dismiss';
  btn.textContent = 'GOT IT  —  LET\'S PLAY';
  Object.assign(btn.style, {
    fontFamily:      FONT_UI,
    fontSize:        '13px',
    fontWeight:      '700',
    letterSpacing:   '.2em',
    textTransform:   'uppercase',
    color:           '#00c9a7',
    background:      'rgba(0,201,167,0.08)',
    border:          '1px solid rgba(0,201,167,0.5)',
    borderRadius:    '8px',
    padding:         '10px 28px',
    cursor:          'pointer',
    transition:      'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
    outline:         'none',
  });

  btn.addEventListener('click', () => {
    localStorage.setItem(SEEN_KEY, '1');
    _hide(overlay);
  });

  panel.appendChild(header);
  panel.appendChild(cards);
  panel.appendChild(divider);
  panel.appendChild(btn);
  overlay.appendChild(panel);

  return { overlay, panel };
}
