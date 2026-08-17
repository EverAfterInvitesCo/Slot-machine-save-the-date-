import { useCallback, useRef } from 'react';

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startSpin = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/reveal.mp3`);
      }
      const audio = audioRef.current;
      audio.volume = 0.5;
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if audio playback is prevented by browser policy
        });
      }
    } catch {
      // Audio fallback handling
    }
  }, []);

  const playReveal = useCallback(() => {
    // Reveal sound callback hook
  }, []);

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { startSpin, playReveal, stopAll };
}
