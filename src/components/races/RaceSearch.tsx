// /src/components/races/RaceSearch.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RaceSearchProps {
  races: any[];
}

export default function RaceSearch({ races }: RaceSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrait, setFilterTrait] = useState('');
  
  // Get unique traits for filter dropdown
  const allTraits = races.reduce((acc, race) => {
    if (race.traits && Array.isArray(race.traits)) {
      race.traits.forEach((trait: string) => {
        if (!acc.includes(trait)) {
          acc.push(trait);
        }
      });
    }
    return acc;
  }, [] as string[]);
  
  const filteredRaces = races.filter(race => {
    const matchesSearch = 
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTrait = filterTrait ? 
      (race.traits && race.traits.includes(filterTrait)) : true;
    
    return matchesSearch && matchesTrait;
  });
  
  return (
    <div>
      <div className="mb-6 bg-gray-900/95 border border-blue-900/30 rounded-lg p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="trait" className="block text-sm font-medium text-gray-300 mb-1">
              Filter by Trait
            </label>
            <select
              id="trait"
              className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterTrait}
              onChange={(e) => setFilterTrait(e.target.value)}
            >
              <option value="">All Traits</option>
              {allTraits.map(trait => (
                <option key={trait} value={trait}>{trait}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRaces.length > 0 ? (
          filteredRaces.map((race) => (
            <Link 
              href={`/races/${race.slug}`} 
              key={race.id}
              className="block"
            >
              <div className="bg-gray-900/95 border border-gray-800 hover:border-blue-600 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 h-full max-w-xs mx-auto w-full">
                {/* Race Image - Portrait format with increased height */}
                <div className="relative h-64 md:h-72 lg:h-80 w-full bg-gray-800 overflow-hidden">
                  {/* Decorative frame elements for portrait style */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-blue-800/50 z-10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-blue-800/50 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-blue-800/50 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-blue-800/50 z-10 pointer-events-none"></div>
                  
                  {race.image ? (
                    <Image 
                      src={race.image} 
                      alt={race.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                
                {/* Race Info */}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{race.name}</h2>
                  <p className="text-gray-400 line-clamp-2 mb-3 text-sm">{race.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {race.traits && race.traits.slice(0, 3).map((trait: string, index: number) => (
                      <span key={index} className="inline-block bg-blue-900/30 text-blue-400 border border-blue-800/30 px-2 py-0.5 text-xs rounded">
                        {trait}
                      </span>
                    ))}
                    {race.traits && race.traits.length > 3 && (
                      <span className="inline-block bg-gray-800 text-gray-400 px-2 py-0.5 text-xs rounded">
                        +{race.traits.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-6 bg-gray-900/90 rounded-lg border border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400">No races found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}