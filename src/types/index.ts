export interface User {
  _id: string;
  email: string;
  password?: string;
  role: 'artist' | 'admin' | 'moderator' | 'fan';
  profile: {
    name: string;
    avatar?: string;
    bio?: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      tiktok?: string;
      spotify?: string;
    };
  };
  followers?: string[];
  following?: string[];
  tier?: 'free' | 'premium' | 'vip';
  isVerified: boolean;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaType: 'internal' | 'external' | 'modal';
  isActive: boolean;
  order: number;
  startDate?: Date;
  endDate?: Date;
  analytics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  type: 'tour' | 'release' | 'meetgreet' | 'livestream' | 'virtual' | 'hybrid';
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  timezone: string;
  venue?: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  poster?: string;
  ticketLink?: string;
  streamLink?: string;
  isVisible: boolean;
  capacity?: number;
  attendees?: string[];
  price?: {
    currency: string;
    amount: number;
    vipAmount?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Music {
  _id: string;
  title: string;
  artist: string;
  album?: string;
  genre: string[];
  releaseDate: Date;
  duration: number; // in seconds
  coverArt: string;
  audioFile?: string; // for preview
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
    tidal?: string;
  };
  lyrics?: string;
  credits?: string[];
  isExplicit: boolean;
  isVisible: boolean;
  tier: 'free' | 'premium' | 'vip';
  plays: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  type: 'music_video' | 'behind_scenes' | 'interview' | 'live_performance' | 'other';
  duration: number;
  isVisible: boolean;
  tier: 'free' | 'premium' | 'vip';
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  price: {
    currency: string;
    amount: number;
  };
  variants?: {
    name: string;
    values: string[];
  }[];
  inventory: {
    sku: string;
    quantity: number;
    unlimited: boolean;
  };
  isActive: boolean;
  isFeatured: boolean;
  externalLink?: string; // for linking to existing storefront
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LiveStream {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  scheduledStart: Date;
  actualStart?: Date;
  actualEnd?: Date;
  rtmpKey: string;
  rtmpUrl: string;
  hlsUrl: string;
  recordingUrl?: string;
  viewerCount: number;
  maxViewers: number;
  chatEnabled: boolean;
  isRecorded: boolean;
  tier: 'free' | 'premium' | 'vip';
  analytics: {
    totalViews: number;
    averageWatchTime: number;
    peakViewers: number;
    chatMessages: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  _id: string;
  streamId: string;
  userId: string;
  user: Pick<User, '_id' | 'profile' | 'role' | 'isVerified'>;
  message: string;
  type: 'message' | 'reaction' | 'system';
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  isModerated: boolean;
  timestamp: Date;
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'livestream' | 'event' | 'release' | 'merch' | 'general';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  isSent: boolean;
  scheduledFor?: Date;
  createdAt: Date;
}

export interface Analytics {
  _id: string;
  type: 'slider' | 'event' | 'music' | 'video' | 'product' | 'stream';
  resourceId: string;
  event: 'view' | 'click' | 'play' | 'like' | 'share' | 'purchase' | 'conversion';
  userId?: string;
  metadata?: any;
  timestamp: Date;
}

// Form types
export interface CreateHeroSlideForm {
  title: string;
  subtitle?: string;
  image: File;
  mobileImage?: File;
  ctaText?: string;
  ctaLink?: string;
  ctaType: 'internal' | 'external' | 'modal';
  startDate?: string;
  endDate?: string;
}

export interface CreateEventForm {
  title: string;
  description: string;
  type: Event['type'];
  startDate: string;
  endDate?: string;
  timezone: string;
  venue?: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  poster?: File;
  ticketLink?: string;
  capacity?: number;
  price?: {
    currency: string;
    amount: number;
    vipAmount?: number;
  };
}

export interface CreateMusicForm {
  title: string;
  album?: string;
  genre: string[];
  releaseDate: string;
  coverArt: File;
  audioFile?: File;
  streamingLinks: Music['streamingLinks'];
  lyrics?: string;
  credits?: string[];
  isExplicit: boolean;
  tier: Music['tier'];
}

export interface CreateProductForm {
  name: string;
  description: string;
  images: File[];
  category: string;
  price: {
    currency: string;
    amount: number;
  };
  variants?: Product['variants'];
  inventory: {
    sku: string;
    quantity: number;
    unlimited: boolean;
  };
  externalLink?: string;
  tags: string[];
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Socket.IO event types
export interface SocketEvents {
  // Stream events
  'stream:join': (streamId: string) => void;
  'stream:leave': (streamId: string) => void;
  'stream:started': (stream: LiveStream) => void;
  'stream:ended': (streamId: string) => void;
  'stream:viewer-count': (data: { streamId: string; count: number }) => void;
  
  // Chat events
  'chat:message': (message: ChatMessage) => void;
  'chat:reaction': (data: { messageId: string; emoji: string; userId: string }) => void;
  'chat:typing': (data: { userId: string; username: string }) => void;
  'chat:stop-typing': (data: { userId: string }) => void;
  
  // Content updates
  'content:updated': (data: { type: string; id: string; action: 'create' | 'update' | 'delete' }) => void;
  
  // Notifications
  'notification:new': (notification: Notification) => void;
}
