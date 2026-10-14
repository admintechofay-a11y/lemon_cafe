import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Award,
  Sun,
  ShieldCheck,
  Coffee,
  Utensils,
  ArrowUpRight,
  Clock,
  Compass
} from 'lucide-react';
import LemonSliceSvg from '../components/common/LemonSliceSvg';
import { businessInfo } from '../config/business';
import { assetMap } from '../config/assets';

const teamMembers = [
  {
    name: 'Chef Alessandro Rossi',
    role: 'Culinary Director & Master Pasta Artisan',
    bio: 'Trained across Florence and Milan, Chef Alessandro brings two decades of pasta mastery to our pure vegetarian kitchen.',
    specialty: 'Handmade Truffle Tagliolini & Charcoal Sourdough',
    image: assetMap?.['truffle-tagliolini']?.src || '/assets/optimized/truffle-tagliolini.webp',
  },
  {
    name: 'Kavita Sundaram',
    role: 'Head of Coffee & Specialty Roast Q-Grader',
    bio: 'Championing ethical single-origin Indian microlots. Kavita curated our Dubai 24K Gold Cappuccino and slow pour-over bar.',
    specialty: '24K Gold Microfoam & Japanese Yuzu Tonic',
    image: assetMap?.['coffee-terrace']?.src || '/assets/optimized/coffee-terrace.webp',
  },
  {
    name: 'Devraj Chauhan',
    role: 'Chief Mixologist & Botanical Herbalist',
    bio: 'Master of fresh citrus cordial reductions and cold-pressed botanical infusions, celebrating native Gujarat herbs.',
    specialty: 'Piña Colada in Real Pineapple & Ube Macchiatos',
    image: assetMap?.['poolside-cocktails']?.src || '/assets/optimized/poolside-cocktails.webp',
  },
];

