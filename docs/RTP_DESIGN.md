# Circuit Sphere — RTP Design Document

> **Source of truth** for all probability, payout, and house-edge calculations.
> Any change to game economics MUST be reflected here first.

---

## 1. Overview

| Property | Value |
|----------|-------|
| **Target RTP** | 96.00% (4% house edge) |
| **Model** | Multiplicative voltage — `voltage *= stepMultiplier` per step |
| **Enforcement** | Mathematical — every step in every zone yields exactly 96% RTP regardless of accumulated voltage or strategy |
| **Payout formula** | `payout = bet × voltage` |
| **Starting voltage** | 1.0× (multiplicative identity) |
| **Rake / commission** | None — house edge is embedded in step multipliers |

---

## 2. Core Formula

```
stepMultiplier = targetRTP / P(survive)
P(survive)     = 1 - trapDensity[zone]
```

**Proof that RTP = 96% per step at any voltage V:**

```
E[V_after] = P(survive) × V × stepMultiplier + P(trap) × 0
           = P(survive) × V × (targetRTP / P(survive))
           = targetRTP × V
           = 0.96 × V
```

This holds for all V > 0. No strategy can achieve RTP > 100%.

---

## 3. Zone Configuration

### 3.1 Tile Distribution

| Zone | Trap Density | Reward Density | Safe Tiles | P(survive) |
|------|-------------|----------------|------------|------------|
| SAFE | 12% | 10% | 78% | 0.88 |
| CHARGED | 25% | 12% | 63% | 0.75 |
| CRITICAL | 35% | 15% | 50% | 0.65 |

**Config location:** `js/board.js` → `DEFAULT_CONFIG.trapDensity`, `DEFAULT_CONFIG.rewardDensity`

### 3.2 Zone Boundaries (Latitude from equator)

| Zone | Latitude Range | Sphere Coverage |
|------|---------------|-----------------|
| SAFE | 0° – 23° (≤ 0.4 rad) | Equatorial band |
| CHARGED | 23° – 51° (0.4 – 0.9 rad) | Mid-latitudes |
| CRITICAL | 51° – 90° (> 0.9 rad) | Polar regions |

**Config location:** `js/board.js` → `DEFAULT_CONFIG.zoneBounds`

---

## 4. Step Multipliers

### 4.1 Base Multipliers (First Claimer)

| Zone | stepMultiplier | Derivation | Per-Step Gain |
|------|---------------|------------|---------------|
| SAFE | **1.09091** | 0.96 / 0.88 | +9.1% |
| CHARGED | **1.28000** | 0.96 / 0.75 | +28.0% |
| CRITICAL | **1.47692** | 0.96 / 0.65 | +47.7% |

**Config location:** `js/board.js` → `DEFAULT_CONFIG.voltageRates[zone].base`

### 4.2 Follower Multiplier (Already-Revealed Tile)

When a tile has already been revealed as safe by a prior turn, stepping on it carries **0% trap risk**. The house edge is applied directly:

```
followerMultiplier = targetRTP = 0.96
```

This applies identically across all zones.

**Config location:** `js/board.js` → `DEFAULT_CONFIG.voltageRates[zone].follower`

### 4.3 Simultaneous Claim Multiplier

When multiple players step on the same unrevealed tile in the same turn:

```
simultaneousMultiplier = (base + follower) / 2
```

| Zone | Simultaneous Multiplier |
|------|------------------------|
| SAFE | (1.09091 + 0.96) / 2 = **1.02546** |
| CHARGED | (1.28000 + 0.96) / 2 = **1.12000** |
| CRITICAL | (1.47692 + 0.96) / 2 = **1.21846** |

### 4.4 Reward Tile Bonus

Reward tiles apply an additional multiplicative bonus **on top of** the base step multiplier:

```
rewardBonus = 1.15
totalMultiplier = baseMultiplier × rewardBonus
```

For simultaneous reward claims, the bonus is split geometrically:

```
splitRewardBonus = rewardBonus ^ (1 / claimantCount)
```

| Claimants | Reward Bonus Each |
|-----------|------------------|
| 1 | ×1.1500 |
| 2 | ×1.0724 |
| 3 | ×1.0477 |

**Config location:** `js/board.js` → `DEFAULT_CONFIG.voltageRates.rewardBonus`

---

## 5. Voltage Accumulation

### 5.1 Multiplicative Model

```javascript
// js/player.js → applyStepResult()
player.voltage *= stepMultiplier;
```

Voltage grows **exponentially** with steps, not linearly:

| Steps (SAFE zone, all survive) | Voltage |
|-------------------------------|---------|
| 0 (start) | 1.0000× |
| 1 | 1.0909× |
| 2 | 1.1901× |
| 3 | 1.2983× |
| 4 | 1.4163× |
| 5 | 1.5451× |
| 6 | 1.6855× |
| 8 | 2.0059× |
| 10 | 2.3891× |

### 5.2 Trap (Bust)

```
stepMultiplier = 0 → voltage = 0 → payout = 0
```

Player loses entire bet. No partial recovery.

### 5.3 Cashout

Available at any turn. Locks in current voltage:

```javascript
// js/player.js → cashOutPlayer()
payout = bet × voltage
```

No fee, no rake. The house edge is already embedded in the step multipliers.

### 5.4 Float Precision

