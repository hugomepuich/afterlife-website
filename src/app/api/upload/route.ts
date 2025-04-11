// /src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { saveImage } from '@/lib/images';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Uploaded file is not an image' },
        { status: 400 }
      );
    }
    
    const imagePath = await saveImage(file);
    
    return NextResponse.json({ path: imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}