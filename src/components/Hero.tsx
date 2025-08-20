'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const { heroSlides } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlides = heroSlides.filter(slide => slide.isActive);

  useEffect(() => {
    if (activeSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  if (activeSlides.length === 0) {
    return (
      <div className="relative h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Summer Walker</h1>
          <p className="text-xl text-gray-300">Welcome to my world</p>
        </div>
      </div>
    );
  }

  const currentSlideData = activeSlides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={currentSlideData.imageUrl}
                alt={currentSlideData.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black" 
                   style={{ zIndex: -1 }} />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                  >
                    {currentSlideData.title}
                  </motion.h1>
                  {currentSlideData.subtitle && (
                    <motion.p
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="mt-6 text-lg leading-8 text-gray-300"
                    >
                      {currentSlideData.subtitle}
                    </motion.p>
                  )}
                  {currentSlideData.ctaText && currentSlideData.ctaLink && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="mt-10 flex items-center gap-x-6"
                    >
                      {currentSlideData.ctaType === 'internal' ? (
                        <Link
                          href={currentSlideData.ctaLink}
                          className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
                        >
                          {currentSlideData.ctaText}
                        </Link>
                      ) : (
                        <a
                          href={currentSlideData.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
                        >
                          {currentSlideData.ctaText}
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
