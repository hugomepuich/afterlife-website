'use client';

import React from 'react';
import Image from 'next/image';

interface PortraitImageProps {
  imageSrc: string;
  alt: string;
  index?: number;
  onOpenLightbox: (index: number) => void;
}

export default function PortraitImage({ imageSrc, alt, index = 0, onOpenLightbox }: PortraitImageProps) {
  return (
    <div className="relative h-80 w-56 mx-auto mb-6">
      <Image 
        src={imageSrc} 
        alt={alt}
        fill
        priority
        style={{ objectFit: 'cover' }}
        className="rounded-md cursor-pointer"
        onClick={() => onOpenLightbox(index)}
      />
    </div>
  );
}