import React, { useEffect, useState } from 'react';

interface ReelProps {
  values: string[];
  finalValue: string;
  spinning: boolean;
  stopDelay: number;
}

export const Reel: React.FC<ReelProps> = ({ values, finalValue, spinning, stopDelay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (!spinning) {
      setIsStopped(false);
      const targetIdx = values.indexOf(finalValue);
      if (targetIdx !== -1) {
        setCurrentIndex(targetIdx);
      }
      return;
    }

    const timer = setTimeout(() => {
      setIsStopped(true);
      const targetIdx = values.indexOf(finalValue);
      if (targetIdx !== -1) {
        setCurrentIndex(targetIdx);
      }
    }, stopDelay);

    const interval = setInterval(() => {
      if (!isStopped) {
        setCurrentIndex((prev) => (prev + 1) % values.length);
      }
    }, 80);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [spinning, stopDelay, finalValue, values, isStopped]);

  return (
    <div className="relative h-full flex-1 overflow-hidden flex flex-col items-center justify-center font-serif text-lg font-bold text-[#883344]">
      <div 
        className="transition-transform duration-300 ease-out flex flex-col items-center"
        style={{
          transform: `translateY(-${currentIndex * 40}px)`,
        }}
      >
        {values.map((val, idx) => (
          <div 
            key={idx} 
            className="h-[40px] flex items-center justify-center w-full tracking-wider"
            style={{ minHeight: '40px' }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;