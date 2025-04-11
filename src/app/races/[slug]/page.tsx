// src/app/races/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/db';
import { Race } from '@/app/models/race';
import { Area } from '@/app/models/area';

export async function generateStaticParams() {
    const races = getCollection<Race>('races');
    return races.map((race) => ({
        slug: race.slug,
    }));
}

export default function RaceDetailPage({ params }: { params: { slug: string } }) {
    const races = getCollection<Race>('races');
    const race = races.find(r => r.slug === params.slug);
    
    if (!race) {
        notFound();
    }
    
    // Get areas where this race is present
    const areas = getCollection<Area>('areas');
    const raceRegions = race.regions 
        ? areas.filter(area => race.regions?.includes(area.id))
        : [];
    
    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-6">
                <Link 
                    href="/races"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4 md:mb-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Races
                </Link>
                
                <Link 
                    href={`/races/${params.slug}/edit`}
                    className="inline-flex items-center px-4 py-2 bg-blue-800 text-blue-100 rounded-md hover:bg-blue-700 border border-blue-600 transition-colors shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Race
                </Link>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Main race info */}
                <div className="lg:col-span-2">
                    {/* Race banner */}
                    <div className="bg-gray-900/95 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="relative h-60 w-full">
                            {race.image ? (
                                <>
                                    <Image 
                                        src={race.image} 
                                        alt={race.name} 
                                        fill 
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                    </svg>
                                </div>
                            )}
                            
                            {/* Race name */}
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <h1 className="text-3xl font-bold text-white drop-shadow-md">{race.name}</h1>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div className="p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Description
                                </h2>
                                <p className="text-gray-300 leading-relaxed">{race.description}</p>
                            </div>
                            
                            {race.history && (
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        History
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{race.history}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Inhabited Regions */}
                    {raceRegions.length > 0 && (
                        <div className="mt-6 bg-gray-900/95 border border-gray-800 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Inhabited Regions
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {raceRegions.map(area => {
                                    // Style based on area type
                                    const typeStyles = 
                                        area.type === 'city' ? 'border-emerald-700/40 text-emerald-400' :
                                        area.type === 'dungeon' ? 'border-red-700/40 text-red-400' :
                                        area.type === 'hunt-zone' ? 'border-amber-700/40 text-amber-400' :
                                        area.type === 'peace-zone' ? 'border-blue-700/40 text-blue-400' :
                                        'border-gray-700 text-gray-400';
                                    
                                    return (
                                        <Link 
                                            key={area.id}
                                            href={`/area/${area.slug}`}
                                            className="block group"
                                        >
                                            <div className={`p-3 bg-gray-800/50 border ${typeStyles} rounded-md hover:bg-gray-800 transition-colors`}>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                            {area.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-400">
                                                            {area.type === 'city' ? 'Settlement' :
                                                             area.type === 'dungeon' ? 'Dungeon' :
                                                             area.type === 'hunt-zone' ? 'Hunting Grounds' :
                                                             area.type === 'peace-zone' ? 'Safe Zone' :
                                                             area.type}
                                                        </p>
                                                    </div>
                                                    
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Right column - Stats and traits */}
                <div>
                    {/* Race traits card */}
                    <div className="bg-gray-900/95 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-800">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                </svg>
                                Racial Traits
                            </h2>
                        </div>
                        
                        <div className="p-5">
                            <ul className="space-y-3">
                                {race.traits.map((trait, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="bg-blue-900/30 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">
                                            <span className="text-xs">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-medium text-white">{trait}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Race statistics */}
                    <div className="mt-6 bg-gray-900/95 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-800">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                                Race Information
                            </h2>
                        </div>
                        
                        <div className="divide-y divide-gray-800/80">
                            {/* Trait Count */}
                            <div className="px-4 py-3 flex justify-between items-center">
                                <div className="text-gray-400 text-sm">Traits</div>
                                <div className="text-white font-medium">{race.traits.length}</div>
                            </div>
                            
                            {/* Region Count */}
                            <div className="px-4 py-3 flex justify-between items-center">
                                <div className="text-gray-400 text-sm">Inhabited Regions</div>
                                <div className="text-white font-medium">{raceRegions.length}</div>
                            </div>
                            
                            {/* Sample Characters */}
                            <div className="px-4 py-3">
                                <div className="text-gray-400 text-sm mb-1">Notable Characters</div>
                                <div className="text-center py-2">
                                    <Link href="/peoples/characters" className="text-blue-400 hover:text-blue-300 text-sm">
                                        View characters of this race →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}