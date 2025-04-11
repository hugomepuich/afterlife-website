// src/app/races/[slug]/edit/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RaceForm from '@/components/races/RaceForm';
import { getCollection } from '@/lib/db';
import { Race } from '@/app/models/race';
import { Area } from '@/app/models/area';

export default function EditRacePage({ params }: { params: { slug: string } }) {
  // Get the race to edit and all areas for region selection
  const races = getCollection<Race>('races');
  const race = races.find(r => r.slug === params.slug);
  
  if (!race) {
    notFound();
  }
  
  const areas = getCollection<Area>('areas');
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      <div className="mb-6">
        <Link 
          href={`/races/${params.slug}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {race.name}
        </Link>
      </div>
      
      <div className="bg-gray-900/95 border border-blue-900/30 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-blue-900/30">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Race: {race.name}
          </h1>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-6">
            Update the details for this race. This information will be reflected anywhere this race is referenced throughout the wiki.
          </p>
        </div>
      </div>
      
      <RaceForm initialData={race} isEditing={true} areas={areas} />
    </div>
  );
}