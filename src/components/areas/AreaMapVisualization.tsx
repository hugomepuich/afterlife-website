// src/components/areas/AreaMapVisualization.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Area } from '@/app/models/area';

interface AreaMapVisualizationProps {
  areas: Area[];
  highlightedAreaId?: string;
  isInteractive?: boolean;
  height?: string;
}

export default function AreaMapVisualization({ 
  areas, 
  highlightedAreaId,
  isInteractive = true,
  height = 'h-64'
}: AreaMapVisualizationProps) {
  const [hoveredArea, setHoveredArea] = useState<Area | null>(null);
  
  // Group areas by type for easier rendering
  const cities = areas.filter(area => area.type === 'city');
  const dungeons = areas.filter(area => area.type === 'dungeon');
  const huntZones = areas.filter(area => area.type === 'hunt-zone');
  const peaceZones = areas.filter(area => area.type === 'peace-zone');
  
  // Generate random positions for areas (in a real app, these would be stored)
  const getRandomPosition = (id: string) => {
    // Use area id to generate consistent positions
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return {
      x: 30 + Math.abs(hash % 60),  // 30-90% width
      y: 20 + Math.abs((hash >> 8) % 60)  // 20-80% height
    };
  };
  
  // Helper to render an area node
  const renderAreaNode = (area: Area) => {
    const pos = getRandomPosition(area.id);
    const isHighlighted = area.id === highlightedAreaId;
    const isHovered = hoveredArea?.id === area.id;
    
    // Determine styling based on area type
    let bgColor, textColor, borderColor;
    switch(area.type) {
      case 'city':
        bgColor = isHighlighted ? 'bg-emerald-500' : 'bg-emerald-700';
        textColor = 'text-emerald-100';
        borderColor = isHighlighted || isHovered ? 'border-emerald-300' : 'border-emerald-600';
        break;
      case 'dungeon':
        bgColor = isHighlighted ? 'bg-red-500' : 'bg-red-700';
        textColor = 'text-red-100';
        borderColor = isHighlighted || isHovered ? 'border-red-300' : 'border-red-600';
        break;
      case 'hunt-zone':
        bgColor = isHighlighted ? 'bg-amber-500' : 'bg-amber-700';
        textColor = 'text-amber-100';
        borderColor = isHighlighted || isHovered ? 'border-amber-300' : 'border-amber-600';
        break;
      case 'peace-zone':
        bgColor = isHighlighted ? 'bg-blue-500' : 'bg-blue-700';
        textColor = 'text-blue-100';
        borderColor = isHighlighted || isHovered ? 'border-blue-300' : 'border-blue-600';
        break;
      default:
        bgColor = isHighlighted ? 'bg-gray-500' : 'bg-gray-700';
        textColor = 'text-gray-100';
        borderColor = isHighlighted || isHovered ? 'border-gray-300' : 'border-gray-600';
    }
    
    // Calculate size based on danger level
    const baseSize = area.dangerLevel ? 6 + area.dangerLevel / 2 : 6;
    const size = isHighlighted ? baseSize + 4 : baseSize;
    
    return (
      <div 
        key={area.id}
        className={`absolute ${bgColor} ${textColor} rounded-full shadow-lg border-2 ${borderColor} transform transition-all duration-300 cursor-pointer ${isHighlighted ? 'z-20 scale-110' : 'z-10'}`}
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: isHighlighted || isHovered ? 'scale(1.2)' : 'scale(1)'
        }}
        onMouseEnter={() => setHoveredArea(area)}
        onMouseLeave={() => setHoveredArea(null)}
      >
        {(isHovered || isHighlighted) && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-black/80 px-2 py-1 rounded text-xs">
            {area.name}
          </div>
        )}
      </div>
    );
  };
  
  // Render connections between areas
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    areas.forEach(area => {
      if (area.connectedAreas && area.connectedAreas.length > 0) {
        area.connectedAreas.forEach(connectedId => {
          // Only render each connection once (smaller ID first)
          if (area.id < connectedId) {
            const connectedArea = areas.find(a => a.id === connectedId);
            if (connectedArea) {
              const pos1 = getRandomPosition(area.id);
              const pos2 = getRandomPosition(connectedId);
              
              // Determine if this connection involves the highlighted area
              const isHighlighted = area.id === highlightedAreaId || connectedId === highlightedAreaId;
              
              connections.push(
                <svg 
                  key={`${area.id}-${connectedId}`} 
                  className="absolute top-0 left-0 w-full h-full z-0"
                >
                  <line 
                    x1={`${pos1.x}%`} 
                    y1={`${pos1.y}%`} 
                    x2={`${pos2.x}%`} 
                    y2={`${pos2.y}%`} 
                    className={`${isHighlighted ? 'stroke-blue-400 stroke-2' : 'stroke-gray-600 stroke-1'}`}
                  />
                </svg>
              );
            }
          }
        });
      }
    });
    
    return connections;
  };
  
  return (
    <div className={`relative ${height} w-full bg-gray-900 border border-gray-800 rounded-md overflow-hidden`}>
      {/* Map background with grid */}
      <div className="absolute inset-0 bg-[url('/images/map-grid.png')] opacity-10"></div>
      
      {/* Render connections */}
      {renderConnections()}
      
      {/* Render area nodes */}
      {cities.map(area => renderAreaNode(area))}
      {dungeons.map(area => renderAreaNode(area))}
      {huntZones.map(area => renderAreaNode(area))}
      {peaceZones.map(area => renderAreaNode(area))}
      
      {/* Hover tooltip */}
      {hoveredArea && !highlightedAreaId && isInteractive && (
        <div className="absolute bottom-4 left-4 bg-black/70 p-3 rounded shadow-lg max-w-xs">
          <div className="flex items-center mb-2">
            <h3 className="font-medium text-white">{hoveredArea.name}</h3>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              hoveredArea.type === 'city' ? 'bg-emerald-900/60 text-emerald-300' :
              hoveredArea.type === 'dungeon' ? 'bg-red-900/60 text-red-300' :
              hoveredArea.type === 'hunt-zone' ? 'bg-amber-900/60 text-amber-300' :
              hoveredArea.type === 'peace-zone' ? 'bg-blue-900/60 text-blue-300' :
              'bg-gray-900/60 text-gray-300'
            }`}>
              {hoveredArea.type === 'city' ? 'Settlement' :
               hoveredArea.type === 'dungeon' ? 'Dungeon' :
               hoveredArea.type === 'hunt-zone' ? 'Hunting Grounds' :
               hoveredArea.type === 'peace-zone' ? 'Safe Zone' :
               hoveredArea.type}
            </span>
          </div>
          <p className="text-xs text-gray-300 line-clamp-2">{hoveredArea.description}</p>
          {isInteractive && (
            <Link 
              href={`/area/${hoveredArea.slug}`}
              className="mt-2 inline-block text-xs text-blue-400 hover:text-blue-300"
            >
              View details →
            </Link>
          )}
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-black/50 p-1 rounded text-xs flex gap-3">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span>
          <span className="text-gray-300">City</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
          <span className="text-gray-300">Dungeon</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
          <span className="text-gray-300">Hunt</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
          <span className="text-gray-300">Safe</span>
        </div>
      </div>
    </div>
  );
}