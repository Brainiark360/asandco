// src/components/sections/ProblemSection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 bg-gray-50 relative">
      {/* Section marker */}
      <div className="absolute right-12 top-1/4 hidden lg:block">
        <div className="text-[200px] font-playfair font-light text-gray-900/5 leading-none tracking-tight">
          02
        </div>
      </div>
      
      <div className="section-padding content-max-width">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Asymmetric positioning */}
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
              {/* Left column - for emphasis */}
              <div className="lg:col-span-5 mb-12 lg:mb-0">
                <div className="sticky top-32">
                  <div className="mb-8">
                    <div className="w-12 h-px bg-gray-900 mb-6" />
                    <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 leading-tight tracking-tight">
                      Most Businesses Don't Have a Marketing Problem.
                      <span className="block mt-4 text-gray-700">
                        They Have a Clarity and Systems Problem.
                      </span>
                    </h2>
                  </div>
                  
                  {/* Authoritative marker */}
                  <div className="flex items-center text-sm text-gray-500 mt-12">
                    <div className="w-6 h-px bg-gray-300 mr-3" />
                    <span>A diagnosis, not a pitch</span>
                  </div>
                </div>
              </div>
              
              {/* Right column - editorial content */}
              <div className="lg:col-span-7">
                <div className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative pl-8"
                  >
                    {/* Paragraph indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
                    
                    <p className="text-xl text-gray-700 leading-relaxed">
                      Many businesses invest in marketing without a clear strategy, defined systems, or a disciplined approach to execution.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
                    <p className="text-xl text-gray-700 leading-relaxed">
                      The result is fragmented efforts, wasted resources, and growth that cannot be sustained.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="pt-12 border-t border-gray-200 mt-12"
                  >
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-gray-900 mt-2 mr-4" />
                      <p className="text-2xl font-light text-gray-900 leading-relaxed italic">
                        Alexander Stephen & Co. exists to bring structure where there is confusion, and discipline where there is noise.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}