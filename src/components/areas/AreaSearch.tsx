// src/components/areas/AreaSearch.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Area, AreaType } from '@/app/models/area';

interface AreaSearchProps {
  areas: Area[];
}

export default function AreaSearch({ areas }: AreaSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterDanger, setFilterDanger] = useState<string>('');
  
  // Get unique area types for filter dropdown
  const areaTypes = useMemo(() => {
    const types = Array.from(new Set(areas.map(area => area.type)));
    return types.sort();
  }, [areas]);
  
  // Filter and sort areas alphabetically
  const filteredAreas = useMemo(() => {
    return areas
      .filter(area => {
        const matchesSearch = 
          area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          area.description.toLowerCase().includes(searchTerm.toLowerCase());
          
        const matchesType = filterType ? area.type === filterType : true;
        
        // Filter by danger level if applicable
        let matchesDanger = true;
        if (filterDanger) {
          if (filterDanger === 'low' && area.dangerLevel && area.dangerLevel > 3) {
            matchesDanger = false;
          } else if (filterDanger === 'medium' && area.dangerLevel && (area.dangerLevel < 4 || area.dangerLevel > 6)) {
            matchesDanger = false;
          } else if (filterDanger === 'high' && area.dangerLevel && area.dangerLevel < 7) {
            matchesDanger = false;
          } else if (filterDanger === 'none' && area.dangerLevel) {
            matchesDanger = false;
          }
        }
        
        return matchesSearch && matchesType && matchesDanger;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
  }, [areas, searchTerm, filterType, filterDanger]);
  
  // Function to determine area type styling
  const getAreaTypeDetails = (type?: AreaType) => {
    switch(type) {
      case 'city': 
          return { 
              text: 'text-emerald-400',
              bg: 'bg-emerald-900/20',
              border: 'border-emerald-700/40',
              icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          };
      case 'dungeon': 
          return { 
              text: 'text-red-400',
              bg: 'bg-red-900/20',
              border: 'border-red-700/40',
              icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
          };
      case 'peace-zone': 
          return { 
              text: 'text-blue-400',
              bg: 'bg-blue-900/20',
              border: 'border-blue-700/40',
              icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          };
      case 'hunt-zone': 
          return { 
              text: 'text-amber-400',
              bg: 'bg-amber-900/20',
              border: 'border-amber-700/40',
              icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
          };
      default: 
          return { 
              text: 'text-purple-400',
              bg: 'bg-purple-900/20',
              border: 'border-purple-700/40',
              icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
          };
    }
  };

  // Function to render danger level indicator
  const renderDangerLevel = (level?: number) => {
    if (level === undefined) return null;
    
    let color, label;
    if (level === 0) {
      color = "bg-blue-500";
      label = "Safe";
    } else if (level <= 3) {
      color = "bg-green-500";
      label = "Low";
    } else if (level <= 6) {
      color = "bg-amber-500";
      label = "Medium";
    } else if (level <= 9) {
      color = "bg-red-500";
      label = "High";
    } else {
      color = "bg-purple-500";
      label = "Extreme";
    }
    
    return (
      <div className="flex items-center">
        <span className="text-xs uppercase tracking-wider mr-2">Danger:</span>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-4 mx-0.5 ${i < Math.ceil(level / 2) ? color : 'bg-gray-700'}`}
            ></div>
          ))}
        </div>
        <span className="ml-2 text-xs">{label}</span>
      </div>
    );
  };

  return (
    <div className="w-full text-gray-300">      
      {/* Search filters - collapsible panel */}
      <div className="bg-gray-900/95 border border-blue-900/40 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search & Filter Areas
          </h2>
          
          {/* Area count */}
          <div className="bg-blue-900/30 px-3 py-1 rounded-full text-xs text-blue-300 border border-blue-800/30">
            {filteredAreas.length} areas found
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="w-full p-2 pl-8 bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by name or description..."
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
              id="type"
              className="w-full appearance-none p-2 pl-8 pr-8 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Area Types</option>
              {areaTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'city' ? 'City/Settlement' : 
                   type === 'dungeon' ? 'Dungeon' : 
                   type === 'hunt-zone' ? 'Hunting Grounds' : 
                   type === 'peace-zone' ? 'Safe Zone' : 
                   type}
                </option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-[50%] transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-2 top-[50%] transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className="relative">
            <select
              id="danger"
              className="w-full appearance-none p-2 pl-8 pr-8 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              value={filterDanger}
              onChange={(e) => setFilterDanger(e.target.value)}
            >
              <option value="">All Danger Levels</option>
              <option value="none">Safe (No Danger)</option>
              <option value="low">Low Danger (1-3)</option>
              <option value="medium">Medium Danger (4-6)</option>
              <option value="high">High Danger (7-10)</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-[50%] transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-2 top-[50%] transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Area list */}
      <div className="space-y-4">
        {filteredAreas.length > 0 ? (
          filteredAreas.map((area) => {
            const typeDetails = getAreaTypeDetails(area.type);
            
            return (
              <Link 
                href={`/area/${area.slug}`} 
                key={area.id}
                className="block group"
              >
                <div className="group relative bg-gradient-to-r from-gray-900/80 to-black/70 backdrop-blur-sm border border-gray-800 hover:border-blue-700/50 rounded-md overflow-hidden transition-all duration-300 transform hover:translate-x-1">
                  <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-stretch p-0">
                    {/* Area Type Indicator */}
                    <div className={`${typeDetails.bg} ${typeDetails.border} flex items-center justify-center px-4 border-r border-gray-800`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${typeDetails.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeDetails.icon} />
                      </svg>
                    </div>
                    
                    <div className="flex-grow p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {area.name}
                        </h3>
                        
                        {/* Area Tags */}
                        <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
                          {/* Area Type Tag */}
                          <div className={`inline-flex items-center px-2 py-1 ${typeDetails.bg} rounded-md border ${typeDetails.border} text-xs`}>
                            <span className={typeDetails.text}>
                              {area.type === 'city' ? 'Settlement' : 
                               area.type === 'dungeon' ? 'Dungeon' : 
                               area.type === 'hunt-zone' ? 'Hunting Grounds' : 
                               area.type === 'peace-zone' ? 'Safe Zone' : 
                               area.type}
                            </span>
                          </div>
                          
                          {/* Connected Areas Indicator */}
                          {area.connectedAreas && area.connectedAreas.length > 0 && (
                            <div className="inline-flex items-center px-2 py-1 bg-blue-900/20 rounded-md border border-blue-700/30 text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                              </svg>
                              <span className="text-blue-400">{area.connectedAreas.length} connected area{area.connectedAreas.length !== 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-between">
                        <p className="text-gray-400 line-clamp-2 md:w-3/4">
                          {area.description}
                        </p>
                        
                        {/* Danger Level Indicator */}
                        <div className="mt-2 md:mt-0">
                          {renderDangerLevel(area.dangerLevel)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="flex items-center px-4 text-gray-500 group-hover:text-blue-400 transition-colors border-l border-gray-800">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-gray-500 text-xl">No areas found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setFilterDanger('');
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