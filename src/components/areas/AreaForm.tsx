// src/components/areas/AreaForm.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Area, AreaType } from '@/app/models/area';

interface AreaFormProps {
  initialData?: Partial<Area>;
  isEditing?: boolean;
  allAreas?: Area[]; // For selecting connected areas
}

export default function AreaForm({ initialData = {}, isEditing = false, allAreas = [] }: AreaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(initialData.previewImage || undefined);
  const [selectedConnectedAreas, setSelectedConnectedAreas] = useState<string[]>(initialData.connectedAreas || []);
  const [uploadingPreview, setUploadingPreview] = useState(false);

  const previewFileRef = useRef<HTMLInputElement>(null);
  
  // Filter out the current area from the list of possible connections
  const connectableAreas = allAreas.filter(area => area.id !== initialData.id);
  
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
  
  // Handle connected areas selection
  function handleAreaSelection(areaId: string) {
    setSelectedConnectedAreas(prev => {
      // If already selected, remove it
      if (prev.includes(areaId)) {
        return prev.filter(id => id !== areaId);
      }
      // Otherwise add it
      return [...prev, areaId];
    });
  }
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);

    // Construct area data from form
    const areaData: Partial<Area> = {
        name: formData.get('name') as string,
        type: formData.get('type') as AreaType,
        description: formData.get('description') as string,
        history: formData.get('history') as string || undefined,
        dangerLevel: formData.get('dangerLevel') ? parseInt(formData.get('dangerLevel') as string) : undefined,
        previewImage: previewImage || undefined, // Changed from null to undefined
        connectedAreas: selectedConnectedAreas,
      };
    
    if (isEditing) {
      areaData.id = initialData.id;
      areaData.slug = initialData.slug;
    }
    
    try {
      const endpoint = isEditing 
        ? `/api/areas/${initialData.id}`
        : '/api/areas';
        
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(areaData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Navigate back to areas page
      router.push('/area');
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
        {/* Section for area image */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-white">Area Image</h2>
          
          {/* Preview Image */}
          <div className="mb-4">
            <div className="flex flex-col items-start">
              {previewImage ? (
                <div className="relative mb-3 w-full h-48">
                  <Image 
                    src={previewImage} 
                    alt="Area Preview" 
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
                  {uploadingPreview ? 'Uploading...' : previewImage ? 'Change Image' : 'Upload Area Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Area Information */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name *
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
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Area Type *
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue={initialData.type || ''}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>-- Select Type --</option>
            <option value="city">City/Settlement</option>
            <option value="dungeon">Dungeon</option>
            <option value="hunt-zone">Hunting Grounds</option>
            <option value="peace-zone">Safe Zone</option>
          </select>
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
        
        <div>
          <label htmlFor="dangerLevel" className="block text-sm font-medium text-gray-300 mb-1">
            Danger Level (0-10)
          </label>
          <div className="relative">
            <input
              type="number"
              id="dangerLevel"
              name="dangerLevel"
              min="0"
              max="10"
              defaultValue={initialData.dangerLevel !== undefined ? initialData.dangerLevel : ''}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="text-xs text-gray-500 mt-1">
              <span className="inline-block w-2 h-2 bg-blue-500 mr-1"></span> 0: Safe
              <span className="inline-block w-2 h-2 bg-green-500 ml-3 mr-1"></span> 1-3: Low
              <span className="inline-block w-2 h-2 bg-amber-500 ml-3 mr-1"></span> 4-6: Medium
              <span className="inline-block w-2 h-2 bg-red-500 ml-3 mr-1"></span> 7-10: High
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Connected Areas
          </label>
          {connectableAreas.length > 0 ? (
            <div className="mt-1 max-h-60 overflow-y-auto bg-gray-800 border border-gray-700 rounded-md p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {connectableAreas.map(area => (
                  <div 
                    key={area.id} 
                    className={`p-2 rounded border cursor-pointer ${
                      selectedConnectedAreas.includes(area.id)
                        ? 'bg-blue-900/50 border-blue-700/50 text-blue-300'
                        : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:bg-gray-800'
                    }`}
                    onClick={() => handleAreaSelection(area.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedConnectedAreas.includes(area.id)}
                        onChange={() => handleAreaSelection(area.id)}
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
              No other areas available for connection. Add more areas first.
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Link 
          href="/area"
          className="bg-gray-800 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-700 border border-gray-700 mr-2"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-900 text-blue-100 py-2 px-4 rounded-md hover:bg-blue-800 border border-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Area' : 'Save Area'}
        </button>
      </div>
    </form>
  );
}