import React from 'react';
import { SlotMachine } from './components/SlotMachine';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div
      id="save-the-date-app"
      className="flex min-h-screen flex-col items-center justify-between px-4 py-6 select-none relative overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center top, hsl(350 30% 96%), hsl(350 20% 92%) 60%, hsl(340 15% 88%))',
      }}
    >
      {/* Subtle Dot Grid Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(350 40% 50%) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full flex flex-col items-center justify-center flex-1 my-auto">
        {/* Header Section - Big Fancy Title */}
        <header id="invitation-header" className="relative z-10 mb-2 sm:mb-4 text-center">
          <h1
            id="invitation-title"
            className="text-5xl sm:text-6xl md:text-7xl font-light tracking-wide py-1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              background:
                'linear-gradient(180deg, hsl(350 35% 32%), hsl(350 25% 48%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.6))',
            }}
          >
            Save the Date
          </h1>
        </header>

        {/* Interactive Slot Machine & Reveal Card */}
        <main id="slot-machine-wrapper" className="relative z-10 w-full flex justify-center">
          <SlotMachine />
        </main>
      </div>

      {/* Footer with EverAfterInvites branding & socials */}
      <Footer />
    </div>
  );
}
