let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

/**
 * Plays a short, synthesized click tone -- generated in-browser via the
 * Web Audio API, no audio file involved. A brief sine blip with a fast
 * exponential decay, kept quiet and short so it reads as a subtle UI tick.
 */
export function playClickSound() {
  const audioCtx = getContext();
  if (!audioCtx) return;

  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  const now = audioCtx.currentTime;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1100, now);
  oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.05);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.08);
}
