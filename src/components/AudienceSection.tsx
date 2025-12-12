// src/components/sections/AudienceSection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const audienceTypes = [
  'Growth-focused SMEs',
  'Professional services firms',
  'Technology-enabled businesses',
  'High-trust brands in finance, real estate, and consulting',
];

const qualities = [
  'Strategy before execution',
  'Calm, disciplined delivery',
  'Business-first thinking',
  'Technology-enabled solutions',
  'Long-term partnership mindset',
];

export default function AudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 bg-gray-50 relative">
      <div className="section-padding content-max-width">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16">
              <div className="lg:w-2/3 mb-12 lg:mb-0">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-px bg-gray-900 mr-4" />
                  <span className="text-sm font-medium text-gray-600 tracking-wider">CLIENT PROFILE</span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                  Who We Work With
                </h2>
              </div>
              <div className="lg:w-1/3">
                <p className="text-xl text-gray-700 leading-relaxed">
                  We work with founders, executives, and leadership teams who value clarity, structure, and long-term growth.
                </p>
              </div>
            </div>
            
            {/* Divider with character */}
            <div className="relative h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full" />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full" />
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {/* Client types */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <span className="text-sm font-medium text-gray-500">TYPICAL CLIENTS INCLUDE</span>
                    <div className="w-8 h-px bg-gray-300 ml-4" />
                  </div>
                  
                  <ul className="space-y-8">
                    {audienceTypes.map((type, index) => (
                      <motion.li
                        key={type}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + (index * 0.1) }}
                        className="flex items-start group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center mr-4 group-hover:border-gray-900 transition-colors duration-500">
                          <div className="w-2 h-2 bg-gray-900 rounded-full" />
                        </div>
                        <span className="text-lg text-gray-700 pt-1 group-hover:text-gray-900 transition-colors duration-500">
                          {type}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Client profile footnote */}
                <div className="pt-12 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Our clients typically have annual revenues between £2M–£50M and are in a phase of strategic growth or transformation.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Why us */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="bg-white p-12 hover:shadow-lg transition-all duration-500">
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <span className="text-sm font-medium text-gray-500">WHY ALEXANDER STEPHEN & CO.</span>
                    <div className="w-8 h-px bg-gray-300 ml-4" />
                  </div>
                  
                  <ul className="space-y-8">
                    {qualities.map((quality, index) => (
                      <motion.li
                        key={quality}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 + (index * 0.1) }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mr-4 mt-1">
                          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-lg text-gray-700">{quality}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Differentiator note */}
                <div className="pt-12 border-t border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-xs font-medium text-gray-600">i</span>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      We are selective in our engagements, preferring to work deeply with a few clients rather than superficially with many.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Bottom alignment element */}
              <div className="mt-12 flex items-center justify-end">
                <div className="w-24 h-px bg-gray-300" />
                <span className="ml-4 text-sm text-gray-500">Self-qualification framework</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}