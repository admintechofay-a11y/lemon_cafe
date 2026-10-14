import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { assetMap } from '../../config/assets';

export default function AboutTeaser() {
  return (
    <section id="about-teaser" className="relative py-20 lg:py-32 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden">
      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Overlapping Photo Collage Column */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            {/* Background Organic Drift Blobs */}
            <div 
              aria-hidden="true" 
              className="absolute -top-8 -left-8 w-64 h-64 rounded-full bg-[#E8B923]/20 blur-[36px] pointer-events-none animate-drift-slow-1" 
            />
            <div 
              aria-hidden="true" 
              className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-[#DCE5C4]/35 blur-[36px] pointer-events-none animate-drift-slow-2" 
            />

            {/* Main Primary Photo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[6px] overflow-hidden shadow-[0_20px_45px_-12px_rgba(26,26,26,0.15)] bg-cream-300 group"
            >
              <img
                src={assetMap?.['glass-curved-pavilion']?.src || '/assets/optimized/glass-curved-pavilion.webp'}
                alt="Lemon Curved Glass Pavilion and Grounds"
                loading="lazy"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/5 pointer-events-none" />

              {/* Minimal Editorial Photo Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[12px] bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] shadow-subtle flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-[15px] font-semibold text-ink">
                    Curved Glass Conservatory
                  </h4>
                  <p className="text-ink/65 text-xs font-sans mt-0.5">Air-conditioned botanical dining & garden terraces</p>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full border border-ink/10 text-ink/75 text-[11px] font-sans font-medium">
                  30,000 Sq.Ft
                </span>
              </div>
            </motion.div>

            {/* Floating Inset Polaroid Photo (Top Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-6 -right-4 sm:-right-6 w-44 sm:w-52 rounded-[6px] overflow-hidden shadow-[0_16px_36px_-8px_rgba(26,26,26,0.16)] bg-[#FFFDF7] p-2 border border-ink/[0.06] hidden xs:block"
            >
              <div className="rounded-[4px] overflow-hidden h-32 sm:h-36">
                <img
                  src={assetMap?.['poolside-daybeds']?.src || '/assets/optimized/poolside-daybeds.webp'}
                  alt="Poolside Sun Loungers at Lemon"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-sans text-ink/70 font-medium text-center pt-2 pb-0.5">
                Poolside Loungers
              </p>
            </motion.div>
          </div>

          {/* Editorial Story Column */}
          <div className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2 lg:pl-4">
            {/* Small uppercase eyebrow in Inter (letter-spacing 0.14em, gold) */}
            <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] mb-3">
              The Sanctuary Story
            </span>

            {/* Large Serif Heading below */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
              An oasis carved from <br />
              <span className="italic font-normal">light, glass & fresh citrus.</span>
            </h2>

            {/* Body text in Inter */}
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-ink/85 font-sans font-normal mt-6">
              Sprawled across 30,000 square feet on Sevasi Canal Road in Vadodara, Lemon is designed as an architectural breath of fresh air. We built a space where sunlit poolside cabanas, floor-to-ceiling conservatory glass, and rooftop breezes dissolve the frantic rush of daily life.
            </p>

            <p className="text-[15px] md:text-[16px] leading-[1.6] text-ink/75 font-sans font-normal mt-4">
              Whether it’s our signature 24K Gold Cappuccino at sunrise, chilled cold brew infusions under afternoon sun loungers, or woodfired pizzas under the midnight stars — everything we serve is 100% pure vegetarian, handcrafted with thoughtful simplicity.
            </p>

            {/* Editorial Feature Cards: cream-white #FFFDF7, 1px border rgba(26,26,26,0.06), radius 16px, soft shadow */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-5 rounded-[16px] bg-[#FFFDF7] border border-ink/[0.06] shadow-subtle hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 font-serif font-semibold text-[16px] text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]" />
                  <span>Poolside Cabanas</span>
                </div>
                <p className="text-xs text-ink/65 font-sans mt-1.5 leading-relaxed">
                  Private daybeds with gentle turquoise water reflections.
                </p>
              </div>

              <div className="p-5 rounded-[16px] bg-[#FFFDF7] border border-ink/[0.06] shadow-subtle hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 font-serif font-semibold text-[16px] text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F3A1F]" />
                  <span>Rooftop Breeze</span>
                </div>
                <p className="text-xs text-ink/65 font-sans mt-1.5 leading-relaxed">
                  Panoramic open skies and tranquil evening golden hour vistas.
                </p>
              </div>
            </div>

            {/* Buttons: Primary & Secondary */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-gradient-to-r from-[#E8B923] to-[#C98B1B] shadow-[0_8px_20px_-4px_rgba(232,185,35,0.40)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
              >
                <span>Discover Our Story</span>
                <ArrowUpRight className="w-4 h-4 text-ink/80" />
              </Link>
              <Link
                to="/experience"
                className="inline-flex items-center justify-center h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-transparent border border-ink/80 transition-all duration-200 hover:bg-ink hover:text-[#FBF6E9] active:scale-[0.98]"
              >
                Sanctuary Spaces
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

