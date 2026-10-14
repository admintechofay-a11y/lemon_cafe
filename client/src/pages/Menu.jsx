import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Download, Check, Star, Filter, Coffee, Utensils, Award } from 'lucide-react';
import LemonSliceSvg from '../components/common/LemonSliceSvg';
import { categoriesData, fallbackMenuItems } from '../config/menuData';
import { API_BASE_URL } from '../config/api';

export default function Menu() {
  const [categories, setCategories] = useState(categoriesData);
  const [menuItems, setMenuItems] = useState(fallbackMenuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyChefsPick, setOnlyChefsPick] = useState(false);
  const [onlyMustTry, setOnlyMustTry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch from backend API with fallback
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${API_BASE_URL}/menu`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setMenuItems(json.data);
          }
        }
      } catch (e) {
        // Fallback already pre-loaded
      }
    }
    fetchMenu();
  }, []);

  // Filter items based on Category, Search, Chef's Pick, and Must Try
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTags) return false;
      }
      // Chef's Pick filter
      if (onlyChefsPick && !item.isChefsPick) return false;
      // Must Try filter
      if (onlyMustTry && !item.isMustTry) return false;

      return true;
    });
  }, [menuItems, activeCategory, searchQuery, onlyChefsPick, onlyMustTry]);

  // Handle PDF Download / Print
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FBF6E9] text-ink pt-24 pb-32">
      {/* Printable Brand Header (visible only on @media print) */}
      <div className="hidden print:block text-center pb-8 border-b border-ink/10 mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink">LEMON — CAFÉ · RESTAURANT · POOL</h1>
        <p className="text-xs uppercase tracking-widest mt-1 text-ink/70">Sevasi Canal Road, Vadodara · 100% Pure Vegetarian</p>
        <p className="text-xs mt-1 text-ink/60 font-serif italic">Gastronomic Display Menu</p>
      </div>

      {/* Decorative Organic Blobs */}
      <div className="absolute top-24 right-10 w-[500px] h-[500px] bg-gold/10 blob-organic-1 blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-[480px] left-8 w-[450px] h-[450px] bg-pistachio/20 blob-organic-2 blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial Eyebrow & Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-3">
            Pure Vegetarian · Display Menu
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-ink font-normal leading-[1.06] tracking-[-0.02em]">
            Curated Gastronomy <br />
            <span className="italic font-normal text-gold">& Artisan Sips.</span>
          </h1>

          <p className="text-base text-ink/75 mt-4 font-normal leading-relaxed">
            Every creation is handcrafted in our Vadodara sanctuary. From single-origin Dubai 24K Gold Cappuccinos to cold-brew citrus tonics and handmade truffle tagliolini.
          </p>

          {/* Download Menu PDF Action */}
          <div className="mt-8 flex items-center justify-center gap-4 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 inline-flex items-center gap-2.5 shadow-gold-glow"
            >
              <Download className="w-4 h-4" />
              <span>Download Menu (PDF)</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs print:hidden">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Live Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-ink/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, sips, pastas, biryani..."
                className="w-full pl-11 pr-10 py-2.5 rounded-full bg-[#FBF6E9] border border-ink/[0.08] text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-gold transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Badges Filter */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={() => setOnlyChefsPick(!onlyChefsPick)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider border transition-all flex items-center gap-2 ${
                  onlyChefsPick
                    ? 'bg-gradient-to-r from-gold to-[#C98B1B] text-ink border-transparent shadow-xs font-semibold'
                    : 'bg-[#FFFDF7] text-ink/75 border-ink/[0.08] hover:border-gold'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Chef's Pick</span>
              </button>

              <button
                onClick={() => setOnlyMustTry(!onlyMustTry)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider border transition-all flex items-center gap-2 ${
                  onlyMustTry
                    ? 'bg-ink text-cream border-ink shadow-xs font-semibold'
                    : 'bg-[#FFFDF7] text-ink/75 border-ink/[0.08] hover:border-gold'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Must Try</span>
              </button>

              <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FBF6E9] border border-ink/[0.06] text-xs font-mono text-ink/55">
                <span>{filteredItems.length} items listed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Category Tabs Bar */}
        <div className="sticky top-20 z-30 py-3 -mx-6 px-6 md:-mx-10 md:px-10 bg-[#FBF6E9]/95 backdrop-blur-md border-y border-ink/8 mb-12 print:hidden">
          <div className="max-w-[1240px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`relative shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                    isActive ? 'text-cream shadow-xs' : 'text-ink/70 hover:text-ink bg-[#FFFDF7] border border-ink/[0.06]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-ink -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-gold text-ink font-bold' : 'bg-ink/[0.06] text-ink/70'
                    }`}
                  >
                    {cat.name === 'All'
                      ? menuItems.length
                      : menuItems.filter((i) => i.category === cat.name).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] max-w-xl mx-auto p-8 shadow-xs">
            <LemonSliceSvg className="w-10 h-10 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-ink font-normal">No dishes match your selection</h3>
            <p className="text-ink/65 text-sm mt-2">
              Try adjusting your search terms or reset the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setOnlyChefsPick(false);
                setOnlyMustTry(false);
              }}
              className="btn-pill-gold text-xs uppercase tracking-wider py-3 px-6 mt-6 shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id || item.slug || item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group justify-between p-4"
                >
                  {/* Top Image Container with 6px rounded photo corners */}
                  <div className="relative h-56 rounded-[6px] overflow-hidden bg-[#FBF6E9]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for photo contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {item.isChefsPick && (
                        <span className="px-2.5 py-1 rounded-full bg-gold text-ink text-[10px] font-mono uppercase tracking-wider font-semibold shadow-xs flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>Chef's Pick</span>
                        </span>
                      )}
                      {item.isMustTry && !item.isChefsPick && (
                        <span className="px-2.5 py-1 rounded-full bg-cream/90 backdrop-blur-md text-ink text-[10px] font-mono uppercase tracking-wider font-medium shadow-xs">
                          Must Try
                        </span>
                      )}
                    </div>

                    {/* Pure Veg Dot Indicator */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-md bg-[#FFFDF7]/95 backdrop-blur-md flex items-center justify-center shadow-xs">
                      <div className="w-3 h-3 rounded-sm border-[1.5px] border-emerald-600 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-emerald-600" />
                      </div>
                    </div>

                    {/* Price and Category on Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-cream">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-cream/90">
                        {item.category}
                      </span>
                      <span className="font-serif text-2xl font-normal text-cream drop-shadow">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="pt-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-ink group-hover:text-gold transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-ink/70 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
                        {item.description}
                      </p>

                      {/* Item Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-[#FBF6E9] border border-ink/[0.06] text-[10px] font-mono text-ink/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="mt-5 pt-3.5 border-t border-ink/8 flex items-center justify-between text-[11px] font-mono text-ink/55">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Fresh In-House Preparation</span>
                      </span>
                      <span className="uppercase tracking-wider text-ink/70 font-medium">
                        Tableside Dining
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom Editorial Callout (Converted from Dark Section to Clean Editorial Card) */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 print:hidden">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-2">
              Sanctuary Experience
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink leading-tight">
              Want to experience these creations tableside?
            </h3>
            <p className="text-ink/70 text-sm mt-2 font-normal leading-relaxed">
              We do not operate online ordering or food delivery. Every plate and brew is prepared fresh for physical visitors at our 30,000 sq.ft Sevasi estate in Vadodara.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="https://maps.app.goo.gl/VHF5pFvY3tFRBJ439?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-8 shadow-gold-glow"
            >
              <span>Get Directions to Lemon</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

