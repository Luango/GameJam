// ─── Circuit Sphere Voltage Calculator ───
// Pure function module: zone rates, path resistance, cumulative tracking.
// Runs on host for authoritative results; config sent to clients for display prediction.

import { TILE, ZONE } from './protocol.js';
import { DEFAULT_CONFIG } from './board.js';

/**
 * Calculate Voltage gain for a single step.
 *
 * @param {string} zone - ZONE.SAFE | ZONE.CHARGED | ZONE.CRITICAL
 * @param {string} tileType - TILE.SAFE | TILE.TRAP | TILE.REWARD
 * @param {boolean} isFollower - True if tile was already revealed safe by another player
 * @param {boolean} isSimultaneous - True if multiple players claim this tile on same turn
 * @param {number} simultaneousCount - Number of players claiming simultaneously (for reward split)
 * @param {object} rates - voltageRates config (default: DEFAULT_CONFIG.voltageRates)
 * @returns {{ voltageGain: number, breakdown: object }}
 */
export function calculateStepVoltage(
  zone,
  tileType,
  {
    isFollower = false,
    isSimultaneous = false,
    simultaneousCount = 1,
    rates = DEFAULT_CONFIG.voltageRates,
  } = {}
) {
  // Trap = no gain (player busts)
  if (tileType === TILE.TRAP) {
    return { voltageGain: 0, breakdown: { base: 0, reward: 0, resistance: false } };
  }

  const zoneRates = rates[zone];
  if (!zoneRates) {
    console.warn(`[Voltage] Unknown zone: ${zone}`);
    return { voltageGain: 0, breakdown: { base: 0, reward: 0, resistance: false } };
  }

  let baseGain;
  let resistanceApplied = false;

  if (isFollower) {
    // Path resistance: follower gets reduced rate
    baseGain = zoneRates.follower;
    resistanceApplied = true;
  } else if (isSimultaneous && simultaneousCount > 1) {
    // Simultaneous claim: between full and follower
    // Use average of base and follower
    baseGain = (zoneRates.base + zoneRates.follower) / 2;
  } else {
    // First claimer: full rate
    baseGain = zoneRates.base;
  }

  // Reward bonus
  let rewardGain = 0;
  if (tileType === TILE.REWARD) {
    rewardGain = zoneRates.reward;
    if (isSimultaneous && simultaneousCount > 1) {
      // Split reward evenly among simultaneous claimers
      rewardGain = rewardGain / simultaneousCount;
    }
  }

  const voltageGain = baseGain + rewardGain;

  return {
    voltageGain: Math.round(voltageGain * 1000) / 1000, // 3 decimal precision
    breakdown: {
      base: baseGain,
      reward: rewardGain,
      resistance: resistanceApplied,
    },
  };
}

/**
 * Calculate payout for a cash-out.
 *
 * @param {number} bet - Original bet amount
 * @param {number} voltage - Current voltage multiplier
 * @returns {number} Payout amount
 */
export function calculatePayout(bet, voltage) {
  return Math.round(bet * voltage * 100) / 100; // 2 decimal precision
}

/**
 * Get the display color for a voltage value (for HUD rendering).
 */
export function getVoltageColor(voltage) {
  if (voltage < 1.5) return '#00FFAA';   // Low - green/teal
  if (voltage < 3.0) return '#FFD700';   // Medium - gold
  if (voltage < 6.0) return '#FF8C00';   // High - orange
  return '#FF3C1E';                       // Extreme - red
}

/**
 * Get zone color for display.
 */
export function getZoneColor(zone) {
  switch (zone) {
    case ZONE.SAFE:     return '#00FFAA';
    case ZONE.CHARGED:  return '#FFD700';
    case ZONE.CRITICAL: return '#FF3C1E';
    default:            return '#FFFFFF';
  }
}
