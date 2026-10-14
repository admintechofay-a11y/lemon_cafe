import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp, Star, Sparkles, ExternalLink } from 'lucide-react';
import LemonLogo from '../common/LemonLogo';
import { businessInfo } from '../../config/business';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FBF6E9] border-t border-ink/8 text-ink pt-20 pb-12 overflow-hidden">
      {/* Subtle organic warmth in background */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-10 left-10 w-80 h-80 rounded-full bg-pistachio/20 blur-[120px]" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Top Headline Banner */}
        <div className="pb-16 border-b border-ink/8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C98B1B]" />
              Gujarat's Largest Lifestyle Café · 30,000 Sq.Ft
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-ink mt-3 tracking-[-0.02em] leading-[1.06] max-w-xl font-normal">
              Where Citrus Meets Calm.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-gold text-xs uppercase tracking-wider py-3 px-7"
            >
              Get Directions
            </a>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-cream transition-all duration-300 shadow-xs"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Editorial Columns */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-ink/75">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col gap-5">
            <LemonLogo light={false} size="lg" />
            <p className="text-ink/70 leading-relaxed font-normal text-sm">
              A sun-drenched rooftop & poolside retreat designed for slow afternoons, artisan specialty coffees, and pure vegetarian global indulgence in Sevasi, Vadodara.
            </p>
            {/* Google Rating Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#FFFDF7] border border-ink/[0.06] shadow-xs w-fit">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-xs font-medium text-ink">
                {businessInfo.rating} · {businessInfo.reviewCount}+ Google Reviews
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium">
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">Home Experience</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-gold transition-colors">Curated Food & Sips</Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-gold transition-colors">Poolside & Architecture</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold transition-colors">Atmospheric Gallery</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">The Lemon Philosophy</Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-gold transition-colors">Hours & Reservations</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timings */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium">
              Hours & Access
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] shadow-xs">
                <span className="text-[11px] text-[#C98B1B] block font-mono uppercase tracking-wider mb-1 font-semibold">
                  Open 24 Hours
                </span>
                <p className="text-ink font-serif text-base">All 7 Days A Week</p>
                <p className="text-xs text-ink/60 mt-1">Poolside lounge, glass dining room & rooftop</p>
              </div>
              <div className="text-xs text-ink/65 space-y-1 pl-1">
                <p>• Morning Brews & Sunrise: 6 AM – 11 AM</p>
                <p>• Golden Hour Sunset: 4 PM – 8 PM</p>
                <p>• Late Night Chill & Dinner: All Night</p>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium">
              Sanctuary
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C98B1B] flex-shrink-0 mt-1" />
                <p className="text-ink/80 text-xs leading-relaxed">
                  {businessInfo.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C98B1B] flex-shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-gold transition-colors text-xs font-mono">
                  {businessInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C98B1B] flex-shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-gold transition-colors text-xs">
                  {businessInfo.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={businessInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#C98B1B] hover:text-gold transition-colors font-medium"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>{businessInfo.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-ink/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/50">
          <p>© {new Date().getFullYear()} Lemon — Café · Restaurant · Pool. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="italic font-serif text-ink/65 text-sm">Everything tastes better with lemon.</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pistachio/40 text-olive text-[11px] font-medium">
              100% Pure Vegetarian
            </span>
            <Link to="/admin" className="text-ink/40 hover:text-gold transition-colors text-[11px] font-mono">
              Staff Portal
            </Link>
          </div>
        </div>

        {/* Powered by Techofay Global Ventures */}
        <div className="mt-8 pt-6 border-t border-ink/8 flex items-center justify-center text-xs text-ink/60">
          <p className="flex items-center gap-1.5 tracking-wide">
            <span>Powered by</span>
            <a
              href={businessInfo.poweredBy?.url || "https://techofay-global-ventures.vercel.app/"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#C98B1B] hover:text-gold transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-[#C98B1B]/40 hover:decoration-gold"
            >
              <span>{businessInfo.poweredBy?.name || "Techofay Global Ventures"}</span>
              <ExternalLink className="w-3 h-3 text-[#C98B1B]" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

