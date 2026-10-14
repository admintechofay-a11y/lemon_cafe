import React from 'react';
import { Link } from 'react-router-dom';

export default function LemonLogo({ className = "", light = false, size = "default" }) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <Link 
      to="/" 
      className={`group inline-flex items-center transition-opacity duration-200 hover:opacity-90 focus:outline-none ${className}`}
      aria-label="Lemon — Café · Restaurant · Pool"
    >
      {/* Official Authentic Brand Logo extracted directly from venue identity */}
      <img
        src="/assets/optimized/lemon-logo-official-transparent.webp"
        alt="Lemon — Café · Restaurant · Pool"
        className={`w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
          isLarge 
            ? 'h-14 lg:h-16' 
            : isSmall 
            ? 'h-8 lg:h-9' 
            : 'h-10 lg:h-[46px]'
        }`}
        style={light ? { filter: 'brightness(0) invert(1)' } : undefined}
      />
    </Link>
  );
}
