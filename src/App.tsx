import { useState } from 'react';
import { ScreenState, GameMode, GameStats } from './types';
import { CrtOverlay } from './components/CrtOverlay';
import { AttractScreen } from './components/AttractScreen';
import { ModeSelectScreen } from './components/ModeSelectScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('ATTRACT');
  const [mode, setMode] = useState<GameMode>('TIME_ATTACK_60');
  const [finalStats, setFinalStats] = useState<GameStats | null>(null);

  return (
    <div className="cabinet-frame">
      <CrtOverlay />
      
      <div className="header z-20">
        <div className="logo">_TYPESPRINT_v1.0</div>
        <div className="flex gap-4 md:gap-10">
          <div className="hud-item hidden md:flex">
            <span className="hud-label">MODE</span>
            <span className="hud-value text-lg md:text-2xl">{mode.replace('_', ' ')}</span>
          </div>
          <div className="hud-item hidden md:flex">
            <span className="hud-label">STATUS</span>
            <span className="hud-value text-lg md:text-2xl">{screen}</span>
          </div>
        </div>
      </div>

      <div className="main-display z-20">
        {screen === 'ATTRACT' && (
          <AttractScreen onStart={() => setScreen('MODE_SELECT')} />
        )}
        
        {screen === 'MODE_SELECT' && (
          <ModeSelectScreen onSelect={(selectedMode) => {
            setMode(selectedMode);
            setScreen('GAME');
          }} />
        )}
        
        {screen === 'GAME' && (
          <GameScreen 
            mode={mode} 
            onComplete={(stats) => {
              setFinalStats(stats);
              setScreen('RESULTS');
            }} 
          />
        )}
        
        {screen === 'RESULTS' && finalStats && (
          <ResultsScreen 
            stats={finalStats} 
            mode={mode}
            onDone={() => setScreen('ATTRACT')}
          />
        )}
      </div>

      <div className="footer z-20">
        <div><span className="status-blip"></span>SYSTEM ONLINE // SECTOR 7G</div>
        <div className="hidden md:block">ESC: ABORT // F1: RESTART</div>
      </div>
    </div>
  );
}
