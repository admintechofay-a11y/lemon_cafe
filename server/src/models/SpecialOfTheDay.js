import mongoose from 'mongoose';

const specialItemSubSchema = new mongoose.Schema({
  sectionNumber: { type: String, default: '01' }, // '01', '02', '03'
  sectionName: { type: String, required: true }, // 'Signature Sips', 'Asian Fusion', 'Italian Indulgence', etc.
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 350 },
  image: { type: String },
  badge: { type: String },
});

const specialOfTheDaySchema = new mongoose.Schema(
  {
    title: { type: String, default: "TOMORROW'S SPECIAL MENU" },
    tagline: { type: String, default: 'A LITTLE TWIST. A LOT OF FLAVOUR.' },
    bannerSubtitle: { type: String, default: 'Curated by our Executive Chef exclusively for tomorrow' },
    validDate: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
    items: [specialItemSubSchema],
    footerText: { type: String, default: 'FRESH FLAVOURS. BEAUTIFUL MOMENTS. ONLY AT LEMON.' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SpecialOfTheDay = mongoose.model('SpecialOfTheDay', specialOfTheDaySchema);
export default SpecialOfTheDay;
