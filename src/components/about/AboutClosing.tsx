// src/components/about/AboutClosing.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutClosing() {
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
            {/* Final editorial divider */}
            <div className="flex justify-center mb-16">
              <div className="w-24 h-px bg-gray-300" />
            </div>
            
            {/* Closing statement - authoritative but calm */}
            <h2 className="font-playfair text-3xl md:text-4xl font-light text-gray-900 mb-12 leading-tight tracking-tight">
              Alexander Stephen & Co. is built for organisations that value thoughtful decision-making and disciplined growth.
            </h2>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-20"
            >
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-16">
                If this approach resonates, we're open to a conversation.
              </p>
              
              {/* Optional CTA - no pressure */}
              <div className="flex flex-col items-center space-y-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-10 py-5 text-lg font-medium text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500"
                >
                  <span>Start a Conversation</span>
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
                    <span>No obligation, no predefined agenda</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Final page marker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="pt-16 border-t border-gray-200"
            >
              <div className="text-xs text-gray-400 tracking-widest">
                ALEXANDER STEPHEN & CO.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}