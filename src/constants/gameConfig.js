// P4 OWNS this file — P2 reads these values for visual zone colouring only.
// Hardcoded until P4 delivers gameConfig. Do not run RTP/Voltage math here.

export const ZONE_BANDS = {
  safe: 30,    // |lat| < 30° → safe zone
  charged: 60, // 30–60° → charged zone
  // > 60° → critical zone
};

export const ZONE_COLORS = {
  safe:     0x00c9a7,
  charged:  0xf59e0b,
  critical: 0xef4444,
};

export const PLAYER_COLORS = [
  0x38bdf8, // slot 0 — sky blue
  0xf472b6, // slot 1 — pink
  0xa78bfa, // slot 2 — purple
  0xfb923c, // slot 3 — orange
];

export const TILE_COUNT = 200;
