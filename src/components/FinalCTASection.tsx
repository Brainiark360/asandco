// src/components/sections/FinalCTASection.tsx - ELEVATED
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="py-40 relative">
      {/* Background structure */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-200/20 to-transparent" />
      </div>
      
      <div className="section-padding content-max-width">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16"
          >
            <div className="flex flex-col items-center mb-12">
              <div className="w-16 h-px bg-gray-300 mb-8" />
              <span className="text-sm font-medium text-gray-500 tracking-wider">CONVERSATION STARTER</span>
            </div>
            
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
              Let's Talk About Growth,<br />Properly
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-20"
          >
            <p className="text-2xl text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto">
              If you're looking for a thoughtful, structured approach to growth, we're ready to have that conversation.
            </p>
            
            {/* Context note */}
            <div className="inline-flex items-center px-6 py-3 bg-gray-50 rounded-full">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
              <span className="text-sm text-gray-600">Initial consultations are exploratory, not sales-driven</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center space-y-12"
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-12 py-6 text-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-700 group relative overflow-hidden"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                   style={{backgroundSize: '200% 100%', animation: 'gradientShift 3s ease infinite'}} />
              
              <span className="relative z-10">Request a Consultation</span>
              <svg
                className="ml-6 w-6 h-6 transition-all duration-700 group-hover:translate-x-2 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            {/* Supporting information */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>60-minute discovery call</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Confidential & secure</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Founder-level discussion</span>
              </div>
            </div>
          </motion.div>
          
          {/* Bottom section marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-32 pt-12 border-t border-gray-200"
          >
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-4 tracking-wider">ALEXANDER STEPHEN & CO.</div>
              <p className="text-gray-600 max-w-md mx-auto">
                A strategy-first consultancy helping businesses grow through clarity, systems, and disciplined execution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add keyframe animation for gradient */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}