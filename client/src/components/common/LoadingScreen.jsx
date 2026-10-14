import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already saw loader this session to allow snappy browsing
    const hasSeenLoader = sessionStorage.getItem('lemon_loader_seen');
    if (hasSeenLoader) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('lemon_loader_seen', 'true');
            if (onComplete) onComplete();
          }, 450);
          return 100;
        }
        // Organic pacing curve
        const step = Math.max(1, Math.floor(Math.random() * 8) + 2);
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="lemon-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-cream px-6 py-12 select-none overflow-hidden"
        >
          {/* Subtle warm glow circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/15 blur-3xl pointer-events-none" />

          {/* Top subtle bar */}
          <div className="relative z-10 w-full flex justify-between items-center max-w-5xl text-xs uppercase tracking-[0.25em] text-olive/60 font-medium">
            <span>Vadodara · Gujarat</span>
            <span>30,000 Sq.Ft Sanctuary</span>
          </div>

          {/* Center Brand Bloom */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto">
            {/* Animated Hand-drawn Lemon SVG */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-24 h-24 mb-6"
            >
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="loadGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="60%" stopColor="#E8B923" />
                    <stop offset="100%" stopColor="#C49712" />
                  </linearGradient>
                  <linearGradient id="loadTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2D938E" />
                    <stop offset="100%" stopColor="#1F6F6B" />
                  </linearGradient>
                </defs>

                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="#FFFDF8"
                  stroke="#E8B923"
                  strokeWidth="3.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />

                <motion.path
                  d="M50 16 A34 34 0 0 1 75 27 L53 47 Z"
                  fill="url(#loadGold)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.path
                  d="M78 31 A34 34 0 0 1 84 50 L53 50 Z"
                  fill="url(#loadGold)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
                <motion.path
                  d="M25 27 A34 34 0 0 1 50 16 L47 47 Z"
                  fill="url(#loadGold)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                <motion.path
                  d="M16 50 A34 34 0 0 1 22 31 L47 50 Z"
                  fill="url(#loadGold)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />

                <motion.path
                  d="M16 53 Q33 46 50 53 T84 53 A34 34 0 0 1 50 84 A34 34 0 0 1 16 53 Z"
                  fill="url(#loadTeal)"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />

                <path d="M24 63 Q37 57 50 63 T76 63" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

                <motion.path
                  d="M50 12 C43 3 57 1 59 7 C59 11 52 13 50 12 Z"
                  fill="#2F3A1F"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                />
              </svg>
            </motion.div>

            {/* Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif text-olive-dark tracking-tight"
            >
              Lemon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-2 text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-gold-dark font-medium"
            >
              Café · Restaurant · Pool
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="mt-4 italic font-serif text-charcoal/70 text-sm"
            >
              “Where Citrus Meets Calm”
            </motion.div>
          </div>

          {/* Bottom Counter & Minimal Progress Track */}
          <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-3">
            <div className="w-full flex justify-between items-center text-xs text-olive/80 font-mono">
              <span className="tracking-widest uppercase text-[10px]">Preparing Ambience</span>
              <span className="font-semibold text-sm">{progress}%</span>
            </div>

            {/* Thin Luxury Gold Line */}
            <div className="w-full h-[2px] bg-olive/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
