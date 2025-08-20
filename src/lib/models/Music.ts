import mongoose, { Schema, Document } from 'mongoose';
import { Music } from '@/types';

interface MusicDocument extends Omit<Music, '_id'>, Document {}

const MusicSchema = new Schema<MusicDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    default: 'Summer Walker',
  },
  album: {
    type: String,
    trim: true,
  },
  genre: [{
    type: String,
    trim: true,
  }],
  releaseDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  coverArt: {
    type: String,
    required: true,
  },
  audioFile: String, // For preview clips
  streamingLinks: {
    spotify: String,
    appleMusic: String,
    youtube: String,
    soundcloud: String,
    tidal: String,
  },
  lyrics: String,
  credits: [String],
  isExplicit: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  tier: {
    type: String,
    enum: ['free', 'premium', 'vip'],
    default: 'free',
  },
  plays: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
MusicSchema.index({ isVisible: 1, tier: 1 });
MusicSchema.index({ releaseDate: -1 });
MusicSchema.index({ genre: 1 });
MusicSchema.index({ plays: -1 });
MusicSchema.index({ likes: -1 });
MusicSchema.index({ title: 'text', artist: 'text', album: 'text' });

// Virtual for duration in minutes:seconds format
MusicSchema.virtual('durationFormatted').get(function(this: MusicDocument) {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Method to increment play count
MusicSchema.methods.incrementPlays = function(this: MusicDocument) {
  this.plays += 1;
  return this.save();
};

// Method to toggle like
MusicSchema.methods.toggleLike = function(this: MusicDocument, increment: boolean) {
  this.likes += increment ? 1 : -1;
  this.likes = Math.max(0, this.likes);
  return this.save();
};

// Ensure virtual fields are serialized
MusicSchema.set('toJSON', { virtuals: true });
MusicSchema.set('toObject', { virtuals: true });

export default mongoose.models.Music || mongoose.model<MusicDocument>('Music', MusicSchema);
