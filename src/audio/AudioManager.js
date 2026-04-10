const _cache = new Map();

const SFX_VOLUME   = 1.0;
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

export function startMusic() {
  _music.play().catch(() => {});
}

export function playSound(path) {
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
