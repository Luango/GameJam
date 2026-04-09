// Shared HUD CSS — injected once on init.
// All HUD modules call injectStyles() at the top of their init().

let _injected = false;

export function injectStyles() {
  if (_injected) return;
  _injected = true;

  const style = document.createElement('style');
  style.id = 'circuit-sphere-hud';
  style.textContent = `
    /* ── Fonts & resets ─────────────────────────────────────────── */
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');

    #hud * { box-sizing: border-box; }

    /* ── Shared panel ────────────────────────────────────────────── */
    .cs-panel {
      background: rgba(6, 14, 28, 0.82);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 201, 167, 0.25);
      border-radius: 6px;
      color: #cbd5e1;
      font-family: 'Rajdhani', 'Segoe UI', sans-serif;
      position: absolute;
      pointer-events: auto;
    }

    .cs-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      background: linear-gradient(135deg, rgba(0,201,167,0.04) 0%, transparent 60%);
      pointer-events: none;
    }

    /* ── Label / heading ─────────────────────────────────────────── */
    .cs-label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 4px;
    }

    .cs-value {
      font-family: 'Share Tech Mono', monospace;
      color: #e2e8f0;
    }

    /* ── Zone colour tokens ──────────────────────────────────────── */
    .zone-safe     { color: #00c9a7; }
    .zone-charged  { color: #f59e0b; }
    .zone-critical { color: #ef4444; }

    /* ── Glow utility ────────────────────────────────────────────── */
    .glow-teal   { text-shadow: 0 0 8px #00c9a7, 0 0 20px #00c9a7aa; }
    .glow-amber  { text-shadow: 0 0 8px #f59e0b, 0 0 20px #f59e0baa; }
    .glow-red    { text-shadow: 0 0 8px #ef4444, 0 0 20px #ef4444aa; }
    .glow-blue   { text-shadow: 0 0 8px #38bdf8, 0 0 20px #38bdf8aa; }

    /* ── Divider ─────────────────────────────────────────────────── */
    .cs-divider {
      border: none;
      border-top: 1px solid rgba(0,201,167,0.12);
      margin: 6px 0;
    }

    /* ── Player slot colours ─────────────────────────────────────── */
    .slot-0 { color: #38bdf8; }
    .slot-1 { color: #f472b6; }
    .slot-2 { color: #a78bfa; }
    .slot-3 { color: #fb923c; }

    /* ── Corner bracket accent ───────────────────────────────────── */
    .cs-corner {
      position: relative;
    }
    .cs-corner::after {
      content: '';
      position: absolute;
      right: 0; bottom: 0;
      width: 10px; height: 10px;
      border-right: 1px solid rgba(0,201,167,0.5);
      border-bottom: 1px solid rgba(0,201,167,0.5);
      border-radius: 0 0 6px 0;
    }

    /* ── Scan-line overlay ───────────────────────────────────────── */
    .cs-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.06) 2px,
        rgba(0,0,0,0.06) 4px
      );
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}
