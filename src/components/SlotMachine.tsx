import React, { useState } from 'react';
import Reel from './Reel';

interface SlotMachineProps {
  onWin?: () => void;
}

export const SlotMachine: React.FC<SlotMachineProps> = ({ onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [finalValues, setFinalValues] = useState(['SAVE', 'THE', 'DATE']);

  // Reel symbol options
  const reelOptions = [['SAVE', 'DATE', 'LOVE'], ['THE', 'YOUR', 'OUR'], ['DATE', 'DAY', 'TIME']];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    // Simulate spin completion after delay
    setTimeout(() => {
      setFinalValues(['SAVE', 'THE', 'DATE']);
      setSpinning(false);
      if (onWin) onWin();
    }, 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto my-8 select-none">
      {/* Slot Machine Shell Graphic */}
      <div className="relative w-full">
        <img
          src={`${import.meta.env.BASE_URL}slot-machine-shell.png`}
          alt="Slot Machine"
          className="w-full h-auto block pointer-events-none drop-shadow-2xl"
        />

        {/* Absolute Container Overlay for Reels */}
        <div className="absolute top-[38%] left-[28%] w-[44%] h-[26%] flex justify-between items-center px-1.5 gap-1 overflow-hidden bg-black/20 rounded-lg backdrop-blur-[2px]">
          {finalValues.map((finalVal, index) => (
            <Reel
              key={index}
              values={reelOptions[index]}
              finalValue={finalVal}
              spinning={spinning}
              stopDelay={800 + index * 400}
            />
          ))}
        </div>

        {/* Interactive Pull Lever / Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="absolute right-[-12%] top-[45%] w-12 h-24 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-lg border-2 border-amber-200 active:translate-y-2 transition-transform cursor-pointer flex flex-col items-center justify-between py-2 group disabled:opacity-70"
          aria-label="Spin the slot machine"
        >
          <div className="w-8 h-8 rounded-full bg-red-600 shadow-inner border-2 border-red-400 group-hover:scale-105 transition-transform" />
          <div className="w-2 h-16 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-full" />
          <div className="w-6 h-6 rounded-full bg-gray-700 shadow-md" />
        </button>
      </div>

      {/* Action / Spin Button below */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all transform active:scale-95 disabled:opacity-50 tracking-wider uppercase text-sm"
      >
        {spinning ? 'Spinning...' : 'Pull to Save the Date!'}
      </button>
    </div>
  );
};

export default SlotMachine;