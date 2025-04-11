// src/app/races/new/page.tsx
import Link from 'next/link';
import RaceForm from '@/components/races/RaceForm';
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

export default function NewRacePage() {
  // Get all areas for region selection
  const areas = getCollection<Area>('areas');
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      <div className="mb-6">
        <Link 
          href="/races"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Races
        </Link>
      </div>
      
      <div className="bg-gray-900/95 border border-blue-900/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-blue-900/30">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create New Race
          </h1>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-6">
            Add a new race to the universe by filling out the details below. Define traits, history, and inhabited regions to create a rich cultural background.
          </p>
        </div>
      </div>
      
      <RaceForm areas={areas} />
    </div>
  );
}