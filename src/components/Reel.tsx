import React, { useEffect, useState } from 'react';

interface ReelProps {
  values: string[];
  finalValue: string;
  isSpinning: boolean;
  isRevealed: boolean;
  stopDelay: number;
}

export const Reel: React.FC<ReelProps> = ({ values, finalValue, isSpinning, isRevealed, stopDelay }) => {
  const targetIndex = values.indexOf(finalValue) !== -1 ? values.indexOf(finalValue) : 0;
  const initialIndex = 0; // Points to '♥' on initial load

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!isSpinning && !isRevealed) {
      setCurrentIndex(initialIndex);
      return;
    }

    if (isRevealed) {
      setCurrentIndex(targetIndex);
      return;
    }

    const interval = setInterval(() => {
      // Exclude index 0 ('♥') during active scrambling random rotation
      const randomIdx = Math.floor(Math.random() * (values.length - 1)) + 1;
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
  }, [isSpinning, isRevealed, stopDelay, targetIndex, values]);

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center font-serif text-sm font-bold text-[#5c1d29]">
      <div 
        className="transition-transform duration-75 ease-out flex flex-col items-center w-full"
        style={{
          transform: `translateY(-${currentIndex * 48}px)`,
        }}
      >
        {values.map((val, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center w-full tracking-wide select-none"
            style={{ height: '48px', minHeight: '48px' }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;