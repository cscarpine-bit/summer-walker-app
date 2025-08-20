import { create } from 'zustand';
import { HeroSlide, Event, Music, Product, LiveStream } from '@/types';

interface AppState {
  // Hero Slides
  heroSlides: HeroSlide[];
  setHeroSlides: (slides: HeroSlide[]) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;

  // Events
  events: Event[];
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  // Music
  music: Music[];
  setMusic: (music: Music[]) => void;
  addMusic: (track: Music) => void;
  updateMusic: (id: string, track: Partial<Music>) => void;
  deleteMusic: (id: string) => void;

  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Live Streams
  liveStreams: LiveStream[];
  currentStream: LiveStream | null;
  setLiveStreams: (streams: LiveStream[]) => void;
  setCurrentStream: (stream: LiveStream | null) => void;
  addLiveStream: (stream: LiveStream) => void;
  updateLiveStream: (id: string, stream: Partial<LiveStream>) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Socket connection
  isSocketConnected: boolean;
  setSocketConnected: (connected: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Hero Slides
  heroSlides: [],
  setHeroSlides: (slides) => set({ heroSlides: slides }),
  addHeroSlide: (slide) => set((state) => ({ 
    heroSlides: [slide, ...state.heroSlides] 
  })),
  updateHeroSlide: (id, updatedSlide) => set((state) => ({
    heroSlides: state.heroSlides.map(slide => 
      slide._id === id ? { ...slide, ...updatedSlide } : slide
    ),
  })),
  deleteHeroSlide: (id) => set((state) => ({
    heroSlides: state.heroSlides.filter(slide => slide._id !== id),
  })),

  // Events
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ 
    events: [event, ...state.events] 
  })),
  updateEvent: (id, updatedEvent) => set((state) => ({
    events: state.events.map(event => 
      event._id === id ? { ...event, ...updatedEvent } : event
    ),
  })),
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(event => event._id !== id),
  })),

  // Music
  music: [],
  setMusic: (music) => set({ music }),
  addMusic: (track) => set((state) => ({ 
    music: [track, ...state.music] 
  })),
  updateMusic: (id, updatedTrack) => set((state) => ({
    music: state.music.map(track => 
      track._id === id ? { ...track, ...updatedTrack } : track
    ),
  })),
  deleteMusic: (id) => set((state) => ({
    music: state.music.filter(track => track._id !== id),
  })),

  // Products
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ 
    products: [product, ...state.products] 
  })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(product => 
      product._id === id ? { ...product, ...updatedProduct } : product
    ),
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product._id !== id),
  })),

  // Live Streams
  liveStreams: [],
  currentStream: null,
  setLiveStreams: (streams) => set({ liveStreams: streams }),
  setCurrentStream: (stream) => set({ currentStream: stream }),
  addLiveStream: (stream) => set((state) => ({ 
    liveStreams: [stream, ...state.liveStreams] 
  })),
  updateLiveStream: (id, updatedStream) => set((state) => ({
    liveStreams: state.liveStreams.map(stream => 
      stream._id === id ? { ...stream, ...updatedStream } : stream
    ),
    currentStream: state.currentStream?._id === id 
      ? { ...state.currentStream, ...updatedStream } 
      : state.currentStream,
  })),

  // UI State
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Socket connection
  isSocketConnected: false,
  setSocketConnected: (connected) => set({ isSocketConnected: connected }),
}));
