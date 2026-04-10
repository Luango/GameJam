const _cache = new Map();

const SFX_VOLUME   = 0.4;
const MUSIC_VOLUME = 0.3;

/** Public-dir paths must use Vite base (e.g. /GameJam/) so deploy URLs match the built site. */
function audioUrl(relativePath) {
  const base = import.meta.env.BASE_URL;
  const path = relativePath.replace(/^\//, '');
  return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

const _music = new Audio(audioUrl('assets/sfx/Cybernetic_Casino_background_music.mp3'));
_music.loop   = true;
_music.volume = MUSIC_VOLUME;

// ── Mute state (persisted across sessions) ────────────────────────────────────
const _MUTE_KEY   = 'cs_muted';
let   _muted      = localStorage.getItem(_MUTE_KEY) === '1';
let   _wasStarted = false; // tracks whether startMusic() was ever called

export function startMusic() {
  _wasStarted = true;
  if (_muted) return; // honour mute preference set before first interaction
  _music.play().catch(() => {});
}

export function playSound(path) {
  if (_muted) return; // swallow all SFX while muted
  const url = path.startsWith('http') || path.startsWith('/') ? path : audioUrl(path);
  let audio = _cache.get(url);
  if (!audio) {
    audio = new Audio(url);
    audio.volume = SFX_VOLUME;
    _cache.set(url, audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {}); // ignore autoplay policy errors silently
}

/** Toggle mute for both music and SFX. Returns the new muted state. */
export function toggleMute() {
  _muted = !_muted;
  localStorage.setItem(_MUTE_KEY, _muted ? '1' : '0');
  if (_muted) {
    _music.pause();
  } else if (_wasStarted) {
    _music.play().catch(() => {});
  }
  return _muted;
}

/** Returns true when audio is currently muted. */
export function isMuted() { return _muted; }

/**
 * Announcement sounds play on every client unconditionally — no local-player guard.
 * Functionally identical to playSound; the distinction is semantic and enforced at call sites.
 */
export const playAnnouncement = playSound;

// ── Named SFX paths ───────────────────────────────────────────────────────────
export const SFX = {
  TURN_START:   'assets/sfx/Turn start.mp3',
  LOCK_IN:      'assets/sfx/Lock in choices.mp3',
  CASH_OUT:     'assets/sfx/Cash out.mp3',   // announcement
  BUST:         'assets/sfx/Bust.mp3',        // announcement
  HOVER:        'assets/sfx/Hover select tile.mp3',
  SAFE_REVEAL:  'assets/sfx/Safe tile reveal.mp3',
  TRAP_REVEAL:  'assets/sfx/Trap tile reveal.mp3',
  REWARD_REVEAL:'assets/sfx/Reward tile reveal.mp3',
  TIMEOUT:      'assets/sfx/Timeout.mp3',
  REVEAL_START: 'assets/sfx/reveal starts.mp3',
};
