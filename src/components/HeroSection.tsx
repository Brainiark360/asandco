// src/components/sections/HeroSection.tsx - WITH REQUESTED CTA FORMAT
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-0"
      style={{ backgroundColor: '#F6F5F2' }}
    >
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mesh Background - Very Subtle */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #111111 1px, transparent 1px),
              linear-gradient(to bottom, #111111 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        
        {/* Animated Line - Extremely Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#111111] to-transparent"
        />
        
        {/* Vertical Scanning Line - Almost Imperceptible */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: '200%', 
            opacity: [0, 0.08, 0] 
          }}
          transition={{ 
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 4
          }}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#111111]/30 to-transparent"
        />
      </div>

      {/* Left Side Minimal Elements */}
      <div className="absolute left-0 top-0 bottom-0 w-1/6 md:w-[8%] xl:w-[10%] hidden md:block">
        {/* Subtle Vertical Guide */}
        <div className="absolute left-2/3 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#111111]/5 to-transparent" />
      </div>

      {/* Main Content Area - Expanded & Centered */}
      <div className="section-padding w-full relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Contextual Label - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center">
              <div className="w-12 h-px bg-[#B8A46A]/30 mr-4" />
              <span 
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#5A5A5A', letterSpacing: '0.2em' }}
              >
                STRATEGY-LED CONSULTANCY AND EXECUTION
              </span>
              <div className="w-12 h-px bg-[#B8A46A]/30 ml-4" />
            </div>
          </motion.div>

          {/* Main Content Block - Centered & Wider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1
            }}
            className="text-center"
          >
            {/* Headline - Centered & Expanded */}
            <h1 
              className="font-playfair text-4xl md:text-5xl lg:text-[64px] xl:text-[70px] font-light leading-[1.08] tracking-tight mb-12 md:mb-16"
              style={{ color: '#111111' }}
            >
              Strategy-Led Marketing
              <br className="hidden md:block" />
              <span className="text-[#5A5A5A] font-normal"> and Digital Systems</span>
              <br className="hidden md:block" />
              for Structured Business Growth
            </h1>

            {/* Supporting Paragraph - Wider & Centered */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
              className="mb-16 md:mb-20"
            >
              {/* Paragraph Separator */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-px bg-[#111111]/20" />
              </div>
              
              <p 
                className="text-xl md:text-2xl leading-relaxed max-w-3xl md:max-w-4xl mx-auto px-4 md:px-0"
                style={{ color: '#5A5A5A' }}
              >
                We help businesses clarify their positioning, build the right systems, and execute growth through disciplined marketing and technology.
              </p>
            </motion.div>

            {/* CTA - Using Requested Format & Centered */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3
              }}
              className="relative"
            >
              {/* Center the CTA Container */}
              <div className="flex justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 max-w-2xl mx-auto">
                  <Link
                    href="/contact"
                    className="group relative"
                  >
                    {/* Structural Dot - Centered Version */}
                    <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
                      <div className="w-3 h-3 rounded-full bg-[#B8A46A]/20 group-hover:bg-[#B8A46A]/40 transition-colors duration-300" />
                    </div>
                    
                    <div className="flex items-center">
                      <span 
                        className="text-lg md:text-xl font-medium transition-colors duration-300 group-hover:text-[#5A5A5A]"
                        style={{ color: '#111111' }}
                      >
                        Start a Conversation
                      </span>
                      <svg
                        className="ml-4 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: '#111111' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    
                    {/* Subtle Underline */}
                    <div className="w-0 h-px bg-[#111111] transition-all duration-500 group-hover:w-full mt-1" />
                  </Link>
                  
                  {/* CTA Context */}
                  <div className="text-sm md:text-base" style={{ color: '#5A5A5A' }}>
                    <div className="flex items-center justify-center sm:justify-start">
                      <div className="w-8 h-px bg-[#5A5A5A]/30 mr-3" />
                      <span>Typically respond within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side Minimal Elements */}
      <div className="absolute right-0 top-0 bottom-0 w-1/6 md:w-[8%] xl:w-[10%] hidden md:block">
        {/* Subtle Vertical Guide */}
        <div className="absolute right-2/3 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#111111]/5 to-transparent" />
      </div>

      {/* Bottom Fade - Ensures CTA is visible on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F6F5F2] to-transparent pointer-events-none md:hidden" />
    </section>
  );
}