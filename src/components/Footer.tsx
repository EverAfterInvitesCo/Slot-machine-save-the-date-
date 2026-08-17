import React from 'react';
import { Heart, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="everafter-footer"
      className="relative z-10 mt-10 mb-4 flex flex-col items-center justify-center gap-2.5 px-4 text-center"
    >
      {/* "Made with love by everafterinvites" */}
      <div className="flex items-center justify-center gap-1.5 text-xs sm:text-[13px] tracking-wider text-rose-800/80 font-medium">
        <span>Made with</span>
        <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500 inline-block animate-pulse" />
        <span>by</span>
        <a
          href="https://www.instagram.com/_everafterinvites_/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-rose-900 hover:text-rose-600 transition-colors underline decoration-rose-300 underline-offset-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          everafterinvites
        </a>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-3.5 mt-0.5">
        {/* TikTok */}
        <a
          id="social-tiktok"
          href="https://www.tiktok.com/@_everafterinvites_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok @_everafterinvites_"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-100/70 border border-rose-200/80 text-rose-700 hover:text-rose-950 hover:bg-rose-200/80 hover:scale-110 active:scale-95 transition-all shadow-2xs"
        >
          {/* Custom crisp TikTok SVG icon */}
          <svg
            className="w-3.5 h-3.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.86-4.49V8.65a8.28 8.28 0 0 0 4.84 1.54V6.75a4.78 4.78 0 0 1-.93-.06z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          id="social-facebook"
          href="https://www.facebook.com/profile.php?id=61591562833010"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook everafterinvites"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-100/70 border border-rose-200/80 text-rose-700 hover:text-rose-950 hover:bg-rose-200/80 hover:scale-110 active:scale-95 transition-all shadow-2xs"
        >
          <Facebook className="w-3.5 h-3.5" />
        </a>

        {/* Instagram */}
        <a
          id="social-instagram"
          href="https://www.instagram.com/_everafterinvites_/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram @_everafterinvites_"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-100/70 border border-rose-200/80 text-rose-700 hover:text-rose-950 hover:bg-rose-200/80 hover:scale-110 active:scale-95 transition-all shadow-2xs"
        >
          <Instagram className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  );
};
