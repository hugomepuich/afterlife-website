// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const categories = [
    {
      title: "Areas",
      description: "Explore cities, dungeons, hunt zones, and peace zones",
      href: "/area",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Races",
      description: "Discover the different races of our universe",
      href: "/races",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Characters",
      description: "Learn about the notable individuals in our world",
      href: "/peoples/characters",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Affiliations",
      description: "Explore the organizations and factions at play",
      href: "/peoples/affiliations",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 rounded-lg p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to the Wiki Universe</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl">
              Explore our comprehensive database of characters, races, areas, and factions. Discover the lore and stories that shape our fantastical world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/peoples/characters" 
                className="px-6 py-3 bg-blue-800/80 text-blue-100 rounded-md hover:bg-blue-700/90 border border-blue-700/50 transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Browse Characters
              </Link>
              <Link 
                href="/area" 
                className="px-6 py-3 bg-gray-800/60 text-gray-100 rounded-md hover:bg-gray-700/70 border border-gray-700/50 transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Explore World Map
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main categories */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
          <span className="w-8 h-px bg-blue-600 mr-3"></span>
          Explore Categories
          <span className="w-8 h-px bg-blue-600 ml-3"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.href} 
              href={category.href}
              className="group bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-blue-700/50 rounded-lg p-6 transition-all duration-300 flex flex-col items-center text-center transform hover:translate-y-[-4px]"
            >
              <div className="relative">
                {category.icon}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {category.title}
              </h3>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured content section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
          <span className="w-8 h-px bg-blue-600 mr-3"></span>
          Featured Content
          <span className="w-8 h-px bg-blue-600 ml-3"></span>
        </h2>
        
        <div className="bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-3">Dive into Lore</h3>
              <p className="text-gray-300 mb-6">
                Discover the deep history, complex characters, and fascinating locations that make up our universe. 
                Our comprehensive wiki provides the background for every important aspect of the world.
              </p>
              <Link 
                href="/peoples/characters" 
                className="self-start px-6 py-2 bg-blue-800/80 text-blue-100 rounded-md hover:bg-blue-700/90 border border-blue-700/50 transition-colors inline-flex items-center"
              >
                Start Exploring
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="relative h-64 md:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/images/header.jpg" 
                  alt="Featured content" 
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}