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
      {/* Slot Machine Shell */}
      <div 
        className="relative mx-auto rounded-[40px] p-6 flex flex-col items-center shadow-2xl border-4 border-[#d4af37]"
        style={{ 
          width: '352px', 
          height: '484px',
          background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15), inset 0 2px 6px rgba(255,255,255,0.8)'
        }}
      >
        {/* Header Header Banner */}
        <div className="w-full text-center tracking-[0.2em] font-serif text-sm font-bold text-[#883344] uppercase mb-4 drop-shadow-sm">
          Save The Date
        </div>

        {/* Decorative Top Lights/Dots */}
        <div className="flex gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#d4af37] shadow-inner border border-[#b8860b]" />
          <div className="w-4 h-4 rounded-full bg-[#d4af37] shadow-inner border border-[#b8860b]" />
          <div className="w-3 h-3 rounded-full bg-[#d4af37] shadow-inner border border-[#b8860b]" />
        </div>

        {/* Hearts indicator panel */}
        <div className="w-3/4 h-8 bg-white/60 rounded-xl flex items-center justify-center gap-2 mb-6 shadow-inner border border-rose-200">
          <span className="text-rose-400 text-xs">♥ ♥ ♥ ♥</span>
        </div>

        {/* Reels Window Display */}
        <div
          id="slot-reels-window"
          className="relative z-20 flex items-center justify-center overflow-hidden shadow-inner rounded-xl gap-1 px-2 border-2 border-[#d4af37]"
          style={{
            width: '210px',
            height: '80px',
            background: 'linear-gradient(135deg, hsl(350 30% 97%), hsl(20 40% 96%))',
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
          className={`absolute right-[-45px] top-[180px] z-30 cursor-pointer ${leverState === 'pulling' ? 'pulled' : ''}`}
          onClick={gameState !== 'spinning' ? handleLeverClick : undefined}
          style={{
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