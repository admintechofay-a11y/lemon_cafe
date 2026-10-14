import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true, trim: true },
    source: { type: String, default: 'Google' },
    date: { type: String, default: 'Recent' },
    avatar: { type: String },
    isVerified: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', reviewSchema);
export default Review;
