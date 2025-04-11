// src/components/races/RaceForm.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Race } from '@/app/models/race';
import { Area } from '@/app/models/area';

interface RaceFormProps {
  initialData?: Partial<Race>;
  isEditing?: boolean;
  areas?: Area[]; // For selecting regions
}

export default function RaceForm({ initialData = {}, isEditing = false, areas = [] }: RaceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(initialData.image);
  const [traits, setTraits] = useState<string[]>(initialData.traits || []);
  const [newTrait, setNewTrait] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialData.regions || []);
  const [uploadingPreview, setUploadingPreview] = useState(false);

  const previewFileRef = useRef<HTMLInputElement>(null);
  
  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to upload image');
    }
    
    const data = await response.json();
    return data.path;
  }
  
  async function handlePreviewImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadingPreview(true);
    
    try {
      const path = await uploadImage(file);
      setPreviewImage(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading image');
    } finally {
      setUploadingPreview(false);
    }
  }
  
  // Handle trait management
  function addTrait() {
    if (newTrait.trim() && !traits.includes(newTrait.trim())) {
      setTraits([...traits, newTrait.trim()]);
      setNewTrait('');
    }
  }
  
  function removeTrait(index: number) {
    setTraits(traits.filter((_, i) => i !== index));
  }
  
  // Handle region selection
  function handleRegionSelection(regionId: string) {
    setSelectedRegions(prev => {
      if (prev.includes(regionId)) {
        return prev.filter(id => id !== regionId);
      }
      return [...prev, regionId];
    });
  }
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);

    // Construct race data from form
    const raceData: Partial<Race> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      history: formData.get('history') as string || undefined,
      traits,
      regions: selectedRegions.length > 0 ? selectedRegions : undefined,
      image: previewImage
    };
    
    if (isEditing) {
      raceData.id = initialData.id;
      raceData.slug = initialData.slug;
    }
    
    try {
      const endpoint = isEditing 
        ? `/api/races/${initialData.id}`
        : '/api/races';
        
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(raceData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Navigate back to races page
      router.push('/races');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/95 border border-blue-900/30 rounded-lg shadow-lg p-6">
      {error && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section for race image */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-white">Race Image</h2>
          
          {/* Preview Image */}
          <div className="mb-4">
            <div className="flex flex-col items-start">
              {previewImage ? (
                <div className="relative mb-3 w-full h-48">
                  <Image 
                    src={previewImage} 
                    alt="Race Preview" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                  <button 
                    type="button"
                    onClick={() => setPreviewImage(undefined)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="mb-3 w-full h-48 bg-gray-800 rounded-md border border-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
              )}
              
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={previewFileRef}
                  onChange={handlePreviewImageUpload}
                />
                <button
                  type="button"
                  onClick={() => previewFileRef.current?.click()}
                  disabled={uploadingPreview}
                  className="bg-blue-900/50 hover:bg-blue-800/60 text-blue-300 py-2 px-4 rounded-md border border-blue-800/50 transition-colors disabled:opacity-50"
                >
                  {uploadingPreview ? 'Uploading...' : previewImage ? 'Change Image' : 'Upload Race Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Basic Information */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Race Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={initialData.name || ''}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={initialData.description || ''}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="history" className="block text-sm font-medium text-gray-300 mb-1">
            History
          </label>
          <textarea
            id="history"
            name="history"
            rows={5}
            defaultValue={initialData.history || ''}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        {/* Traits Management */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Traits *
          </label>
          <div className="mb-2">
            <div className="flex">
              <input
                type="text"
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTrait())}
                placeholder="Add a trait..."
                className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded-l-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addTrait}
                className="bg-blue-900 text-blue-100 px-4 py-2 rounded-r-md hover:bg-blue-800 transition-colors"
              >
                Add
              </button>
            </div>
            {traits.length === 0 && (
              <p className="mt-1 text-sm text-red-400">At least one trait is required</p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {traits.map((trait, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-md border border-gray-700"
              >
                {trait}
                <button
                  type="button"
                  onClick={() => removeTrait(index)}
                  className="ml-2 text-gray-400 hover:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Region selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Inhabited Regions
          </label>
          {areas.length > 0 ? (
            <div className="mt-1 max-h-60 overflow-y-auto bg-gray-800 border border-gray-700 rounded-md p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {areas.map(area => (
                  <div 
                    key={area.id} 
                    className={`p-2 rounded border cursor-pointer ${
                      selectedRegions.includes(area.id)
                        ? 'bg-blue-900/50 border-blue-700/50 text-blue-300'
                        : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:bg-gray-800'
                    }`}
                    onClick={() => handleRegionSelection(area.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(area.id)}
                        onChange={() => handleRegionSelection(area.id)}
                        className="h-4 w-4 mr-2 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                      />
                      <div>
                        <div className="font-medium">{area.name}</div>
                        <div className="text-xs opacity-70">
                          {area.type === 'city' ? 'Settlement' : 
                           area.type === 'dungeon' ? 'Dungeon' : 
                           area.type === 'hunt-zone' ? 'Hunting Grounds' : 
                           area.type === 'peace-zone' ? 'Safe Zone' : 
                           area.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm mt-1">
              No areas available for selection. Add areas first.
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Link 
          href="/races"
          className="bg-gray-800 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-700 border border-gray-700 mr-2"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting || traits.length === 0}
          className="bg-blue-900 text-blue-100 py-2 px-4 rounded-md hover:bg-blue-800 border border-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Race' : 'Save Race'}
        </button>
      </div>
    </form>
  );
}