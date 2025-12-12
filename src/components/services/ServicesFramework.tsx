// src/components/services/ServicesFramework.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ServicesFramework() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 bg-gray-50">
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          {/* Framework header - minimal */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-8">
              <span className="text-sm font-medium text-gray-600 tracking-wider">
                FRAMEWORK
              </span>
            </div>
            <p className="text-lg text-gray-700">
              All services follow the same disciplined approach
            </p>
          </div>
          
          {/* Framework visualization - structural, not decorative */}
          <div className="relative">
            {/* Connecting line - subtle, logical */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
              {['Strategy', 'Systems', 'Execution'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="text-center">
                    {/* Step indicator - minimal */}
                    <div className="mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full mb-4">
                        <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                      </div>
                      <div className="w-16 h-px bg-gray-900 mx-auto" />
                    </div>
                    
                    {/* Step content */}
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      {step}
                    </h3>
                    
                    <div className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
                      {step === 'Strategy' && 'Clear direction before any action'}
                      {step === 'Systems' && 'Infrastructure to support execution'}
                      {step === 'Execution' && 'Disciplined delivery with measurement'}
                    </div>
                  </div>
                  
                  {/* Connection arrow for mobile */}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-8">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Framework explanation - editorial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-32 pt-12 border-t border-gray-200"
          >
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-700">
                This framework ensures growth is intentional, measurable, and sustainable — regardless of the specific service engagement.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}