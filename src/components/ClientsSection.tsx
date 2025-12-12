// src/components/sections/ClientsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Mock client logos - in production, these would be actual client logos
// Using placeholder text for demonstration
const clientCategories = [
  'Professional Services',
  'Real Estate',
  'Technology-Enabled Businesses',
  'Growth-Focused SMEs',
  'Financial Advisory',
  'High-Trust B2B Brands',
];

// Mock logo components - in production, these would be actual SVG/Image components
const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-gray-900 font-medium tracking-tight opacity-70">
      {name}
    </div>
  </div>
);

const LogoGrid = () => {
  // In production, these would be actual client logos
  const mockLogos = [
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' },
    { id: 4, name: 'Client D' },
    { id: 5, name: 'Client E' },
    { id: 6, name: 'Client F' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {mockLogos.map((logo) => (
        <div 
          key={logo.id}
          className="aspect-square flex items-center justify-center p-4"
        >
          <div className="w-full h-full flex items-center justify-center border border-gray-200 hover:border-gray-300 transition-colors duration-500">
            <div className="text-gray-900/70 font-medium text-sm tracking-wide">
              {logo.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="section-padding content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header - minimal, factual */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="w-8 h-px bg-gray-300 mr-4" />
              <span className="text-sm font-medium text-gray-500 tracking-wider">
                CLIENT PORTFOLIO
              </span>
              <div className="w-8 h-px bg-gray-300 ml-4" />
            </div>
            
            <h2 className="font-playfair text-3xl font-light text-gray-900 mb-6">
              Organisations We've Worked With
            </h2>
            
            <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
              We've worked with organisations across professional services, real estate, technology, and growth-focused businesses.
            </p>
          </div>
          
          {/* Client logos grid - muted, restrained */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mb-20"
          >
            <LogoGrid />
          </motion.div>
          
          {/* Client categories - text-based, understated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="pt-12 border-t border-gray-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center text-sm text-gray-500 mb-4">
                  <div className="w-6 h-px bg-gray-300 mr-3" />
                  <span>REPRESENTATIVE INDUSTRIES</span>
                  <div className="w-6 h-px bg-gray-300 ml-3" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {clientCategories.map((category, index) => (
                  <div
                    key={category}
                    className="text-center py-4"
                  >
                    <div className="text-gray-700 text-sm tracking-wide">
                      {category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Section footer - quiet reassurance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-24 pt-12 border-t border-gray-200"
          >
            <div className="text-center max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-px bg-gray-300" />
              </div>
              <p className="text-sm text-gray-600">
                Long-term partnerships built on strategic alignment and disciplined execution.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}