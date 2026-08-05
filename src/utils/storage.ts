import { HighScore } from '../types';

const STORAGE_KEY = 'typesprint_highscores';

export function getHighScores(): HighScore[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse high scores', e);
  }
  
  // Default high scores if none exist
  return [
    { initials: 'AAA', wpm: 120, accuracy: 99, mode: 'TIME_ATTACK_60', date: Date.now() },
    { initials: 'CPU', wpm: 90, accuracy: 95, mode: 'WORD_RUSH', date: Date.now() - 100000 },
    { initials: 'HAL', wpm: 80, accuracy: 90, mode: 'SURVIVAL', date: Date.now() - 200000 },
  ];
}

export function addHighScore(score: HighScore) {
  const scores = getHighScores();
  scores.push(score);
  // Sort by WPM descending
  scores.sort((a, b) => b.wpm - a.wpm);
  // Keep top 10
  const topScores = scores.slice(0, 10);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
  } catch (e) {
    console.error('Failed to save high scores', e);
  }
}

export function isHighScore(wpm: number): boolean {
  const scores = getHighScores();
  if (scores.length < 10) return true;
  return wpm > scores[scores.length - 1].wpm;
}
