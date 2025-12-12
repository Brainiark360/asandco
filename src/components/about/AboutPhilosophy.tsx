// src/components/about/AboutPhilosophy.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutPhilosophy() {
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
          {/* Section header with offset alignment */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-24 mb-24">
            <div className="lg:w-2/5 mb-12 lg:mb-0">
              <div className="flex items-center mb-8">
                <div className="w-12 h-px bg-gray-900 mr-4" />
                <span className="text-sm font-medium text-gray-600 tracking-wider">
                  OUR PHILOSOPHY
                </span>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                We believe most growth challenges are not marketing problems.
              </h2>
            </div>
            
            <div className="lg:w-3/5">
              <div className="space-y-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-xl text-gray-700 leading-relaxed"
                >
                  <span className="font-medium text-gray-900">They are clarity problems.</span>
                  <br />
                  <span className="font-medium text-gray-900">They are systems problems.</span>
                  <br />
                  <span className="font-medium text-gray-900">They are discipline problems.</span>
                </motion.p>
              </div>
            </div>
          </div>
          
          {/* Philosophy explanation - manifesto style */}
          <div className="relative pl-8 lg:pl-12">
            {/* Vertical guide line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-300 via-gray-300 to-transparent hidden lg:block" />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="max-w-3xl"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-12">
                At Alexander Stephen & Co., we approach growth as a strategic exercise before it becomes an execution task. We take the time to understand the business, the market, and the objective before recommending action.
              </p>
              
              <div className="pt-12 border-t border-gray-200">
                <p className="text-lg text-gray-700 italic">
                  This philosophy guides every engagement and every decision we make.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Section footer marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-24 pt-8 border-t border-gray-200"
          >
            <div className="text-sm text-gray-500">
              <span className="tracking-wider">PHILOSOPHICAL FOUNDATION</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}