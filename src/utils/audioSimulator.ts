import { SoundCharacter } from '../types';

class SoundPreviewEngine {
  private ctx: AudioContext | null = null;
  private currentSource: OscillatorNode | null = null;
  private currentGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private activeCharacter: SoundCharacter | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(character: SoundCharacter, onStop?: () => void) {
    this.stopTone();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.activeCharacter = character;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    let freq = 60;
    let type: OscillatorType = 'triangle';

    switch (character) {
      case 'Sarfull':
        freq = 45;
        type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        break;
      case 'Sarteng':
        freq = 70;
        type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, now);
        break;
      case 'Sarbor':
        freq = 110;
        type = 'sawtooth';
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(280, now);
        break;
      case 'Spiral':
        freq = 90;
        type = 'sawtooth';
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, now);
        break;
    }

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Pulse envelope simulating 4-stroke cycle
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    this.currentSource = osc;
    this.currentGain = gain;

    // Auto stop after 4.5 seconds for preview
    setTimeout(() => {
      this.stopTone();
      if (onStop) onStop();
    }, 4500);
  }

  public stopTone() {
    if (this.currentGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.currentGain.gain.setValueAtTime(this.currentGain.gain.value, now);
      this.currentGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    }
    setTimeout(() => {
      try {
        if (this.currentSource) {
          this.currentSource.stop();
          this.currentSource.disconnect();
          this.currentSource = null;
        }
      } catch {}
      this.isPlaying = false;
      this.activeCharacter = null;
    }, 120);
  }

  public getIsPlaying(character?: SoundCharacter): boolean {
    if (character) return this.isPlaying && this.activeCharacter === character;
    return this.isPlaying;
  }
}

export const soundPreviewEngine = new SoundPreviewEngine();
