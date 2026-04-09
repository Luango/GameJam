import { init, render, getScene, getCamera } from './renderer/SphereRenderer.js';
import { buildGrid, updateTiles } from './renderer/HexGrid.js';
import { initPathTracer } from './renderer/PathTracer.js';
import { initTokens, updateTokens } from './renderer/PlayerToken.js';
import { init as initBridge, handleTilePick } from './state/RenderBridge.js';
import { initHarness } from './dev/MockEventHarness.js';

// Phase 3 — HUD modules imported once implemented
// import { init as initVoltage } from './hud/VoltageDisplay.js';
// import { init as initTimer } from './hud/TurnTimer.js';
// import { init as initCashout } from './hud/CashoutButton.js';
// import { init as initLeaderboard } from './hud/Leaderboard.js';
// import { init as initBetInput } from './hud/BetInput.js';

const canvas = document.getElementById('canvas');
const hud    = document.getElementById('hud');

// --- Renderer ---
const { scene, camera } = init(canvas);

// --- Phase 1: 3D scene ---
buildGrid(scene);
initPathTracer(scene);
initTokens(scene);

// --- Phase 2: event bridge + mock harness ---
const eventBus = new EventTarget();
initBridge(eventBus);
if (import.meta.env.DEV) initHarness(eventBus);

// Tile picking — forward canvas clicks to RenderBridge
canvas.addEventListener('pointerup', (e) => {
  const rect = canvas.getBoundingClientRect();
  const ndc = {
    x:  ((e.clientX - rect.left) / rect.width)  * 2 - 1,
    y: -((e.clientY - rect.top)  / rect.height) * 2 + 1,
  };
  handleTilePick(ndc, camera);
});

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
