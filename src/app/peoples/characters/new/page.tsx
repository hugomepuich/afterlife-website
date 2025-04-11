// /src/app/peoples/characters/new/page.tsx
import Link from 'next/link';
import CharacterForm from '@/components/characters/CharacterForm';

export default function NewCharacterPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/peoples/characters" className="text-blue-500 hover:underline">
          ← Back to Characters
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Add New Character</h1>
      
      <CharacterForm />
    </div>
  );
}