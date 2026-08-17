import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { downloadIcsCalendarEvent } from '../utils/calendar';

export const WeddingCard: React.FC = () => {
  const venueMapsUrl = 'https://maps.app.goo.gl/j7xKH4SpBx2VppcFA';

  return (
    <div
      id="wedding-stationery-card"
      className="w-full max-w-[420px] sm:max-w-[450px] animate-fade-in mx-auto relative rounded-[2rem] p-7 sm:p-9 transition-all duration-500 shadow-2xl overflow-hidden"
      style={{
        background: '#ffffff',
        border: '1.5px solid rgba(235, 200, 207, 0.7)',
        boxShadow:
          '0 25px 50px -12px rgba(180, 110, 125, 0.2), 0 8px 24px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Decorative Blush Corner Flourishes */}
      <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg border-rose-300/80 pointer-events-none" />
      <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 rounded-tr-lg border-rose-300/80 pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 rounded-bl-lg border-rose-300/80 pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 rounded-br-lg border-rose-300/80 pointer-events-none" />

      {/* Floating Translucent Blush Petal Accents */}
      <div
        className="absolute top-10 right-12 w-5 h-8 rounded-full bg-rose-200/40 rotate-45 blur-[0.5px] pointer-events-none"
        style={{ transform: 'rotate(35deg)' }}
      />
      <div
        className="absolute top-36 right-20 w-4 h-7 rounded-full bg-rose-200/30 rotate-12 blur-[0.5px] pointer-events-none"
        style={{ transform: 'rotate(15deg)' }}
      />
      <div
        className="absolute bottom-28 left-12 w-4 h-6 rounded-full bg-rose-200/25 -rotate-45 blur-[0.5px] pointer-events-none"
        style={{ transform: 'rotate(-40deg)' }}
      />

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Calligraphic Top Script */}
        <div className="flex items-center justify-center gap-3.5 w-full my-1.5">
          <div className="h-px bg-rose-300/60 flex-1 max-w-[48px]" />
          <span
            className="text-2xl sm:text-3xl text-rose-900/85 italic font-normal tracking-wide"
            style={{
              fontFamily: "'Great Vibes', 'Alex Brush', cursive",
            }}
          >
            Together with their families
          </span>
          <div className="h-px bg-rose-300/60 flex-1 max-w-[48px]" />
        </div>

        {/* Couple Names */}
        <h2
          id="card-couple-names"
          className="text-4xl sm:text-5xl tracking-normal text-stone-900 font-normal my-2 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          }}
        >
          Yasmeen{' '}
          <span
            className="font-normal text-rose-500/85 italic"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            }}
          >
            &amp;
          </span>{' '}
          Omar
        </h2>

        {/* "are getting married" placed before Save the Date */}
        <p
          id="card-getting-married-text"
          className="text-base sm:text-lg italic font-normal text-rose-900/80 mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          }}
        >
          are getting married
        </p>

        {/* Save The Date Hairline Divider Section */}
        <div className="w-full my-3">
          <div className="h-px bg-rose-200/85 w-full" />
          <p
            className="text-xs sm:text-sm tracking-[0.4em] uppercase text-rose-900/85 py-3 font-medium"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            SAVE THE DATE
          </p>
          <div className="h-px bg-rose-200/85 w-full" />
        </div>

        {/* Date line */}
        <p
          id="card-event-date"
          className="text-lg sm:text-xl text-stone-700 tracking-wide mt-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          <span className="font-light text-stone-600">Thursday</span> &bull;{' '}
          <strong
            className="font-semibold"
            style={{ color: '#7c3e38' }}
          >
            November 19, 2026
          </strong>
        </p>

        {/* Venue Location Text (Clean text with MapPin icon) */}
        <div
          id="card-venue-display"
          className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-700 mt-2.5"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span className="font-medium">
            AZHA New Cairo Venue &bull; New Cairo, Egypt
          </span>
        </div>

        {/* Action Buttons: Add to Calendar and Venue Location */}
        <div className="w-full flex flex-col sm:flex-row gap-3 mt-6 pt-1">
          {/* Add to Calendar (Phone Calendar) */}
          <button
            id="btn-phone-calendar"
            onClick={downloadIcsCalendarEvent}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm transition-all hover:opacity-90 active:scale-98 cursor-pointer"
            style={{
              background: '#7c3e38',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.92rem',
            }}
          >
            <Calendar className="w-4 h-4 text-rose-200" />
            <span>Add to Calendar</span>
          </button>

          {/* Venue Location (Google Maps) */}
          <a
            id="btn-venue-location"
            href={venueMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-stone-800 font-medium text-xs sm:text-sm tracking-wide transition-all hover:bg-rose-100/70 active:scale-98"
            style={{
              background: '#fbf0f1',
              border: '1.5px solid #edd5d7',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.92rem',
            }}
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Venue Location</span>
          </a>
        </div>
      </div>
    </div>
  );
};
