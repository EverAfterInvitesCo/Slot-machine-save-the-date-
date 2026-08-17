import React, { useCallback, useState } from 'react';
import Reel from './Reel';
import { WeddingCard } from './WeddingCard';
import { GameState, LeverState } from '../types';
import { useSound } from '../hooks/useSound';
import { triggerJackpotConfetti } from '../utils/confetti';

const DAY_VALUES = ['01', '05', '10', '14', '19', '22', '25', '28', '30'];
const MONTH_VALUES = ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'AUG', 'OCT', 'NOV', 'DEC'];
const YEAR_VALUES = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

export const SlotMachine: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [leverState, setLeverState] = useState<LeverState>('idle');
  const { startSpin, playReveal, stopAll } = useSound();

  const handleSpinSequence = useCallback(() => {
    setLeverState('pulling');
    setGameState('spinning');
    startSpin();

    setTimeout(() => {
      setLeverState('idle');
    }, 500);

    setTimeout(() => {
      setGameState('revealed');
      playReveal();
      triggerJackpotConfetti();
    }, 3800);
  }, [startSpin, playReveal]);

  const handleLeverClick = useCallback(() => {
    if (gameState === 'spinning') return;

    if (gameState === 'revealed') {
      stopAll();
      setGameState('idle');
      requestAnimationFrame(() => {
        handleSpinSequence();
      });
      return;
    }

    handleSpinSequence();
  }, [gameState, stopAll, handleSpinSequence]);

  return (
    <div id="slot-machine-container" className="flex flex-col items-center gap-5 w-full max-w-lg">
      {/* Slot Machine Shell Wrapper */}
      <div 
        className="relative mx-auto flex flex-col items-center"
        style={{ width: '360px', height: '520px' }}
      >
        {/* Transparent PNG Shell Image from public/assets/ */}
        <img
          src={`${import.meta.env.BASE_URL}assets/slot-machine-shell.png`}
          alt="Slot Machine Shell"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          draggable={false}
        />

        {/* Reels Window Display */}
        <div
          id="slot-reels-window"
          className="absolute z-20 flex items-center justify-center overflow-hidden gap-1 px-2"
          style={{
            top: '190px',
            left: '52%',
            transform: 'translateX(-50%)',
            width: '175px',
            height: '60px',
          }}
        >
          <Reel
            values={DAY_VALUES}
            finalValue="19"
            spinning={gameState === 'spinning' || gameState === 'revealed'}
            stopDelay={1500}
          />
          <div className="w-0.5 h-3/4 rounded-full bg-rose-300/40" />
          <Reel
            values={MONTH_VALUES}
            finalValue="NOV"
            spinning={gameState === 'spinning' || gameState === 'revealed'}
            stopDelay={2500}
          />
          <div className="w-0.5 h-3/4 rounded-full bg-rose-300/40" />
          <Reel
            values={YEAR_VALUES}
            finalValue="2026"
            spinning={gameState === 'spinning' || gameState === 'revealed'}
            stopDelay={3500}
          />
        </div>

        {/* Animated Pull Lever Trigger */}
        <div
          id="slot-trigger"
          className={`absolute z-30 cursor-pointer ${leverState === 'pulling' ? 'pulled' : ''}`}
          onClick={gameState !== 'spinning' ? handleLeverClick : undefined}
          style={{
            top: '210px',
            right: '28px',
            cursor: gameState === 'spinning' ? 'not-allowed' : 'pointer',
          }}
          role="button"
          aria-label="Pull slot machine lever"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLeverClick();
            }
          }}
        >
          <div className="arm">
            <div className="knob" />
          </div>
          <div className="arm-shadow" />
          <div className="ring1">
            <div className="shadow" />
          </div>
          <div className="ring2">
            <div className="shadow" />
          </div>
        </div>
      </div>

      {/* Helper prompt when idle */}
      {gameState === 'idle' && (
        <p
          id="instruction-text"
          className="text-sm tracking-widest uppercase animate-fade-in text-center font-medium"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: 'hsl(350 25% 45%)',
          }}
        >
          Pull the lever to reveal
        </p>
      )}

      {/* Luxury Wedding Stationery Card upon reveal */}
      {gameState === 'revealed' && <WeddingCard />}
    </div>
  );
};

export default SlotMachine;