import { useEffect, useRef, useState } from 'react';
import { GameMode, GameStats } from '../types';
import { StatsEngine } from '../engine/StatsEngine';
import { generateText } from '../engine/words';
import { playKeystroke, playError, playGameOver } from '../utils/audio';

interface Props {
  mode: GameMode;
  onComplete: (stats: GameStats) => void;
}

export function GameScreen({ mode, onComplete }: Props) {
  const engineRef = useRef<StatsEngine | null>(null);
  const [, forceRender] = useState(0);
  const hudRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    engineRef.current = new StatsEngine(generateText(mode), mode);
    forceRender(r => r + 1);
  }, [mode]);
  
  // HUD Update loop via requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    let lastUpdate = 0;
    
    const tick = (now: number) => {
      if (now - lastUpdate > 100 && engineRef.current && hudRef.current) {
        lastUpdate = now;
        const stats = engineRef.current.getStats();
        
        let timeLeft = 0;
        let timeLabel = 'TIME REMAINING';
        
        if (mode === 'TIME_ATTACK_60') {
          timeLeft = Math.max(0, 60000 - stats.timeElapsedMs);
        } else if (mode === 'SURVIVAL') {
          timeLeft = stats.timeElapsedMs;
          timeLabel = 'TIME ELAPSED';
        } else {
          timeLeft = stats.timeElapsedMs;
          timeLabel = 'TIME ELAPSED';
        }
        
        const seconds = Math.floor(timeLeft / 1000);
        const ms = Math.floor((timeLeft % 1000) / 10);
        const timeDisplay = `${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
        
        hudRef.current.innerHTML = `
          <div class="hud-item" style="align-items: flex-start;">
            <span class="hud-label">WPM (LIVE)</span>
            <span class="hud-value">${stats.wpm.toString().padStart(3, '0')}</span>
          </div>
          <div class="hud-item" style="align-items: flex-start;">
            <span class="hud-label">ACCURACY</span>
            <span class="hud-value">${stats.accuracy.toString().padStart(3, '0')}%</span>
          </div>
          <div class="hud-item" style="align-items: flex-start;">
            <span class="hud-label">${mode === 'SURVIVAL' ? 'LIVES LEFT' : timeLabel}</span>
            <span class="hud-value">${mode === 'SURVIVAL' ? (3 - stats.rawErrors).toString() : timeDisplay}</span>
          </div>
        `;
        
        if (timerRef.current) {
          if (mode === 'TIME_ATTACK_60') {
             const pct = Math.max(0, timeLeft / 60000) * 100;
             timerRef.current.style.width = `${pct}%`;
          } else {
             const progress = Math.min(100, (engineRef.current.typedText.length / engineRef.current.targetText.length) * 100);
             timerRef.current.style.width = `${progress}%`;
          }
        }
        
        if (engineRef.current.isComplete()) {
          playGameOver();
          onComplete(stats);
          return; // Stop loop
        }
      }
      animationId = requestAnimationFrame(tick);
    };
    
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [mode, onComplete]);

  // Keystroke handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!engineRef.current || engineRef.current.isComplete()) return;
      
      // Ignore modifier keys
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;
      
      // Prevent browser shortcuts for space and arrows
      if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault();
      
      const beforeErrors = engineRef.current.rawErrors;
      engineRef.current.handleKeystroke(e.key);
      const afterErrors = engineRef.current.rawErrors;
      
      if (afterErrors > beforeErrors) {
        playError();
      } else if (e.key.length === 1 || e.key === 'Backspace') {
        playKeystroke();
      }
      
      forceRender(r => r + 1);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  if (!engineRef.current) return null;
  
  const engine = engineRef.current;
  
  return (
    <>
      <div className="content-area">
        <div ref={timerRef} className="timer-bar" style={{ width: '100%' }}></div>
        <div className="text-area">
          {engine.targetText.split('').map((char, i) => {
            const isTyped = i < engine.typedText.length;
            const isCurrent = i === engine.typedText.length;
            
            if (isTyped) {
              const typedChar = engine.typedText[i];
              if (typedChar === char) {
                 return <span key={i} className="char-done">{char}</span>;
              } else {
                 return <span key={i} className="char-error">{char}</span>;
              }
            } else if (isCurrent) {
              return <span key={i} className="char-current">{char}</span>;
            }
            
            return <span key={i}>{char}</span>;
          })}
        </div>
      </div>
      <div ref={hudRef} className="stats-row">
        {/* HUD populated by rAF */}
      </div>
    </>
  );
}
