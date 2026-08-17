import React, { useState } from 'react';
import Reel from './Reel';

interface SlotMachineProps {
  onWin?: () => void;
}

export const SlotMachine: React.FC<SlotMachineProps> = ({ onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [finalValues, setFinalValues] = useState(['SAVE', 'THE', 'DATE']);

  const reelOptions = [['SAVE', 'DATE', 'LOVE'], ['THE', 'YOUR', 'OUR'], ['DATE', 'DAY', 'TIME']];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    setTimeout(() => {
      setFinalValues(['SAVE', 'THE', 'DATE']);
      setSpinning(false);
      if (onWin) onWin();
    }, 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm mx-auto my-6 select-none">
      {/* Slot Machine Container */}
      <div className="relative w-full bg-gradient-to-b from-rose-100 to-pink-200 rounded-3xl p-6 shadow-2xl border-4 border-white/80">
        
        {/* Header Title inside machine */}
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold">Wedding Slot Machine</span>
        </div>

        {/* Reels Display Window */}
        <div className="relative w-full h-24 bg-white rounded-xl shadow-inner border-2 border-rose-300 flex justify-between items-center px-2 gap-1 overflow-hidden">
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

        {/* Pull Lever / Button */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all transform active:scale-95 disabled:opacity-50 tracking-wider uppercase text-sm border border-white/40 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{spinning ? 'Spinning...' : 'Pull to Save the Date!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;