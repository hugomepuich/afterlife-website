'use client';

import Image from 'next/image';
import Link from 'next/link';
import CharacterPortrait from './CharacterPortrait';
import ImageGallery from './ImageGallery';
import { useState, useEffect } from 'react';

// Type definitions for the component props
type CharacterDetailProps = {
    character: any;
    slug: string;
};

export default function CharacterDetail({ character, slug }: CharacterDetailProps) {
    // Get a random image for the header
    const getRandomImage = () => {
        if (character.additionalImages && character.additionalImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * character.additionalImages.length);
            return character.additionalImages[randomIndex];
        }
        return character.previewImage;
    };
    
    const headerImage = getRandomImage();

    // Function to determine color and icon based on karma
    const getKarmaDetails = (karma: string) => {
        switch(karma) {
            case 'good': 
                return { 
                    bg: 'from-emerald-800 to-teal-950', 
                    border: 'border-emerald-600', 
                    text: 'text-emerald-400',
                    glow: 'shadow-emerald-900/70',
                    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            case 'bad': 
                return { 
                    bg: 'from-red-800 to-rose-950', 
                    border: 'border-red-700', 
                    text: 'text-red-400',
                    glow: 'shadow-red-900/70',
                    icon: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            default: 
                return { 
                    bg: 'from-zinc-800 to-stone-950', 
                    border: 'border-zinc-700', 
                    text: 'text-zinc-400',
                    glow: 'shadow-zinc-900/70',
                    icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
        }
    };

    const karmaDetails = character.karma ? getKarmaDetails(character.karma) : getKarmaDetails('neutral');

    return (
        <div className="min-h-screen bg-[#070709] text-gray-100 overflow-hidden relative">
            {/* Main Animated Background Effect */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {headerImage && (
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a]/90 to-[#070709] z-10 mix-blend-multiply"></div>
                        <Image 
                            src={headerImage} 
                            alt=""
                            fill
                            className="object-cover object-center filter blur-md opacity-25"
                            priority
                        />
                        {/* Animated fog elements */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute w-full h-full bg-gradient-to-r from-blue-900/10 to-purple-900/10 animate-fog-1"></div>
                            <div className="absolute w-full h-full bg-gradient-to-l from-indigo-900/10 to-transparent animate-fog-2"></div>
                        </div>
                    </div>
                )}
                
                {/* Decorative border elements with animation */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-600/60 to-transparent animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-600/60 to-transparent animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-600/60 to-transparent animate-pulse-slow"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-600/60 to-transparent animate-pulse-slow"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header Navigation - Modern Gaming Style */}
                <header className="border-b border-indigo-900/60 bg-black/60 backdrop-blur-lg sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/peoples/characters" className="group inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="relative font-medium overflow-hidden">
                                    <span className="relative z-10">
                                        BACK TO CHARACTERS
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                                </span>
                            </Link>
                            
                            <div className="hidden md:flex space-x-6">
                                <Link 
                                    href="/peoples" 
                                    className="text-gray-400 hover:text-white uppercase text-sm tracking-widest transition-colors duration-300"
                                >
                                    Characters
                                </Link>
                                <Link 
                                    href="/races" 
                                    className="text-gray-400 hover:text-white uppercase text-sm tracking-widest transition-colors duration-300"
                                >
                                    Races
                                </Link>
                                <Link 
                                    href="/affiliations" 
                                    className="text-gray-400 hover:text-white uppercase text-sm tracking-widest transition-colors duration-300"
                                >
                                    Affiliations
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Character Banner - Full Bleed Cinematic Style */}
                <div className={`relative min-h-[60vh] overflow-hidden border-b border-gray-800 bg-gradient-to-r ${karmaDetails.bg} flex items-center`}>
                    {/* Visual Effects Layer */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Decorative Vignette for depth */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80 pointer-events-none"></div>
                    </div>
                    
                    {/* Character Banner Content - Modern Layout */}
                    <div className="container mx-auto px-6 py-16 relative">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                            {/* Character Portrait - Left Column */}
                            <div className="md:col-span-2 flex justify-center md:justify-start">
                                <div className="relative w-72 h-96 transform perspective">
                                    {/* Modern portrait frame with glow effects */}
                                    <div className={`absolute inset-1 blur-lg opacity-50 ${karmaDetails.glow}`}></div>
                                    
                                    {/* Main portrait with 3D-like layering */}
                                    <div className="relative h-full w-full border border-gray-800/80 shadow-2xl overflow-hidden bg-gradient-to-b from-black via-transparent to-black z-10">
                                        {character.previewImage ? (
                                            <CharacterPortrait 
                                                previewImage={character.previewImage}
                                                characterName={character.name}
                                                karmaDetails={karmaDetails}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                                <span className="text-gray-600">No image available</span>
                                            </div>
                                        )}
                                        
                                        {/* Decorative Corner Elements with animation */}
                                        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-indigo-600/70 animate-pulse-slow"></div>
                                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-indigo-600/70 animate-pulse-slow"></div>
                                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-indigo-600/70 animate-pulse-slow"></div>
                                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-indigo-600/70 animate-pulse-slow"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Character Info - Right Column with cinematic layout */}
                            <div className="md:col-span-3 flex flex-col justify-center">
                                <div className="relative">
                                    {/* Character Name with dramatic styling */}
                                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-4 text-center md:text-left relative">
                                        <span className="relative inline-block">
                                            {character.name}
                                            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-500"></span>
                                        </span>
                                        {character.surname && (
                                            <span className="text-indigo-400 opacity-90 ml-4">{character.surname}</span>
                                        )}
                                    </h1>
                                    
                                    {/* Character Stats with clean, modern styling */}
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                                        {/* Race Tag */}
                                        <div className="inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm border-l-2 border-indigo-600 text-gray-200 hover:bg-black/60 transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-4 h-4 mr-2 text-indigo-500" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                            </svg>
                                            <span className="font-medium uppercase tracking-wide text-sm">{character.race}</span>
                                        </div>
                                        
                                        {/* Affiliation Tag */}
                                        {character.affiliation && (
                                            <div className="inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm border-l-2 border-indigo-600 text-gray-200 hover:bg-black/60 transition-colors duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                    className="w-4 h-4 mr-2 text-indigo-500" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                </svg>
                                                <span className="font-medium uppercase tracking-wide text-sm">{character.affiliation}</span>
                                            </div>
                                        )}
                                        
                                        {/* Age Tag */}
                                        {character.age && (
                                            <div className="inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm border-l-2 border-indigo-600 text-gray-200 hover:bg-black/60 transition-colors duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                    className="w-4 h-4 mr-2 text-indigo-500" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-medium uppercase tracking-wide text-sm">Age: {character.age}</span>
                                            </div>
                                        )}
                                        
                                        {/* Karma Tag with dynamic styling */}
                                        {character.karma && (
                                            <div className={`inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm border-l-2 ${karmaDetails.border} ${karmaDetails.text} hover:bg-black/60 transition-colors duration-300`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                    className="w-4 h-4 mr-2 drop-shadow-glow" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                                </svg>
                                                <span className="font-medium uppercase tracking-wide text-sm">
                                                    {character.karma === 'good' ? 'Good' :
                                                    character.karma === 'bad' ? 'Evil' : 'Neutral'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Dramatic quote/description teaser */}
                                    {character.description && (
                                        <div className="mb-8 relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600/70"></div>
                                            <p className="text-gray-300 italic pl-4 text-lg">
                                                {character.description.split('.')[0]}...
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* Action Buttons - Gaming Style */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                                        <Link
                                            href={`/peoples/characters/${slug}/edit`}
                                            className="group inline-flex items-center px-6 py-3 bg-indigo-800/80 hover:bg-indigo-700/90 border border-indigo-600/80 text-white transition-all duration-300 relative overflow-hidden"
                                        >
                                            <span className="absolute inset-0 w-0 bg-white opacity-20 transition-all duration-300 group-hover:w-full"></span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-5 h-5 mr-2 relative z-10" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            <span className="relative z-10 font-medium uppercase tracking-wider text-sm">EDIT CHARACTER</span>
                                        </Link>
                                        
                                        <Link
                                            href={`/peoples/characters`}
                                            className="group inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 border border-white/20 text-white transition-all duration-300 relative overflow-hidden"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-5 h-5 mr-2" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                            </svg>
                                            <span className="font-medium uppercase tracking-wider text-sm">ALL CHARACTERS</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content Area - Split Column Layout */}
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Content Column - Description, History, Gallery */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Description Panel */}
                            <div className="group bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-indigo-900/50 transition-colors duration-500 relative overflow-hidden">
                                {/* Panel Header */}
                                <div className="px-6 py-4 border-b border-gray-800/50 flex items-center relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600/70"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-3 text-indigo-500" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-white tracking-wider">DESCRIPTION</h2>
                                </div>
                                
                                {/* Panel Content */}
                                <div className="p-6 relative overflow-hidden">
                                    {/* Decorative magic effect */}
                                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-indigo-900/20 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
                                    
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line relative z-10">{character.description}</p>
                                </div>
                            </div>
                            
                            {/* History Panel */}
                            {character.history && (
                                <div className="group bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-indigo-900/50 transition-colors duration-500 relative overflow-hidden">
                                    {/* Panel Header */}
                                    <div className="px-6 py-4 border-b border-gray-800/50 flex items-center relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600/70"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-indigo-500" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <h2 className="text-xl font-bold text-white tracking-wider">HISTORY</h2>
                                    </div>
                                    
                                    {/* Panel Content */}
                                    <div className="p-6 relative overflow-hidden">
                                        {/* Decorative magic effect */}
                                        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-indigo-900/20 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
                                        
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-line relative z-10">{character.history}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Gallery Panel */}
                            {character.additionalImages && character.additionalImages.length > 0 && (
                                <div className="group bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-indigo-900/50 transition-colors duration-500 relative overflow-hidden">
                                    {/* Panel Header */}
                                    <div className="px-6 py-4 border-b border-gray-800/50 flex items-center relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600/70"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-indigo-500" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        <h2 className="text-xl font-bold text-white tracking-wider">GALLERY</h2>
                                    </div>
                                    
                                    {/* Panel Content */}
                                    <div className="p-6">
                                        <ImageGallery
                                            mainImage={character.previewImage}
                                            additionalImages={character.additionalImages}
                                            characterName={character.name}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Right Sidebar Column - Character Details */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Character Profile Card */}
                            <div className="group bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-indigo-900/50 transition-colors duration-500 relative overflow-hidden">
                                {/* Panel Header */}
                                <div className="px-6 py-4 border-b border-gray-800/50 flex items-center relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600/70"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-3 text-indigo-500" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-white tracking-wider">PROFILE</h2>
                                </div>
                                
                                {/* Stat List */}
                                <div className="divide-y divide-gray-800/30">
                                    {/* Race */}
                                    <div className="p-5 hover:bg-indigo-900/10 transition-colors duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                    className="w-5 h-5 mr-3 text-indigo-400" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                </svg>
                                                <span className="text-sm uppercase tracking-wider text-gray-500">Race</span>
                                            </div>
                                            <Link href={`/races/${character.race.toLowerCase()}`} className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 group-hover:underline">
                                                {character.race}
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Affiliation */}
                                    {character.affiliation && (
                                        <div className="p-5 hover:bg-indigo-900/10 transition-colors duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className="w-5 h-5 mr-3 text-indigo-400" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-gray-500">Affiliation</span>
                                                </div>
                                                <Link href={`/peoples/affiliations/${character.affiliation}`} className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 group-hover:underline">
                                                    {character.affiliation}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Age */}
                                    {character.age && (
                                        <div className="p-5 hover:bg-indigo-900/10 transition-colors duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className="w-5 h-5 mr-3 text-indigo-400" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-gray-500">Age</span>
                                                </div>
                                                <span className="text-gray-300">{character.age} years</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Karma */}
                                    {character.karma && (
                                        <div className="p-5 hover:bg-indigo-900/10 transition-colors duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className={`w-5 h-5 mr-3 ${karmaDetails.text}`} strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-gray-500">Karma</span>
                                                </div>
                                                <span className={karmaDetails.text}>
                                                    {character.karma === 'good' ? 'Good' :
                                                    character.karma === 'bad' ? 'Evil' : 'Neutral'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Relations Card */}
                            <div className="group bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-indigo-900/50 transition-colors duration-500 relative overflow-hidden">
                                {/* Panel Header */}
                                <div className="px-6 py-4 border-b border-gray-800/50 flex items-center relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600/70"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-3 text-indigo-500" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-white tracking-wider">RELATIONS</h2>
                                </div>
                                
                                <div className="p-6 relative">
                                    {/* Placeholder with modern styling */}
                                    <div className="flex flex-col items-center py-8 text-center relative">
                                        <div className="w-16 h-16 rounded-full bg-indigo-900/30 border border-indigo-600/30 flex items-center justify-center mb-6 relative overflow-hidden">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-8 h-8 text-indigo-400" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 italic">
                                            Coming soon - Character relationship map will be available here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mobile Edit Button */}
                            <div className="lg:hidden">
                                <Link
                                    href={`/peoples/characters/${slug}/edit`}
                                    className="group flex items-center justify-center w-full px-6 py-3 bg-indigo-800/80 hover:bg-indigo-700/90 border border-indigo-600/80 text-white transition-all duration-300 relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-0 bg-white opacity-20 transition-all duration-300 group-hover:w-full"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-2 relative z-10" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className="relative z-10 font-medium uppercase tracking-wider text-sm">EDIT CHARACTER</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer - Game Style */}
                <footer className="border-t border-gray-800/30 bg-black/40 backdrop-blur-md mt-16">
                    <div className="container mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center space-x-6">
                                <Link href="/peoples/characters" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 uppercase text-sm tracking-widest">Characters</Link>
                                <Link href="/races" className="text-gray-400 hover:text-white transition-colors duration-300 uppercase text-sm tracking-widest">Races</Link>
                                <Link href="/affiliations" className="text-gray-400 hover:text-white transition-colors duration-300 uppercase text-sm tracking-widest">Affiliations</Link>
                            </div>
                            
                            <div className="text-gray-500 text-sm">
                                Character Database • © 2025
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            
            {/* Global Animations */}
            <style jsx global>{`
                @keyframes pulse-slow {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
                
                @keyframes float-slow {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }
                
                @keyframes fog-1 {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes fog-2 {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 5s ease-in-out infinite;
                }
                
                .animate-fog-1 {
                    animation: fog-1 120s linear infinite;
                }
                
                .animate-fog-2 {
                    animation: fog-2 180s linear infinite;
                }
                
                .animate-shine {
                    animation: shine 2s linear infinite;
                }
                
                .drop-shadow-glow {
                    filter: drop-shadow(0 0 5px currentColor);
                }
                
                .perspective {
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
}