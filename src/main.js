import { init, render, getScene, getCamera } from './renderer/SphereRenderer.js';
import { buildGrid, updateTiles } from './renderer/HexGrid.js';
import { initPathTracer } from './renderer/PathTracer.js';
import { initTokens, updateTokens } from './renderer/PlayerToken.js';

// Phase 2 — imported once RenderBridge and MockEventHarness are implemented
// import { init as initBridge } from './state/RenderBridge.js';
// import { initHarness } from './dev/MockEventHarness.js';

// Phase 3 — HUD modules imported once implemented
// import { init as initVoltage } from './hud/VoltageDisplay.js';
// import { init as initTimer } from './hud/TurnTimer.js';
// import { init as initCashout } from './hud/CashoutButton.js';
// import { init as initLeaderboard } from './hud/Leaderboard.js';
// import { init as initBetInput } from './hud/BetInput.js';

const canvas = document.getElementById('canvas');
const hud    = document.getElementById('hud');

// --- Renderer ---
const { scene } = init(canvas);

// --- Phase 1: 3D scene ---
buildGrid(scene);
initPathTracer(scene);
initTokens(scene);

// --- Phase 2 bootstrap (uncomment when implemented) ---
// const eventBus = new EventTarget();
// initBridge(eventBus, scene);
// if (import.meta.env.DEV) initHarness(eventBus);

// --- Phase 3 bootstrap (uncomment when implemented) ---
// initVoltage(hud);
// initTimer(hud);
// initCashout(hud);
// initLeaderboard(hud);
// initBetInput(hud);

// --- Render loop ---
function loop(now) {
  updateTiles(now);
  updateTokens(now);
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
