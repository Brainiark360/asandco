// src/components/sections/HeroSection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-32 relative">
      {/* Section marker - subtle structural element */}
      <div className="absolute left-12 top-1/3 hidden lg:block">
        <div className="text-[200px] font-playfair font-light text-gray-900/5 leading-none tracking-tight">
          01
        </div>
      </div>
      
      {/* Vertical rhythm guide */}
      <div className="absolute left-24 top-1/4 bottom-1/4 w-px bg-gray-200 hidden lg:block" />
      
      <div className="section-padding content-max-width relative z-10">
        <div className="max-w-4xl ml-0 lg:ml-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-16">
              {/* Subtle pre-headline marker */}
              <div className="flex items-center mb-12">
                <div className="w-24 h-px bg-gray-300" />
                <span className="ml-4 text-sm font-medium text-gray-500 tracking-wider">
                  ALEXANDER STEPHEN & CO.
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-light text-gray-900 leading-[1.15] tracking-tight text-balance">
                Strategy-Led Marketing and Digital Systems for Structured Business Growth
              </h1>
            </div>
            
            {/* Editorial divider */}
            <div className="w-16 h-px bg-gray-900 mb-12" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mb-16"
            >
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mb-8">
                We help businesses clarify their positioning, build the right systems, and execute growth through disciplined marketing and technology.
              </p>
              
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-sm font-medium">Based in London, working globally</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-500 group relative"
              >
                <span className="relative z-10">Start a Conversation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg
                  className="ml-4 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-6 h-px bg-gray-300 mr-3" />
                <span>Typically respond within 24 hours</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-2 tracking-wider">EXPLORE</span>
            <div className="w-px h-24 bg-gradient-to-b from-gray-900/20 via-gray-900/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}