import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gold/10 blur-3xl pointer-events-none -top-10 -right-10" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-teal/10 blur-3xl pointer-events-none -bottom-10 -left-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-mono font-semibold">
          Error 404
        </span>

        <h1 className="text-6xl md:text-8xl font-serif text-olive-dark tracking-tight my-4">
          Lost in the Lemon Grove
        </h1>

        <p className="text-charcoal/70 text-base leading-relaxed mb-8">
          The table or page you are looking for has drifted away like a quiet afternoon breeze by the pool. Let us guide you back to the terrace.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-pill-primary text-xs uppercase tracking-wider py-3 px-8">
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link to="/menu" className="btn-pill-outline text-xs uppercase tracking-wider py-3 px-8">
            <span>Explore Menu</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
