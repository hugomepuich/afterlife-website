// /src/lib/images.ts
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'uploads');

// Assurer que le répertoire existe
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

export async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Générer un nom de fichier unique
  const filename = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
  const filepath = path.join(IMAGES_DIR, filename);
  
  // Écrire le fichier
  fs.writeFileSync(filepath, buffer);
  
  // Retourner le chemin relatif pour accéder à l'image depuis le navigateur
  return `/uploads/${filename}`;
}

export function deleteImage(imagePath: string): boolean {
  try {
    // Extraire le nom du fichier à partir du chemin
    const filename = imagePath.split('/').pop();
    if (!filename) return false;
    
    const filepath = path.join(IMAGES_DIR, filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}