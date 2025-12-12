// src/components/about/AboutWork.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutWork() {
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
          {/* Structured header with balanced composition */}
          <div className="mb-24">
            <div className="flex items-center mb-12">
              <div className="w-12 h-px bg-gray-900 mr-4" />
              <span className="text-sm font-medium text-gray-600 tracking-wider">
                HOW WE WORK WITH CLIENTS
              </span>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-8">
                  We work as a strategic partner, not a vendor.
                </h2>
              </div>
              
              <div className="lg:col-span-1">
                <div className="text-sm text-gray-500">
                  <div className="mb-2 tracking-wider">EXPECTATION SETTING</div>
                  <div className="w-8 h-px bg-gray-300 my-3" />
                  <p>Clear boundaries enable deeper work.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content blocks - mature, professional layout */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="max-w-3xl"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Our engagements are collaborative, structured, and outcome-focused. We take responsibility for thinking clearly, setting direction, and supporting execution with the right systems.
              </p>
              
              {/* Quiet filtering statement */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="w-3 h-3 border border-gray-900 mt-2 mr-4 flex-shrink-0" />
                  <p className="text-gray-700">
                    We are selective about the work we take on and prefer long-term partnerships where strategy, systems, and execution can compound over time.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="max-w-2xl"
            >
              <div className="bg-white p-8 hover:shadow-sm transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-px bg-gray-300 mr-4" />
                  <span className="text-sm font-medium text-gray-600 tracking-wider">
                    APPROACH NOTE
                  </span>
                </div>
                <p className="text-lg text-gray-900 leading-relaxed italic">
                  This approach allows us to do fewer things, but do them well.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Professional posture indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-32 pt-12 border-t border-gray-200"
          >
            <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-4 h-px bg-gray-300 mr-3" />
                <span>No retainers without strategic alignment</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-px bg-gray-300 mr-3" />
                <span>Founder-level access included</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-px bg-gray-300 mr-3" />
                <span>Quarterly strategic reviews standard</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}