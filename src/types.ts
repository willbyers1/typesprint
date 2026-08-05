export type ScreenState = 'ATTRACT' | 'MODE_SELECT' | 'GAME' | 'RESULTS';
export type GameMode = 'TIME_ATTACK_60' | 'WORD_RUSH' | 'SURVIVAL';

export interface GameStats {
  wpm: number;
  accuracy: number;
  rawErrors: number;
  correctedErrors: number;
  uncorrectedErrors: number;
  totalKeystrokes: number;
  timeElapsedMs: number;
}

export interface HighScore {
  initials: string;
  wpm: number;
  accuracy: number;
  mode: GameMode;
  date: number;
}
