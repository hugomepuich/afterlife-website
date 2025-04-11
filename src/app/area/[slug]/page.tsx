// src/app/area/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

// For static path generation
export async function generateStaticParams() {
    const areas = getCollection<Area>('areas');
    return areas.map((area) => ({
        slug: area.slug,
    }));
}

export default function AreaDetailPage({ params }: { params: { slug: string } }) {
    const areas = getCollection<Area>('areas');
    const area = areas.find(a => a.slug === params.slug);
    
    if (!area) {
        notFound();
    }
    
    // Get connected areas
    const connectedAreas = area.connectedAreas
        ? areas.filter(a => area.connectedAreas?.includes(a.id))
        : [];
    
    // Get area type details
    const getAreaTypeDetails = (type?: string) => {
        switch(type) {
            case 'city': 
                return { 
                    name: 'Settlement',
                    text: 'text-emerald-400',
                    bg: 'bg-emerald-900/20',
                    border: 'border-emerald-700/40',
                    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                };
            case 'dungeon': 
                return { 
                    name: 'Dungeon',
                    text: 'text-red-400',
                    bg: 'bg-red-900/20',
                    border: 'border-red-700/40',
                    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                };
            case 'peace-zone': 
                return { 
                    name: 'Safe Zone',
                    text: 'text-blue-400',
                    bg: 'bg-blue-900/20',
                    border: 'border-blue-700/40',
                    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            case 'hunt-zone': 
                return { 
                    name: 'Hunting Grounds',
                    text: 'text-amber-400',
                    bg: 'bg-amber-900/20',
                    border: 'border-amber-700/40',
                    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                };
            default: 
                return { 
                    name: 'Unknown',
                    text: 'text-purple-400',
                    bg: 'bg-purple-900/20',
                    border: 'border-purple-700/40',
                    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                };
        }
    };
    
    // Render danger level
    const renderDangerLevel = (level?: number) => {
        if (level === undefined) return null;
        
        let color, label, description;
        if (level === 0) {
            color = "bg-blue-500";
            label = "Safe";
            description = "No threats present. Suitable for all travelers.";
        } else if (level <= 3) {
            color = "bg-green-500";
            label = "Low";
            description = "Minor threats present. Suitable for novice adventurers.";
        } else if (level <= 6) {
            color = "bg-amber-500";
            label = "Medium";
            description = "Moderate threats present. Suitable for experienced adventurers.";
        } else if (level <= 9) {
            color = "bg-red-500";
            label = "High";
            description = "Serious threats present. Only suitable for veteran adventurers.";
        } else {
            color = "bg-purple-500";
            label = "Extreme";
            description = "Deadly threats present. Only the most powerful should enter.";
        }
        
        return (
            <div className="mt-4">
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Danger Assessment</h3>
                <div className="flex items-center mb-2">
                    <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${color} rounded-full`} 
                            style={{ width: `${level * 10}%` }}
                        ></div>
                    </div>
                    <span className={`ml-3 font-bold text-lg ${level === 0 ? 'text-blue-400' : level <= 3 ? 'text-green-400' : level <= 6 ? 'text-amber-400' : level <= 9 ? 'text-red-400' : 'text-purple-400'}`}>
                        {label}
                    </span>
                </div>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        );
    };
    
    const typeDetails = getAreaTypeDetails(area.type);

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-6">
                <Link 
                    href="/area"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4 md:mb-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Areas
                </Link>
                
                <Link 
                    href={`/area/${params.slug}/edit`}
                    className="inline-flex items-center px-4 py-2 bg-blue-800 text-blue-100 rounded-md hover:bg-blue-700 border border-blue-600 transition-colors shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Area
                </Link>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Main area info */}
                <div className="lg:col-span-2">
                    {/* Area banner */}
                    <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
                        {area.previewImage ? (
                            <>
                                <Image 
                                    src={area.previewImage} 
                                    alt={area.name} 
                                    fill 
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
                        )}
                        
                        {/* Type badge */}
                        <div className={`absolute top-4 left-4 ${typeDetails.bg} ${typeDetails.border} px-3 py-1 rounded-full flex items-center shadow-lg`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${typeDetails.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeDetails.icon} />
                            </svg>
                            <span className={`text-xs font-medium ${typeDetails.text}`}>
                                {typeDetails.name}
                            </span>
                        </div>
                        
                        {/* Area name */}
                        <div className="absolute bottom-0 left-0 w-full p-4">
                            <h1 className="text-3xl font-bold text-white drop-shadow-md">{area.name}</h1>
                        </div>
                    </div>
                    
                    {/* Description panel */}
                    <div className="bg-gray-900/95 border border-gray-800 rounded-b-lg p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Description
                            </h2>
                            <p className="text-gray-300 leading-relaxed">{area.description}</p>
                        </div>
                        
                        {area.history && (
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    History
                                </h2>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{area.history}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Connected Areas panel */}
                    {connectedAreas.length > 0 && (
                        <div className="mt-6 bg-gray-900/95 border border-gray-800 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Connected Areas
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {connectedAreas.map(connectedArea => {
                                    const connectedTypeDetails = getAreaTypeDetails(connectedArea.type);
                                    
                                    return (
                                        <Link 
                                            key={connectedArea.id} 
                                            href={`/area/${connectedArea.slug}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-md hover:border-blue-700/50 transition-colors">
                                                <div className={`p-2 rounded-md mr-3 ${connectedTypeDetails.bg}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${connectedTypeDetails.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={connectedTypeDetails.icon} />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                        {connectedArea.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400">{connectedTypeDetails.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Right column - Stats and metadata */}
                <div>
                    {/* Area information card */}
                    <div className="bg-gray-900/95 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-800">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Area Information
                            </h2>
                        </div>
                        
                        <div className="divide-y divide-gray-800/80">
                            {/* Area Type */}
                            <div className="px-4 py-3 flex justify-between items-center">
                                <div className="text-gray-400 text-sm">Type</div>
                                <div className={`${typeDetails.text} font-medium`}>{typeDetails.name}</div>
                            </div>
                            
                            {/* Danger Level */}
                            <div className="px-4 py-3">
                                <div className="text-gray-400 text-sm mb-1">Danger Level</div>
                                {area.dangerLevel !== undefined ? (
                                    renderDangerLevel(area.dangerLevel)
                                ) : (
                                    <div className="text-blue-400 font-medium">Safe Zone</div>
                                )}
                            </div>
                            
                            {/* Connected Areas Count */}
                            <div className="px-4 py-3 flex justify-between items-center">
                                <div className="text-gray-400 text-sm">Connected Areas</div>
                                <div className="text-white font-medium">{connectedAreas.length}</div>
                            </div>
                            
                            {/* Placeholder for additional metadata */}
                            <div className="px-4 py-3 flex justify-between items-center">
                                <div className="text-gray-400 text-sm">First Discovered</div>
                                <div className="text-white font-medium">Unknown</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Location on map placeholder */}
                    <div className="mt-6 bg-gray-900/95 border border-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-800">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Location
                            </h2>
                        </div>
                        
                        <div className="p-4">
                            {/* Map placeholder */}
                            <div className="bg-gray-800 border border-gray-700 rounded-md h-48 flex items-center justify-center">
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    <p className="text-gray-500 text-sm">Map visualization would appear here</p>
                                </div>
                            </div>
                            
                            <Link 
                                href="/area/map"
                                className="mt-3 inline-flex items-center justify-center w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 border border-gray-700 transition-colors text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View on World Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}