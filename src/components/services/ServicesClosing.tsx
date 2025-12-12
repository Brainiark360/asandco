// src/components/services/ServicesClosing.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServicesClosing() {
  return (
    <section className="py-40">
      <div className="section-padding content-max-width">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            {/* Final editorial divider - understated */}
            <div className="flex justify-center mb-24">
              <div className="w-24 h-px bg-gray-300" />
            </div>
            
            {/* Closing statement - calm, confident */}
            <div className="mb-20">
              <p className="text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12">
                All services are delivered through the same disciplined framework — strategy first, systems second, execution with intent.
              </p>
              
              <div className="text-gray-600">
                <p>
                  We work as strategic partners, not vendors, focusing on sustainable growth through clarity and structure.
                </p>
              </div>
            </div>
            
            {/* Optional next step - no pressure */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="text-sm text-gray-500 mb-4">
                For a detailed discussion about your specific needs
              </div>
              
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-base font-medium text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500"
              >
                <span>Discuss Your Requirements</span>
                <svg
                  className="ml-4 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <div className="text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-6 h-px bg-gray-300 mr-3" />
                  <span>Initial consultation with no obligation</span>
                </div>
              </div>
            </motion.div>
            
            {/* Page end marker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-32 pt-12 border-t border-gray-200"
            >
              <div className="text-xs text-gray-400 tracking-widest">
                SERVICES • ALEXANDER STEPHEN & CO.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}