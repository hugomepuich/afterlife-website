// /src/app/peoples/characters/[slug]/edit/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CharacterForm from '@/components/characters/CharacterForm';
import { getCharacterBySlug } from '@/lib/data/characters';

export default async function EditCharacterPage({ params }: { params: { slug: string } }) {

    const _params = await params;
    const slug = await _params.slug;

  const character = await getCharacterBySlug(slug);

  
  if (!character) {
    notFound();
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href={`/peoples/characters/${slug}`} className="text-blue-500 hover:underline">
          ← Retour au personnage
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Modifier {character.name}</h1>
      
      <CharacterForm initialData={character} isEditing={true} />
    </div>
  );
}