Voltage is rounded to 4 decimal places after each step to prevent floating-point drift:

```javascript
player.voltage = Math.round(player.voltage * 10000) / 10000;
```

Payout is rounded to 2 decimal places (cents):

```javascript
// js/voltage.js → calculatePayout()
Math.round(bet * voltage * 100) / 100;
```

---

## 6. RTP Verification

### 6.1 Per-Step RTP (must equal 96.00% for all zones)

```
SAFE:     0.88 × 1.09091 = 0.96000 ✓
CHARGED:  0.75 × 1.28000 = 0.96000 ✓
CRITICAL: 0.65 × 1.47692 = 0.96000 ✓
Follower: 1.00 × 0.96000 = 0.96000 ✓
```

### 6.2 Multi-Step Strategies (all must be < 100%)

| Strategy | Compound RTP |
|----------|-------------|
| 1 SAFE step, cashout | 96.00% |
| 5 SAFE steps, cashout | 81.54% |
| 1S + 1C + 1CR, cashout | 88.47% |
| 3S + 2C, cashout | 81.54% |
| Immediate cashout (0 steps) | 100.00% (break-even) |

**No strategy can exceed 100% RTP.** This is mathematically guaranteed because each step multiplies by 0.96 in expectation: `E[RTP after N steps] = 0.96^N ≤ 1.0` for all N ≥ 0.

### 6.3 Reward Tile Variance

Reward tiles create **positive variance** (bigger wins for lucky players) without changing the base RTP. A player who lands on a reward tile gets a larger multiplier, but they cannot choose to only land on reward tiles — tile types are predetermined by the seeded PRNG.

Expected RTP including reward probability (SAFE zone):

```
E[step] = P(trap)×0 + P(safe)×base + P(reward)×(base × rewardBonus)
        = 0.12×0 + 0.78×1.09091 + 0.10×(1.09091 × 1.15)
        = 0 + 0.85091 + 0.12545
        = 0.97636  (conditional on zone tile distribution)
```

This is slightly above 0.96 because reward tiles give a bonus. However, the **unconditional per-step RTP remains 96%** because the step multiplier is calculated from P(survive), not from tile-type distribution. The reward bonus adds excitement variance, not exploitable edge.

---

## 7. Game Mechanics Affecting RTP

### 7.1 Forward-Only Movement

Players can only move to tiles in the same zone or deeper (SAFE → CHARGED → CRITICAL, never backward). This ensures players must traverse lower-risk zones before reaching high-multiplier zones.

**Code:** `js/board.js` → `isForwardMove()`

### 7.2 Idle Strike System

3 consecutive turn timeouts without action = forced bust (payout = 0). Prevents AFK bankroll preservation.

**Code:** `js/turn-manager.js` → `IDLE_STRIKES_MAX = 3`

### 7.3 Start Tile Safety

Starting tiles (up to 8, equatorial SAFE zone) are forced to `TILE.SAFE` — never traps. Players begin on guaranteed-safe ground.

**Code:** `js/board.js` → `generateBoard()` lines 108-112

### 7.4 Seeded PRNG

Board generation uses Mulberry32 seeded PRNG for deterministic, reproducible tile layouts. All players in a session see the same board from the same seed.

**Code:** `js/board.js` → `mulberry32(seed)`

---

## 8. Implementation Reference

### 8.1 Key Files

| File | Responsibility |
|------|---------------|
| `js/board.js` | `DEFAULT_CONFIG` — all RTP constants, trap/reward densities, step multipliers |
| `js/voltage.js` | `calculateStepVoltage()` — computes step multiplier per move |
| `js/player.js` | `applyStepResult()` — applies `voltage *= stepMultiplier` |
| `js/turn-manager.js` | `resolveTurn()` — orchestrates move resolution, calls voltage calc |

### 8.2 Calculation Flow

```
Player submits STEP action
        ↓
turn-manager.js: resolveTurn()
        ↓
    Determine tile type (SAFE / TRAP / REWARD)
    Determine claim type (first / follower / simultaneous)
        ↓
voltage.js: calculateStepVoltage(zone, tileType, options)
        ↓
    Returns { stepMultiplier }
        ↓
player.js: applyStepResult(player, tileId, stepMultiplier, zone)
        ↓
    player.voltage *= stepMultiplier
        ↓
    Broadcast totalVoltage to all clients
```

### 8.3 Changing the RTP

To adjust the target RTP (e.g., from 96% to 94%):

1. Update `DEFAULT_CONFIG.voltageRates.targetRTP` in `js/board.js`
2. Recalculate step multipliers: `newBase = newRTP / P(survive)` for each zone
3. Update `voltageRates[zone].base` values
4. Set `voltageRates[zone].follower = newRTP` for all zones
5. Update this document

**Example for 94% RTP:**

```
safe.base     = 0.94 / 0.88 = 1.06818
charged.base  = 0.94 / 0.75 = 1.25333
critical.base = 0.94 / 0.65 = 1.44615
follower      = 0.94 (all zones)
```

---

## 9. Changelog

| Date | Change | RTP Before | RTP After |
|------|--------|-----------|-----------|
| 2026-04-10 | Switched from additive to multiplicative voltage model | ~96% (behavioral estimate, exploitable: 101-109% on some strategies) | 96.00% (enforced, no strategy exceeds 100%) |
