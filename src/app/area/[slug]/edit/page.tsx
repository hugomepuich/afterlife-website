// src/app/area/[slug]/edit/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AreaForm from '@/components/areas/AreaForm';
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

export default async function EditAreaPage({ params }: { params: { slug: string } }) {
  // Get the area to edit and all areas for the connected areas selection
  const areas = getCollection<Area>('areas');
  const area = areas.find(a => a.slug === params.slug);
  
  if (!area) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      <div className="mb-6">
        <Link 
          href={`/area/${params.slug}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {area.name}
        </Link>
      </div>
      
      <div className="bg-gray-900/95 border border-blue-900/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-blue-900/30">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Area: {area.name}
          </h1>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Update the details for this area below. Changes will be reflected throughout the wiki
            where this area is referenced or connected.
          </p>
          
          {/* Area Type Details */}
          <div className={`p-4 rounded-md border mb-6 ${
            area.type === 'city' ? 'bg-emerald-900/20 border-emerald-700/40' :
            area.type === 'dungeon' ? 'bg-red-900/20 border-red-700/40' :
            area.type === 'hunt-zone' ? 'bg-amber-900/20 border-amber-700/40' :
            area.type === 'peace-zone' ? 'bg-blue-900/20 border-blue-700/40' :
            'bg-gray-800/50 border-gray-700'
          }`}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${
                area.type === 'city' ? 'text-emerald-400' :
                area.type === 'dungeon' ? 'text-red-400' :
                area.type === 'hunt-zone' ? 'text-amber-400' :
                area.type === 'peace-zone' ? 'text-blue-400' :
                'text-gray-400'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                  area.type === 'city' ? 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' :
                  area.type === 'dungeon' ? 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' :
                  area.type === 'hunt-zone' ? 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' :
                  area.type === 'peace-zone' ? 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' :
                  'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                } />
              </svg>
              <div>
                <span className={`font-medium ${
                  area.type === 'city' ? 'text-emerald-400' :
                  area.type === 'dungeon' ? 'text-red-400' :
                  area.type === 'hunt-zone' ? 'text-amber-400' :
                  area.type === 'peace-zone' ? 'text-blue-400' :
                  'text-gray-400'
                }`}>
                  Current Type: {
                    area.type === 'city' ? 'Settlement' :
                    area.type === 'dungeon' ? 'Dungeon' :
                    area.type === 'hunt-zone' ? 'Hunting Grounds' :
                    area.type === 'peace-zone' ? 'Safe Zone' :
                    'Unknown'
                  }
                </span>
                <p className="text-xs text-gray-400 mt-1">You can change the area type below if needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AreaForm 
        initialData={area} 
        isEditing={true} 
        allAreas={areas.filter(a => a.id !== area.id)} 
      />
    </div>
  );
}