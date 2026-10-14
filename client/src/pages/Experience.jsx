import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Waves,
  Sun,
  Sparkles,
  GlassWater,
  Moon,
  Clock,
  Music,
  Users,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  CalendarDays
} from 'lucide-react';
import LemonSliceSvg from '../components/common/LemonSliceSvg';
import { assetMap } from '../config/assets';

const zones = [
  {
    id: 'emerald-pool',
    num: '01',
    name: 'The Emerald Pool & Aquatic Sanctuary',
    subtitle: 'Where sunlight dissolves across calm turquoise water.',
    tag: 'Aquatic Luxury',
    icon: Waves,
    image: assetMap?.['poolside-daybeds']?.src || '/assets/optimized/poolside-daybeds.webp',
    imageAlt: 'Emerald Pool and sun loungers at Lemon Cafe',
    description:
      'Immerse yourself in Gujarat’s only dedicated poolside lifestyle dining estate. Flanked by pristine cream cabanas and sunny lemon-yellow loungers, our water sanctuary is designed for slow afternoon dips, chilled signature elixirs, and languid sunbathing.',
    specs: {
      hours: 'Open 24 Hours · Best Light 11:00 AM – 5:30 PM',
      capacity: '60 Poolside Daybeds & Cabanas',
      music: 'Acoustic Deep Tropical & Ambient Downtempo',
      sip: 'Piña Colada in Real Pineapple (₹350)',
    },
    features: [
      'Oversized cushioned double daybeds with shade parasols',
      'Poolside mocktail bar serving cold-pressed citrus sips',
      'Gentle water fountains & evening reflection lighting',
      'Private cabana service for intimate conversations',
    ],
  },
  {
    id: 'curved-glasshouse',
    num: '02',
    name: 'The Curved Glasshouse Conservatory',
    subtitle: 'High-contrast glass architecture framed by botanical foliage.',
    tag: 'Botanical Glasshouse',
    icon: Sparkles,
    image: assetMap?.['glass-curved-pavilion']?.src || '/assets/optimized/glass-curved-pavilion.webp',
    imageAlt: 'Curved Glass Pavilion architecture at Lemon',
    description:
      'A soaring, double-height curved glass pavilion that welcomes morning sunlight while maintaining climate-controlled luxury. Terrazzo dining counters, cascading botanical planters, and warm wood finishes create the sensation of dining inside a tranquil European conservatory.',
    specs: {
      hours: 'Open 24/7 · Morning Espresso & High Tea',
      capacity: '90 Indoor Conservatory Seats',
      music: 'Modern French Jazz & Neo-Soul Grooves',
      sip: 'Dubai 24K Gold Cappuccino (₹300)',
    },
    features: [
      'Double-height acoustic glass insulation with panoramic views',
      'Single-origin pour-over and manual espresso brew bar',
      'Communal terrazzo tasting tables and private banquettes',
      'Full visual view of our open artisan pastry kitchen',
    ],
  },
  {
    id: 'rooftop-deck',
    num: '03',
    name: 'The Sun-Drenched Rooftop Terrace',
    subtitle: 'Elevated open skies with panoramic breezes over Sevasi.',
    tag: 'Skyline Terrace',
    icon: Sun,
    image: assetMap?.['terrace-seating-panorama']?.src || '/assets/optimized/terrace-seating-panorama.webp',
    imageAlt: 'Rooftop terrace open-air deck seating',
    description:
      'Ascend above the gardens to our expansive open deck. As the golden hour bathes the Vadodara skyline in amber hues, cool breezes sweep across the terrace. The ideal setting for sunset mocktails, woodfired sourdough flatbreads, and starry conversations.',
    specs: {
      hours: '5:00 PM – 4:00 AM (Sunset to Midnight)',
      capacity: '80 Open-Air Skyline Seats',
      music: 'Sunset Organic House & Soft Strings',
      sip: 'Japanese Yuzu Espresso Tonic (₹350)',
    },
    features: [
      'Unobstructed sunset vantage point with western horizon views',
      'Subtle fairy lighting, warm timber deck, and brass lanterns',
      'Live woodfired pizza and flatbread oven on terrace',
      'Comfortable lounge seating with plush outdoor textiles',
    ],
  },
  {
    id: 'lawn-cabanas',
    num: '04',
    name: 'The Verdant Lawn & Private Cabanas',
    subtitle: 'Quiet garden sanctuary tucked beneath whispering palm fronds.',
    tag: 'Garden Retreat',
    icon: Compass,
    image: assetMap?.['cabana-lemon-tents']?.src || '/assets/optimized/cabana-lemon-tents.webp',
    imageAlt: 'Private lawn cabanas and garden seating',
    description:
      'Soft green lawns surrounded by tropical citrus trees, jasmine shrubs, and secluded lemon-hued canopy tents. Designed for families and couples seeking peaceful seclusion away from city noise.',
    specs: {
      hours: 'Open 24 Hours · Morning Breakfast & Late Suppers',
      capacity: '50 Garden & Lawn Seats',
      music: 'Natural Birdsong & Low-Fi Acoustic Chill',
      sip: 'Ceremonial Mango Matcha Latte (₹350)',
    },
    features: [
      'Manicured open lawn for children and peaceful walks',
      'Private curtained canopy cabanas with bespoke service',
      'Fragrant citrus flower landscaping and outdoor heaters',
      'Valet-assisted garden entrance directly from parking',
    ],
  },
  {
    id: 'private-soirées',
    num: '05',
    name: 'Private Celebrations & Curated Soirées',
    subtitle: 'Exclusive pool and terrace hosting for memorable milestones.',
    tag: 'Events & Gathering',
    icon: CalendarDays,
    image: assetMap?.['sunset-pool-reflection']?.src || '/assets/optimized/sunset-pool-reflection.webp',
    imageAlt: 'Evening mood and sunset pool reflections',
    description:
      'From intimate poolside birthday dinners to sunset engagement celebrations, corporate brand launches, and private chef dinners. Our estate accommodates up to 250 guests with bespoke 100% pure vegetarian live gastronomic counters.',
    specs: {
      hours: 'Available By Prior Concierge Inquiry',
      capacity: 'Up to 250 Private Guests',
      music: 'Custom Playlist or Live Acoustic Permitted',
      sip: 'Custom Welcome Mocktail Bar',
    },
    features: [
      'Dedicated concierge coordinator for custom styling',
      'Bespoke multi-course pure vegetarian tasting menus',
      'Private use of the poolside deck or glasshouse section',
      'High-speed sound system and valet parking management',
    ],
  },
];

