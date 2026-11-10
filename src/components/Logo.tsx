import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logo Graphic */}
      {!imgError ? (
        <img
          src="/image.png"
          alt="EMJR EXHAUST"
          onError={() => setImgError(true)}
          className={`object-contain rounded ${
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10'
          }`}
        />
      ) : (
        /* Fallback SVG Emblem with exact #8B35C9 Brand Purple */
        <div className={`flex items-center justify-center bg-[#171717] border border-[#8B35C9]/40 rounded-lg shadow-sm ${
          size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
        }`}>
          <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
            <path
              d="M6 8L16 3L26 8V24L16 29L6 24V8Z"
              stroke="#8B35C9"
              strokeWidth="2"
              fill="#101010"
            />
            <path
              d="M10 16H22M16 10V22"
              stroke="#F6F5F2"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="3" fill="#8B35C9" />
          </svg>
        </div>
      )}

      {/* Brand Text Name */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-wider text-white font-heading leading-none text-xl sm:text-2xl">
            EMJR <span className="text-[#8B35C9]">EXHAUST</span>
          </span>
          <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium mt-0.5">
            Motorcycle Exhaust System
          </span>
        </div>
      )}
    </div>
  );
};
