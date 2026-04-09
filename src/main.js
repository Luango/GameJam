import { init, render, getScene, getCamera } from './renderer/SphereRenderer.js';
import { buildGrid, updateTiles } from './renderer/HexGrid.js';
import { initPathTracer } from './renderer/PathTracer.js';
import { initTokens, updateTokens, getTokenPositions } from './renderer/PlayerToken.js';
import { init as initBridge, handleTilePick, getLocalPlayerId } from './state/RenderBridge.js';
import { initHarness } from './dev/MockEventHarness.js';

// Phase 3 — HUD
import { init as initVoltage }     from './hud/VoltageDisplay.js';
import { init as initTimer }       from './hud/TurnTimer.js';
import { init as initCashout, lockIn } from './hud/CashoutButton.js';
import { init as initLeaderboard }     from './hud/Leaderboard.js';
import { init as initBetInput, getBet } from './hud/BetInput.js';
import { init as initOverview, updateMap } from './hud/OverviewMap.js';

import * as THREE from 'three';

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

// --- Phase 3: HUD ---
initLeaderboard(hud);
initVoltage(hud);
initOverview(hud);
initTimer(hud, { onLock: lockIn });
initBetInput(hud);
initCashout(hud, { getBet });

// Current-position label (world-to-screen, drawn each frame)
const _posLabel = _createPosLabel();
document.getElementById('app').appendChild(_posLabel);

function _createPosLabel() {
  const el = document.createElement('div');
  el.id = 'cs-pos-label';
  el.textContent = 'CURRENT POS.';
  el.style.cssText = `
    position: absolute;
    pointer-events: none;
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    color: #38bdf8;
    text-shadow: 0 0 8px #38bdf8;
    background: rgba(6,14,28,0.7);
    border: 1px solid rgba(56,189,248,0.3);
    border-radius: 3px;
    padding: 2px 6px;
    white-space: nowrap;
    display: none;
    transform: translate(-50%, -200%);
  `;
  return el;
}

const _vec3 = new THREE.Vector3();

function _updatePosLabel() {
  const positions = getTokenPositions();
  const localId   = getLocalPlayerId();
  const localPos  = positions.get(localId);

  if (!localPos) { _posLabel.style.display = 'none'; return; }

  // Project world → NDC → CSS pixels
  _vec3.copy(localPos);
  _vec3.project(camera);

  const rect = canvas.getBoundingClientRect();
  const x = ((_vec3.x + 1) / 2) * rect.width  + rect.left;
  const y = ((-_vec3.y + 1) / 2) * rect.height + rect.top;

  // Hide if behind camera
  if (_vec3.z > 1) { _posLabel.style.display = 'none'; return; }

  _posLabel.style.display = 'block';
  _posLabel.style.left = `${x}px`;
  _posLabel.style.top  = `${y}px`;
}

// --- Render loop ---
function loop(now) {
  updateTiles(now);
  updateTokens(now);
  updateMap();
  _updatePosLabel();
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
