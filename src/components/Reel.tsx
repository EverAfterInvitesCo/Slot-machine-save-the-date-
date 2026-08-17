import React, { useEffect, useRef, useState } from 'react';

export interface ReelProps {
  values: string[];
  finalValue: string;
  spinning: boolean;
  stopDelay: number;
}

export default function Reel({
  values,
  finalValue,
  spinning,
  stopDelay,
}: ReelProps) {
  const [hasStopped, setHasStopped] = useState(false);
  const [displayedValues, setDisplayedValues] = useState<string[]>(['♡', '♡', '♡']);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (spinning && !hasStopped) {
      let index = 0;
      intervalRef.current = window.setInterval(() => {
        index = (index + 1) % values.length;
        setDisplayedValues([
          values[index % values.length],
          values[(index + 1) % values.length],
          values[(index + 2) % values.length],
        ]);
      }, 60);

      const timer = window.setTimeout(() => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        const finalIdx = values.indexOf(finalValue);
        const prevIdx = (finalIdx - 1 + values.length) % values.length;
        const nextIdx = (finalIdx + 1) % values.length;
        setDisplayedValues([
          values[prevIdx],
          finalValue,
          values[nextIdx],
        ]);
        setHasStopped(true);
      }, stopDelay);

      return () => {
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
        clearTimeout(timer);
      };
    }
  }, [spinning, hasStopped, values, finalValue, stopDelay]);

  useEffect(() => {
    if (!spinning) {
      setHasStopped(false);
      setDisplayedValues(['♡', '♡', '♡']);
    }
  }, [spinning, values]);

  const isFastSpinning = spinning && !hasStopped;

  return (
    <div
      className="relative flex-1 h-full overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, hsl(350 25% 92%) 0%, hsl(350 15% 97%) 20%, hsl(0 0% 100%) 50%, hsl(350 15% 97%) 80%, hsl(350 25% 92%) 100%)',
        borderRadius: '4px',
      }}
    >
      <div
        className={`flex flex-col items-center justify-center h-full transition-all ${
          isFastSpinning ? 'duration-0' : 'duration-500 ease-out'
        }`}
      >
        {displayedValues.map((val, idx) => (
          <div
            key={`${val}-${idx}`}
            className={`flex-shrink-0 h-1/3 flex items-center justify-center w-full ${
              idx === 1 ? '' : 'opacity-20'
            }`}
          >
            <span
              className={`font-bold tracking-widest transition-all duration-300 ${
                hasStopped && idx === 1 ? 'scale-110' : ''
              } ${val === '♡' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}
              style={{
                fontFamily:
                  val === '♡' ? 'Arial, sans-serif' : "'Cormorant Garamond', serif",
                color:
                  val === '♡'
                    ? 'hsl(350 45% 70%)'
                    : idx === 1
                    ? hasStopped
                      ? 'hsl(350 40% 40%)'
                      : 'hsl(350 20% 30%)'
                    : 'hsl(350 10% 70%)',
                textShadow:
                  idx === 1 && hasStopped
                    ? '0 1px 3px hsla(350, 40%, 40%, 0.2)'
                    : 'none',
                letterSpacing: '0.15em',
                WebkitTextStroke: val === '♡' ? '2px hsl(350 45% 70%)' : 'none',
              }}
            >
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}