// src/components/sections/PositioningSection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const positioningPoints = [
  {
    id: '01',
    title: 'We think before we execute',
    description: 'Strategy informs every action. We invest time in understanding your business, market, and objectives before recommending solutions.',
  },
  {
    id: '02',
    title: 'We build systems, not just campaigns',
    description: 'Sustainable growth requires infrastructure. We design systems that compound value over time, beyond individual campaigns.',
  },
  {
    id: '03',
    title: 'We focus on business outcomes, not vanity metrics',
    description: 'Our success is measured by your business growth. We prioritize metrics that matter to revenue, profit, and long-term value.',
  },
];

export default function PositioningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 relative">
      {/* Background structure lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-100 hidden lg:block" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gray-100 hidden lg:block" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-100 hidden lg:block" />
      </div>
      
      <div className="section-padding content-max-width">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full mb-8">
                <span className="text-sm font-medium text-gray-600 tracking-wider">DIFFERENTIATION</span>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 mb-6">
                A Strategy-First Consultancy,<br />Not a Traditional Agency
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Alexander Stephen & Co. is a strategy-led consultancy and digital marketing firm.
              </p>
            </div>
          </motion.div>
          
          <div className="space-y-32">
            {positioningPoints.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                className={`flex flex-col lg:flex-row items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Number marker */}
                <div className="lg:w-1/4 mb-8 lg:mb-0">
                  <div className="flex items-center">
                    <span className="text-[120px] font-playfair font-light text-gray-900/10 leading-none tracking-tight">
                      {point.id}
                    </span>
                    <div className="w-8 h-px bg-gray-300 ml-4" />
                  </div>
                </div>
                
                {/* Content - offset for rhythm */}
                <div className={`lg:w-3/4 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}>
                  <div className="relative">
                    {/* Vertical accent line */}
                    <div className="absolute -left-8 top-0 bottom-0 w-px bg-gray-200 hidden lg:block" />
                    
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 leading-tight">
                        {point.title}
                      </h3>
                      <div className="w-16 h-px bg-gray-900" />
                    </div>
                    
                    <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                      {point.description}
                    </p>
                    
                    {/* Subtle bottom indicator */}
                    <div className="flex items-center mt-12 text-sm text-gray-500">
                      <div className="w-6 h-px bg-gray-300 mr-3" />
                      <span>Core Principle {point.id}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom contextual note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-32 pt-12 border-t border-gray-200"
          >
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 italic">
                We work with founders and business leaders to define clear growth strategies, design the systems that support them, and execute marketing with intent.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}