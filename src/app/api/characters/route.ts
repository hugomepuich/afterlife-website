import { NextRequest, NextResponse } from 'next/server';
import { getCollection, addItem } from '@/lib/db';
import { Character } from '@/lib/data/characters';
import { randomUUID } from 'crypto';

// Assurez-vous que ces méthodes sont exportées comme des exportations nommées
export async function GET() {
  const characters = getCollection<Character>('characters');
  return NextResponse.json(characters);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Validation de base
  if (!data.name || !data.race || !data.description) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Génération d'un ID et slug si non fournis
  const character: Character = {
    id: data.id || randomUUID(),
    slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
    ...data
  };
  
  const newCharacter = addItem('characters', character);
  return NextResponse.json(newCharacter, { status: 201 });
}