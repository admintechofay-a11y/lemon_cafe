import React from 'react';
import LemonSliceSvg from '../common/LemonSliceSvg';

const marqueeItems = [
  'Sun-Drenched Rooftop',
  '30,000 Sq.Ft Sanctuary',
  'Dubai 24K Gold Cappuccino',
  'Emerald Poolside Daybeds',
  'Glasshouse Architecture',
  'Open 24 Hours · All Days',
  '100% Pure Vegetarian Gastronomy',
  'Japanese Yuzu Espresso Tonic',
  'Slow Indulgent Afternoons',
  'Midnight Coffee & Dessert Lounge',
];

export default function MarqueeStrip() {
  return (
    <div className="relative w-full py-4 bg-[#FBF6E9] text-ink overflow-hidden border-y border-ink/8 z-20">
      {/* Subtle fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FBF6E9] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FBF6E9] to-transparent z-10 pointer-events-none" />

      <div className="flex select-none overflow-hidden group">
        <div className="marquee-track flex shrink-0 items-center gap-10 text-[12.5px] uppercase tracking-[0.24em] font-sans font-medium text-ink/75 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <React.Fragment key={`marquee-${idx}`}>
              <span className="flex items-center gap-3">
                <LemonSliceSvg className="w-3 h-3 text-[#E8B923]" />
                <span className="hover:text-ink transition-colors">{item}</span>
              </span>
              <span className="text-ink/20 text-[9px]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

