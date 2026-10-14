import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  MapPin,
  Layers
} from 'lucide-react';
import LemonSliceSvg from '../components/common/LemonSliceSvg';
import { assetMap } from '../config/assets';

const galleryCategories = [
  'All',
  'Pool & Rooftop',
  'Architecture & Glass',
  'Gastronomy',
  'Artisan Brews & Sips',
  'Video Reels',
];

const galleryItems = [
  {
    id: 1,
    title: 'Poolside Daybeds & Citrus Elixirs',
    category: 'Pool & Rooftop',
    type: 'image',
    src: assetMap?.['poolside-cocktails']?.src || '/assets/optimized/poolside-cocktails.webp',
    span: 'col-span-1 md:col-span-2 row-span-2',
    height: 'h-80 sm:h-[480px]',
    location: 'Emerald Pool Deck',
    caption: 'Sunlight glints across still turquoise water as signature fresh fruit mocktails arrive tableside.',
  },
  {
    id: 2,
    title: 'Cinematic Sanctuary Walkthrough',
    category: 'Video Reels',
    type: 'video',
    src: '/assets/optimized/hero-video.mp4',
    poster: '/assets/optimized/hero-poster.webp',
    span: 'col-span-1 md:col-span-2 row-span-2',
    height: 'h-80 sm:h-[480px]',
    location: 'Sanctuary Compound',
    caption: '30,000 square feet of curated glass architecture, terrace breezes, and poolside dining in Vadodara.',
  },
  {
    id: 3,
    title: 'Curved Glass Conservatory High Tea',
    category: 'Architecture & Glass',
    type: 'image',
    src: assetMap?.['glasshouse-coffee']?.src || '/assets/optimized/glasshouse-coffee.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[260px]',
    location: 'Conservatory Glasshouse',
    caption: 'Morning brew overlooking botanical gardens and curved glass architectural pavilions.',
  },
  {
    id: 4,
    title: 'Handcrafted Truffle Tagliolini',
    category: 'Gastronomy',
    type: 'image',
    src: assetMap?.['truffle-tagliolini']?.src || '/assets/optimized/truffle-tagliolini.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[260px]',
    location: 'Kitchen Atelier',
    caption: 'Handmade fresh ribbon pasta tossed in fragrant black truffle reduction and aged parmesan.',
  },
  {
    id: 5,
    title: 'Poolside Daybed Parasols',
    category: 'Pool & Rooftop',
    type: 'image',
    src: assetMap?.['poolside-daybeds']?.src || '/assets/optimized/poolside-daybeds.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[260px]',
    location: 'South Pool Lawn',
    caption: 'Cream-cushioned loungers under yellow parasols for unhurried afternoons.',
  },
  {
    id: 6,
    title: 'Sunset Rooftop Terrace Panorama',
    category: 'Pool & Rooftop',
    type: 'image',
    src: assetMap?.['terrace-seating-panorama']?.src || '/assets/optimized/terrace-seating-panorama.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[260px]',
    location: 'Open Rooftop Deck',
    caption: 'Panoramic open vistas over Sevasi Canal Road as dusk turns into warm amber twilight.',
  },
  {
    id: 7,
    title: 'Glass Pavilion & Reflection Pool',
    category: 'Architecture & Glass',
    type: 'image',
    src: assetMap?.['glass-curved-pavilion']?.src || '/assets/optimized/glass-curved-pavilion.webp',
    span: 'col-span-1 md:col-span-2 row-span-1',
    height: 'h-64 sm:h-[300px]',
    location: 'Central Water Garden',
    caption: 'Architectural geometry meeting lush subtropical landscape design.',
  },
  {
    id: 8,
    title: 'Dubai 24K Gold Cappuccino & Roast',
    category: 'Artisan Brews & Sips',
    type: 'image',
    src: assetMap?.['coffee-terrace']?.src || '/assets/optimized/coffee-terrace.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[300px]',
    location: 'Espresso Brew Bar',
    caption: 'Single origin espresso crowned with genuine 24-karat gold leaf flakes.',
  },
  {
    id: 9,
    title: 'Activated Charcoal Pepper Fettuccine',
    category: 'Gastronomy',
    type: 'image',
    src: assetMap?.['squid-ink-pasta']?.src || '/assets/optimized/squid-ink-pasta.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[300px]',
    location: 'Chef’s Showcase',
    caption: 'Pure vegetarian activated charcoal artisan pasta with roasted pepper cream and burrata.',
  },
  {
    id: 10,
    title: 'Royal Saffron Masala Chai at Dusk',
    category: 'Artisan Brews & Sips',
    type: 'image',
    src: assetMap?.['masala-chai-sunset']?.src || '/assets/optimized/masala-chai-sunset.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[280px]',
    location: 'Sunset Terrace',
    caption: 'Heritage slow-brewed Assam tea with crushed cardamom and saffron in the evening breeze.',
  },
  {
    id: 11,
    title: 'Iced Americano on Summer Deck',
    category: 'Artisan Brews & Sips',
    type: 'image',
    src: assetMap?.['iced-americano-terrace']?.src || '/assets/optimized/iced-americano-terrace.webp',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[280px]',
    location: 'Open Lounge',
    caption: 'Crisp cold water extraction over rock crystal ice for hot afternoons.',
  },
  {
    id: 12,
    title: 'Private Canopy Lemon Tents',
    category: 'Pool & Rooftop',
    type: 'image',
    src: assetMap?.['cabana-lemon-tents']?.src || '/assets/optimized/cabana-lemon-tents.webp',
    span: 'col-span-1 md:col-span-2 row-span-1',
    height: 'h-64 sm:h-[280px]',
    location: 'Garden Cabanas',
    caption: 'Intimate curtained pavilions for quiet family meals and celebration dinners.',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="relative w-full min-h-screen bg-[#FBF6E9] text-ink pt-24 pb-32">
      {/* Decorative Glow */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gold/10 blob-organic-1 blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-pistachio/20 blob-organic-2 blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-3">
            Curated Visual Archive
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-ink font-normal leading-[1.06] tracking-[-0.02em]">
            Light, Geometry & <br />
            <span className="italic font-normal text-gold">Slow Indulgence.</span>
          </h1>

          <p className="text-base text-ink/75 mt-4 font-normal leading-relaxed">
            Every angle tells the story of slow afternoons. Explore our photographic and video archive across all 30,000 square feet in Sevasi, Vadodara.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-cream shadow-xs'
                    : 'text-ink/70 hover:text-ink bg-[#FFFDF7] border border-ink/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 rounded-full bg-ink -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry / Bento Visual Grid with 6px photo corners */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxIndex(idx)}
                className={`relative rounded-2xl overflow-hidden shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-ink/[0.06] bg-[#FFFDF7] p-2.5 ${item.span} ${item.height}`}
              >
                <div className="w-full h-full relative rounded-[6px] overflow-hidden bg-[#FBF6E9]">
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={item.poster}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                      {/* Video Badge */}
                      <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center shadow-xs">
                        <Play className="w-3.5 h-3.5 fill-ink ml-0.5" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Dark Vignette Overlay for readable captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFFDF7]/90 backdrop-blur-md text-ink text-[10px] font-mono uppercase tracking-wider font-medium shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-4 left-4 right-4 text-cream">
                    <div className="flex items-center gap-1.5 text-[10px] text-gold-light font-mono tracking-widest uppercase mb-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-normal leading-snug drop-shadow">
                      {item.title}
                    </h3>
                    <p className="text-xs text-cream/75 mt-0.5 line-clamp-1 font-normal">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all z-50 shadow-lg"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all z-50 shadow-lg"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all z-50 shadow-lg"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cream/20 bg-black/90 max-h-[72vh] flex items-center justify-center p-2">
                {activeItem.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    loop
                    className="max-h-[70vh] w-auto rounded-[6px] object-contain"
                  >
                    <source src={activeItem.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={activeItem.src}
                    alt={activeItem.title}
                    className="max-h-[70vh] w-auto rounded-[6px] object-contain"
                  />
                )}
              </div>

              {/* Caption & Location Footer */}
              <div className="mt-5 text-center text-cream max-w-2xl px-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-gold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeItem.location} · {activeItem.category}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-cream/80 mt-1 font-light">
                  {activeItem.caption}
                </p>
                <p className="text-[11px] font-mono text-cream/40 mt-2">
                  Image {lightboxIndex + 1} of {filteredItems.length} · Use Esc or Arrow Keys
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
