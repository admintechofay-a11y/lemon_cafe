import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import LemonSliceSvg from '../common/LemonSliceSvg';
import { businessInfo } from '../../config/business';

export const reviews = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Vadodara',
    avatar: 'AS',
    rating: 5,
    date: '2 weeks ago',
    title: 'Vadodara’s Most Luxurious Café by a Mile',
    comment:
      'The 30,000 sq.ft space is breathtaking. We sat by the poolside daybeds as the sunset reflected off the water. The Dubai 24K Gold Cappuccino felt truly royal, and knowing everything is 100% pure vegetarian was a huge plus for our family.',
    dish: '24K Gold Cappuccino & Truffle Tagliolini'
  },
  {
    id: 2,
    name: 'Rohan Patel',
    city: 'Ahmedabad',
    avatar: 'RP',
    rating: 5,
    date: '1 month ago',
    title: 'The Glasshouse and Pool Vibe are Unmatched',
    comment:
      'Drove down from Ahmedabad specifically to see Lemon House. It exceeded every expectation! The curved glass conservatory looks like an international botanical resort. The Japanese Yuzu Espresso Tonic and Piña Colada in a fresh pineapple were sublime.',
    dish: 'Yuzu Espresso Tonic & Piña Colada'
  },
  {
    id: 3,
    name: 'Pooja Mehta',
    city: 'Vadodara',
    avatar: 'PM',
    rating: 5,
    date: '3 weeks ago',
    title: 'Open 24/7 — Our Favorite Midnight Sanctuary',
    comment:
      'Finding a café in Vadodara that is open 24/7 with this tier of luxury architecture and calm atmosphere is a dream. We came at 1:30 AM for midnight coffee and dessert. Soft acoustic ambient music, warm lighting, and impeccable hospitality.',
    dish: 'Ferrero Rocher Shake & Saffron Chai'
  },
  {
    id: 4,
    name: 'Dr. Siddharth Desai',
    city: 'Vadodara',
    avatar: 'SD',
    rating: 5,
    date: '2 months ago',
    title: 'Exceptional Pure Vegetarian Fine Dining',
    comment:
      'Lemon has set a whole new benchmark. The staff is discreet and attentive, the seating is generously spaced with no rushed feeling, and the food presentation is Michelin-calibre artistic. Highly recommend for quiet celebrations.',
    dish: 'Three-Flavour Sushi & Charcoal Pasta'
  }
];

export default function ReviewsSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => setCurrentIdx((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setCurrentIdx((i) => (i === reviews.length - 1 ? 0 : i + 1));

  const review = reviews[currentIdx];

  return (
    <section className="relative py-20 lg:py-32 px-6 lg:px-8 bg-[#FBF6E9] overflow-hidden">
      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          {/* Small uppercase eyebrow in Inter (letter-spacing 0.14em, gold) */}
          <span className="text-[11.5px] uppercase tracking-[0.14em] font-sans font-semibold text-[#C98B1B] block mb-3">
            Google Reviews & Voices
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-ink leading-[1.08] tracking-[-0.02em]">
            Loved by Vadodara’s <br />
            <span className="italic font-normal">Discerning Guests.</span>
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2.5">
            <div className="flex text-[#E8B923]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E8B923] text-[#E8B923]" />
              ))}
            </div>
            <span className="font-sans font-semibold text-ink text-sm">
              {businessInfo.rating} Stars
            </span>
            <span className="text-ink/50 text-xs font-sans">
              (Over {businessInfo.reviewCount}+ Google Reviews)
            </span>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-[16px] bg-[#FFFDF7] border border-ink/[0.06] p-8 sm:p-12 shadow-subtle"
            >
              <Quote className="absolute top-8 right-8 sm:top-10 sm:right-10 w-12 h-12 text-ink/[0.05] -z-0" />

              <div className="relative z-10">
                {/* Review Stars & Verified Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-1 text-[#E8B923]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E8B923] text-[#E8B923]" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-sans text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Google Review</span>
                  </div>
                </div>

                {/* Review Title */}
                <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold mb-3 leading-snug">
                  “{review.title}”
                </h3>

                {/* Review Comment */}
                <p className="text-[16px] leading-[1.6] text-ink/80 font-sans font-normal italic">
                  {review.comment}
                </p>

                {/* Reviewer Details Footer */}
                <div className="mt-8 pt-6 border-t border-ink/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ink text-[#FBF6E9] font-serif font-semibold text-sm flex items-center justify-center">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-ink text-[15px]">
                        {review.name}
                      </p>
                      <p className="text-xs text-ink/50 font-sans">{review.city} · {review.date}</p>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-[#FBF6E9] border border-ink/[0.06] text-xs text-ink/80 font-sans">
                    <span className="text-[#C98B1B] font-semibold">Tasted: </span>
                    <span>{review.dish}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-ink/20 bg-[#FFFDF7] text-ink flex items-center justify-center hover:bg-ink hover:text-[#FBF6E9] hover:border-ink transition-all shadow-subtle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIdx === i ? 'w-6 bg-[#C98B1B]' : 'w-2 bg-ink/15'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-ink/20 bg-[#FFFDF7] text-ink flex items-center justify-center hover:bg-ink hover:text-[#FBF6E9] hover:border-ink transition-all shadow-subtle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

