// ─── Circuit Sphere Voltage Calculator ───
// Pure function module: zone rates, path resistance, cumulative tracking.
// Runs on host for authoritative results; config sent to clients for display prediction.

import { TILE, ZONE } from './protocol.js';
import { DEFAULT_CONFIG } from './board.js';

/**
 * Calculate voltage step multiplier for a single step.
 * Multiplicative model: voltage *= stepMultiplier each step.
 * Enforces fixed 96% RTP per step: stepMultiplier = targetRTP / P(survive).
 *
 * @param {string} zone - ZONE.SAFE | ZONE.CHARGED | ZONE.CRITICAL
 * @param {string} tileType - TILE.SAFE | TILE.TRAP | TILE.REWARD
 * @param {boolean} isFollower - True if tile was already revealed safe by another player
 * @param {boolean} isSimultaneous - True if multiple players claim this tile on same turn
 * @param {number} simultaneousCount - Number of players claiming simultaneously
 * @param {object} rates - voltageRates config (default: DEFAULT_CONFIG.voltageRates)
 * @returns {{ stepMultiplier: number, breakdown: object }}
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
  // Trap = bust (multiplier zeroes out voltage)
  if (tileType === TILE.TRAP) {
    return { stepMultiplier: 0, breakdown: { base: 0, reward: 1, resistance: false } };
  }

  const zoneRates = rates[zone];
  if (!zoneRates) {
    console.warn(`[Voltage] Unknown zone: ${zone}`);
    return { stepMultiplier: 1, breakdown: { base: 1, reward: 1, resistance: false } };
  }

  let baseMultiplier;
  let resistanceApplied = false;

  if (isFollower) {
    // Already-revealed tile: 0% trap risk, house takes 4% directly
    baseMultiplier = zoneRates.follower; // 0.96
    resistanceApplied = true;
  } else if (isSimultaneous && simultaneousCount > 1) {
    // Collision Surge: base multiplier boosted by zone-specific surge percentage
    const surgeRate = rates.collisionSurge?.[zone] ?? 0;
    baseMultiplier = zoneRates.base * (1 + surgeRate);
  } else {
    // First claimer: full step multiplier
    baseMultiplier = zoneRates.base;
  }

  // Reward bonus (multiplicative on top of base)
  let rewardMultiplier = 1;
  if (tileType === TILE.REWARD) {
    const bonus = rates.rewardBonus ?? 1.15;
    if (isSimultaneous && simultaneousCount > 1) {
      // Split: raise bonus to power of 1/count
      rewardMultiplier = Math.pow(bonus, 1 / simultaneousCount);
    } else {
      rewardMultiplier = bonus;
    }
  }

  const stepMultiplier = baseMultiplier * rewardMultiplier;

  return {
    stepMultiplier: Math.round(stepMultiplier * 10000) / 10000, // 4 decimal precision
    breakdown: {
      base: baseMultiplier,
      reward: rewardMultiplier,
      resistance: resistanceApplied,
      collisionSurge: (isSimultaneous && simultaneousCount > 1 && !isFollower)
        ? (rates.collisionSurge?.[zone] ?? 0)
        : 0,
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
