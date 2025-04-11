// /app/components/characters/CharacterSearch.tsx
'use client';

import { useState } from 'react';
import { Character } from '@/app/models/people';
import Link from 'next/link';

interface CharacterSearchProps {
  characters: Character[];
}

export default function CharacterSearch({ characters }: CharacterSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRace, setFilterRace] = useState('');
  const [filterKarma, setFilterKarma] = useState('');
  
  // Get unique races for filter dropdown
  const races = Array.from(new Set(characters.map(char => char.race)));
  
  const filteredCharacters = characters.filter(character => {
    const matchesSearch = 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (character.surname && character.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      character.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRace = filterRace ? character.race === filterRace : true;
    const matchesKarma = filterKarma ? character.karma === filterKarma : true;
    
    return matchesSearch && matchesRace && matchesKarma;
  });
  
  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="race" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Race
            </label>
            <select
              id="race"
              className="w-full p-2 border border-gray-300 rounded-md"
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
            <label htmlFor="karma" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Karma
            </label>
            <select
              id="karma"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filterKarma}
              onChange={(e) => setFilterKarma(e.target.value)}
            >
              <option value="">All</option>
              <option value="good">Good</option>
              <option value="neutral">Neutral</option>
              <option value="bad">Bad</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <Link 
              href={`/peoples/characters/${character.slug}`} 
              key={character.id}
              className="block"
            >
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
                <h2 className="text-xl font-bold mb-2">
                  {character.name} {character.surname}
                </h2>
                <div className="text-sm text-gray-500 mb-2">
                  <span className="mr-2">Race: {character.race}</span>
                  {character.affiliation && (
                    <span>• Affiliation: {character.affiliation}</span>
                  )}
                </div>
                <p className="text-gray-600 line-clamp-3">{character.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-6">
            <p className="text-gray-500">No characters found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}