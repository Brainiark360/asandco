// src/components/sections/ServicesSection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    id: '01',
    title: 'Image Marketing & Personal Branding',
    description: 'We help businesses and leaders shape how they are perceived by the market — building trust, credibility, and authority through intentional positioning and digital presence.',
    outcome: 'A clear, credible presence that builds confidence before the first conversation.',
  },
  {
    id: '02',
    title: 'Growth Marketing',
    description: 'We design and execute structured growth systems that drive demand, leads, and revenue through strategy, experimentation, and disciplined execution.',
    outcome: 'Structured, measurable growth that supports business objectives.',
  },
  {
    id: '03',
    title: 'Technology & Digital Systems',
    description: 'We build the digital infrastructure that supports growth — from conversion-focused websites to web applications and data systems that enable scale.',
    outcome: 'Technology that enables scale and supports better decision-making.',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 bg-gray-50 relative">
      {/* Section marker */}
      <div className="absolute left-12 top-1/4 hidden lg:block">
        <div className="text-[200px] font-playfair font-light text-gray-900/5 leading-none tracking-tight">
          03
        </div>
      </div>
      
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="max-w-3xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-px bg-gray-900 mr-4" />
              <span className="text-sm font-medium text-gray-600 tracking-wider">SERVICES</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our services are designed to support structured business growth.
              Each engagement begins with strategy and is supported by systems and disciplined execution.
            </p>
          </div>
        </motion.div>
        
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
              className="relative"
            >
              {/* Service number - positioned absolutely */}
              <div className="absolute -left-12 top-0 hidden lg:block">
                <span className="text-6xl font-playfair font-light text-gray-900/10">
                  {service.id}
                </span>
              </div>
              
              <div className="bg-white p-12 hover:shadow-lg transition-all duration-500">
                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Title and ID */}
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center mb-6">
                        <span className="text-sm font-medium text-gray-500 tracking-wider">SERVICE {service.id}</span>
                        <div className="w-8 h-px bg-gray-300 ml-4" />
                      </div>
                      <h3 className="text-2xl font-light text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Subtle indicator */}
                    <div className="flex items-center text-sm text-gray-500 mt-12">
                      <div className="w-6 h-px bg-gray-300 mr-3" />
                      <span>Strategy-led engagement</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="lg:col-span-2">
                    <div className="border-l border-gray-200 pl-12">
                      <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        {service.description}
                      </p>
                      
                      {/* Outcome - visually separated */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index * 0.15) + 0.3 }}
                        className="pt-12 border-t border-gray-100"
                      >
                        <div className="flex items-start">
                          <div className="w-3 h-3 bg-gray-900 mt-2 mr-4 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-600 mb-2">OUTCOME</div>
                            <p className="text-gray-900 font-light text-lg">
                              {service.outcome}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connecting line between services */}
              {index < services.length - 1 && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gray-200/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}