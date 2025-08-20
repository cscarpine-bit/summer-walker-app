import mongoose, { Schema, Document } from 'mongoose';
import { HeroSlide } from '@/types';

interface HeroSlideDocument extends Omit<HeroSlide, '_id'>, Document {}

const HeroSlideSchema = new Schema<HeroSlideDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  mobileImageUrl: String,
  ctaText: {
    type: String,
    trim: true,
  },
  ctaLink: String,
  ctaType: {
    type: String,
    enum: ['internal', 'external', 'modal'],
    default: 'internal',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  startDate: Date,
  endDate: Date,
  analytics: {
    impressions: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    conversions: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

// Indexes
HeroSlideSchema.index({ isActive: 1, order: 1 });
HeroSlideSchema.index({ startDate: 1, endDate: 1 });

// Method to check if slide is currently active
HeroSlideSchema.methods.isCurrentlyActive = function(this: HeroSlideDocument) {
  const now = new Date();
  const startOk = !this.startDate || this.startDate <= now;
  const endOk = !this.endDate || this.endDate >= now;
  return this.isActive && startOk && endOk;
};

export default mongoose.models.HeroSlide || mongoose.model<HeroSlideDocument>('HeroSlide', HeroSlideSchema);
