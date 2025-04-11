// src/app/api/races/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCollection, saveCollection } from '@/lib/db';
import { Race } from '@/app/models/race';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const races = getCollection<Race>('races');
  const race = races.find(r => r.id === params.id);
  
  if (!race) {
    return NextResponse.json(
      { error: 'Race not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(race);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const races = getCollection<Race>('races');
  
  const index = races.findIndex(r => r.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Race not found' },
      { status: 404 }
    );
  }
  
  // Update the race
  const updatedRace = {
    ...races[index],
    ...data,
    // Ensure ID doesn't change
    id: params.id
  };
  
  races[index] = updatedRace;
  
  // Save changes
  saveCollection('races', races);
  
  return NextResponse.json(updatedRace);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const races = getCollection<Race>('races');
  const filteredRaces = races.filter(r => r.id !== params.id);
  
  if (filteredRaces.length === races.length) {
    return NextResponse.json(
      { error: 'Race not found' },
      { status: 404 }
    );
  }
  
  saveCollection('races', filteredRaces);
  
  return NextResponse.json({ success: true });
}