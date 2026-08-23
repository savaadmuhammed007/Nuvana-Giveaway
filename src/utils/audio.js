// Web Audio API ambient flight sound engine
let audioCtx = null;
let masterGain = null;
let cabinOsc1 = null;
let cabinOsc2 = null;
let noiseNode = null;
let isPlaying = false;

export function toggleFlightAudio() {
  if (isPlaying) {
    stopFlightAudio();
    return false;
  } else {
    startFlightAudio();
    return true;
  }
}

export function isAudioPlaying() {
  return isPlaying;
}

export function startFlightAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 2.5);
    masterGain.connect(audioCtx.destination);

    // Warm cabin drone tone 1 (low hum ~55Hz)
    cabinOsc1 = audioCtx.createOscillator();
    cabinOsc1.type = 'sine';
    cabinOsc1.frequency.setValueAtTime(55, audioCtx.currentTime);
    const oscGain1 = audioCtx.createGain();
    oscGain1.gain.value = 0.35;
    cabinOsc1.connect(oscGain1);
    oscGain1.connect(masterGain);
    cabinOsc1.start();

    // Harmonics tone 2 (~110Hz soft hum)
    cabinOsc2 = audioCtx.createOscillator();
    cabinOsc2.type = 'triangle';
    cabinOsc2.frequency.setValueAtTime(110, audioCtx.currentTime);
    const oscGain2 = audioCtx.createGain();
    oscGain2.gain.value = 0.15;
    cabinOsc2.connect(oscGain2);
    oscGain2.connect(masterGain);
    cabinOsc2.start();

    // Pink noise generator for gentle aerodynamic wind rushing outside window
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.06;
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter noise to sound like high-altitude air rushing past the double-pane window
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);
    filter.Q.value = 1.2;

    noiseNode.connect(filter);
    filter.connect(masterGain);
    noiseNode.start();

    isPlaying = true;
    return true;
  } catch (err) {
    console.warn('Audio could not start:', err);
    isPlaying = false;
    return false;
  }
}

export function stopFlightAudio() {
  if (!audioCtx || !isPlaying) return;
  try {
    if (masterGain) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    }
    setTimeout(() => {
      try {
        if (cabinOsc1) { cabinOsc1.stop(); cabinOsc1.disconnect(); cabinOsc1 = null; }
        if (cabinOsc2) { cabinOsc2.stop(); cabinOsc2.disconnect(); cabinOsc2 = null; }
        if (noiseNode) { noiseNode.stop(); noiseNode.disconnect(); noiseNode = null; }
      } catch (e) {}
      isPlaying = false;
    }, 1300);
  } catch (e) {
    isPlaying = false;
  }
}

export function playChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {}
}
