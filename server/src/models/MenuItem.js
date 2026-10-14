import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true }, // 'Coffee & Tea', 'Signature Sips', 'Shakes & Smoothies', 'Food', 'Desserts', 'Specials'
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    currency: { type: String, default: '₹' },
    isVeg: { type: Boolean, default: true },
    isChefsPick: { type: Boolean, default: false },
    isMustTry: { type: Boolean, default: false },
    image: { type: String }, // URL or local asset path
    tags: [{ type: String }],
    order: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
