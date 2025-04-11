// src/app/races/page.tsx
import Link from 'next/link';
import RaceSearch from '@/components/races/RaceSearch';
import { getCollection } from '@/lib/db';
import { Race } from '@/app/models/race';

export const dynamic = 'force-dynamic'; // To always refresh data

export default function RacesPage() {
  // Retrieve races from our storage system
  const races = getCollection<Race>('races');
  
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Races</h1>
                <p className="text-blue-400 text-sm">Explore the diverse races of our universe</p>
              </div>
            </div>
            
            {/* Right side - Action button */}
            <Link 
              href="/races/new"
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-blue-100 rounded-md hover:bg-blue-700 border border-blue-600 transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Race
            </Link>
          </div>
        </div>
      </div>
      
      {/* Race Stats Summary */}
      <div className="mb-6 bg-gray-900/95 border border-blue-900/30 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Race Distribution
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white mb-1">{races.length}</div>
            <div className="text-sm text-gray-400">Total Races</div>
          </div>
          
          <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white mb-1">
              {new Set(races.flatMap(race => race.regions || [])).size}
            </div>
            <div className="text-sm text-gray-400">Inhabited Regions</div>
          </div>
          
          <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white mb-1">
              {new Set(races.flatMap(race => race.traits)).size}
            </div>
            <div className="text-sm text-gray-400">Unique Traits</div>
          </div>
          
          <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.max(...races.map(race => race.traits ? race.traits.length : 0))}
            </div>
            <div className="text-sm text-gray-400">Max Traits (Single Race)</div>
          </div>
        </div>
      </div>
      
      {/* Race search component */}
      <RaceSearch races={races} />
    </div>
  );
}