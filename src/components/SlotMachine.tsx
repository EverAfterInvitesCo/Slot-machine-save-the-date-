import React, { useState } from 'react';
import { Reel } from './Reel';

const MONTH_VALUES = ["JAN", "FEB", "MAR", "APR", "JUN", "AUG", "OCT", "NOV", "DEC"];
const YEAR_VALUES = ["2026"];

export const SlotMachine: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'spinning' | 'revealed'>('idle');
  const [leverState, setLeverState] = useState<'idle' | 'pull' | 'pulling'>('idle');

  const handleLeverClick = () => {
    if (gameState === 'spinning') return;
    setLeverState('pulling');
    setGameState('spinning');

    setTimeout(() => {
      setGameState('revealed');
      setLeverState('idle');
    }, 3500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto my-8 select-none">
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}slot-machine-shell.png`}
          alt="Slot machine"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
        />

        <div className="absolute inset-x-[22%] inset-y-[28%] bg-white/90 rounded-xl shadow-inner flex items-center justify-center gap-2 px-4 z-10 overflow-hidden border border-rose-200">
          <Reel
            values={MONTH_VALUES}
            finalValue="NOV"
            spinning={gameState === 'spinning' || gameState === 'revealed'}
            stopDelay={2500}
          />
          <div className="w-0.5 h-full rounded-full bg-rose-300/40" />
          <Reel
            values={YEAR_VALUES}
            finalValue="2026"
            spinning={gameState === 'spinning' || gameState === 'revealed'}
            stopDelay={3500}
          />
        </div>

        <div
          id="slot-trigger"
          className={`absolute z-30 ${leverState === 'pulling' ? 'pulled' : ''}`}
          onClick={gameState !== 'spinning' ? handleLeverClick : undefined}
          style={{
            cursor: gameState !== 'spinning' ? 'pointer' : 'default',
            right: '-10px',
            top: '35%'
          }}
        >
          <div className="w-4 h-16 bg-rose-700 rounded-full shadow-lg transform origin-top transition-transform duration-300">
            <div className="w-6 h-6 -left-1 bg-red-500 rounded-full absolute -top-4 shadow-md" />
          </div>
        </div>
      </div>

      {gameState === 'idle' && (
        <p
          id="instruction-text"
          className="text-sm tracking-widest uppercase animate-fade-in text-center font-medium"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: 'hsl(350 25% 45%)'
          }}
        >
          Pull the lever to reveal
        </p>
      )}
    </div>
  );
};

export default SlotMachine;