// Web Audio API Sound Synthesizer for Ambient Luxury Experience
class AmbientAudio {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
  }

  init() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);
  }

  toggle() {
    if (!this.audioCtx) {
      this.init();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }

    return this.isPlaying;
  }

  start() {
    if (this.isPlaying) return;

    // Chords (F# min / A major luxury ambient pad frequencies: F#3, C#4, A4, E5)
    const freqs = [185.0, 277.18, 440.0, 659.25];

    this.oscillators = freqs.map((freq) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      
      oscGain.gain.value = 0.08;
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      return osc;
    });

    // Smooth fade in
    this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 3);
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying) return;

    // Smooth fade out
    this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.5);

    setTimeout(() => {
      this.oscillators.forEach((osc) => osc.stop());
      this.oscillators = [];
      this.isPlaying = false;
    }, 1500);
  }
}

export const ambientAudio = new AmbientAudio();
