'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type CharacterPortraitProps = {
    previewImage: string;
    characterName: string;
    karmaDetails: {
        text: string;
        icon: string;
    };
};

export default function CharacterPortrait({ previewImage, characterName, karmaDetails }: CharacterPortraitProps) {
    // Animation states
    const [isHovering, setIsHovering] = useState(false);
    const [isFloating, setIsFloating] = useState(true);
    const [glowIntensity, setGlowIntensity] = useState(false);

    // Set up the floating animation and glow effect
    useEffect(() => {
        const floatTimer = setInterval(() => {
            setIsFloating(prev => !prev);
        }, 4000);
        
        const glowTimer = setInterval(() => {
            setGlowIntensity(prev => !prev);
        }, 6000);
        
        return () => {
            clearInterval(floatTimer);
            clearInterval(glowTimer);
        };
    }, []);

    return (
        <div 
            className="relative h-full w-full overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Dark overlay to match Dark Souls aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-overlay z-20 pointer-events-none"></div>
            
            {/* Image with Dark Souls styling */}
            <Image 
                src={previewImage} 
                alt={characterName}
                fill
                className={`object-cover object-center transition-all ease-in-out duration-1500 
                            filter contrast-110 saturate-[0.8] ${isHovering ? 'scale-110' : 'scale-100'} 
                            ${isFloating ? 'translate-y-0' : 'translate-y-1'}`}
                priority
            />
            
            {/* Karma Symbol Overlay with Dark Souls style */}
            <div className={`absolute bottom-0 right-0 w-12 h-12 bg-black/80 flex items-center 
                           justify-center transition-opacity duration-1000 
                           ${glowIntensity ? 'opacity-90' : 'opacity-70'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" className={`w-6 h-6 ${karmaDetails.text} drop-shadow-glow`}
                    strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                </svg>
            </div>
            
            {/* Dark Souls style parchment border effect */}
            <div className="absolute top-0 left-0 w-full h-px bg-amber-800/20"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-amber-800/20"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-amber-800/20"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-amber-800/20"></div>
            
            {/* Corner burn effects */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-950/20 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-950/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-950/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-950/20 to-transparent pointer-events-none"></div>
            
            {/* Animation styles */}
            <style jsx>{`
                .drop-shadow-glow {
                    filter: drop-shadow(0 0 3px currentColor);
                }
                
                @keyframes pulse-slow {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}