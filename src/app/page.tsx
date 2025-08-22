'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 text-white">
        <span className="text-lg font-semibold">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
          <div className="w-6 h-3 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Settings Button */}
      <div className="absolute top-12 right-6 z-50">
        <Link href="/settings">
          <div className="w-10 h-10 bg-[#0fbab5] rounded-full flex items-center justify-center">
            <Cog6ToothIcon className="w-6 h-6 text-white" />
          </div>
        </Link>
      </div>

      {/* Hero Section with Summer Walker Image */}
      <div className="relative h-screen">
        {/* Background Image - Matching Figma design */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-600 via-blue-600 to-blue-900">
          {/* Simulated Summer Walker image area */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          {/* Summer Walker Script Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-6xl text-white font-light tracking-wide mb-4" 
                style={{ fontFamily: 'Brush Script MT, cursive' }}>
              Summer Walker
            </h1>
          </div>

          {/* Listen CTA Button */}
          <div className="w-full max-w-sm mb-16">
            <Link href="/music">
              <button className="w-full bg-white bg-opacity-90 text-black py-4 rounded-2xl font-semibold text-lg">
                Listen To My New Album
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Happening Now Section */}
      <div className="bg-gradient-to-b from-blue-900 to-[#0fbab5] px-6 py-8">
        <h2 className="text-xl font-bold text-white mb-6">Happening Now</h2>
        
        {/* Live Streams */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Live Streams</h3>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Coachella Rehearsal</h4>
                  <p className="text-sm text-gray-200">12:00 PM PST</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">21</div>
                  <div className="text-sm text-gray-200">Feb</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Coachella Glam</h4>
                  <p className="text-sm text-gray-200">2:00 PM PST</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">22</div>
                  <div className="text-sm text-gray-200">Feb</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Rolling Loud California</h4>
                  <p className="text-sm text-gray-200">Inglewood, CA</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">15</div>
                  <div className="text-sm text-gray-200">Mar</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Souled Out Festival</h4>
                  <p className="text-sm text-gray-200">Claremont, WA, Australia</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">31</div>
                  <div className="text-sm text-gray-200">Mar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-24"></div>
    </div>
  );
}
