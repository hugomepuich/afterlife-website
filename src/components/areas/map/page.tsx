// src/app/area/map/page.tsx
import Link from 'next/link';
import AreaMapVisualization from '@/components/areas/AreaMapVisualization';
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

export default function WorldMapPage() {
  // Get all areas
  const areas = getCollection<Area>('areas');
  
  // Get stats for each area type
  const cityCount = areas.filter(area => area.type === 'city').length;
  const dungeonCount = areas.filter(area => area.type === 'dungeon').length;
  const huntZoneCount = areas.filter(area => area.type === 'hunt-zone').length;
  const peaceZoneCount = areas.filter(area => area.type === 'peace-zone').length;
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <Link 
            href="/area"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Areas
          </Link>
          <h1 className="text-2xl font-bold text-white">World Map</h1>
          <p className="text-blue-400 text-sm">Visual overview of all areas and their connections</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="bg-emerald-900/30 border border-emerald-800/30 rounded-md px-3 py-1">
            <span className="text-xs text-gray-400">Settlements</span>
            <div className="text-lg font-bold text-emerald-400">{cityCount}</div>
          </div>
          
          <div className="bg-red-900/30 border border-red-800/30 rounded-md px-3 py-1">
            <span className="text-xs text-gray-400">Dungeons</span>
            <div className="text-lg font-bold text-red-400">{dungeonCount}</div>
          </div>
          
          <div className="bg-amber-900/30 border border-amber-800/30 rounded-md px-3 py-1">
            <span className="text-xs text-gray-400">Hunting Grounds</span>
            <div className="text-lg font-bold text-amber-400">{huntZoneCount}</div>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/30 rounded-md px-3 py-1">
            <span className="text-xs text-gray-400">Safe Zones</span>
            <div className="text-lg font-bold text-blue-400">{peaceZoneCount}</div>
          </div>
        </div>
      </div>
      
      {/* Main map visualization */}
      <div className="bg-gray-900/95 border border-blue-900/30 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-blue-900/30">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Interactive World Map
          </h2>
        </div>
        
        <div className="p-6">
          <div className="mb-4 text-gray-300 text-sm">
            Hover over locations to view details. Click on a location to visit its page.
            Connections between areas are represented by lines.
          </div>
          
          {/* Full-size map */}
          <AreaMapVisualization 
            areas={areas} 
            height="h-[600px]"
          />
          
          <div className="mt-4 text-gray-500 text-xs">
            Note: Area positions are approximated for visualization purposes.
          </div>
        </div>
      </div>
      
      {/* Area List - Compact view */}
      <div className="mt-8 bg-gray-900/95 border border-blue-900/30 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-blue-900/30">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Area Directory
          </h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {areas.map(area => {
              // Styling based on area type
              const typeStyles = area.type === 'city' ? 'border-emerald-700/40 text-emerald-400' :
                               area.type === 'dungeon' ? 'border-red-700/40 text-red-400' :
                               area.type === 'hunt-zone' ? 'border-amber-700/40 text-amber-400' :
                               area.type === 'peace-zone' ? 'border-blue-700/40 text-blue-400' :
                               'border-gray-700 text-gray-400';
              
              return (
                <Link 
                  key={area.id}
                  href={`/area/${area.slug}`}
                  className="block"
                >
                  <div className={`p-3 bg-gray-800/50 border ${typeStyles} rounded-md hover:bg-gray-800 transition-colors`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{area.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">{area.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-xs uppercase">
                          {area.type === 'city' ? 'Settlement' :
                           area.type === 'dungeon' ? 'Dungeon' :
                           area.type === 'hunt-zone' ? 'Hunting' :
                           area.type === 'peace-zone' ? 'Safe Zone' :
                           area.type}
                        </span>
                        
                        {area.dangerLevel !== undefined && (
                          <div className="mt-1 flex items-center">
                            <div className="h-1.5 w-12 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  area.dangerLevel === 0 ? 'bg-blue-500' :
                                  area.dangerLevel <= 3 ? 'bg-green-500' :
                                  area.dangerLevel <= 6 ? 'bg-amber-500' :
                                  area.dangerLevel <= 9 ? 'bg-red-500' :
                                  'bg-purple-500'
                                }`}
                                style={{ width: `${area.dangerLevel * 10}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}