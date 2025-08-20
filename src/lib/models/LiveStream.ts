import mongoose, { Schema, Document } from 'mongoose';
import { LiveStream } from '@/types';

interface LiveStreamDocument extends Omit<LiveStream, '_id'>, Document {}

const LiveStreamSchema = new Schema<LiveStreamDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: String,
  status: {
    type: String,
    enum: ['scheduled', 'live', 'ended', 'cancelled'],
    default: 'scheduled',
  },
  scheduledStart: {
    type: Date,
    required: true,
  },
  actualStart: Date,
  actualEnd: Date,
  rtmpKey: {
    type: String,
    required: true,
    unique: true,
  },
  rtmpUrl: {
    type: String,
    required: true,
  },
  hlsUrl: {
    type: String,
    required: true,
  },
  recordingUrl: String,
  viewerCount: {
    type: Number,
    default: 0,
  },
  maxViewers: {
    type: Number,
    default: 0,
  },
  chatEnabled: {
    type: Boolean,
    default: true,
  },
  isRecorded: {
    type: Boolean,
    default: true,
  },
  tier: {
    type: String,
    enum: ['free', 'premium', 'vip'],
    default: 'free',
  },
  analytics: {
    totalViews: {
      type: Number,
      default: 0,
    },
    averageWatchTime: {
      type: Number,
      default: 0,
    },
    peakViewers: {
      type: Number,
      default: 0,
    },
    chatMessages: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

// Indexes
LiveStreamSchema.index({ status: 1 });
LiveStreamSchema.index({ scheduledStart: 1 });
LiveStreamSchema.index({ tier: 1 });
LiveStreamSchema.index({ rtmpKey: 1 });

// Virtual for duration
LiveStreamSchema.virtual('duration').get(function(this: LiveStreamDocument) {
  if (this.actualStart && this.actualEnd) {
    return this.actualEnd.getTime() - this.actualStart.getTime();
  }
  return 0;
});

// Method to start stream
LiveStreamSchema.methods.startStream = function(this: LiveStreamDocument) {
  this.status = 'live';
  this.actualStart = new Date();
  return this.save();
};

// Method to end stream
LiveStreamSchema.methods.endStream = function(this: LiveStreamDocument) {
  this.status = 'ended';
  this.actualEnd = new Date();
  return this.save();
};

// Method to update viewer count
LiveStreamSchema.methods.updateViewerCount = function(this: LiveStreamDocument, count: number) {
  this.viewerCount = count;
  this.maxViewers = Math.max(this.maxViewers, count);
  this.analytics.peakViewers = Math.max(this.analytics.peakViewers, count);
  return this.save();
};

// Ensure virtual fields are serialized
LiveStreamSchema.set('toJSON', { virtuals: true });
LiveStreamSchema.set('toObject', { virtuals: true });

export default mongoose.models.LiveStream || mongoose.model<LiveStreamDocument>('LiveStream', LiveStreamSchema);
