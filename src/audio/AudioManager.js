const _cache = new Map();

export function playSound(path) {
  let audio = _cache.get(path);
  if (!audio) {
    audio = new Audio(path);
    _cache.set(path, audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {}); // ignore autoplay policy errors silently
}
