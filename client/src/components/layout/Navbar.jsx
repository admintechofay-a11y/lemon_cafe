import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import LemonLogo from '../common/LemonLogo';

const navItems = [
  { name: 'Menu', path: '/menu' },
  { name: 'Experience', path: '/experience' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F1E6]/92 backdrop-blur-md py-4 border-b border-line shadow-[0_2px_15px_-4px_rgba(28,23,19,0.04)]'
            : 'bg-transparent pt-8 pb-4 lg:pt-9 lg:pb-4'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Top-Left: Two Stacked Serif Lines + Tiny Lemon Slice Icon */}
          <div className="flex items-center">
            <LemonLogo />
          </div>

          {/* Nav Links + Pill Outline CTA Button Aligned Far Right (Matching Reference) */}
          <div className="hidden md:flex items-center gap-9 lg:gap-11">
            <nav className="flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-[15px] font-sans font-normal tracking-[-0.01em] transition-colors duration-200 ${
                      isActive
                        ? 'text-ink font-medium'
                        : 'text-ink/80 hover:text-ink'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Far Right: Outlined Pill Button "Visit Us" (Matching Reference "Reserve") */}
            <Link
              to="/visit"
              className="inline-flex items-center justify-center h-[42px] px-7 rounded-full border border-ink text-ink text-[14.5px] font-sans font-medium tracking-normal transition-all duration-200 hover:bg-ink hover:text-[#FFFBF4] active:scale-[0.98]"
            >
              Visit Us
            </Link>
          </div>

          {/* Clean Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-ink hover:opacity-75 transition-opacity focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.75]" /> : <MenuIcon className="w-6 h-6 stroke-[1.75]" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Cream Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 md:hidden bg-[#F8F1E6] flex flex-col justify-between pt-28 pb-10 px-8"
          >
            {/* Top Brand Context */}
            <div className="flex flex-col gap-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-ink/50">
                Navigation
              </span>
              <nav className="flex flex-col gap-5">
                {[...navItems, { name: 'Gallery', path: '/gallery' }, { name: 'Visit Us', path: '/visit' }].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-3xl font-serif font-semibold tracking-tight transition-colors ${
                        isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Contact Pill */}
            <div className="pt-6 border-t border-line flex flex-col gap-3">
              <p className="text-sm font-sans text-ink/70">
                Sevasi Canal Road, Vadodara · Open Daily 11 AM - 11 PM
              </p>
              <Link
                to="/visit"
                className="w-full btn-copper-pill text-center justify-center"
              >
                Plan Your Visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
