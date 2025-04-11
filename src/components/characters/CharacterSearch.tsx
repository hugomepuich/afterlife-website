// /app/components/characters/CharacterSearch.tsx
'use client';

import { useState, useMemo } from 'react';
import { Character } from '@/app/models/people';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterSearchProps {
  characters: Character[];
}

export default function CharacterSearch({ characters }: CharacterSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRace, setFilterRace] = useState('');
  const [filterKarma, setFilterKarma] = useState('');
  
  // Get unique races for filter dropdown
  const races = Array.from(new Set(characters.map(char => char.race))).sort();
  
  // Filter and sort characters alphabetically
  const filteredCharacters = useMemo(() => {
    return characters
      .filter(character => {
        const matchesSearch = 
          character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (character.surname && character.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          character.description.toLowerCase().includes(searchTerm.toLowerCase());
          
        const matchesRace = filterRace ? character.race === filterRace : true;
        const matchesKarma = filterKarma ? character.karma === filterKarma : true;
        
        return matchesSearch && matchesRace && matchesKarma;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
  }, [characters, searchTerm, filterRace, filterKarma]);
  
  // Function to determine karma styling
  const getKarmaDetails = (karma?: string) => {
    switch(karma) {
      case 'good': 
          return { 
              text: 'text-emerald-400',
              bg: 'bg-emerald-900/20',
              border: 'border-emerald-700/40',
              icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          };
      case 'bad': 
          return { 
              text: 'text-red-400',
              bg: 'bg-red-900/20',
              border: 'border-red-700/40',
              icon: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          };
      default: 
          return { 
              text: 'text-blue-400',
              bg: 'bg-blue-900/20',
              border: 'border-blue-700/40',
              icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300">
      {/* Background design elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/95 to-black/95"></div>
        
        {/* Decorative border elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-900/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-900/50 to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Search panel */}
        <div className="bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 rounded-md p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Characters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
                Search by name or description
              </label>
              <input
                type="text"
                id="search"
                className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="race" className="block text-sm font-medium text-gray-400 mb-1">
                Filter by Race
              </label>
              <select
                id="race"
                className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                value={filterRace}
                onChange={(e) => setFilterRace(e.target.value)}
              >
                <option value="">All Races</option>
                {races.map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="karma" className="block text-sm font-medium text-gray-400 mb-1">
                Filter by Karma
              </label>
              <select
                id="karma"
                className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                value={filterKarma}
                onChange={(e) => setFilterKarma(e.target.value)}
              >
                <option value="">All</option>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="bad">Evil</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Character list */}
        <div className="space-y-4">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => {
              const karmaDetails = getKarmaDetails(character.karma);
              
              return (
                <Link 
                  href={`/peoples/characters/${character.slug}`} 
                  key={character.id}
                  className="block group"
                >
                  <div className="group relative bg-gradient-to-r from-gray-900/80 to-black/70 backdrop-blur-sm border border-gray-800 hover:border-blue-700/50 rounded-md overflow-hidden transition-all duration-300 transform hover:translate-x-1">
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-center p-4">
                      {/* Character Image (if available) */}
                      <div className="hidden md:block w-16 h-16 mr-4 relative flex-shrink-0">
                        {character.previewImage ? (
                          <div className="relative w-full h-full overflow-hidden border border-gray-700 rounded-md">
                            <Image 
                              src={character.previewImage} 
                              alt={character.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="transition-all duration-500 group-hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-md border border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Character details */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {character.name}
                            {character.surname && (
                              <span className="text-blue-400 ml-2 opacity-80">{character.surname}</span>
                            )}
                          </h3>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
                            {/* Race Tag */}
                            <div className="inline-flex items-center px-2 py-1 bg-blue-900/20 rounded-md border border-blue-700/30 text-xs">
                              <span className="text-blue-400">{character.race}</span>
                            </div>
                            
                            {/* Affiliation Tag */}
                            {character.affiliation && (
                              <div className="inline-flex items-center px-2 py-1 bg-blue-900/20 rounded-md border border-blue-700/30 text-xs">
                                <span className="text-blue-400">{character.affiliation}</span>
                              </div>
                            )}
                            
                            {/* Karma Tag */}
                            {character.karma && (
                              <div className={`inline-flex items-center px-2 py-1 ${karmaDetails.bg} rounded-md border ${karmaDetails.border} text-xs`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 mr-1 ${karmaDetails.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={karmaDetails.icon} />
                                </svg>
                                <span className={karmaDetails.text}>
                                  {character.karma === 'good' ? 'Good' :
                                  character.karma === 'bad' ? 'Evil' : 'Neutral'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-400 line-clamp-2">
                          {character.description}
                        </p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="ml-4 text-gray-500 group-hover:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="text-center py-12 bg-gradient-to-b from-gray-900/40 to-black/60 backdrop-blur-sm border border-gray-800 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-xl">No characters found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterRace('');
                  setFilterKarma('');
                }}
                className="mt-4 px-4 py-2 bg-blue-900/30 text-blue-400 border border-blue-700/30 rounded-md hover:bg-blue-800/40 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}