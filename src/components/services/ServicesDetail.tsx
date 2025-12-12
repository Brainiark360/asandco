// src/components/services/ServiceDetail.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ServiceDetailProps {
  service: {
    id: string;
    title: string;
    description: string;
    outcome: string;
    inclusions: string[];
  };
  isLast: boolean;
}

export default function ServiceDetail({ service, isLast }: ServiceDetailProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className={`py-32 ${service.id === '02' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Service header with structural numbering */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 mb-24">
            {/* Service number - positioned as structural anchor */}
            <div className="lg:w-1/5 mb-12 lg:mb-0">
              <div className="flex items-center">
                <span className="text-[120px] font-playfair font-light text-gray-900/10 leading-none tracking-tight">
                  {service.id}
                </span>
                <div className="w-8 h-px bg-gray-300 ml-4" />
              </div>
            </div>
            
            {/* Service title and description */}
            <div className="lg:w-4/5">
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <span className="text-sm font-medium text-gray-500 tracking-wider">
                    SERVICE {service.id}
                  </span>
                  <div className="w-8 h-px bg-gray-300 ml-4" />
                </div>
                
                <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 mb-8 leading-tight">
                  {service.title}
                </h2>
                
                <div className="w-16 h-px bg-gray-900 mb-8" />
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Two-column layout for inclusions and outcome */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Inclusions - editorial list format */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-px bg-gray-900 mr-4" />
                    <span className="text-sm font-medium text-gray-600 tracking-wider">
                      TYPICAL INCLUSIONS
                    </span>
                  </div>
                </div>
                
                {/* Editorial list - no icons, minimal markers */}
                <ul className="space-y-6">
                  {service.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-px bg-gray-900 mt-3 mr-4" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* List context note */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    All inclusions are customised based on strategic alignment and business objectives.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Outcome - visually separated, given weight */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="relative pl-8 lg:pl-0">
                {/* Vertical guide line for desktop */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
                
                <div className="lg:pl-12">
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <span className="text-sm font-medium text-gray-600 tracking-wider">
                        INTENDED OUTCOME
                      </span>
                      <div className="w-8 h-px bg-gray-300 ml-4" />
                    </div>
                  </div>
                  
                  {/* Outcome statement - given prominence */}
                  <div className="mb-12">
                    <p className="text-2xl font-light text-gray-900 leading-relaxed italic">
                      {service.outcome}
                    </p>
                  </div>
                  
                  {/* Outcome context */}
                  <div className="pt-12 border-t border-gray-200">
                    <p className="text-gray-700">
                      Outcomes are measured against business objectives, not vanity metrics. Success is defined by strategic alignment and sustainable growth.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Service separator - except for last service */}
          {!isLast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-32 pt-12 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-4 tracking-wider">
                  SERVICE {service.id} COMPLETE
                </div>
                <div className="w-16 h-px bg-gray-300 mx-auto" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}