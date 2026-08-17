import React, { useEffect, useState } from 'react';

interface ReelProps {
  values: string[];
  finalValue: string;
  spinning: boolean;
  stopDelay: number;
}

export const Reel: React.FC<ReelProps> = ({ values, finalValue, spinning, stopDelay }) => {
  const targetIndex = values.indexOf(finalValue) !== -1 ? values.indexOf(finalValue) : 0;
  const [currentIndex, setCurrentIndex] = useState(targetIndex);

  useEffect(() => {
    if (!spinning) {
      setCurrentIndex(targetIndex);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length);
    }, 70);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setCurrentIndex(targetIndex);
    }, stopDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [spinning, stopDelay, targetIndex, values.length]);

  return (
    <div className="relative h-full flex-1 overflow-hidden flex flex-col items-center justify-center font-serif text-sm font-bold text-[#5c1d29]">
      <div 
        className="transition-transform duration-200 ease-out flex flex-col items-center"
        style={{
          transform: `translateY(-${currentIndex * 46}px)`,
        }}
      >
        {values.map((val, idx) => (
          <div 
            key={idx} 
            className="h-[46px] flex items-center justify-center w-full tracking-wider select-none"
            style={{ height: '46px' }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;