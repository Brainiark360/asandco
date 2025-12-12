// components/Navigation.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Approach', href: '/approach' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="section-padding content-max-width">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-xl font-semibold text-gray-900 tracking-tight">
              Alexander Stephen & Co.
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}