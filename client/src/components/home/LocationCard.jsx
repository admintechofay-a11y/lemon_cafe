import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { businessInfo } from '../../config/business';
import LemonSliceSvg from '../common/LemonSliceSvg';

export default function LocationCard() {
  return (
    <section className="relative py-20 lg:py-32 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden">
      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="rounded-[16px] bg-[#FFFDF7] border border-ink/[0.06] shadow-subtle overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Details Column */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div>
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans font-medium mb-5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="uppercase tracking-[0.14em] font-medium">Open Now · 24 Hours Active</span>
              </div>

              {/* Eyebrow & Title */}
              <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] block mb-2">
                Sanctuary Location
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
                Find Your Way to <br />
                <span className="italic font-normal">Lemon.</span>
              </h2>

              <p className="text-ink/75 text-[15.5px] leading-[1.6] font-sans font-normal mt-4">
                Located in the serene green corridor of Sevasi Canal Road in New Alkapuri, Vadodara. Complimentary valet parking for all guests.
              </p>

              {/* Information List */}
              <div className="mt-8 space-y-5 text-xs sm:text-[14px]">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-ink/5 text-ink flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-ink/75" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-ink text-[15px]">Location & Address</p>
                    <p className="text-ink/70 font-sans font-normal leading-relaxed mt-0.5">
                      {businessInfo.address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-ink/5 text-ink flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-ink/75" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-ink text-[15px]">Operating Hours</p>
                    <p className="text-ink/70 font-sans font-normal mt-0.5">
                      {businessInfo.hours} (Always Open)
                    </p>
                  </div>
                </div>

                {/* Phone & Contact */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-ink/5 text-ink flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-ink/75" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-ink text-[15px]">Direct Concierge Phone</p>
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="text-[#C98B1B] font-sans font-semibold hover:underline block mt-0.5"
                    >
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-9 pt-6 border-t border-ink/[0.06] flex flex-wrap items-center gap-3.5">
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-gradient-to-r from-[#E8B923] to-[#C98B1B] shadow-[0_8px_20px_-4px_rgba(232,185,35,0.40)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
              >
                <Navigation className="w-4 h-4 text-ink/80" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href={`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello Lemon! I would like to inquire about visiting your cafe.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-sans font-medium text-[15px] text-ink bg-transparent border border-ink/80 transition-all duration-200 hover:bg-ink hover:text-[#FBF6E9] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Map Column */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-cream-300 border-t lg:border-t-0 lg:border-l border-ink/[0.06]">
            <iframe
              title="Lemon Cafe Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.07765103437!2d73.1257256!3d22.3129188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9f62f33ea01%3A0x6b441a1a2e6e300!2sSevasi%20Canal%20Rd%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[102%] hover:grayscale-0 transition-all duration-500"
            />

            {/* Floating Venue Tag on Map */}
            <div className="absolute top-4 left-4 p-3.5 rounded-[12px] bg-[#FFFDF7]/95 backdrop-blur-md border border-ink/[0.06] shadow-subtle max-w-xs pointer-events-none">
              <div className="flex items-center gap-2.5">
                <LemonSliceSvg className="w-4 h-4 text-[#E8B923] shrink-0" />
                <div>
                  <h4 className="font-serif text-[14px] font-semibold text-ink">
                    Lemon Sanctuary
                  </h4>
                  <p className="text-[11px] text-ink/65 font-sans">Sevasi Canal Road, Vadodara</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

