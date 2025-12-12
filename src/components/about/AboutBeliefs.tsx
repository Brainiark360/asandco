// src/components/about/AboutBeliefs.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const beliefs = [
  {
    title: 'Growth begins with clarity',
    description: 'Without a clear direction, marketing activity becomes fragmented and ineffective. We believe growth must start with a well-defined strategy that aligns business objectives, positioning, and execution.',
  },
  {
    title: 'Systems matter more than tactics',
    description: 'Short-term tactics may create movement, but systems create momentum. We focus on building digital and operational systems that support consistent, repeatable growth over time.',
  },
  {
    title: 'Discipline creates sustainability',
    description: 'Sustainable growth requires restraint, measurement, and continuous improvement. We prioritise disciplined execution over noise, trends, or vanity metrics.',
  },
];

export default function AboutBeliefs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32">
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section header - centered */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-px bg-gray-300 mr-4" />
              <span className="text-sm font-medium text-gray-600 tracking-wider">
                WHAT WE BELIEVE ABOUT GROWTH
              </span>
              <div className="w-12 h-px bg-gray-300 ml-4" />
            </div>
            <p className="text-xl text-gray-700">
              These beliefs shape how we think, how we work, and the outcomes we pursue with our clients.
            </p>
          </div>
          
          {/* Beliefs - vertical flow with structural spacing */}
          <div className="space-y-32 max-w-5xl mx-auto">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                className="relative"
              >
                {/* Belief number - subtle, structural */}
                <div className="absolute -left-8 lg:-left-16 top-0 hidden lg:block">
                  <span className="text-6xl font-playfair font-light text-gray-900/10">
                    {index + 1}
                  </span>
                </div>
                
                {/* Content container */}
                <div className="lg:pl-24">
                  {/* Title with underline */}
                  <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 leading-tight">
                      {belief.title}
                    </h3>
                    <div className="w-16 h-px bg-gray-900" />
                  </div>
                  
                  {/* Description */}
                  <div className="max-w-3xl">
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {belief.description}
                    </p>
                    
                    {/* Subtle differentiation statement */}
                    <div className="pt-8 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        This quietly challenges typical agency behavior.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Spacer between beliefs - except last */}
                {index < beliefs.length - 1 && (
                  <div className="pt-16 mt-16 border-t border-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Section footer - quiet resolution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-32 pt-12 border-t border-gray-200"
          >
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-sm text-gray-500 mb-4 tracking-wider">
                CONVICTION, NOT MARKETING
              </div>
              <p className="text-gray-700 italic">
                Each belief reflects principles that guide boardroom decisions, not promotional copy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}