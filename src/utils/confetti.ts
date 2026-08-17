import confetti from 'canvas-confetti';

export function triggerJackpotConfetti() {
  // Cute baby pink, blush, rose, and sparkling pastel pink color palette
  const pinkColors = [
    '#ff85a2',
    '#ff99b6',
    '#ffb3c6',
    '#ffc2d1',
    '#fbb1bd',
    '#ff4d6d',
    '#f8bbd0',
    '#f48fb1',
    '#ffffff',
  ];

  // Initial burst
  confetti({
    particleCount: 110,
    spread: 80,
    origin: { y: 0.6 },
    colors: pinkColors,
    scalar: 1.1,
  });

  // Continuous floating pink celebration cannons
  const end = Date.now() + 3200;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: pinkColors,
      scalar: 1,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: pinkColors,
      scalar: 1,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
