import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Waves, Sparkles, Sun, Moon, ArrowUpRight, Compass, Shield } from 'lucide-react';
import LemonSliceSvg from '../common/LemonSliceSvg';
import { assetMap } from '../../config/assets';

const experiences = [
  {
    id: 'pool',
    title: 'The Emerald Pool & Cabanas',
    subtitle: 'Sun-drenched daybeds beside tranquil turquoise water.',
    tag: 'Aquatic Luxury',
    icon: Waves,
    image: assetMap?.['poolside-daybeds']?.src || '/assets/optimized/poolside-daybeds.webp',
    imageAlt: 'Luxury poolside daybeds at Lemon Cafe',
    description:
      'Lounge under oversized parasols with chilled citrus elixirs. As sunlight glints across the calm pool surface, time slows to an easy, decadent crawl.',
    highlights: ['Bespoke cushioned cabanas', 'Signature chilled elixirs', 'Gentle acoustic ambient lounge'],
    bestTime: '11:00 AM – 5:00 PM',
    atmosphere: 'Sunlit · Serene · Indulgent'
  },
  {
    id: 'glasshouse',
    title: 'Curved Glass Conservatory',
    subtitle: 'Floor-to-ceiling panoramic glass enveloped by botanical greens.',
    tag: 'Architectural Gem',
    icon: Sparkles,
    image: assetMap?.['glass-curved-pavilion']?.src || '/assets/optimized/glass-curved-pavilion.webp',
    imageAlt: 'Curved glass pavilion dining area',
    description:
      'Immerse yourself in nature without leaving air-conditioned luxury. Our soaring curved glasshouse catches morning light while framing the lush gardens of Sevasi.',
    highlights: ['Terrazzo communal tables', 'Lush botanical garden views', 'Quiet work & reading corners'],
    bestTime: 'Morning Espresso & High Tea',
    atmosphere: 'Bright · Crisp · Botanical'
  },
  {
    id: 'rooftop',
    title: 'The Sunlit Rooftop Terrace',
    subtitle: 'Open-air elevation with sweeping Vadodara skyline breezes.',
    tag: 'Skyline Terrace',
    icon: Sun,
    image: assetMap?.['terrace-seating-panorama']?.src || '/assets/optimized/terrace-seating-panorama.webp',
    imageAlt: 'Panoramic rooftop terrace seating at Lemon',
    description:
      'Ascend to our expansive open-air deck as golden hour paints the clouds in amber and rose. Enjoy woodfired flatbreads and artisanal mocktails under open skies.',
    highlights: ['Sunset golden hour vistas', 'Cool evening breeze', 'Intimate candlelit seating'],
    bestTime: '5:30 PM – 9:00 PM',
    atmosphere: 'Airy · Golden · Romantic'
  },
  {
    id: 'midnight',
    title: 'The 24/7 Midnight Lounge',
    subtitle: 'Warm amber glow when the rest of Gujarat sleeps.',
    tag: 'Round-The-Clock',
    icon: Moon,
    image: assetMap?.['sunset-pool-reflection']?.src || '/assets/optimized/sunset-pool-reflection.webp',
    imageAlt: 'Evening mood and reflections at Lemon Cafe',
    description:
      'Never rushed. Lemon operates 24 hours a day, 7 days a week. From 2:00 AM espresso cravings to late-night quiet conversations, our warm sanctuary never closes.',
    highlights: ['Open 24/7 all 365 days', 'Late-night dessert & coffee', 'Peaceful, unhurried vibe'],
    bestTime: '10:00 PM – 4:00 AM',
    atmosphere: 'Amber · Unhurried · Intimate'
  }
];

export default function ExperienceStorytelling() {
  const [activeTab, setActiveTab] = useState(0);
  const current = experiences[activeTab];

  return (
    <section className="relative py-20 lg:py-32 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden border-t border-ink/8">
      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          {/* Small uppercase eyebrow in Inter (letter-spacing 0.14em, gold) */}
          <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] block mb-3">
            The 30,000 Sq.Ft Experience
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
            Four Spaces. <br />
            <span className="italic font-normal">One Seamless Sanctuary.</span>
          </h2>

          <p className="text-[16px] leading-[1.6] text-ink/75 font-sans font-normal mt-4">
            Move effortlessly from sunlit pool loungers to curved glass dining pavilions and breezy rooftop terraces — open every hour of day and night.
          </p>

          {/* Interactive Editorial Tab Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#FFFDF7] border border-ink/[0.08] max-w-fit mx-auto shadow-subtle">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
                    isActive ? 'text-[#FBF6E9]' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExperienceTab"
                      className="absolute inset-0 rounded-full bg-ink -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F8DA77]' : 'text-ink/50'}`} />
                  <span>{exp.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Space Showcase */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#FFFDF7] rounded-[16px] p-6 sm:p-10 lg:p-12 border border-ink/[0.06] shadow-subtle"
            >
              {/* Left Visual Column */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-[6px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(26,26,26,0.14)] bg-cream-300">
                  <img
                    src={current.image}
                    alt={current.imageAlt}
                    className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/5 pointer-events-none" />

                  {/* Atmosphere Pill overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[12px] bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] flex items-center justify-between text-xs shadow-subtle">
                    <div>
                      <p className="text-[10px] uppercase font-sans tracking-[0.14em] text-ink/50 font-medium">
                        Atmosphere
                      </p>
                      <p className="font-serif text-[15px] font-semibold text-ink mt-0.5">
                        {current.atmosphere}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-sans tracking-[0.14em] text-[#C98B1B] font-semibold">
                        Ideal Hours
                      </p>
                      <p className="text-xs font-sans text-ink/80 font-medium mt-0.5">{current.bestTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Storytelling Details Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[11px] font-sans uppercase tracking-[0.16em] text-[#C98B1B] font-semibold mb-3">
                    Space 0{activeTab + 1} / 04
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-snug">
                    {current.title}
                  </h3>

                  <p className="text-[15.5px] leading-[1.6] text-ink/80 font-sans font-normal mt-4">
                    {current.description}
                  </p>

                  {/* Curated Highlights */}
                  <div className="mt-7 space-y-2.5">
                    <p className="text-xs font-sans uppercase tracking-[0.14em] text-ink/50 font-medium">
                      Highlights:
                    </p>
                    {current.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-[14px] text-ink/80 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-ink/[0.06] flex flex-wrap items-center gap-4">
                  <Link
                    to="/experience"
                    className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-gradient-to-r from-[#E8B923] to-[#C98B1B] shadow-[0_8px_20px_-4px_rgba(232,185,35,0.40)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
                  >
                    <span>Tour The Experience</span>
                    <ArrowUpRight className="w-4 h-4 text-ink/80" />
                  </Link>
                  <Link
                    to="/visit"
                    className="inline-flex items-center justify-center h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-transparent border border-ink/80 transition-all duration-200 hover:bg-ink hover:text-[#FBF6E9] active:scale-[0.98]"
                  >
                    Plan A Visit
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

