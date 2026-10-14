// Single Source of Truth for Lemon — Café · Restaurant · Pool
export const businessInfo = {
  name: "Lemon — Café · Restaurant · Pool",
  shortName: "Lemon House",
  tagline: "Where Citrus Meets Calm.",
  subline: "Sun-drenched rooftop, poolside luxury, glass architecture & slow indulgent afternoons in Vadodara.",
  story: "Spanning 30,000 square feet of curated glass architecture, emerald pool waters, and sun-soaked terrace lounges, Lemon is Gujarat's premier lifestyle sanctuary. Designed for leisurely coffees, artisan gastronomy, and unforgettable golden hours.",
  
  // Contact & Social
  address: "Sevasi Canal Road, Beside Shivay Farm, New Alkapuri, Vadodara, Gujarat 390023, India",
  phone: "+91 98795 24000",
  whatsapp: "+91 98795 24000",
  whatsappUrl: "https://wa.me/919879524000?text=Hello%20Lemon%20Caf%C3%A9%2C%20I%20would%20like%20to%20inquire%20about%20visiting%20Lemon.",
  email: "concierge@lemonhousecafe.com",
  instagram: "https://instagram.com/lemonhouse.vadodara",
  instagramHandle: "@lemonhouse.vadodara",
  
  // Operating Details
  hours: "Open 24 Hours (All 7 Days)",
  is24Hours: true,
  hoursDetail: [
    { days: "Monday - Sunday", time: "Open 24 Hours", note: "Poolside lounge, dining pavilion & terrace" }
  ],
  
  // Reputation & Numbers
  rating: 4.8,
  reviewCount: 650,
  features: {
    sqFt: "30,000+",
    seats: "250+",
    zones: "4 Distinct Zones",
    poolsideDaybeds: "18 Luxury Beds",
    cuisine: "100% Pure Vegetarian Gourmet & Global Fusion",
  },
  
  // Location & Map
  googleMapsUrl: "https://maps.app.goo.gl/VHF5pFvY3tFRBJ439?g_st=ic",
  embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.077651036323!2d73.1360143!3d22.3364402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9001f2b0817%3A0xeeabbd1a935a96a3!2sLemon%20House!5e0!3m2!1sen!2sin!4v1700000000000",
  coordinates: {
    lat: 22.33644,
    lng: 73.13601
  },

  // Color Palette Tokens
  palette: {
    cream: "#FBF6E9",
    gold: "#E8B923",
    olive: "#2F3A1F",
    teal: "#1F6F6B",
    charcoal: "#1A1A1A",
    blush: "#F7E1D7",
  },
  poweredBy: {
    name: "Techofay Global Ventures",
    url: "https://techofay-global-ventures.vercel.app/",
  }
};

/**
 * Returns current operational status
 */
export function getLiveStatus() {
  if (businessInfo.is24Hours) {
    return { isOpen: true, text: "Open Now", detail: "24/7 Sanctuary Open", badgeClass: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" };
  }
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= 9 || hour < 2; // e.g., 9 AM to 2 AM
  return {
    isOpen,
    text: isOpen ? "Open Now" : "Closed",
    detail: isOpen ? "Closes at 2:00 AM" : "Opens at 9:00 AM",
    badgeClass: isOpen ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" : "bg-amber-500/15 text-amber-700 border-amber-500/30"
  };
}

export default businessInfo;
