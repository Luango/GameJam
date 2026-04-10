// P4 OWNS this file — P2 reads these values for visual zone colouring only.
// Hardcoded until P4 delivers gameConfig. Do not run RTP/Voltage math here.

export const ZONE_BANDS = {
  safe: 30,    // |lat| < 30° → safe zone
  charged: 60, // 30–60° → charged zone
  // > 60° → critical zone
};

// Hidden tile base colours — near-black with a strong hue hint so zones are
// identifiable but dark enough that revealed / selectable states pop dramatically.
// Inspired by Vegas Infinite's deep-space cyber-casino aesthetic.
export const ZONE_COLORS = {
  safe:     0x0C3547, // deep navy-teal   — cold, unknown, survivable
  charged:  0x1E0A3D, // deep indigo-violet — volatile, electric, between worlds
  critical: 0x3D0A24, // deep crimson-magenta — dangerous, electric, fatal
};

export const PLAYER_COLORS = [
  0x38bdf8, // slot 0 — sky blue
  0xf472b6, // slot 1 — pink
  0xa78bfa, // slot 2 — purple
  0xfb923c, // slot 3 — orange
];

export const TILE_COUNT = 200;