export default function Experience() {
  const [activeZone, setActiveZone] = useState(zones[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#FBF6E9] text-ink pt-24 pb-32 overflow-hidden">
      {/* Background Ambience Blobs */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gold/10 blob-organic-1 blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-pistachio/20 blob-organic-2 blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-3">
            30,000 Sq.Ft Architectural Journey
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-ink font-normal leading-[1.06] tracking-[-0.02em]">
            Five Sanctuaries. <br />
            <span className="italic font-normal text-gold">One Slow Afternoon.</span>
          </h1>

          <p className="text-base text-ink/75 mt-4 font-normal leading-relaxed">
            Every square foot of Lemon is engineered to evoke stillness. Discover our sun-soaked pool, curved conservatory glass, and breezy open rooftops on Sevasi Canal Road, Vadodara.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/visit" className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 shadow-gold-glow">
              <span>Plan Your Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/menu" className="btn-pill-outline text-xs uppercase tracking-wider py-3.5 px-8">
              <span>Explore Gastronomy</span>
            </Link>
          </div>
        </div>

        {/* Video Reel Spotlight Section */}
        <div className="mb-24 rounded-2xl overflow-hidden shadow-xs border border-ink/[0.06] bg-[#FFFDF7] p-3 sm:p-4 relative">
          <div className="relative h-[380px] sm:h-[460px] lg:h-[520px] w-full rounded-[6px] overflow-hidden bg-[#FBF6E9]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/optimized/hero-poster.webp"
              className="w-full h-full object-cover scale-105"
            >
              <source src="/assets/optimized/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-cream max-w-xl">
              <span className="px-3 py-1 rounded-full bg-gold text-ink text-[10px] font-mono uppercase tracking-widest font-semibold inline-block mb-3 shadow-xs">
                Cinematic Reel · Vadodara
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight text-cream drop-shadow">
                Architecture that breathes with the light.
              </h2>
              <p className="text-cream/80 text-xs sm:text-sm mt-2.5 font-normal leading-relaxed">
                Step inside the 30,000 sq.ft compound where water reflections mirror sweeping glass facades, and the aroma of freshly roasted coffee mingles with garden breezes.
              </p>
            </div>
          </div>
        </div>

        {/* Five Zones Storytelling Walkthrough */}
        <div className="space-y-24">
          {zones.map((zone, index) => {
            const isEven = index % 2 === 1;
            const Icon = zone.icon;
            return (
              <motion.div
                key={zone.id}
                id={zone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Visual Image Column */}
                <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xs border border-ink/[0.06] bg-[#FFFDF7] p-3 sm:p-4">
                    <div className="relative h-[360px] sm:h-[440px] lg:h-[480px] rounded-[6px] overflow-hidden bg-[#FBF6E9]">
                      <img
                        src={zone.image}
                        alt={zone.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Number Overlay */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] flex items-center justify-center font-serif text-xl font-normal text-ink shadow-xs">
                        {zone.num}
                      </div>

                      {/* Tag Overlay */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#FFFDF7]/95 backdrop-blur-md text-ink text-xs font-mono uppercase tracking-wider font-medium shadow-xs border border-ink/[0.06] flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-gold" />
                          <span>{zone.tag}</span>
                        </span>
                      </div>

                      {/* Bottom Specs Bar */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded-xl bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] shadow-xs grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-[10px] uppercase font-mono tracking-widest text-ink/60">
                            Capacity
                          </p>
                          <p className="font-serif font-medium text-ink mt-0.5">
                            {zone.specs.capacity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-mono tracking-widest text-[#C98B1B] font-semibold">
                            Recommended Sip
                          </p>
                          <p className="font-medium text-ink/85 mt-0.5">{zone.specs.sip}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Storytelling Column */}
                <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div>
                    <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-2">
                      Sanctuary Zone {zone.num}
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-serif text-ink font-normal leading-tight tracking-[-0.02em]">
                      {zone.name}
                    </h2>

                    <p className="font-serif italic text-base text-ink/75 mt-2 font-normal">
                      “{zone.subtitle}”
                    </p>

                    <p className="text-sm sm:text-base text-ink/75 mt-4 font-normal leading-relaxed">
                      {zone.description}
                    </p>

                    {/* Atmosphere Details Box */}
                    <div className="mt-6 p-4 rounded-xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs space-y-2.5">
                      <div className="flex items-center gap-3 text-xs text-ink/80">
                        <Clock className="w-4 h-4 text-gold shrink-0" />
                        <span>{zone.specs.hours}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-ink/80">
                        <Music className="w-4 h-4 text-ink/60 shrink-0" />
                        <span>{zone.specs.music}</span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="mt-5 space-y-2">
                      <p className="text-[11px] uppercase font-mono tracking-widest text-ink/60 font-semibold">
                        Architectural Features:
                      </p>
                      {zone.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/75">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 pt-5 border-t border-ink/8 flex flex-wrap items-center gap-4">
                    <Link
                      to="/visit"
                      className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-7 shadow-gold-glow"
                    >
                      <span>Reserve This Space</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/gallery"
                      className="btn-pill-outline text-xs uppercase tracking-wider py-3.5 px-7"
                    >
                      <span>View Photos</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner (Converted from Dark Section to Clean Editorial Card) */}
        <div className="mt-28 p-8 sm:p-12 rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs text-center max-w-3xl mx-auto">
          <LemonSliceSvg className="w-10 h-10 text-gold mx-auto mb-3" />
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-ink leading-tight">
            Ready to experience slow luxury?
          </h3>
          <p className="text-ink/75 text-sm sm:text-base mt-2.5 max-w-lg mx-auto font-normal leading-relaxed">
            No booking fee, no queue app. Just pure sunlight, ambient waters, and unhurried gastronomy on Sevasi Canal Road.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/visit" className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 shadow-gold-glow">
              <span>Directions & Visit Info</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