const pillars = [
  {
    num: '01',
    title: 'The Citrus Philosophy',
    desc: 'Citrus is more than our namesake; it is the culinary heartbeat. From Meyer lemons to Japanese yuzu and Valencia oranges, crisp acidity brightens every dish and beverage.',
    icon: LemonSliceSvg,
  },
  {
    num: '02',
    title: 'The Art of Slow Living',
    desc: 'In a world driven by frantic rush, Lemon is a sanctuary of patience. Unhurried table service, sprawling daybeds, and 24-hour calm invite you to linger effortlessly.',
    icon: Sun,
  },
  {
    num: '03',
    title: '100% Pure Vegetarian Integrity',
    desc: 'Uncompromising culinary excellence without animal products. Every stock, emulsion, and dish is crafted in a spotless, sacred vegetarian kitchen.',
    icon: ShieldCheck,
  },
  {
    num: '04',
    title: '30,000 Sq.Ft Architectural Respite',
    desc: 'Curved conservatory glass, open rooftop decks, and serene swimming pool reflections designed in harmony with Gujarat’s natural light.',
    icon: Compass,
  },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#FBF6E9] text-ink pt-24 pb-32 overflow-hidden">
      {/* Background Ambience Blobs */}
      <div className="absolute top-24 left-10 w-[500px] h-[500px] bg-gold/10 blob-organic-1 blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-pistachio/20 blob-organic-2 blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-3">
            Our Ethos & Origin
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-ink font-normal leading-[1.06] tracking-[-0.02em]">
            Where Citrus <br />
            <span className="italic font-normal text-gold">Became a Sanctuary.</span>
          </h1>

          <p className="text-base text-ink/75 mt-4 font-normal leading-relaxed">
            Founded with a singular vision: to carve a slow, sun-drenched European architectural oasis in the bustling heart of Vadodara, Gujarat.
          </p>
        </div>

        {/* Narrative & Collage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          {/* Collage Images */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xs border border-ink/[0.06] bg-[#FFFDF7] p-3 sm:p-4">
              <div className="relative h-[420px] sm:h-[480px] rounded-[6px] overflow-hidden bg-[#FBF6E9]">
                <img
                  src={assetMap?.['glass-curved-pavilion']?.src || '/assets/optimized/glass-curved-pavilion.webp'}
                  alt="Lemon House Conservatory Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] shadow-xs flex items-center justify-between">
                  <div>
                    <p className="font-serif text-sm font-medium text-ink">Lemon House Sanctuary</p>
                    <p className="text-ink/65 text-xs">Sevasi Canal Road, Vadodara</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-ink text-cream text-[10px] font-mono uppercase tracking-wider font-medium">
                    30,000 SQ.FT
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Element with 6px corners */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 w-44 sm:w-52 rounded-xl overflow-hidden shadow-card border border-ink/[0.08] bg-[#FFFDF7] p-2 hidden xs:block">
              <div className="h-28 rounded-[4px] overflow-hidden">
                <img
                  src={assetMap?.['poolside-daybeds']?.src || '/assets/optimized/poolside-daybeds.webp'}
                  alt="Poolside Daybeds"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 text-center">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#C98B1B] font-semibold">
                  Slow Living Poolside
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Story */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-2">
              The Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-ink font-normal leading-tight tracking-[-0.02em]">
              A breath of fresh citrus in Gujarat’s cultural capital.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-ink/75 font-normal leading-relaxed mt-5">
              <p>
                Vadodara is known for its royal palaces, artistic heritage, and discerning palate. When conceptualizing Lemon, we did not want to build another crowded city café.
              </p>
              <p>
                Instead, on Sevasi Canal Road, we acquired 30,000 square feet of open earth to create an architectural retreat. We drew inspiration from the sun-drenched terraces of the Amalfi Coast, the serene water reflections of Bali villas, and the soaring glass conservatories of classic Europe.
              </p>
              <p>
                Here, every guest is encouraged to linger: work peacefully on our glasshouse terrazzo desks, sip our signature Dubai 24K Gold Cappuccino as morning turns to afternoon, or enjoy woodfired sourdough pizzas beside the swimming pool at 2:00 AM.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-ink/8 flex flex-wrap items-center gap-6 text-xs text-ink/70 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>Est. Vadodara, Gujarat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>100% Pure Vegetarian</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span>Open 24/7 Everyday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Four Core Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-2">
              Guiding Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-ink font-normal tracking-[-0.02em]">
              Our Four Founding <span className="italic font-normal text-gold">Pillars</span>
            </h2>
            <p className="text-ink/70 text-sm mt-2 font-normal">
              Principles that guide our bar, our kitchen, and our hospitality every hour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl p-6 bg-[#FFFDF7] border border-ink/[0.06] shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-[#C98B1B]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#C98B1B] font-semibold tracking-widest block mb-1">
                      Pillar {pillar.num}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-ink leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/70 mt-2.5 font-normal leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Team & Artisans Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-2">
              Behind The Craft
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-ink font-normal tracking-[-0.02em]">
              The Curators & <span className="italic font-normal text-gold">Artisans</span>
            </h2>
            <p className="text-ink/70 text-sm mt-2 font-normal">
              Meet the masters shaping our pure vegetarian gastronomy and signature beverage program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl overflow-hidden bg-[#FFFDF7] border border-ink/[0.06] shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 p-3.5 flex flex-col justify-between"
              >
                <div className="relative h-60 rounded-[6px] overflow-hidden bg-[#FBF6E9]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 text-cream">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-gold-light">
                      {member.role}
                    </span>
                    <h3 className="font-serif text-lg font-normal drop-shadow">{member.name}</h3>
                  </div>
                </div>

                <div className="pt-4 flex flex-col flex-grow justify-between">
                  <p className="text-xs sm:text-sm text-ink/70 font-normal leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mt-4 pt-3.5 border-t border-ink/8">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C98B1B] font-semibold block mb-0.5">
                      Signature Focus:
                    </span>
                    <p className="text-xs font-serif font-medium text-ink">{member.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Invitation (Converted from Dark Section to Clean Editorial Card) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs text-center max-w-3xl mx-auto">
          <LemonSliceSvg className="w-10 h-10 text-gold mx-auto mb-3" />
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-ink leading-tight">
            Experience the philosophy in person.
          </h3>
          <p className="text-ink/75 text-sm sm:text-base mt-2.5 max-w-lg mx-auto font-normal leading-relaxed">
            Join us for an unhurried morning espresso, an afternoon poolside lunch, or a midnight dessert under the stars.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/visit" className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 shadow-gold-glow">
              <span>Directions & Visit Info</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/menu" className="btn-pill-outline text-xs uppercase tracking-wider py-3.5 px-8">
              <span>Explore The Menu</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

