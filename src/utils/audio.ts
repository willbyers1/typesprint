// Very simple Web Audio API wrapper for 80s arcade sounds
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export function playKeystroke() {
  playTone(800, 'square', 0.05, 0.05);
}

export function playError() {
  playTone(150, 'sawtooth', 0.2, 0.1);
}

export function playStart() {
  if (!audioCtx) return;
  // A simple arpeggio
  const now = audioCtx.currentTime;
  [440, 554, 659, 880].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'square', 0.1, 0.1), i * 100);
  });
}

export function playGameOver() {
  if (!audioCtx) return;
  [440, 415, 392, 370].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'sawtooth', 0.3, 0.1), i * 300);
  });
}

export function resumeAudio() {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}
