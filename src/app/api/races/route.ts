// src/app/api/races/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCollection, addItem } from '@/lib/db';
import { Race } from '@/app/models/race';
import { randomUUID } from 'crypto';

export async function GET() {
  const races = getCollection<Race>('races');
  return NextResponse.json(races);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Basic validation
  if (!data.name || !data.description || !data.traits || data.traits.length === 0) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Generate ID and slug if not provided
  const race: Race = {
    id: data.id || randomUUID(),
    slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
    ...data
  };
  
  const newRace = addItem('races', race);
  return NextResponse.json(newRace, { status: 201 });
}