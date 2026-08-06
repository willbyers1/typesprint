import { useEffect, useState } from 'react';
import { GameMode } from '../types';
import { playKeystroke, playStart } from '../utils/audio';

const MODES: { id: GameMode; title: string; desc: string }[] = [
  { id: 'TIME_ATTACK_60', title: 'TIME ATTACK 60', desc: 'TYPE AS FAST AS POSSIBLE FOR 60 SECONDS.' },
  { id: 'WORD_RUSH', title: 'WORD RUSH', desc: 'CLEAR 50 WORDS AS QUICKLY AS POSSIBLE.' },
  { id: 'SURVIVAL', title: 'SURVIVAL', desc: 'ONE MISTAKE COSTS A LIFE. THREE STRIKES OUT.' },
];

export function ModeSelectScreen({ onSelect }: { onSelect: (mode: GameMode) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        playKeystroke();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : MODES.length - 1));
      } else if (e.key === 'ArrowDown') {
        playKeystroke();
        setSelectedIndex(prev => (prev < MODES.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        playStart();
        onSelect(MODES[selectedIndex].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelect]);

  return (
    <div className="content-area items-center max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl mb-12 md:mb-16 text-center tracking-widest border-b-2 border-[var(--color-phosphor)] pb-4 w-full">SELECT MODE</h1>
      
      <div className="w-full space-y-6 md:space-y-8 flex flex-col">
        {MODES.map((mode, i) => (
          <div key={mode.id} className="flex items-center">
            <span className="w-8 md:w-12 text-3xl md:text-4xl">{i === selectedIndex ? '>' : ' '}</span>
            <div className={`flex-1 p-4 ${i === selectedIndex ? 'bg-[var(--color-phosphor)] text-[var(--color-dark)] shadow-[var(--text-glow)]' : ''}`}>
              <div className="text-2xl md:text-3xl mb-1 md:mb-2 font-bold">{mode.title}</div>
              <div className="text-lg md:text-xl opacity-90">{mode.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-lg md:text-xl mt-12 md:mt-16 blink opacity-75">USE ARROWS TO SELECT, ENTER TO START</div>
    </div>
  );
}
