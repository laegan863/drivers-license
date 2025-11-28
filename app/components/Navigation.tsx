'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">🌍</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  IDPermit
                </span>
                <div className="text-xs text-gray-500 font-medium -mt-1">International Driving</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              href="/#services" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group py-2"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#features" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group py-2"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#pricing" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group py-2"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#reviews" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group py-2"
            >
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#faq" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group py-2"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#contact" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors font-medium group py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/application" 
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-semibold"
              >
                <span className="relative z-10 flex items-center">
                  Apply Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              href="/#services"
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Services
              </div>
            </Link>
            <Link
              href="/#features"
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Features
              </div>
            </Link>
            <Link
              href="/#pricing"
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Pricing
              </div>
            </Link>
            <Link
              href="/#reviews"
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Reviews
              </div>
            </Link>
            <Link
              href="/#faq"
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                FAQ
              </div>
            </Link>
            <Link
              href="/#contact"
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                Contact
              </div>
            </Link>
            
            <div className="pt-4">
              <Link
                href="/application"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-blue-500/25"
                onClick={toggleMenu}
              >
                Apply Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
