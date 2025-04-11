// src/app/api/areas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCollection, addItem } from '@/lib/db';
import { Area } from '@/app/models/area';
import { randomUUID } from 'crypto';

// Named export for GET method
export async function GET() {
  const areas = getCollection<Area>('areas');
  return NextResponse.json(areas);
}

// Named export for POST method
export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Basic validation
  if (!data.name || !data.type || !data.description) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Generate ID and slug if not provided
  const area: Area = {
    id: data.id || randomUUID(),
    slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
    ...data
  };
  
  const newArea = addItem('areas', area);
  return NextResponse.json(newArea, { status: 201 });
}