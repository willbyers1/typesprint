import { useEffect, useState } from 'react';
import { getHighScores } from '../utils/storage';
import { playStart, resumeAudio } from '../utils/audio';

export function AttractScreen({ onStart }: { onStart: () => void }) {
  const [scores] = useState(getHighScores());
  
  useEffect(() => {
    const handleKeyDown = () => {
      resumeAudio();
      playStart();
      onStart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="content-area items-center">
      <h1 className="text-6xl md:text-8xl mb-12 md:mb-16 text-center tracking-widest font-bold">TYPESPRINT</h1>
      
      <div className="text-lg md:text-2xl mb-12 md:mb-16 space-y-4 w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl mb-8 text-center border-b-2 border-[var(--color-phosphor)] pb-4">HIGH SCORES</h2>
        <div className="grid grid-cols-4 gap-4 pb-2 mb-4 opacity-70">
          <span>RANK</span>
          <span>SCORE</span>
          <span>NAME</span>
          <span>MODE</span>
        </div>
        {scores.slice(0, 5).map((score, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span>{score.wpm} WPM</span>
            <span>{score.initials}</span>
            <span className="truncate">{score.mode.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
      
      <div className="text-2xl md:text-3xl blink mt-4 md:mt-8">PRESS ANY KEY</div>
    </div>
  );
}
