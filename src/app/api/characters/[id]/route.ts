// /src/app/api/characters/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCollection, saveCollection } from '@/lib/db';
import { Character } from '@/lib/data/characters';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const characters = getCollection<Character>('characters');
  const character = characters.find(c => c.id === params.id);
  
  if (!character) {
    return NextResponse.json(
      { error: 'Character not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(character);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const characters = getCollection<Character>('characters');
  
  const index = characters.findIndex(c => c.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Character not found' },
      { status: 404 }
    );
  }
  
  // Mettre à jour le personnage
  const updatedCharacter = {
    ...characters[index],
    ...data,
    // S'assurer que l'ID ne change pas
    id: params.id
  };
  
  characters[index] = updatedCharacter;
  
  // Sauvegarder les modifications
  saveCollection('characters', characters);
  
  return NextResponse.json(updatedCharacter);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const characters = getCollection<Character>('characters');
  const filteredCharacters = characters.filter(c => c.id !== params.id);
  
  if (filteredCharacters.length === characters.length) {
    return NextResponse.json(
      { error: 'Character not found' },
      { status: 404 }
    );
  }
  
  saveCollection('characters', filteredCharacters);
  
  return NextResponse.json({ success: true });
}