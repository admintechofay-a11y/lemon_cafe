import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { businessInfo } from '../../config/business';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const [showFloatingConcierge, setShowFloatingConcierge] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingConcierge(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenisTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenisTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenisTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8F1E6] text-ink selection:bg-[#D29A5C]/30 selection:text-ink">
      {/* Light-leak / prism glare overlay (blurred diagonal light streaks at 5-7% opacity) */}
      <div className="prism-glare-overlay" aria-hidden="true" />

      {/* Faint paper grain overlay at 2.5% opacity */}
      <div className="paper-grain-overlay" aria-hidden="true" />

      {/* Global Clean Editorial Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${location.pathname === '/' ? 'pt-0' : 'pt-24 md:pt-28'}`}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Concierge WhatsApp Button (Visible when scrolled past hero) */}
      {showFloatingConcierge && (
        <aside aria-label="Concierge Contact" className="fixed bottom-6 right-6 z-40 transition-all duration-300">
          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-ink text-[#FFFBF4] shadow-[0_8px_24px_-4px_rgba(28,23,19,0.22)] hover:bg-ink/90 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Direct WhatsApp Concierge"
          >
            <div className="w-7 h-7 rounded-full bg-[#C8AE5B] text-ink flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5 fill-ink" />
            </div>
            <span className="text-xs font-sans font-medium tracking-wide pr-1 hidden sm:inline-block">
              Concierge
            </span>
          </a>
        </aside>
      )}
    </div>
  );
}

