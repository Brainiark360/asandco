// src/components/sections/ApproachSection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const approachSteps = [
  {
    id: '01',
    title: 'Strategy',
    description: 'We begin by understanding the business, the market, and the growth objective.',
    duration: '4–6 weeks',
  },
  {
    id: '02',
    title: 'Systems',
    description: 'We design the digital and operational systems required to support growth.',
    duration: '8–12 weeks',
  },
  {
    id: '03',
    title: 'Execution',
    description: 'We execute with discipline, measurement, and continuous optimisation.',
    duration: 'Ongoing',
  },
];

export default function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background progression lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/30 to-transparent" />
      </div>
      
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full mb-8">
            <span className="text-sm font-medium text-gray-600 tracking-wider">FRAMEWORK</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Strategy → Systems → Execution
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            This approach ensures growth is intentional, measurable, and sustainable.
          </p>
        </motion.div>
        
        {/* Timeline progression */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute top-24 left-0 right-0 h-px bg-gray-900/10 origin-left hidden lg:block"
          />
          
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
            {approachSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + (index * 0.15) }}
                className="relative"
              >
                {/* Step connector */}
                {index < approachSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 w-8 h-px bg-gray-300" />
                )}
                
                <div className="text-center lg:text-left">
                  {/* Step number with connecting dot */}
                  <div className="flex flex-col items-center lg:items-start mb-12">
                    <div className="relative mb-8">
                      <span className="text-8xl font-playfair font-light text-gray-900/10">
                        {step.id}
                      </span>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 + (index * 0.15) }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"
                      />
                    </div>
                    
                    {/* Duration indicator */}
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-xs font-medium text-gray-600">{step.duration}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="lg:pl-4">
                    <h3 className="text-2xl font-light text-gray-900 mb-6">
                      {step.title}
                    </h3>
                    <div className="w-12 h-px bg-gray-900 mx-auto lg:mx-0 mb-8" />
                    <p className="text-gray-700 leading-relaxed mb-8">
                      {step.description}
                    </p>
                    
                    {/* Subtle indicator */}
                    <div className="flex items-center justify-center lg:justify-start text-sm text-gray-500">
                      <div className="w-6 h-px bg-gray-300 mr-3" />
                      <span>Phase {step.id}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Progression arrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="mt-32 text-center"
          >
            <div className="inline-flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-4 tracking-wider">LINEAR PROGRESSION</span>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}