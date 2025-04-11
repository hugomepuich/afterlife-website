// /src/app/components/characters/CharacterForm.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function CharacterForm({ initialData = {}, isEditing = false }: CharacterFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.previewImage || null);
  const [additionalImages, setAdditionalImages] = useState<string[]>(initialData.additionalImages || []);
  const [uploadingPreview, setUploadingPreview] = useState(false);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);
  
  const previewFileRef = useRef<HTMLInputElement>(null);
  const additionalFileRef = useRef<HTMLInputElement>(null);
  
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
  
  async function handleAdditionalImagesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    setUploadingAdditional(true);
    
    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const paths = await Promise.all(uploadPromises);
      setAdditionalImages(prev => [...prev, ...paths]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading images');
    } finally {
      setUploadingAdditional(false);
    }
  }
  
  function removeAdditionalImage(index: number) {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  }
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);

    interface CharacterData {
      id?: string;
      slug?: string;
      name: string;
      surname?: string;
      race: string;
      affiliation?: string;
      age?: number;
      description: string;
      history?: string;
      karma?: 'good' | 'neutral' | 'bad';
      previewImage: string | null;
      additionalImages: string[];
    }

    const characterData: CharacterData = {
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      race: formData.get('race') as string,
      affiliation: formData.get('affiliation') as string,
      age: formData.get('age') ? parseInt(formData.get('age') as string) : undefined,
      description: formData.get('description') as string,
      history: formData.get('history') as string,
      karma: formData.get('karma') as 'good' | 'neutral' | 'bad' | undefined,
      previewImage,
      additionalImages,
    };
    
    if (isEditing) {
      characterData.id = initialData.id;
      characterData.slug = initialData.slug;
    }
    
    try {
      const endpoint = isEditing 
        ? `/api/characters/${initialData.id}`
        : '/api/characters';
        
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(characterData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }
      
      router.push('/peoples/characters');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section pour les images */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Character Images</h2>
          
          {/* Image principale */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview Image
            </label>
            <div className="flex flex-col items-start">
              {previewImage && (
                <div className="relative mb-3 w-40 h-40">
                  <Image 
                    src={previewImage} 
                    alt="Preview" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                  <button 
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
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
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
                >
                  {uploadingPreview ? 'Uploading...' : previewImage ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Images additionnelles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Images
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {additionalImages.map((imgSrc, index) => (
                <div key={index} className="relative w-24 h-24">
                  <Image 
                    src={imgSrc} 
                    alt={`Additional ${index + 1}`} 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                  <button 
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={additionalFileRef}
                onChange={handleAdditionalImagesUpload}
              />
              <button
                type="button"
                onClick={() => additionalFileRef.current?.click()}
                disabled={uploadingAdditional}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
              >
                {uploadingAdditional ? 'Uploading...' : 'Add Images'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Information du personnage */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={initialData.name || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            defaultValue={initialData.surname || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="race" className="block text-sm font-medium text-gray-700 mb-1">
            Race *
          </label>
          <input
            type="text"
            id="race"
            name="race"
            required
            defaultValue={initialData.race || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-1">
            Affiliation
          </label>
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            defaultValue={initialData.affiliation || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            defaultValue={initialData.age || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="karma" className="block text-sm font-medium text-gray-700 mb-1">
            Karma
          </label>
          <select
            id="karma"
            name="karma"
            defaultValue={initialData.karma || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select --</option>
            <option value="good">Good</option>
            <option value="neutral">Neutral</option>
            <option value="bad">Bad</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={initialData.description || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="history" className="block text-sm font-medium text-gray-700 mb-1">
            History
          </label>
          <textarea
            id="history"
            name="history"
            rows={5}
            defaultValue={initialData.history || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Link 
          href="/peoples/characters"
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 mr-2"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Character' : 'Save Character'}
        </button>
      </div>
    </form>
  );
}