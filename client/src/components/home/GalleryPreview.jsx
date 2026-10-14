import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';
import LemonSliceSvg from '../common/LemonSliceSvg';
import { assetMap } from '../../config/assets';

const previewTiles = [
  {
    title: 'Poolside Signature Elixirs',
    category: 'Beverages',
    span: 'col-span-1 md:col-span-2 row-span-2',
    height: 'h-80 sm:h-[460px]',
    image: assetMap?.['poolside-cocktails']?.src || '/assets/optimized/poolside-cocktails.webp'
  },
  {
    title: 'Curved Glass Conservatory',
    category: 'Architecture',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[220px]',
    image: assetMap?.['glasshouse-coffee']?.src || '/assets/optimized/glasshouse-coffee.webp'
  },
  {
    title: 'Handmade Truffle Tagliolini',
    category: 'Gastronomy',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[220px]',
    image: assetMap?.['truffle-tagliolini']?.src || '/assets/optimized/truffle-tagliolini.webp'
  },
  {
    title: 'Emerald Pool & Daybeds',
    category: 'Poolside',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[220px]',
    image: assetMap?.['pool-yellow-loungers']?.src || '/assets/optimized/pool-yellow-loungers.webp'
  },
  {
    title: 'Breezy Rooftop Deck',
    category: 'Terrace',
    span: 'col-span-1 md:col-span-1 row-span-1',
    height: 'h-64 sm:h-[220px]',
    image: assetMap?.['terrace-seating-panorama']?.src || '/assets/optimized/terrace-seating-panorama.webp'
  }
];

export default function GalleryPreview() {
  return (
    <section className="relative py-20 lg:py-32 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden border-t border-ink/8">
      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            {/* Small uppercase eyebrow in Inter (letter-spacing 0.14em, gold) */}
            <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] block mb-3">
              Visual Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
              Sunlight, Geometry & <br />
              <span className="italic font-normal">Indulgence.</span>
            </h2>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-gradient-to-r from-[#E8B923] to-[#C98B1B] shadow-[0_8px_20px_-4px_rgba(232,185,35,0.40)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 self-start md:self-auto"
          >
            <span>Explore Full Gallery</span>
            <ArrowUpRight className="w-4 h-4 text-ink/80" />
          </Link>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {previewTiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-[6px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(26,26,26,0.14)] hover:shadow-[0_20px_42px_-10px_rgba(26,26,26,0.18)] transition-all duration-300 group bg-cream-300 ${tile.span} ${tile.height}`}
            >
              <img
                src={tile.image}
                alt={tile.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

              {/* Category Pill Tag */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-[#FFFDF7]/95 backdrop-blur-md text-ink text-[10.5px] font-sans uppercase tracking-[0.14em] font-medium shadow-sm">
                  {tile.category}
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3.5 left-4 right-4 text-[#FFFDF7]">
                <h3 className="font-serif text-[17px] sm:text-[19px] font-medium leading-snug drop-shadow-sm">
                  {tile.title}
                </h3>
                <p className="text-[11px] text-[#FFFDF7]/75 font-sans tracking-[0.14em] uppercase mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>View High-Res Photo</span>
                  <ArrowUpRight className="w-3 h-3 text-[#F8DA77]" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

