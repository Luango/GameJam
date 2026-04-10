// ─── MuteButton ───
// Fixed bottom-right toggle that silences/restores all audio (music + SFX).
// State is persisted via AudioManager's localStorage key so it survives reloads.

import { toggleMute, isMuted } from '../audio/AudioManager.js';

const FONT_MONO = "'Share Tech Mono', monospace";

const COLOR_ON   = 'rgba(0, 201, 167, 0.50)';   // teal  — sound active
const COLOR_MUTE = 'rgba(239, 68, 68, 0.50)';   // red   — muted

const GLOW_ON   = '0 0 14px rgba(0,201,167,0.20), 0 4px 16px rgba(0,0,0,0.5)';
const GLOW_MUTE = '0 0 14px rgba(239,68,68,0.18), 0 4px 16px rgba(0,0,0,0.5)';

export function init(container) {
  _injectStyles();
  const btn = _build();
  container.appendChild(btn);
}

function _build() {
  const btn = document.createElement('button');
  btn.id = 'cs-mute-btn';

  Object.assign(btn.style, {
    position:        'fixed',
    bottom:          '14px',
    right:           '14px',
    width:           '46px',
    height:          '46px',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '2px',
    background:      'rgba(6, 14, 28, 0.88)',
    backdropFilter:  'blur(10px)',
    border:          `1px solid ${isMuted() ? COLOR_MUTE : COLOR_ON}`,
    borderRadius:    '8px',
    cursor:          'pointer',
    zIndex:          '340',
    pointerEvents:   'auto',
    outline:         'none',
    padding:         '0',
    transition:      'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow:       isMuted() ? GLOW_MUTE : GLOW_ON,
  });

  const icon = document.createElement('span');
  icon.id = 'cs-mute-icon';
  Object.assign(icon.style, {
    fontSize:   '18px',
    lineHeight: '1',
    userSelect: 'none',
  });

  const label = document.createElement('span');
  label.id = 'cs-mute-label';
  Object.assign(label.style, {
    fontFamily:    FONT_MONO,
    fontSize:      '7px',
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    color:         '#475569',
    userSelect:    'none',
    lineHeight:    '1',
  });

  _applyState(btn, icon, label, isMuted());

  btn.appendChild(icon);
  btn.appendChild(label);

  btn.addEventListener('click', () => {
    const nowMuted = toggleMute();
    _applyState(btn, icon, label, nowMuted);
  });

  return btn;
}

function _applyState(btn, icon, label, muted) {
  icon.textContent      = muted ? '🔇' : '🔊';
  label.textContent     = muted ? 'MUTED' : 'SOUND';
  btn.style.borderColor = muted ? COLOR_MUTE : COLOR_ON;
  btn.style.boxShadow   = muted ? GLOW_MUTE : GLOW_ON;
}

function _injectStyles() {
  if (document.getElementById('cs-mute-style')) return;
  const style = document.createElement('style');
  style.id = 'cs-mute-style';
  style.textContent = `
    #cs-mute-btn:hover {
      background: rgba(6, 14, 28, 0.97) !important;
      filter: brightness(1.15);
    }
    #cs-mute-btn:active {
      transform: scale(0.93);
    }
  `;
  document.head.appendChild(style);
}
