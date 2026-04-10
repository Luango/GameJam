const _cache = new Map();

const SFX_VOLUME   = 1.0;
const MUSIC_VOLUME = 0.3;

const _music = new Audio('assets/sfx/Cybernetic_Casino_background_music.mp3');
_music.loop   = true;
_music.volume = MUSIC_VOLUME;

export function startMusic() {
  _music.play().catch(() => {});
}

export function playSound(path) {
  let audio = _cache.get(path);
  if (!audio) {
    audio = new Audio(path);
    audio.volume = SFX_VOLUME;
    _cache.set(path, audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {}); // ignore autoplay policy errors silently
}
