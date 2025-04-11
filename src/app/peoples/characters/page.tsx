// /src/app/peoples/characters/page.tsx
import Link from 'next/link';
import CharacterSearch from '@/components/characters/CharacterSearch';
import { getCollection } from '@/lib/db';
import { Character } from '@/lib/data/characters';

export const dynamic = 'force-dynamic'; // Pour toujours rafraîchir les données

export default function CharactersPage() {
  // Récupérer les personnages depuis notre système de stockage
  const characters = getCollection<Character>('characters');
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Characters</h1>
        <Link 
          href="/peoples/characters/new"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add New Character
        </Link>
      </div>
      
      <CharacterSearch characters={characters} />
    </div>
  );
}