import mongoose, { Schema, Document } from 'mongoose';
import { User } from '@/types';

interface UserDocument extends Omit<User, '_id'>, Document {}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function(this: UserDocument) {
      return !this.profile?.name; // Password required unless it's a social login
    },
  },
  role: {
    type: String,
    enum: ['artist', 'admin', 'moderator', 'fan'],
    default: 'fan',
  },
  profile: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: String,
    bio: String,
    socialLinks: {
      instagram: String,
      twitter: String,
      tiktok: String,
      spotify: String,
    },
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  tier: {
    type: String,
    enum: ['free', 'premium', 'vip'],
    default: 'free',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ tier: 1 });
UserSchema.index({ lastActive: -1 });

// Virtual for follower count
UserSchema.virtual('followerCount').get(function(this: UserDocument) {
  return this.followers?.length || 0;
});

// Virtual for following count
UserSchema.virtual('followingCount').get(function(this: UserDocument) {
  return this.following?.length || 0;
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
