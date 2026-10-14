import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Calendar, ArrowRight, Utensils } from 'lucide-react';
import LemonSliceSvg from '../common/LemonSliceSvg';
import { assetMap } from '../../config/assets';

export const defaultSpecialMenu = {
  title: "Tomorrow's Chef Special Showcase",
  subtitle: "Handpicked innovative gastronomy prepared exclusively for tomorrow's lunch and evening service.",
  dateText: "Available Tomorrow · From 12:00 PM",
  dishes: [
    {
      name: "Pineapple Biryani",
      tag: "Fragrant Heritage",
      desc: "Slow-dum basmati infused with sweet caramelised pineapple cubes, royal saffron, and roasted cashews."
    },
    {
      name: "Orange Dip Manchurian",
      tag: "Citrus Fusion",
      desc: "Crispy vegetable spheres glazed with fresh Valencia orange reduction and roasted garlic chili."
    },
    {
      name: "Three-Flavour Sushi",
      tag: "Japanese Craft",
      desc: "Avocado, asparagus tempura, and spicy yuzu crunch rolled in nori and toasted sesame seeds."
    },
    {
      name: "Charcoal Fettuccine Pasta",
      tag: "Smoky Truffle",
      desc: "Activated charcoal artisan pasta ribbons in smoky bell pepper emulsion with fresh burrata."
    },
    {
      name: "Tandoori Paneer Pizza",
      tag: "Woodfired Oven",
      desc: "Thin-crust sourdough with charred spiced cottage cheese, san marzano tomato sauce, and basil."
    },
    {
      name: "Zesty Lemon Sorbet & Gelato",
      tag: "Sweet Finish",
      desc: "Palate-cleansing organic lemon sorbet crowned with candied citrus rind and mint oil."
    }
  ]
};

export default function TomorrowsSpecialBanner({ specialData = defaultSpecialMenu }) {
  return (
    <section className="relative py-20 lg:py-28 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden">
      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Editorial Container Card: Cream-white #FFFDF7, 1px border rgba(26,26,26,0.06), radius 16px, soft shadow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[16px] bg-[#FFFDF7] text-ink p-8 sm:p-12 lg:p-14 overflow-hidden border border-ink/[0.06] shadow-subtle"
        >
          {/* Subtle warm glow behind */}
          <div 
            aria-hidden="true" 
            className="absolute -top-12 -right-12 w-80 h-80 bg-[#E8B923]/12 rounded-full blur-[40px] pointer-events-none" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Header Column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Small uppercase eyebrow label in Inter (letter-spacing 0.14em, gold) */}
              <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] mb-3">
                Tomorrow's Specials
              </span>

              {/* Large Serif Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
                Curated for <br />
                <span className="italic font-normal">Tomorrow’s Table.</span>
              </h2>

              <p className="text-ink/80 text-[15.5px] leading-[1.6] font-sans font-normal mt-4">
                {specialData.subtitle}
              </p>

              {/* Timing Pill */}
              <div className="mt-6 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-ink/10 text-xs text-ink/75 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#C98B1B]" />
                <span>{specialData.dateText}</span>
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-gradient-to-r from-[#E8B923] to-[#C98B1B] shadow-[0_8px_20px_-4px_rgba(232,185,35,0.40)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
                >
                  <span>Explore Specials</span>
                  <ArrowRight className="w-4 h-4 text-ink/80" />
                </Link>
              </div>
            </div>

            {/* Right Dishes Grid Column */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {specialData.dishes.map((dish) => (
                  <div
                    key={dish.name}
                    className="p-4 rounded-[12px] bg-[#FBF6E9] border border-ink/[0.05] hover:border-ink/20 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase tracking-[0.14em] font-sans text-[#C98B1B] font-semibold">
                        {dish.tag}
                      </span>
                      {/* Pure Veg Indicator */}
                      <div className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </div>
                    </div>

                    <h3 className="font-serif text-[16.5px] font-semibold text-ink group-hover:text-[#C98B1B] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-ink/70 mt-1 line-clamp-2 font-sans font-normal leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

