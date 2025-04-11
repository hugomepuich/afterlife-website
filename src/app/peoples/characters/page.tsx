// /src/app/peoples/characters/page.tsx
import Link from 'next/link';
import CharacterSearch from '@/components/characters/CharacterSearch';
import { getCollection } from '@/lib/db';
import { Character } from '@/lib/data/characters';

export const dynamic = 'force-dynamic'; // To always refresh data

export default function CharactersPage() {
  // Retrieve characters from our storage system
  const characters = getCollection<Character>('characters');
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      {/* Compact floating action header */}
      <div className="sticky top-16 z-30 mb-6 backdrop-blur-md">
        <div className="bg-gray-900/95 border border-blue-900/30 shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-wrap items-center justify-between p-4">
            {/* Left side - Page title with icon */}
            <div className="flex items-center">
              <div className="bg-blue-900/50 p-2 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Characters</h1>
                <p className="text-blue-400 text-sm">Explore the notable individuals of our universe</p>
              </div>
            </div>
            
            {/* Right side - Action button */}
            <Link 
              href="/peoples/characters/new"
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-blue-100 rounded-md hover:bg-blue-700 border border-blue-600 transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Character
            </Link>
          </div>
        </div>
      </div>
      
      {/* Character search component */}
      <CharacterSearch characters={characters} />
    </div>
  );
}