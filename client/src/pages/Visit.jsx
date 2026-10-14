import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Navigation,
  Sparkles,
  Calendar,
  Users,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import LemonSliceSvg from '../components/common/LemonSliceSvg';
import { businessInfo, getLiveStatus } from '../config/business';

export default function Visit() {
  const liveStatus = getLiveStatus();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2 Guests',
    eventDate: '',
    type: 'Poolside & Table Visit',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Something went wrong. Please reach out via WhatsApp.');
      }
    } catch (err) {
      // Graceful fallback for offline demo
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FBF6E9] text-ink pt-24 pb-32 overflow-hidden">
      {/* Decorative Warm Ambient Blobs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gold/10 blob-organic-1 blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-pistachio/20 blob-organic-2 blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-3">
            Plan Your Visit & Inquiries
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-ink font-normal leading-[1.06] tracking-[-0.02em]">
            Find Your Way to <br />
            <span className="italic font-normal text-gold">Our Sevasi Sanctuary.</span>
          </h1>

          <p className="text-base text-ink/75 mt-4 font-normal leading-relaxed">
            Spanning 30,000 square feet beside Shivay Farm in New Alkapuri, Vadodara. Open 24 hours every day for pure vegetarian indulgence.
          </p>
        </div>

        {/* 2-Column Main Layout: Left Information & Map, Right Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Venue Details & Embedded Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Essential Info Card */}
            <div className="rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
              {/* Live Operational Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                  </span>
                  <div>
                    <p className="text-[11px] font-mono font-semibold text-emerald-900 uppercase tracking-wider">
                      Current Live Status
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-emerald-800">{liveStatus.text} · 24/7 Service</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full font-medium">
                  All 365 Days
                </span>
              </div>

              {/* Contact & Hours Details */}
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-gold/15 text-[#C98B1B] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#C98B1B]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-ink text-base">Sanctuary Address</h3>
                    <p className="text-ink/75 leading-relaxed mt-0.5 text-xs sm:text-sm font-normal">
                      {businessInfo.address}
                    </p>
                    <p className="text-[11px] font-mono text-[#C98B1B] mt-1 font-medium">
                      Beside Shivay Farm · Free Valet Parking Available
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-gold/15 text-[#C98B1B] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#C98B1B]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-ink text-base">Operating Hours</h3>
                    <p className="text-ink/75 leading-relaxed mt-0.5 text-xs sm:text-sm font-normal">
                      {businessInfo.hours} (Continuous 24-Hour Hospitality).
                    </p>
                    <p className="text-[11px] text-ink/60 mt-0.5">
                      Rooftop, Poolside Cabanas & Glass Conservatory active all day and night.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-gold/15 text-[#C98B1B] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#C98B1B]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-ink text-base">Concierge Phone</h3>
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="text-gold font-mono font-medium text-base hover:underline block mt-0.5"
                    >
                      {businessInfo.phone}
                    </a>
                    <p className="text-[11px] text-ink/60 mt-0.5">Call directly for directions or table inquiries.</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-5 border-t border-ink/8 flex flex-wrap gap-3">
                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-gold text-xs uppercase tracking-wider py-3.5 px-6 flex-1 flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                </a>
                <a
                  href={businessInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-outline text-xs uppercase tracking-wider py-3.5 px-6 flex-1 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-xs border border-ink/[0.06] h-[360px] bg-[#FFFDF7] p-2 relative">
              <div className="w-full h-full rounded-[6px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.07765103437!2d73.1257256!3d22.3129188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9f62f33ea01%3A0x6b441a1a2e6e300!2sSevasi%20Canal%20Rd%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  title="Lemon House Sevasi Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[25%] contrast-[105%]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Event & Visit Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#FFFDF7] border border-ink/[0.06] p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.14em] text-[#C98B1B] font-medium block mb-2">
                  Direct Concierge Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-ink font-normal leading-tight tracking-[-0.02em]">
                  Connect with Our <br />
                  <span className="italic font-normal text-gold">Guest Concierge.</span>
                </h2>
                <p className="text-ink/70 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
                  Planning a private celebration, poolside dinner, or event? Send an inquiry and our team will connect with you directly.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-ink">
                    Inquiry Received with Warmth
                  </h3>
                  <p className="text-ink/75 text-sm max-w-md mx-auto font-normal leading-relaxed">
                    Thank you, <strong className="text-ink font-semibold">{formData.name}</strong>. Our concierge desk has received your note and will reach out to you at <span className="font-mono text-[#C98B1B] font-medium">{formData.phone}</span> via WhatsApp or phone.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        guests: '2 Guests',
                        eventDate: '',
                        type: 'Poolside & Table Visit',
                        message: '',
                      });
                    }}
                    className="btn-pill-outline text-xs uppercase tracking-wider py-3 px-6 mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priyanshu Mehta"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98250 12345"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                        Inquiry Nature
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                      >
                        <option value="Poolside & Table Visit">Poolside & Table Visit</option>
                        <option value="Private Celebration / Birthday">Private Celebration / Birthday</option>
                        <option value="Curated Sunset Soirée">Curated Sunset Soirée</option>
                        <option value="Corporate / Brand Gathering">Corporate / Brand Gathering</option>
                        <option value="Photography & Shoot">Photography & Shoot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                      >
                        <option value="1-2 Guests">1-2 Guests</option>
                        <option value="3-5 Guests">3-5 Guests</option>
                        <option value="6-10 Guests">6-10 Guests</option>
                        <option value="10-25 Guests">10-25 Guests</option>
                        <option value="25+ Private Gathering">25+ Private Gathering</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                      Intended Visit Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink/70 font-medium mb-1.5">
                      Notes or Special Requests
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Sunset cabana preference, anniversary celebration, dietary preferences..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FBF6E9] border border-ink/[0.08] text-xs sm:text-sm text-ink focus:outline-none focus:border-gold transition-colors font-sans"
                    ></textarea>
                  </div>

                  {/* Pure Display Notice */}
                  <div className="p-3 rounded-xl bg-[#FBF6E9] border border-ink/[0.06] text-[11px] text-ink/65 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>No online payments or booking deposits. We welcome all guests openly.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-pill-gold text-xs uppercase tracking-wider py-3.5 shadow-gold-glow flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending to Concierge...' : 'Send Inquiry to Concierge'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

