// src/app/area/page.tsx
import Link from 'next/link';
import AreaSearch from '@/components/areas/AreaSearch';
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

export const dynamic = 'force-dynamic'; // To always refresh data

export default function AreasPage() {
  // Retrieve areas from our storage system
  const areas = getCollection<Area>('areas');
  
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Areas</h1>
                <p className="text-blue-400 text-sm">Explore settlements, dungeons, and regions</p>
              </div>
            </div>
            
            {/* Right side - Action button */}
            <Link 
              href="/area/new"
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-blue-100 rounded-md hover:bg-blue-700 border border-blue-600 transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Area
            </Link>
          </div>
        </div>
      </div>
      
      {/* Area Map Visualization (compact) */}
      <div className="mb-6 bg-gray-900/95 border border-blue-900/30 shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            World Map
          </h2>
          <Link 
            href="/area/map"
            className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center"
          >
            View Full Map
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="relative h-32 overflow-hidden bg-gray-800 border-t border-gray-700">
          {/* Placeholder for map visualization - in a real app, this would be an interactive map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 text-sm">
              Interactive map visualization would appear here
            </div>
          </div>
          
          {/* Area type indicators */}
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center gap-4 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-emerald-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-300">Cities</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-red-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-300">Dungeons</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-amber-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-300">Hunting Grounds</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-blue-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-300">Safe Zones</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Area Stats Summary */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gray-900/95 border border-emerald-900/30 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="bg-emerald-900/30 p-2 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">
            {areas.filter(area => area.type === 'city').length}
          </span>
          <span className="text-xs text-emerald-400">Settlements</span>
        </div>
        
        <div className="bg-gray-900/95 border border-red-900/30 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="bg-red-900/30 p-2 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">
            {areas.filter(area => area.type === 'dungeon').length}
          </span>
          <span className="text-xs text-red-400">Dungeons</span>
        </div>
        
        <div className="bg-gray-900/95 border border-amber-900/30 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="bg-amber-900/30 p-2 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">
            {areas.filter(area => area.type === 'hunt-zone').length}
          </span>
          <span className="text-xs text-amber-400">Hunting Grounds</span>
        </div>
        
        <div className="bg-gray-900/95 border border-blue-900/30 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="bg-blue-900/30 p-2 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">
            {areas.filter(area => area.type === 'peace-zone').length}
          </span>
          <span className="text-xs text-blue-400">Safe Zones</span>
        </div>
      </div>
      
      {/* Area search component */}
      <AreaSearch areas={areas} />
    </div>
  );
}