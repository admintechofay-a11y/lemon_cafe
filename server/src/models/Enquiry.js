import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    enquiryType: { type: String, enum: ['visit', 'private-event', 'poolside-lounge', 'photography', 'general'], default: 'visit' },
    guestCount: { type: Number, default: 2 },
    preferredDate: { type: Date },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
