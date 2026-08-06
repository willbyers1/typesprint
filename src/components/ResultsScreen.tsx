import { useEffect, useState } from 'react';
import { GameMode, GameStats } from '../types';
import { isHighScore, addHighScore } from '../utils/storage';
import { playKeystroke, playStart } from '../utils/audio';

interface Props {
  stats: GameStats;
  mode: GameMode;
  onDone: () => void;
}

export function ResultsScreen({ stats, mode, onDone }: Props) {
  const [initials, setInitials] = useState(['A', 'A', 'A']);
  const [charIndex, setCharIndex] = useState(0);
  const [isHigh, setIsHigh] = useState(false);
  const [canInput, setCanInput] = useState(false);
  
  useEffect(() => {
    setIsHigh(isHighScore(stats.wpm));
    const t = setTimeout(() => setCanInput(true), 1000); // 1s delay to prevent accidental skips
    return () => clearTimeout(t);
  }, [stats.wpm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canInput) return;

      if (!isHigh) {
        if (e.key === 'Enter') {
          playStart();
          onDone();
        }
        return;
      }
      
      if (e.key === 'ArrowUp') {
        playKeystroke();
        setInitials(prev => {
          const next = [...prev];
          const charCode = next[charIndex].charCodeAt(0);
          next[charIndex] = charCode === 90 ? 'A' : String.fromCharCode(charCode + 1);
          return next;
        });
      } else if (e.key === 'ArrowDown') {
        playKeystroke();
        setInitials(prev => {
          const next = [...prev];
          const charCode = next[charIndex].charCodeAt(0);
          next[charIndex] = charCode === 65 ? 'Z' : String.fromCharCode(charCode - 1);
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        playKeystroke();
        setCharIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        playKeystroke();
        setCharIndex(prev => Math.min(2, prev + 1));
      } else if (e.key === 'Enter') {
        playStart();
        addHighScore({
          initials: initials.join(''),
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          mode,
          date: Date.now()
        });
        onDone();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHigh, charIndex, initials, stats, mode, onDone, canInput]);

  return (
    <div className="content-area items-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl mb-8 md:mb-12 text-center tracking-widest border-b-2 border-[var(--color-phosphor)] pb-4 w-full">RESULTS</h1>
      
      <div className="grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-6 text-xl md:text-3xl mb-12 w-full px-4 md:px-8">
        <div>WORDS PER MINUTE</div>
        <div className="text-right text-[var(--color-phosphor)] drop-shadow-[var(--text-glow)]">{stats.wpm}</div>
        
        <div>ACCURACY</div>
        <div className="text-right text-[var(--color-phosphor)] drop-shadow-[var(--text-glow)]">{stats.accuracy}%</div>
        
        <div>RAW ERRORS</div>
        <div className="text-right">{stats.rawErrors}</div>
        
        <div>UNCORRECTED ERRORS</div>
        <div className="text-right">{stats.uncorrectedErrors}</div>
      </div>
      
      {isHigh ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl md:text-3xl bg-[var(--color-phosphor)] text-[var(--color-dark)] px-4 py-2 mb-8 blink">NEW HIGH SCORE!</div>
          <div className="text-xl md:text-2xl mb-4">ENTER INITIALS</div>
          <div className="flex space-x-4 text-4xl md:text-5xl">
            {initials.map((char, i) => (
              <span key={i} className={i === charIndex ? 'border-b-4 border-[var(--color-phosphor)] animate-pulse shadow-[var(--text-glow)]' : 'border-b-4 border-transparent'}>
                {char}
              </span>
            ))}
          </div>
          <div className="text-lg md:text-xl mt-8 opacity-75">USE ARROWS TO SELECT, ENTER TO SAVE</div>
        </div>
      ) : (
        <div className={`text-xl md:text-2xl mt-8 ${canInput ? 'blink' : 'opacity-0'}`}>PRESS ENTER TO CONTINUE</div>
      )}
    </div>
  );
}
