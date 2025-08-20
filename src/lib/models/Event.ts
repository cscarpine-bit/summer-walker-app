import mongoose, { Schema, Document } from 'mongoose';
import { Event } from '@/types';

interface EventDocument extends Omit<Event, '_id'>, Document {}

const EventSchema = new Schema<EventDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['tour', 'release', 'meetgreet', 'livestream', 'virtual', 'hybrid'],
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  timezone: {
    type: String,
    required: true,
    default: 'UTC',
  },
  venue: {
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  poster: String,
  ticketLink: String,
  streamLink: String,
  isVisible: {
    type: Boolean,
    default: true,
  },
  capacity: Number,
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  price: {
    currency: {
      type: String,
      default: 'USD',
    },
    amount: Number,
    vipAmount: Number,
  },
}, {
  timestamps: true,
});

// Indexes
EventSchema.index({ startDate: 1 });
EventSchema.index({ status: 1, isVisible: 1 });
EventSchema.index({ type: 1 });
EventSchema.index({ 'venue.city': 1, 'venue.state': 1 });

// Virtual for attendee count
EventSchema.virtual('attendeeCount').get(function(this: EventDocument) {
  return this.attendees?.length || 0;
});

// Method to check if event is happening now
EventSchema.methods.isHappeningNow = function(this: EventDocument) {
  const now = new Date();
  const started = this.startDate <= now;
  const notEnded = !this.endDate || this.endDate >= now;
  return started && notEnded && this.status === 'live';
};

// Ensure virtual fields are serialized
EventSchema.set('toJSON', { virtuals: true });
EventSchema.set('toObject', { virtuals: true });

export default mongoose.models.Event || mongoose.model<EventDocument>('Event', EventSchema);
