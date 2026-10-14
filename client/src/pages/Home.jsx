import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import MarqueeStrip from '../components/home/MarqueeStrip';
import AboutTeaser from '../components/home/AboutTeaser';
import MustTryCarousel from '../components/home/MustTryCarousel';
import TomorrowsSpecialBanner from '../components/home/TomorrowsSpecialBanner';
import ExperienceStorytelling from '../components/home/ExperienceStorytelling';
import NumbersStrip from '../components/home/NumbersStrip';
import ReviewsSlider from '../components/home/ReviewsSlider';
import GalleryPreview from '../components/home/GalleryPreview';
import LocationCard from '../components/home/LocationCard';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-cream">
      {/* 1. Full-screen Video Hero Section */}
      <HeroSection />

      {/* 2. Infinite Marquee Strip */}
      <MarqueeStrip />

      {/* 3. About Teaser with Overlapping Organic Collage (Crème & Cinder Reference) */}
      <AboutTeaser />

      {/* 4. Signature Dishes & Drinks Carousel ('Must Try' Items with Real Prices) */}
      <MustTryCarousel />

      {/* 5. 'Tomorrow's Special' Highlight Banner */}
      <TomorrowsSpecialBanner />

      {/* 6. Rooftop + Pool Experience Storytelling */}
      <ExperienceStorytelling />

      {/* 7. Numbers & Sanctuary Strip */}
      <NumbersStrip />

      {/* 8. Google Review Testimonials Slider */}
      <ReviewsSlider />

      {/* 9. Visual Gallery Preview */}
      <GalleryPreview />

      {/* 10. Venue Location Card with Live Hours & Directions */}
      <LocationCard />
    </div>
  );
}
