// ─── Circuit Sphere Player Model ───
// Data model for player state. Used by both host and clients.

import { STATUS, ZONE } from './protocol.js';

// Player colors assigned in order of joining
export const PLAYER_COLORS = [
  '#00FFFF', // Cyan
  '#FF00FF', // Magenta
  '#FFD700', // Gold
  '#00FF88', // Mint
];

/**
 * Create a new player object.
 */
export function createPlayer(id, name, colorIndex = 0) {
  return {
    id,
    name,
    color: PLAYER_COLORS[colorIndex % PLAYER_COLORS.length],
    ready: false,

    // Game state (set after game-start)
    status: STATUS.ACTIVE,
    path: [],              // Ordered tile IDs walked
    currentTileId: null,   // Head of path
    voltage: 1.0,          // Starts at 1.0x
    payout: null,          // Set on cashout

    // Tracking
    tilesExplored: 0,      // First-claim tiles
    deepestZone: ZONE.SAFE,

    // Connection
    connected: true,
    disconnectedAt: null,
    graceDeadline: null,
  };
}

/**
 * Initialize a player for a new round.
 */
export function resetPlayerForRound(player, startTileId) {
  player.status = STATUS.ACTIVE;
  player.path = [startTileId];
  player.currentTileId = startTileId;
  player.voltage = 1.0;
  player.payout = null;
  player.tilesExplored = 0;
  player.deepestZone = ZONE.SAFE;
}

/**
 * Check if a player is still active (can make moves).
 */
export function isActive(player) {
  return player.status === STATUS.ACTIVE && player.connected;
}

/**
 * Check if a player is resolved (no longer playing).
 */
export function isResolved(player) {
  return (
    player.status === STATUS.BUSTED ||
    player.status === STATUS.CASHED_OUT ||
    player.status === STATUS.FORFEITED
  );
}

/**
 * Apply a step result to a player.
 */
export function applyStepResult(player, tileId, voltageGain, zone) {
  player.path.push(tileId);
  player.currentTileId = tileId;
  player.voltage += voltageGain;

  // Track deepest zone
  const zoneDepth = { [ZONE.SAFE]: 0, [ZONE.CHARGED]: 1, [ZONE.CRITICAL]: 2 };
  if (zoneDepth[zone] > zoneDepth[player.deepestZone]) {
    player.deepestZone = zone;
  }
}

/**
 * Bust a player.
 */
export function bustPlayer(player) {
  player.status = STATUS.BUSTED;
  player.payout = 0;
}

/**
 * Cash out a player.
 */
export function cashOutPlayer(player, bet) {
  player.status = STATUS.CASHED_OUT;
  player.payout = bet * player.voltage;
}

/**
 * Forfeit a player (timeout or disconnect).
 */
export function forfeitPlayer(player) {
  player.status = STATUS.FORFEITED;
  player.payout = 0;
}

/**
 * Serialize player to network-safe object.
 */
export function serializePlayer(player) {
  return {
    id: player.id,
    name: player.name,
    color: player.color,
    status: player.status,
    path: [...player.path],
    currentTileId: player.currentTileId,
    voltage: player.voltage,
    payout: player.payout,
  };
}

/**
 * Create a lobby-view of a player (for players list broadcast).
 */
export function lobbyView(player) {
  return {
    id: player.id,
    name: player.name,
    ready: player.ready,
    color: player.color,
  };
}
