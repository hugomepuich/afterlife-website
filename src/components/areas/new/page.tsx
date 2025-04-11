// src/app/area/new/page.tsx
import Link from 'next/link';
import AreaForm from '@/components/areas/AreaForm';
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

export default function NewAreaPage() {
  // Get all areas for the connected areas selection
  const allAreas = getCollection<Area>('areas');
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      <div className="mb-6">
        <Link 
          href="/area"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Areas
        </Link>
      </div>
      
      <div className="bg-gray-900/95 border border-blue-900/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-blue-900/30">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create New Area
          </h1>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Fill in the details below to add a new area to the universe. Areas can be linked together 
            to form complex regions and networks, allowing explorers to navigate the world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-800/50 p-4 rounded-md border border-gray-700 mb-6">
            <div className="text-center p-3">
              <div className="bg-emerald-900/30 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-emerald-400 font-medium mb-1">Settlements</h3>
              <p className="text-xs text-gray-400">Towns, villages, and cities where travelers can rest.</p>
            </div>
            
            <div className="text-center p-3">
              <div className="bg-red-900/30 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-red-400 font-medium mb-1">Dungeons</h3>
              <p className="text-xs text-gray-400">Dangerous locations filled with enemies and treasures.</p>
            </div>
            
            <div className="text-center p-3">
              <div className="bg-amber-900/30 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-amber-400 font-medium mb-1">Hunting Grounds</h3>
              <p className="text-xs text-gray-400">Open areas where adventurers can hunt creatures.</p>
            </div>
            
            <div className="text-center p-3">
              <div className="bg-blue-900/30 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-blue-400 font-medium mb-1">Safe Zones</h3>
              <p className="text-xs text-gray-400">Protected regions where combat is prohibited.</p>
            </div>
          </div>
        </div>
      </div>
      
      <AreaForm allAreas={allAreas} />
    </div>
  );
}