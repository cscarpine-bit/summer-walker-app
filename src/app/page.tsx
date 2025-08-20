'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import MusicSection from '@/components/MusicSection';
import EventsSection from '@/components/EventsSection';
import MerchSection from '@/components/MerchSection';
import Footer from '@/components/Footer';
import { useAppStore } from '@/store/appStore';

export default function Home() {
  const { setHeroSlides, setEvents, setMusic, setProducts } = useAppStore();

  useEffect(() => {
    // TODO: Fetch data from API
    // For now using mock data for development
    
    // Mock hero slides
    setHeroSlides([
      {
        _id: '1',
        title: 'New Album: Still Over It',
        subtitle: 'Stream now on all platforms',
        imageUrl: '/hero-1.jpg',
        ctaText: 'Listen Now',
        ctaLink: '/music',
        ctaType: 'internal',
        isActive: true,
        order: 1,
        analytics: { impressions: 0, clicks: 0, conversions: 0 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '2',
        title: 'Tour Dates Announced',
        subtitle: 'Get your tickets before they sell out',
        imageUrl: '/hero-2.jpg',
        ctaText: 'Get Tickets',
        ctaLink: '/events',
        ctaType: 'internal',
        isActive: true,
        order: 2,
        analytics: { impressions: 0, clicks: 0, conversions: 0 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Mock events
    setEvents([
      {
        _id: '1',
        title: 'Summer Walker Live in Atlanta',
        description: 'An intimate acoustic performance',
        type: 'tour',
        status: 'upcoming',
        startDate: new Date('2024-09-15T20:00:00'),
        timezone: 'America/New_York',
        venue: {
          name: 'State Farm Arena',
          address: '1 State Farm Dr',
          city: 'Atlanta',
          state: 'GA',
          country: 'USA',
        },
        ticketLink: 'https://ticketmaster.com',
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Mock music
    setMusic([
      {
        _id: '1',
        title: 'Girls Need Love',
        artist: 'Summer Walker',
        album: 'Over It',
        genre: ['R&B', 'Soul'],
        releaseDate: new Date('2019-10-04'),
        duration: 180,
        coverArt: '/album-cover-1.jpg',
        streamingLinks: {
          spotify: 'https://open.spotify.com/track/example',
          appleMusic: 'https://music.apple.com/track/example',
          youtube: 'https://youtube.com/watch?v=example',
        },
        isExplicit: true,
        isVisible: true,
        tier: 'free',
        plays: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Mock products
    setProducts([
      {
        _id: '1',
        name: 'Summer Walker Hoodie',
        description: 'Official tour merchandise',
        images: ['/merch-1.jpg'],
        category: 'Apparel',
        price: { currency: 'USD', amount: 65 },
        inventory: { sku: 'SW-HOODIE-001', quantity: 100, unlimited: false },
        isActive: true,
        isFeatured: true,
        tags: ['hoodie', 'apparel', 'tour'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, [setHeroSlides, setEvents, setMusic, setProducts]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <MusicSection />
      <EventsSection />
      <MerchSection />
      <Footer />
    </div>
  );
}
