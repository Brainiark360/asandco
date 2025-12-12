// src/components/about/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Pre-headline indicator */}
          <div className="flex items-center mb-16">
            <div className="w-16 h-px bg-gray-300 mr-6" />
            <span className="text-sm font-medium text-gray-500 tracking-widest">
              ABOUT
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-[56px] font-light text-gray-900 leading-[1.15] tracking-tight mb-12">
            A Strategy-First Consultancy<br />Built on Clarity and Discipline
          </h1>
          
          {/* Editorial divider */}
          <div className="w-24 h-px bg-gray-900 mb-16" />
          
          {/* Introduction content */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-xl text-gray-700 leading-relaxed max-w-3xl"
            >
              Alexander Stephen & Co. exists to help businesses grow with clarity, structure, and intent.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-xl text-gray-700 leading-relaxed max-w-3xl"
            >
              We work with founders, executives, and leadership teams who understand that sustainable growth is not driven by activity alone, but by clear thinking supported by the right systems and disciplined execution.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-xl text-gray-700 leading-relaxed max-w-3xl"
            >
              Our work sits at the intersection of strategy, marketing, and technology — with strategy always leading the way.
            </motion.p>
          </div>
          
          {/* Section marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-24 pt-8 border-t border-gray-200"
          >
            <div className="text-sm text-gray-500">
              <span className="tracking-wider">INTRODUCTION</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}