import React, { useEffect, useRef, useState } from 'react';

interface ReelProps {
  values: string[];
  finalValue: string;
  spinning: boolean;
  stopDelay?: number;
}

export const Reel: React.FC<ReelProps> = ({
  values,
  finalValue,
  spinning,
  stopDelay = 1000,
}) => {
  const [displayValue, setDisplayValue] = useState(finalValue);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (spinning) {
      // Rapidly cycle through values while spinning
      intervalRef.current = window.setInterval(() => {
        const randomIndex = Math.floor(Math.random() * values.length);
        setDisplayValue(values[randomIndex]);
      }, 80);

      // Stop on final value after delay
      const timeout = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayValue(finalValue);
      }, stopDelay);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimeout(timeout);
      };
    } else {
      setDisplayValue(finalValue);
    }
  }, [spinning, finalValue, values, stopDelay]);

  return (
    <div className="flex-1 h-full flex items-center justify-center overflow-hidden">
      <span
        className={`font-bold transition-all duration-150 ${
          spinning ? 'blur-[0.5px] scale-95 opacity-80' : 'scale-100 opacity-100'
        }`}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.35rem',
          color: 'hsl(350, 30%, 30%)',
          letterSpacing: '0.05em',
        }}
      >
        {displayValue}
      </span>
    </div>
  );
};

export default Reel;