// src/app/api/areas/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCollection, saveCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const areas = getCollection<Area>('areas');
  const area = areas.find(a => a.id === params.id);
  
  if (!area) {
    return NextResponse.json(
      { error: 'Area not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(area);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const areas = getCollection<Area>('areas');
  
  const index = areas.findIndex(a => a.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Area not found' },
      { status: 404 }
    );
  }
  
  // Update the area
  const updatedArea = {
    ...areas[index],
    ...data,
    // Ensure ID doesn't change
    id: params.id
  };
  
  areas[index] = updatedArea;
  
  // Save changes
  saveCollection('areas', areas);
  
  return NextResponse.json(updatedArea);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const areas = getCollection<Area>('areas');
  const filteredAreas = areas.filter(a => a.id !== params.id);
  
  if (filteredAreas.length === areas.length) {
    return NextResponse.json(
      { error: 'Area not found' },
      { status: 404 }
    );
  }
  
  saveCollection('areas', filteredAreas);
  
  return NextResponse.json({ success: true });
}