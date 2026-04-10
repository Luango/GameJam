// After the bust flair, lets the player spectate the rest of the match or leave the room.

import { injectStyles } from './HudStyles.js';

const FONT_UI = "'Rajdhani', sans-serif";

export function init(container, { onSpectate, onLeave }) {
  injectStyles();

  const wrap = document.createElement('div');
  Object.assign(wrap.style, {
    position:       'fixed',
    left:           '50%',
    bottom:         '24px',
    transform:      'translateX(-50%)',
    zIndex:         '460',
    display:        'none',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '10px',
    pointerEvents:  'auto',
  });

  wrap.innerHTML = `
    <div style="font-family:${FONT_UI};font-size:12px;font-weight:600;color:#94a3b8;
                text-align:center;letter-spacing:0.06em;max-width:320px">
      You're out of this match. Watch the rest or leave the room.
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
      <button type="button" id="cs-spec-watch"
        style="background:rgba(0,201,167,0.15);border:1px solid rgba(0,201,167,0.45);
               border-radius:8px;padding:10px 20px;color:#00c9a7;
               font-family:${FONT_UI};font-size:13px;font-weight:700;letter-spacing:0.1em;
               cursor:pointer">
        SPECTATE
      </button>
      <button type="button" id="cs-spec-leave"
        style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.4);
               border-radius:8px;padding:10px 20px;color:#f87171;
               font-family:${FONT_UI};font-size:13px;font-weight:700;letter-spacing:0.1em;
               cursor:pointer">
        LEAVE ROOM
      </button>
    </div>
  `;

  container.appendChild(wrap);

  wrap.querySelector('#cs-spec-watch').addEventListener('click', () => {
    hide();
    onSpectate?.();
  });
  wrap.querySelector('#cs-spec-leave').addEventListener('click', () => {
    hide();
    onLeave?.();
  });

  function show() {
    wrap.style.display = 'flex';
  }

  function hide() {
    wrap.style.display = 'none';
  }

  return { show, hide };
}
