import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users, Maximize2 } from 'lucide-react';
import { businessInfo } from '../../config/business';
import LemonSliceSvg from '../common/LemonSliceSvg';

const stats = [
  {
    value: '30,000',
    unit: 'SQ. FT',
    label: 'Architectural Sanctuary',
    sublabel: 'Rooftop, Pool & Conservatory',
    icon: Maximize2
  },
  {
    value: businessInfo.rating || '4.8',
    unit: '★ GOOGLE',
    label: `${businessInfo.reviewCount || 650}+ Guest Reviews`,
    sublabel: 'Rated #1 Luxury Café in Vadodara',
    icon: Star
  },
  {
    value: '250+',
    unit: 'SEATS',
    label: 'Spacious Seating',
    sublabel: 'Cabanas, Loungers & Private Tables',
    icon: Users
  },
  {
    value: '24 / 7',
    unit: 'HOURS',
    label: 'Always Welcoming You',
    sublabel: 'Open All Day & Midnight',
    icon: Clock
  }
];

export default function NumbersStrip() {
  return (
    <section className="relative py-16 lg:py-20 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden border-y border-ink/8">
      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-ink/8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`flex flex-col items-center text-center px-4 ${
                  idx !== 0 ? 'pt-6 sm:pt-0' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#E8B923]/15 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#C98B1B]" />
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-sans tracking-[0.16em] text-[#C98B1B] font-semibold uppercase">
                    {stat.unit}
                  </span>
                </div>

                <p className="font-serif text-[15px] sm:text-base font-semibold text-ink mt-2">
                  {stat.label}
                </p>
                <p className="text-xs text-ink/65 mt-1 font-sans font-normal">{stat.sublabel}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

