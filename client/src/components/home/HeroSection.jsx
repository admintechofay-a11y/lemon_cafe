import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('about-teaser') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[660px] lg:h-[calc(100vh-10px)] lg:max-h-[840px] flex flex-col justify-between pt-24 pb-5 lg:pt-28 lg:pb-5 px-6 lg:px-10 max-w-[1240px] mx-auto select-none overflow-visible">
      {/* Main 2-Column Editorial Grid (Balanced & Refined Luxury Scale) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto w-full">
        
        {/* Left Column: Refined 4-Line Serif H1, 2-line Subtext, 2 Luxury Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10 lg:pr-4"
        >
          {/* 4-Line Editorial Serif H1 — Controlled, Understated Luxury Scale */}
          <h1 className="font-serif font-semibold text-ink tracking-[-0.03em] leading-[1.07] text-[36px] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[62px]">
            <span className="block whitespace-nowrap">Sunlit Moments.</span>
            <span className="block whitespace-nowrap">Slow Afternoons.</span>
            <span className="block whitespace-nowrap">The Art of</span>
            <span className="block whitespace-nowrap">Lemon.</span>
          </h1>

          {/* 2-Line Editorial Subtext (Inter 15.5px, ~72% ink, spacious line-height) */}
          <p className="mt-5 lg:mt-6 text-[15px] lg:text-[15.5px] leading-[1.65] text-ink-soft font-sans font-normal max-w-[400px]">
            Fresh citrus creations, paired with specialty coffee, in a sunlit rooftop pool setting designed for lingering.
          </p>

          {/* Two Luxury Pill Buttons: Copper Gradient Pill + Outlined Pill */}
          <div className="mt-6 lg:mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/menu"
              className="btn-copper-pill !h-[44px] !px-7 !text-[14px]"
            >
              Explore Our Menu
            </Link>

            <Link
              to="/visit"
              className="btn-outline-pill !h-[44px] !px-7 !text-[14px]"
            >
              Visit Us
            </Link>
          </div>
        </motion.div>

        {/* Right Column: 3 Overlapping Photos + 2 Organic Graphic Blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
        >
          {/* Collage Stage Container — Proportionally Scaled for Viewport Harmony */}
          <div className="relative w-full max-w-[450px] sm:max-w-[480px] lg:max-w-[500px] h-[390px] sm:h-[420px] lg:h-[440px]">
            
            {/* Organic Vector Blob 1: Mustard Gold Top-Left (#C8AE5B) */}
            <div
              aria-hidden="true"
              className="absolute -top-5 left-6 sm:left-8 w-[240px] sm:w-[265px] h-[205px] sm:h-[225px] blob-mustard-gold pointer-events-none z-0"
            />

            {/* Organic Vector Blob 2: Blush Pink Bottom-Right (#F0C4C6) */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-4 sm:-right-6 w-[230px] sm:w-[255px] h-[250px] sm:h-[275px] blob-blush-pink pointer-events-none z-0"
            />

            {/* Photo 2 (Top-Right): Tall Architecture (Curved Glass Pavilion) */}
            <div className="absolute top-0 right-4 sm:right-6 w-[170px] sm:w-[195px] lg:w-[210px] h-[250px] sm:h-[285px] lg:h-[305px] z-10 rounded-[3px] overflow-hidden shadow-[0_12px_28px_-8px_rgba(28,23,19,0.12)]">
              <img
                src="/assets/optimized/glass-curved-pavilion.webp"
                alt="Curved glass pavilion and sunlit rooftop terrace at Lemon"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>

            {/* Photo 1 (Bottom-Left): Large Circular Plated Gourmet Dish */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 sm:left-2 w-[235px] sm:w-[270px] lg:w-[295px] h-[235px] sm:h-[270px] lg:h-[295px] z-20 rounded-[3px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(28,23,19,0.14),0_3px_10px_-2px_rgba(28,23,19,0.05)]">
              <img
                src="/assets/optimized/truffle-tagliolini.webp"
                alt="Artisanal plated culinary dish on circular ceramic plate at Lemon"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>

            {/* Photo 3 (Bottom-Right): Small Close-Up of Specialty Espresso */}
            <div className="absolute bottom-0 right-0 sm:right-2 w-[120px] sm:w-[138px] lg:w-[148px] h-[150px] sm:h-[172px] lg:h-[185px] z-30 rounded-[3px] overflow-hidden shadow-[0_14px_30px_-8px_rgba(28,23,19,0.14)]">
              <img
                src="/assets/optimized/coffee-terrace.webp"
                alt="Specialty espresso coffee on terrace at Lemon"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 50%' }}
                loading="eager"
              />
            </div>

          </div>
        </motion.div>

      </div>

      {/* Bottom Center: Small Outlined Mouse-Scroll Pill with Down Arrow */}
      <div className="w-full flex justify-center pb-1">
        <button
          onClick={handleScrollDown}
          className="w-[22px] h-[34px] rounded-full border border-ink/35 flex items-center justify-center text-ink/60 hover:border-ink hover:text-ink transition-colors animate-bob focus:outline-none"
          aria-label="Scroll down to explore"
        >
          <span className="text-[12px] leading-none select-none font-sans font-light">↓</span>
        </button>
      </div>
    </section>
  );
}
