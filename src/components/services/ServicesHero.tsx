// src/components/services/ServicesHero.tsx
'use client';

import { motion } from 'framer-motion';

export default function ServicesHero() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Pre-headline structural marker */}
          <div className="flex items-center mb-16">
            <div className="w-20 h-px bg-gray-300 mr-6" />
            <span className="text-sm font-medium text-gray-500 tracking-widest">
              SERVICES
            </span>
          </div>
          
          {/* Dominant H1 with editorial weight */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-[56px] font-light text-gray-900 leading-[1.15] tracking-tight mb-12">
            Strategy-Led Services<br />for Structured Business Growth
          </h1>
          
          {/* Editorial divider */}
          <div className="w-24 h-px bg-gray-900 mb-16" />
          
          {/* Introduction text - anchored, not centered */}
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-xl text-gray-700 leading-relaxed mb-8"
            >
              Our services are designed to support structured business growth. Each engagement begins with strategy and is supported by systems and disciplined execution.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              We work as a strategic partner, focusing on business outcomes through clarity, systems, and measured execution.
            </motion.p>
          </div>
          
          {/* Section marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-24 pt-8 border-t border-gray-200"
          >
            <div className="text-sm text-gray-500">
              <span className="tracking-wider">PAGE INTRODUCTION</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}