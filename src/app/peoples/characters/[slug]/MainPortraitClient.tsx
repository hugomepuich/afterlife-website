'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface MainPortraitClientProps {
  previewImage: string;
  additionalImages: string[];
  characterName: string;
}

export default function MainPortraitClient({ previewImage, additionalImages, characterName }: MainPortraitClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Toutes les images disponibles (préview + additionnelles)
  const allImages = [
    previewImage,
    ...additionalImages
  ];
  
  // Fonction pour naviguer entre les images
  const navigateImage = (direction: 'next' | 'prev') => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (activeImageIndex + 1) % allImages.length;
    } else {
      newIndex = (activeImageIndex - 1 + allImages.length) % allImages.length;
    }
    setActiveImageIndex(newIndex);
  };
  
  return (
    <>
      {/* Image portrait - pleine largeur */}
      <div className="relative w-full h-auto aspect-[3/4] mb-6 cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <Image 
          src={previewImage} 
          alt={characterName}
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="rounded-md"
        />
      </div>
      
      {/* Visionneuse d'images (Lightbox) - seulement si ouvert */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Bouton de fermeture */}
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
              aria-label="Fermer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image active */}
            <div className="relative h-[70vh] w-full">
              <Image
                src={allImages[activeImageIndex]}
                alt={`${characterName} - image ${activeImageIndex}`}
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="rounded-md"
              />
            </div>
            
            {/* Navigation */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                onClick={() => navigateImage('prev')}
                className="bg-black bg-opacity-50 text-white rounded-r-lg p-2 hover:bg-opacity-70 transition-all"
                aria-label="Image précédente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                onClick={() => navigateImage('next')}
                className="bg-black bg-opacity-50 text-white rounded-l-lg p-2 hover:bg-opacity-70 transition-all"
                aria-label="Image suivante"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Indicateur du nombre d'images */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}