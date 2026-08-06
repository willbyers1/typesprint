import { GameMode, GameStats } from '../types';

export class StatsEngine {
  public targetText: string;
  public typedText: string = '';
  public startTime: number | null = null;
  public endTime: number | null = null;
  public rawErrors: number = 0;
  public totalKeystrokes: number = 0;
  public mode: GameMode;
  public maxErrors: number = 0; // For survival
  public isDead: boolean = false;

  // DESIGN DECISION: In classic arcade style, every mistake costs you.
  // Correcting it fixes the text so you can proceed, but the penalty 
  // to your final accuracy percentage remains. 
  public readonly PENALIZE_CORRECTED_ERRORS = true;

  constructor(targetText: string, mode: GameMode) {
    this.targetText = targetText;
    this.mode = mode;
    if (mode === 'SURVIVAL') {
      this.maxErrors = 3;
    }
  }

  public start() {
    if (!this.startTime) this.startTime = performance.now();
  }

  public handleKeystroke(key: string) {
    if (this.isComplete()) return;
    this.start();

    if (key === 'Backspace') {
      if (this.typedText.length > 0) {
        this.typedText = this.typedText.slice(0, -1);
        this.totalKeystrokes++;
      }
      return;
    }

    if (key.length === 1) { 
      const expectedChar = this.targetText[this.typedText.length];
      this.totalKeystrokes++;

      if (key !== expectedChar) {
        this.rawErrors++;
        if (this.mode === 'SURVIVAL' && this.rawErrors >= this.maxErrors) {
          this.isDead = true;
          this.endTime = performance.now();
        }
      }

      this.typedText += key;

      if (this.typedText.length === this.targetText.length && this.mode !== 'SURVIVAL') {
         this.endTime = performance.now();
      }
    }
  }

  public getStats(): GameStats {
    const now = this.endTime || (this.startTime ? performance.now() : 0);
    const elapsedMs = this.startTime ? (now - this.startTime) : 0;
    const elapsedMins = elapsedMs > 0 ? elapsedMs / 60000 : 0;

    let correctChars = 0;
    let uncorrectedErrors = 0;
    for (let i = 0; i < this.typedText.length; i++) {
      if (this.typedText[i] === this.targetText[i]) {
        correctChars++;
      } else {
        uncorrectedErrors++;
      }
    }

    const wpm = elapsedMins > 0 ? Math.max(0, Math.round((correctChars / 5) / elapsedMins)) : 0;
    const correctedErrors = Math.max(0, this.rawErrors - uncorrectedErrors);

    let accuracy = 100;
    if (this.totalKeystrokes > 0) {
       if (this.PENALIZE_CORRECTED_ERRORS) {
         accuracy = Math.max(0, Math.round(((this.totalKeystrokes - this.rawErrors) / this.totalKeystrokes) * 100));
       } else {
         accuracy = Math.max(0, Math.round(((this.typedText.length - uncorrectedErrors) / this.typedText.length) * 100));
       }
    }

    return {
      wpm,
      accuracy,
      rawErrors: this.rawErrors,
      correctedErrors,
      uncorrectedErrors,
      totalKeystrokes: this.totalKeystrokes,
      timeElapsedMs: elapsedMs
    };
  }

  public isComplete(): boolean {
    if (this.isDead) return true;
    if (this.mode === 'TIME_ATTACK_60' && this.startTime && performance.now() - this.startTime >= 60000) {
      if (!this.endTime) this.endTime = this.startTime + 60000;
      return true;
    }
    if (this.typedText.length >= this.targetText.length) {
      if (!this.endTime) this.endTime = performance.now();
      return true;
    }
    return false;
  }
}
