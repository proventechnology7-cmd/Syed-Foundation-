/**
 * Premium UI feedback sounds + haptics, synthesized with the Web Audio API
 * (no audio files needed).
 *
 * - `feedback("tick")`   — deep, warm "thock" for option/tab/accordion switches
 * - `feedback("select")` — warmer two-tone confirm for primary CTAs
 *
 * Sound plays only after a real user gesture (AudioContext is created lazily
 * inside the click handler, so autoplay policies are satisfied). On supported
 * mobile devices a short vibration accompanies the sound for a true haptic feel.
 * Users can opt out via `setSoundEnabled(false)` (persisted in localStorage).
 */

const STORAGE_KEY = "sf-sound-enabled";

let ctx = null;
let master = null;

export function isSoundEnabled() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === null ? true : v !== "0";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function ensureContext() {
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume();
    return true;
  }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.5;
  // Gentle low-pass keeps the synthetic tones soft and "premium", never harsh.
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 5200;
  master.connect(filter);
  filter.connect(ctx.destination);
  return true;
}

/** One enveloped oscillator blip. */
function blip({ freq, freqEnd, duration, gain, type = "sine", at = 0 }) {
  const t = ctx.currentTime + at;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t + duration);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}

const SOUNDS = {
  // Deep, warm "thock" — the chosen tap sound for option/tab/accordion switches.
  tick() {
    blip({ freq: 300, freqEnd: 170, duration: 0.09, gain: 0.17, type: "triangle" });
    vibrate(15);
  },
  // Warmer two-tone confirm — primary CTAs (Book Free Trial, etc.).
  select() {
    blip({ freq: 880, freqEnd: 880, duration: 0.07, gain: 0.1, type: "triangle" });
    blip({ freq: 1318, freqEnd: 1318, duration: 0.09, gain: 0.09, type: "triangle", at: 0.055 });
    vibrate([12, 40, 12]);
  },
};

/**
 * Play UI feedback. Safe to call from any click handler; never throws and
 * does nothing when sound is disabled or audio is unavailable.
 */
export function feedback(kind = "tick") {
  try {
    if (!isSoundEnabled()) return;
    if (!ensureContext()) return;
    const play = SOUNDS[kind] || SOUNDS.tick;
    play();
  } catch {
    /* never break the UI over a sound */
  }
}
