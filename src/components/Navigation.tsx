// components/Navigation.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Approach', href: '/approach' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isClient) {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [isMobileMenuOpen, isClient]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' : 'bg-white/95 md:bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2 z-50 relative">
              <span className="font-playfair text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
                Alexander Stephen & Co.
              </span>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="flex flex-col items-center justify-center w-6 h-6">
                <span className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                }`} />
                <span className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 my-1 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm md:hidden z-40"
                onClick={closeMobileMenu}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl md:hidden z-40 overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  {/* Menu Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="font-playfair text-xl font-semibold text-gray-900">
                      Alexander Stephen & Co.
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Strategy-first consultancy
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-1">
                      {navItems.map((item) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="flex items-center py-4 px-2 text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 border-b border-gray-100"
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="block w-full py-4 text-center font-medium text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                    >
                      Start a Conversation
                    </Link>
                    
                    {/* Contact Info */}
                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>hello@alexanderstephen.co</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Mon-Fri, 9am-6pm GMT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Add padding to account for fixed header on mobile */}
      <style jsx global>{`
        :root {
          --header-height-mobile: 64px;
          --header-height-desktop: 80px;
        }
        
        body {
          padding-top: var(--header-height-mobile);
        }
        
        @media (min-width: 768px) {
          body {
            padding-top: var(--header-height-desktop);
          }
        }
      `}</style>
    </>
  );
}