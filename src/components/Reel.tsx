import React, { useEffect, useState } from 'react';

interface ReelProps {
  values: string[];
  finalValue: string;
  initialDisplay: string;
  isSpinning: boolean;
  isRevealed: boolean;
  stopDelay: number;
}

export const Reel: React.FC<ReelProps> = ({ 
  values, 
  finalValue, 
  initialDisplay, 
  isSpinning, 
  isRevealed, 
  stopDelay 
}) => {
  const targetIndex = values.indexOf(finalValue) !== -1 ? values.indexOf(finalValue) : 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayOverride, setDisplayOverride] = useState<string | null>(initialDisplay);

  useEffect(() => {
    if (!isSpinning && !isRevealed) {
      setDisplayOverride(initialDisplay);
      setCurrentIndex(0);
      return;
    }

    if (isRevealed) {
      setDisplayOverride(null);
      setCurrentIndex(targetIndex);
      return;
    }

    setDisplayOverride(null);

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * values.length);
      setCurrentIndex(randomIdx);
    }, 60);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setCurrentIndex(targetIndex);
    }, stopDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isSpinning, isRevealed, stopDelay, targetIndex, values, initialDisplay]);

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center font-serif text-xs font-bold text-[#5c1d29]">
      <div 
        className="transition-transform duration-75 ease-out flex flex-col items-center w-full"
        style={{
          transform: `translateY(-${currentIndex * 46}px)`,
        }}
      >
        {values.map((val, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center w-full tracking-wide select-none"
            style={{ height: '46px', minHeight: '46px' }}
          >
            {displayOverride !== null && idx === 0 ? displayOverride : val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;