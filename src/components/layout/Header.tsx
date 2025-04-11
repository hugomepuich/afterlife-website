// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Areas', href: '/area' },
    { name: 'Races', href: '/races' },
    { name: 'Characters', href: '/peoples/characters' },
    { name: 'Affiliations', href: '/peoples/affiliations' },
  ];

  return (
    <header className="relative">
      {/* Top Navigation */}
      <nav 
        className={`sticky top-0 z-50 bg-black/80 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? 'border-blue-900/50 py-2' : 'border-transparent py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <ul className="flex space-x-1 md:space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group relative px-3 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Header Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/0 z-10"></div>
        
        {/* Header image */}
        <Image
          src="/images/header.jpg"
          alt="Wiki Universe Header"
          fill
          priority
          className="object-cover object-center"
        />
        
        {/* Site title */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider mb-2">
              AFTERLIFE
            </h1>
            <div className="h-px w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <p className="text-blue-300 mt-2 text-sm md:text-base">Explore our fantastical realm</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
      </div>
    </header>
  );
}