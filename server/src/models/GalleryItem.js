import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    caption: { type: String, trim: true },
    category: { type: String, default: 'All' }, // 'Poolside', 'Architecture', 'Beverages', 'Gastronomy', 'Terrace'
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    url: { type: String, required: true },
    posterUrl: { type: String },
    aspectRatio: { type: String, default: 'portrait' }, // 'portrait', 'landscape', 'square'
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
