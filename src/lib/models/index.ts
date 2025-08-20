// Import all models to ensure they're registered with Mongoose
import User from './User';
import HeroSlide from './HeroSlide';
import Event from './Event';
import Music from './Music';
import Product from './Product';
import LiveStream from './LiveStream';

// Export all models
export {
  User,
  HeroSlide,
  Event,
  Music,
  Product,
  LiveStream,
};

// Export model names for type safety
export const ModelNames = {
  User: 'User',
  HeroSlide: 'HeroSlide',
  Event: 'Event',
  Music: 'Music',
  Product: 'Product',
  LiveStream: 'LiveStream',
} as const;
