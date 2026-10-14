import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Flame } from 'lucide-react';
import LemonSliceSvg from '../common/LemonSliceSvg';
import { assetMap } from '../../config/assets';

export const mustTryItems = [
  {
    id: 'gold-cappuccino',
    name: 'Dubai 24K Gold Cappuccino',
    category: 'Coffee & Tea',
    price: 300,
    tag: "Chef's Signature",
    description: 'Single-origin espresso crowned with genuine edible 24-karat gold leaf & velvety steamed microfoam.',
    image: assetMap?.['coffee-terrace']?.src || '/assets/optimized/coffee-terrace.webp',
    isVeg: true,
    accent: 'from-amber-500/20 to-gold/10'
  },
  {
    id: 'yuzu-tonic',
    name: 'Japanese Yuzu Espresso Tonic',
    category: 'Signature Sips',
    price: 350,
    tag: 'Barista Special',
    description: 'Cold-pressed Japanese yuzu reduction, botanical tonic water, double ristretto over crystal ice.',
    image: assetMap?.['poolside-cocktails']?.src || '/assets/optimized/poolside-cocktails.webp',
    isVeg: true,
    accent: 'from-gold/20 to-teal/10'
  },
  {
    id: 'ube-macchiato',
    name: 'Iced Ube Coconut Macchiato',
    category: 'Signature Sips',
    price: 350,
    tag: 'Trending Favorite',
    description: 'Velvety purple ube purée, fresh coastal coconut milk, and bold slow-dripped espresso.',
    image: assetMap?.['iced-americano-terrace']?.src || '/assets/optimized/iced-americano-terrace.webp',
    isVeg: true,
    accent: 'from-purple-500/15 to-gold/10'
  },
  {
    id: 'pina-colada',
    name: 'Piña Colada in Real Pineapple',
    category: 'Signature Sips',
    price: 350,
    tag: 'Showstopper',
    description: 'Slow-blended fresh golden pineapple nectar & rich coconut cream served inside a chilled whole fruit.',
    image: assetMap?.['poolside-daybeds']?.src || '/assets/optimized/poolside-daybeds.webp',
    isVeg: true,
    accent: 'from-yellow-400/20 to-teal/15'
  },
  {
    id: 'ferrero-shake',
    name: 'Ferrero Rocher Decadence Shake',
    category: 'Shakes & Smoothies',
    price: 400,
    tag: 'Pure Indulgence',
    description: 'Whole Ferrero Rocher pralines, roasted Piedmont hazelnuts, chocolate cream, and Italian gelato.',
    image: assetMap?.['glasshouse-coffee']?.src || '/assets/optimized/glasshouse-coffee.webp',
    isVeg: true,
    accent: 'from-stone-600/15 to-gold/10'
  },
  {
    id: 'truffle-pasta',
    name: 'Truffle Tagliolini Pasta',
    category: 'Food & Pasta',
    price: 420,
    tag: 'Culinary Masterpiece',
    description: 'Artisan hand-rolled pasta ribbons tossed in aromatic black truffle oil, parmesan reduction, and wild herbs.',
    image: assetMap?.['truffle-tagliolini']?.src || '/assets/optimized/truffle-tagliolini.webp',
    isVeg: true,
    accent: 'from-olive/20 to-gold/10'
  },
  {
    id: 'masala-chai',
    name: 'Royal Masala Chai & Saffron',
    category: 'Coffee & Tea',
    price: 250,
    tag: 'Heritage Brew',
    description: 'Slow-brewed Assam leaves with hand-crushed green cardamom, cinnamon, fresh ginger, and saffron threads.',
    image: assetMap?.['masala-chai-sunset']?.src || '/assets/optimized/masala-chai-sunset.webp',
    isVeg: true,
    accent: 'from-amber-600/20 to-orange-400/10'
  },
  {
    id: 'squid-ink-pasta',
    name: 'Charcoal Roasted Pepper Pasta',
    category: 'Food & Specials',
    price: 440,
    tag: "Tomorrow's Special",
    description: 'Pure vegetarian activated charcoal fettuccine with roasted bell pepper coulis and creamy burrata curd.',
    image: assetMap?.['squid-ink-pasta']?.src || '/assets/optimized/squid-ink-pasta.webp',
    isVeg: true,
    accent: 'from-charcoal/20 to-gold/10'
  }
];

export default function MustTryCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 lg:py-32 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden border-t border-ink/8">
      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Section Header with Editorial Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            {/* Small uppercase eyebrow in Inter (letter-spacing 0.14em, gold) */}
            <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] block mb-3">
              Gastronomic Signatures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
              The “Must Try” <span className="italic font-normal">Creations.</span>
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink/75 font-sans font-normal mt-3 max-w-xl">
              Handcrafted in our real café bar and kitchen. 100% pure vegetarian, artfully presented, and bursting with fresh citrus and bold aromas.
            </p>
          </div>

          {/* Navigation Controls & Menu Link */}
          <div className="flex items-center gap-4">
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.14em] text-ink hover:text-[#C98B1B] transition-colors"
            >
              <span>View Full Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-[#FFFDF7] text-ink hover:bg-ink hover:text-[#FBF6E9] hover:border-ink shadow-subtle'
                    : 'bg-[#FFFDF7]/40 text-ink/25 cursor-not-allowed border-ink/10'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-[#FFFDF7] text-ink hover:bg-ink hover:text-[#FBF6E9] hover:border-ink shadow-subtle'
                    : 'bg-[#FFFDF7]/40 text-ink/25 cursor-not-allowed border-ink/10'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mustTryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="shrink-0 w-[290px] sm:w-[320px] snap-start rounded-[16px] bg-[#FFFDF7] border border-ink/[0.06] shadow-subtle hover:shadow-collage transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group"
            >
              {/* Image Container with Badges */}
              <div className="relative h-60 overflow-hidden bg-cream-300">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-50" />

                {/* Top Left Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] text-[10.5px] font-sans uppercase tracking-[0.14em] text-ink/80 font-medium shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Pure Veg Dot Indicator */}
                <div className="absolute top-3 right-3 w-6 h-6 rounded-md bg-[#FFFDF7]/95 backdrop-blur-md flex items-center justify-center shadow-sm">
                  <div className="w-3 h-3 rounded-sm border border-emerald-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </div>
                </div>

                {/* Bottom Overlay Price & Category */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#FFFDF7]">
                  <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#FFFDF7]/85 font-medium">
                    {item.category}
                  </span>
                  <span className="font-serif text-xl font-semibold text-[#F8DA77] drop-shadow-sm">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-[18px] font-semibold text-ink group-hover:text-[#C98B1B] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-ink/70 text-xs sm:text-[13px] mt-2 line-clamp-3 leading-relaxed font-sans font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-ink/[0.06] flex items-center justify-between text-xs">
                  <span className="text-ink/50 font-sans text-[11px] uppercase tracking-[0.14em]">
                    Freshly Prepared
                  </span>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-1 font-sans font-medium text-ink hover:text-[#C98B1B] transition-colors"
                  >
                    <span>View In Menu</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

