// ─── Circuit Sphere Audio ───
// Synthesized sound effects using Web Audio API. No external files needed.

let ctx = null;
let initialized = false;

/**
 * Initialize AudioContext. Must be called from a user gesture (click/key).
 */
export function init() {
  if (initialized) return;
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    initialized = true;
  } catch (e) {
    console.warn('[Audio] Web Audio API not available:', e);
  }
}

/**
 * Resume context if suspended (browsers require user gesture).
 */
export function resume() {
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
}

// ─── Utility ───

function playTone(freq, type, duration, volume = 0.15, detune = 0) {
  if (!ctx) return;
  resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  if (detune) osc.detune.value = detune;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playNoise(duration, volume = 0.08) {
  if (!ctx) return;
  resume();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

// ─── Sound Effects ───

/** Short tick for each second of countdown */
export function playTick() {
  playTone(800, 'sine', 0.05, 0.08);
}

/** Warning beep at ≤5s remaining */
export function playWarning() {
  playTone(600, 'square', 0.1, 0.1);
}

/** Urgent double-beep at ≤3s remaining */
export function playUrgent() {
  playTone(400, 'sawtooth', 0.08, 0.12);
  setTimeout(() => playTone(800, 'square', 0.08, 0.12), 100);
}

/** Confirmation chime when bet is placed */
export function playBetPlaced() {
  if (!ctx) return;
  resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

/** Sweep sound when round starts */
export function playRoundStart() {
  if (!ctx) return;
  resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.35);
}

/** Two-tone chime for cashout */
export function playCashout() {
  playTone(800, 'sine', 0.15, 0.12);
  setTimeout(() => playTone(1200, 'sine', 0.15, 0.12), 80);
}

/** Low buzz for bust */
export function playBust() {
  playTone(150, 'sawtooth', 0.3, 0.15);
  playNoise(0.2, 0.06);
}

/** Countdown finished / time's up */
export function playTimeUp() {
  playTone(300, 'square', 0.15, 0.12);
  setTimeout(() => playTone(200, 'square', 0.2, 0.1), 150);
}

/** Move locked in */
export function playLockIn() {
  playTone(600, 'sine', 0.08, 0.1);
}

/** Turn start — quick ascending two-note chime to signal "your move" */
export function playTurnStart() {
  playTone(500, 'sine', 0.1, 0.12);
  setTimeout(() => playTone(700, 'sine', 0.12, 0.14), 100);
}
