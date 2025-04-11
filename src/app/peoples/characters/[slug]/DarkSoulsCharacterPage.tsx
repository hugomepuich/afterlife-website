'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type CharacterData = {
    name: string;
    surname?: string;
    slug: string;
    race: string;
    affiliation?: string;
    age?: number;
    karma?: string;
    description: string;
    history?: string;
    previewImage?: string;
    additionalImages?: string[];
}

type DarkSoulsCharacterPageProps = {
    character: CharacterData;
}

export default function DarkSoulsCharacterPage({ character }: DarkSoulsCharacterPageProps) {
    const [isFloating, setIsFloating] = useState(true);

    // Set up the floating animation
    useEffect(() => {
        const floatTimer = setInterval(() => {
            setIsFloating(prev => !prev);
        }, 4000);
        
        return () => clearInterval(floatTimer);
    }, []);

    // Toutes les images disponibles pour le personnage
    const allImages = [
        ...(character.previewImage ? [character.previewImage] : []),
        ...(character.additionalImages || [])
    ];
    
    // Sélectionner une image aléatoire pour le header depuis la galerie
    const getRandomImage = () => {
        if (character.additionalImages && character.additionalImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * character.additionalImages.length);
            return character.additionalImages[randomIndex];
        }
        return character.previewImage;
    };
    
    const headerImage = getRandomImage();

    // Fonction pour déterminer la couleur et l'icône basées sur le karma
    const getKarmaDetails = (karma: string) => {
        switch(karma) {
            case 'good': 
                return { 
                    bg: 'from-emerald-950 to-teal-950', 
                    border: 'border-emerald-800', 
                    text: 'text-emerald-400',
                    glow: 'shadow-emerald-900/50',
                    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            case 'bad': 
                return { 
                    bg: 'from-red-950 to-rose-950', 
                    border: 'border-red-900', 
                    text: 'text-red-400',
                    glow: 'shadow-red-900/50',
                    icon: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            default: 
                return { 
                    bg: 'from-zinc-900 to-stone-950', 
                    border: 'border-zinc-800', 
                    text: 'text-zinc-400',
                    glow: 'shadow-zinc-900/50',
                    icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
        }
    };

    const karmaDetails = character.karma ? getKarmaDetails(character.karma) : getKarmaDetails('neutral');

    return (
        <div className="min-h-screen bg-[#090909] text-stone-300">
            {/* Dark Souls Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {headerImage && (
                    <div className="absolute inset-0">
                        {/* Dark Souls inspired gradient with fog effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0908]/90 to-[#171614]/70 z-10 mix-blend-multiply"></div>
                        <Image 
                            src={headerImage} 
                            alt=""
                            fill
                            className="object-cover object-center filter contrast-125 brightness-50 saturate-50 sepia-[0.15] opacity-40"
                            priority
                        />
                        
                        {/* Animated ember particles effect */}
                        <div className="absolute inset-0 z-20 opacity-30 pointer-events-none">
                            <div className="absolute w-1 h-1 rounded-full bg-amber-500 animate-ember-float1 left-[10%] top-[20%]"></div>
                            <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-400 animate-ember-float2 left-[25%] top-[40%]"></div>
                            <div className="absolute w-1 h-1 rounded-full bg-amber-600 animate-ember-float3 left-[65%] top-[35%]"></div>
                            <div className="absolute w-[3px] h-[3px] rounded-full bg-amber-300 animate-ember-float1 left-[80%] top-[15%]"></div>
                            <div className="absolute w-1 h-1 rounded-full bg-amber-500 animate-ember-float2 left-[45%] top-[60%]"></div>
                            <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-400 animate-ember-float3 left-[18%] top-[70%]"></div>
                            <div className="absolute w-1 h-1 rounded-full bg-amber-600 animate-ember-float1 left-[72%] top-[80%]"></div>
                            <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-300 animate-ember-float2 left-[35%] top-[90%]"></div>
                        </div>
                    </div>
                )}
                
                {/* Dark Souls decorative border elements - withered effect */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-800/30 to-transparent"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-800/30 to-transparent"></div>

                {/* Vignette effect */}
                <div className="absolute inset-0 bg-radial-gradient pointer-events-none mix-blend-multiply opacity-60"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Dark Souls Header Navigation */}
                <header className="border-b border-amber-900/20 bg-black/90 backdrop-blur-md">
                    <div className="container mx-auto px-6 py-4">
                        <Link href="/peoples/characters" className="group inline-flex items-center text-amber-700 hover:text-amber-500 transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="relative tracking-wider uppercase text-sm">Retour à la liste des personnages</span>
                        </Link>
                    </div>
                </header>

                {/* Hero Banner - Dark Souls Style */}
                <div className="relative overflow-hidden border-b border-amber-900/20 bg-gradient-to-r from-black to-[#120f0a] py-12">
                    {/* Decorative Flame Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/5 via-black/0 to-black/70 pointer-events-none"></div>
                    
                    {/* Character Banner Content */}
                    <div className="container mx-auto px-6 relative">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-4xl md:text-6xl text-amber-200/90 tracking-widest mb-6 uppercase font-light">
                                <span className="inline-block relative">
                                    {character.name}
                                    <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent"></span>
                                </span>
                                {character.surname && (
                                    <span className="text-amber-700/80 ml-2 block mt-1 text-2xl md:text-3xl">{character.surname}</span>
                                )}
                            </h1>
                            
                            <div className="flex flex-wrap gap-4 justify-center mb-8">
                                {/* Race Tag - Dark Souls style */}
                                <div className="inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm border border-amber-900/30 text-amber-200/80 hover:border-amber-700/50 transition-colors duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-4 h-4 mr-2 text-amber-700" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <span className="uppercase tracking-wider text-xs">{character.race}</span>
                                </div>
                                
                                {/* Affiliation Tag */}
                                {character.affiliation && (
                                    <div className="inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm border border-amber-900/30 text-amber-200/80 hover:border-amber-700/50 transition-colors duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-4 h-4 mr-2 text-amber-700" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                        <span className="uppercase tracking-wider text-xs">{character.affiliation}</span>
                                    </div>
                                )}
                                
                                {/* Age Tag - Dark Souls style */}
                                {character.age && (
                                    <div className="inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm border border-amber-900/30 text-amber-200/80 hover:border-amber-700/50 transition-colors duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-4 h-4 mr-2 text-amber-700" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="uppercase tracking-wider text-xs">
                                            <span className="text-amber-500 font-bold">{character.age}</span> <span className="opacity-70">ans</span>
                                        </span>
                                    </div>
                                )}
                                
                                {/* Karma Tag */}
                                {character.karma && (
                                    <div className={`inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm border ${karmaDetails.border} ${karmaDetails.text} hover:border-opacity-100 transition-colors duration-500`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-4 h-4 mr-2" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                        </svg>
                                        <span className="uppercase tracking-wider text-xs">
                                            {character.karma === 'good' ? 'Bon' :
                                            character.karma === 'bad' ? 'Mauvais' : 'Neutre'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Edit Button - Dark Souls style */}
                            <div className="mt-8">
                                <Link
                                    href={`/peoples/characters/${character.slug}/edit`}
                                    className="group inline-flex items-center px-8 py-3 bg-amber-950/30 hover:bg-amber-900/30 border border-amber-800/30 text-amber-200/80 transition-all duration-500 relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-0 bg-amber-800/20 transition-all duration-500 group-hover:w-full"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-2 relative z-10" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className="relative z-10 uppercase tracking-wider text-sm">Modifier ce personnage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content Area - Dark Souls Scrolls */}
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Content Column - Description, History, Gallery */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description Panel - Dark Souls Scroll */}
                            <div className="group relative">
                                {/* Decorative frame */}
                                <div className="absolute inset-0 border border-amber-900/20 transform rotate-[0.5deg] -translate-x-1 translate-y-[2px]"></div>
                                <div className="absolute inset-0 border border-amber-900/20 transform -rotate-[0.5deg] translate-x-1 -translate-y-[2px]"></div>
                                
                                {/* Main panel */}
                                <div className="relative bg-gradient-to-b from-[#120f0a]/95 to-black/95 backdrop-blur-sm border border-amber-900/30 transition-colors duration-500 shadow-lg shadow-black/80">
                                    <div className="px-6 py-4 border-b border-amber-900/20 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                        <h2 className="text-xl text-amber-200/90 tracking-wider uppercase">Description</h2>
                                    </div>
                                    <div className="p-6 relative overflow-hidden">
                                        {/* Decorative Dark Souls effect */}
                                        <div className="absolute -right-20 -top-20 w-40 h-40 bg-amber-900/5 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
                                        
                                        <p className="text-stone-300/90 leading-relaxed whitespace-pre-line relative z-10 first-letter:text-3xl first-letter:text-amber-700 first-letter:float-left first-letter:mr-1">{character.description}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* History Panel */}
                            {character.history && (
                                <div className="group relative">
                                    {/* Decorative frame */}
                                    <div className="absolute inset-0 border border-amber-900/20 transform rotate-[0.5deg] -translate-x-1 translate-y-[2px]"></div>
                                    <div className="absolute inset-0 border border-amber-900/20 transform -rotate-[0.5deg] translate-x-1 -translate-y-[2px]"></div>
                                    
                                    {/* Main panel */}
                                    <div className="relative bg-gradient-to-b from-[#120f0a]/95 to-black/95 backdrop-blur-sm border border-amber-900/30 transition-colors duration-500 shadow-lg shadow-black/80">
                                        <div className="px-6 py-4 border-b border-amber-900/20 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                            </svg>
                                            <h2 className="text-xl text-amber-200/90 tracking-wider uppercase">Histoire</h2>
                                        </div>
                                        <div className="p-6 relative overflow-hidden">
                                            {/* Decorative Dark Souls effect */}
                                            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-amber-900/5 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
                                            
                                            <p className="text-stone-300/90 leading-relaxed whitespace-pre-line relative z-10 first-letter:text-3xl first-letter:text-amber-700 first-letter:float-left first-letter:mr-1">{character.history}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Gallery Panel */}
                            {character.additionalImages && character.additionalImages.length > 0 && (
                                <div className="group relative">
                                    {/* Decorative frame */}
                                    <div className="absolute inset-0 border border-amber-900/20 transform rotate-[0.5deg] -translate-x-1 translate-y-[2px]"></div>
                                    <div className="absolute inset-0 border border-amber-900/20 transform -rotate-[0.5deg] translate-x-1 -translate-y-[2px]"></div>
                                    
                                    {/* Main panel */}
                                    <div className="relative bg-gradient-to-b from-[#120f0a]/95 to-black/95 backdrop-blur-sm border border-amber-900/30 transition-colors duration-500 shadow-lg shadow-black/80">
                                        <div className="px-6 py-4 border-b border-amber-900/20 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <h2 className="text-xl text-amber-200/90 tracking-wider uppercase">Galerie</h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {character.additionalImages.map((image, index) => (
                                                    <div key={index} className="relative h-48 group">
                                                        <div className="absolute inset-0 border border-amber-900/30 transform rotate-[0.5deg] -translate-x-[1px] translate-y-[1px]"></div>
                                                        <div className="absolute inset-0 border border-amber-900/30 transform -rotate-[0.5deg] translate-x-[1px] -translate-y-[1px]"></div>
                                                        <div className="relative h-full overflow-hidden border border-amber-900/50">
                                                            <Image 
                                                                src={image}
                                                                alt={`${character.name} - Image ${index + 1}`}
                                                                fill
                                                                className="object-cover object-center transition-transform duration-500 group-hover:scale-110 filter brightness-75 contrast-125"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Right Sidebar Column - Character Details */}
                        <div className="lg:col-span-1 space-y-12">
                            {/* Character Information Card - Dark Souls Style */}
                            <div className="group relative">
                                {/* Decorative burnt parchment effect */}
                                <div className="absolute inset-0 border border-amber-900/20 bg-gradient-to-b from-amber-950/5 to-black/5 transform rotate-[0.8deg] scale-[1.01] z-0 opacity-70"></div>
                                
                                {/* Main panel */}
                                <div className="relative bg-gradient-to-b from-[#120f0a]/95 to-black/95 backdrop-blur-sm border border-amber-900/30 transition-colors duration-500 shadow-lg shadow-black/80">
                                    <div className="px-6 py-4 border-b border-amber-900/20 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                        </svg>
                                        <h2 className="text-xl text-amber-200/90 tracking-wider uppercase">Informations</h2>
                                    </div>
                                    
                                    {/* Portrait added to Information section - Dark Souls style */}
                                    <div className="p-6 flex justify-center">
                                        <div className="relative w-64 h-80">
                                            {/* Dark Souls portrait frame with burnt edges */}
                                            <div className="absolute inset-0 border-2 border-amber-950/30 bg-black/50 shadow-2xl transform rotate-1 -translate-x-1 translate-y-1 overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-900/20 to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-900/20 to-transparent"></div>
                                            </div>
                                            <div className="absolute inset-0 border-2 border-amber-950/30 bg-black/50 shadow-2xl transform -rotate-1 translate-x-1 -translate-y-1 overflow-hidden">
                                                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-900/20 to-transparent"></div>
                                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-900/20 to-transparent"></div>
                                            </div>
                                            
                                            {/* Main portrait with weathered effect */}
                                            <div className="relative h-full w-full border-2 border-amber-950/50 shadow-2xl overflow-hidden bg-gradient-to-b from-black via-transparent to-black z-10">
                                                {character.previewImage ? (
                                                    <div className="relative h-full w-full overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 mix-blend-multiply z-10"></div>
                                                        <div className="absolute inset-0 opacity-10 mix-blend-overlay z-20"></div>
                                                        
                                                        <div className="relative h-full w-full overflow-hidden">
                                                            <Image 
                                                                src={character.previewImage} 
                                                                alt={character.name}
                                                                fill
                                                                className={`object-cover object-center transition-all ease-in-out duration-1500 
                                                                            filter contrast-110 saturate-[0.8] ${isFloating ? 'translate-y-0' : 'translate-y-1'}`}
                                                                priority
                                                            />
                                                            
                                                            {/* Karma Symbol Overlay with Dark Souls style */}
                                                            <div className={`absolute bottom-0 right-0 w-12 h-12 bg-black/80 flex items-center 
                                                                          justify-center transition-opacity duration-1000 
                                                                          ${isFloating ? 'opacity-90' : 'opacity-70'}`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" 
                                                                    stroke="currentColor" className={`w-6 h-6 ${karmaDetails.text} drop-shadow-glow`}
                                                                    strokeWidth="1.5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Burnt edges effect */}
                                                        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black to-transparent z-20 opacity-30"></div>
                                                        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black to-transparent z-20 opacity-30"></div>
                                                        <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-black to-transparent z-20 opacity-30"></div>
                                                        <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-black to-transparent z-20 opacity-30"></div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-black/70 backdrop-blur-sm">
                                                        <span className="text-amber-900/70">Aucune image disponible</span>
                                                    </div>
                                                )}
                                                
                                                {/* Decorative Corner Elements - Dark Souls ornate style */}
                                                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-800/30 pointer-events-none"></div>
                                                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-800/30 pointer-events-none"></div>
                                                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-800/30 pointer-events-none"></div>
                                                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-800/30 pointer-events-none"></div>
                                                
                                                {/* Ornate corner decorations */}
                                                <svg className="absolute top-0 left-0 w-8 h-8 text-amber-800/30 pointer-events-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 3C3 3 7 3 12 8C17 13 21 21 21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                                </svg>
                                                <svg className="absolute top-0 right-0 w-8 h-8 text-amber-800/30 pointer-events-none rotate-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 3C3 3 7 3 12 8C17 13 21 21 21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                                </svg>
                                                <svg className="absolute bottom-0 right-0 w-8 h-8 text-amber-800/30 pointer-events-none rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 3C3 3 7 3 12 8C17 13 21 21 21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                                </svg>
                                                <svg className="absolute bottom-0 left-0 w-8 h-8 text-amber-800/30 pointer-events-none -rotate-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 3C3 3 7 3 12 8C17 13 21 21 21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                            
                                            {/* Dark Souls style glow effect */}
                                            <div className={`absolute inset-0 shadow-[0_0_20px_rgba(0,0,0,0.7)] ${karmaDetails.glow} filter blur-md opacity-40 z-0`}></div>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-amber-900/10">
                                        {/* Race */}
                                        <div className="p-5 hover:bg-amber-900/5 transition-colors duration-500">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-amber-600/80">Race</span>
                                                </div>
                                                <Link href={`/races/${character.race.toLowerCase()}`} className="text-amber-200/80 hover:text-amber-300/90 transition-colors duration-500 group-hover:underline tracking-wide">
                                                    {character.race}
                                                </Link>
                                            </div>
                                        </div>
                                        
                                        {/* Affiliation */}
                                        {character.affiliation && (
                                            <div className="p-5 hover:bg-amber-900/5 transition-colors duration-500">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                            className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                        </svg>
                                                        <span className="text-sm uppercase tracking-wider text-amber-600/80">Affiliation</span>
                                                    </div>
                                                    <Link href={`/peoples/affiliations/${character.affiliation}`} className="text-amber-200/80 hover:text-amber-300/90 transition-colors duration-500 group-hover:underline tracking-wide">
                                                        {character.affiliation}
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Age - Enhanced Dark Souls style */}
                                        {character.age && (
                                            <div className="p-5 hover:bg-amber-900/5 transition-colors duration-500">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                            className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm uppercase tracking-wider text-amber-600/80">Âge</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-amber-500 font-bold text-lg">{character.age}</span>
                                                        <span className="text-stone-400 ml-1 text-sm">ans</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Karma */}
                                        {character.karma && (
                                            <div className="p-5 hover:bg-amber-900/5 transition-colors duration-500">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                            className={`w-5 h-5 mr-3 ${karmaDetails.text}`} strokeWidth="1.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                                        </svg>
                                                        <span className="text-sm uppercase tracking-wider text-amber-600/80">Karma</span>
                                                    </div>
                                                    <span className={`${karmaDetails.text} tracking-wide`}>
                                                        {character.karma === 'good' ? 'Bon' :
                                                        character.karma === 'bad' ? 'Mauvais' : 'Neutre'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Relations Card */}
                            <div className="group relative">
                                {/* Decorative burnt parchment effect */}
                                <div className="absolute inset-0 border border-amber-900/20 bg-gradient-to-b from-amber-950/5 to-black/5 transform rotate-[0.8deg] scale-[1.01] z-0 opacity-70"></div>
                                
                                {/* Main panel */}
                                <div className="relative bg-gradient-to-b from-[#120f0a]/95 to-black/95 backdrop-blur-sm border border-amber-900/30 transition-colors duration-500 shadow-lg shadow-black/80">
                                    <div className="px-6 py-4 border-b border-amber-900/20 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-amber-700" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                        </svg>
                                        <h2 className="text-xl text-amber-200/90 tracking-wider uppercase">Relations</h2>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex flex-col items-center py-8 text-center">
                                            <div className="w-16 h-16 rounded-full bg-amber-950/40 border border-amber-900/30 flex items-center justify-center mb-6">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                    className="w-8 h-8 text-amber-700" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-amber-700/70 italic tracking-wide">
                                                Fonctionnalité à venir - Vous pourrez afficher les relations entre personnages.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Edit Button Mobile Only */}
                            <div className="lg:hidden">
                                <Link
                                    href={`/peoples/characters/${character.slug}/edit`}
                                    className="group flex items-center justify-center w-full px-6 py-3 bg-amber-950/30 hover:bg-amber-900/30 border border-amber-800/30 text-amber-200/80 transition-all duration-500 relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-0 bg-amber-800/20 transition-all duration-500 group-hover:w-full"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-2 relative z-10" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className="relative z-10 uppercase tracking-wider text-sm">Modifier ce personnage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS pour les animations */}
            <style jsx global>{`
                @keyframes ember-float1 {
                    0%, 100% { opacity: 0.2; transform: translateY(0) rotate(0deg); }
                    50% { opacity: 0.8; transform: translateY(-20px) rotate(3deg); }
                }
                @keyframes ember-float2 {
                    0%, 100% { opacity: 0.1; transform: translateY(0) rotate(0deg); }
                    50% { opacity: 0.6; transform: translateY(-30px) rotate(-5deg); }
                }
                @keyframes ember-float3 {
                    0%, 100% { opacity: 0.3; transform: translateY(0) rotate(0deg); }
                    50% { opacity: 0.9; transform: translateY(-15px) rotate(8deg); }
                }
                
                .animate-ember-float1 {
                    animation: ember-float1 8s infinite ease-in-out;
                }
                .animate-ember-float2 {
                    animation: ember-float2 12s infinite ease-in-out;
                }
                .animate-ember-float3 {
                    animation: ember-float3 10s infinite ease-in-out;
                }
                
                .bg-radial-gradient {
                    background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
                }
                
                .drop-shadow-glow {
                    filter: drop-shadow(0 0 3px currentColor);
                }
            `}</style>
        </div>
    );
}