// src/components/races/RaceSearch.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Race } from '@/app/models/race';

interface RaceSearchProps {
  races: Race[];
}

export default function RaceSearch({ races }: RaceSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('');
  
  // Get unique regions for filter dropdown
  const regions = useMemo(() => {
    const allRegions = races.flatMap(race => race.regions || []);
    return Array.from(new Set(allRegions)).sort();
  }, [races]);
  
  // Filter and sort races alphabetically
  const filteredRaces = useMemo(() => {
    return races
      .filter(race => {
        const matchesSearch = 
          race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          race.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          race.traits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()));
          
        const matchesRegion = filterRegion ? 
          (race.regions?.includes(filterRegion) || false) : true;
        
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [races, searchTerm, filterRegion]);

  return (
    <div className="w-full text-gray-300">
      {/* Search filters panel */}
      <div className="bg-gray-900/95 border border-blue-900/40 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search & Filter Races
          </h2>
          
          {/* Race count */}
          <div className="bg-blue-900/30 px-3 py-1 rounded-full text-xs text-blue-300 border border-blue-800/30">
            {filteredRaces.length} races found
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="w-full p-2 pl-8 bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by name, description, or traits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-[50%] transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-[50%] transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="relative">
            <select
              id="region"
              className="w-full appearance-none p-2 pl-8 pr-8 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-[50%] transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-2 top-[50%] transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Race list */}
      <div className="space-y-4">
        {filteredRaces.length > 0 ? (
          filteredRaces.map((race) => {
            return (
              <Link 
                href={`/races/${race.slug}`} 
                key={race.id}
                className="block group"
              >
                <div className="group relative bg-gradient-to-r from-gray-900/80 to-black/70 backdrop-blur-sm border border-gray-800 hover:border-blue-700/50 rounded-md overflow-hidden transition-all duration-300 transform hover:translate-x-1">
                  <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {race.name}
                      </h3>
                      
                      {/* Region Tags */}
                      {race.regions && race.regions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
                          {race.regions.map(region => (
                            <div key={region} className="inline-flex items-center px-2 py-1 bg-blue-900/20 rounded-md border border-blue-700/30 text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-blue-400">{region}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-400 mb-3">
                      {race.description}
                    </p>
                    
                    {/* Traits */}
                    {race.traits && race.traits.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {race.traits.map((trait, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-800 text-gray-300 px-2 py-1 text-xs rounded-md border border-gray-700"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center py-12 bg-gradient-to-b from-gray-900/40 to-black/60 backdrop-blur-sm border border-gray-800 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <p className="text-gray-500 text-xl">No races found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterRegion('');
              }}
              className="mt-4 px-4 py-2 bg-blue-900/30 text-blue-400 border border-blue-700/30 rounded-md hover:bg-blue-800/40 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}