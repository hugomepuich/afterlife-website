// /src/lib/db/index.ts
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'src', 'data');

// Assurez-vous que le répertoire de données existe
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// /src/lib/db.ts
export function getCollection<T>(collectionName: string): T[] {
    try {
      const filePath = path.join(DB_DIR, `${collectionName}.json`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`Le fichier ${collectionName}.json n'existe pas!`);
        return [];
      }
      
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as T[];
    } catch (error) {
      console.error(`Erreur lors de la lecture de la collection ${collectionName}:`, error);
      return [];
    }
  }
export function saveCollection<T>(collectionName: string, data: T[]): void {
  const filePath = path.join(DB_DIR, `${collectionName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getItem<T>(collectionName: string, id: string): T | null {
  const collection = getCollection<T & { id: string }>(collectionName);
  const item = collection.find(item => item.id === id);
  return item || null;
}

export function addItem<T>(collectionName: string, item: T & { id: string }): T {
  const collection = getCollection<T & { id: string }>(collectionName);
  collection.push(item);
  saveCollection(collectionName, collection);
  return item;
}

export function updateItem<T>(collectionName: string, id: string, updates: Partial<T>): T | null {
  const collection = getCollection<T & { id: string }>(collectionName);
  const index = collection.findIndex(item => item.id === id);
  
  if (index === -1) return null;
  
  const updatedItem = { ...collection[index], ...updates };
  collection[index] = updatedItem;
  
  saveCollection(collectionName, collection);
  return updatedItem;
}

export function deleteItem(collectionName: string, id: string): boolean {
  const collection = getCollection<{ id: string }>(collectionName);
  const filteredCollection = collection.filter(item => item.id !== id);
  
  if (filteredCollection.length === collection.length) {
    return false;
  }
  
  saveCollection(collectionName, filteredCollection);
  return true;
}