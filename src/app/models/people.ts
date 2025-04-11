// /models/people.ts
export type Karma = 'good' | 'neutral' | 'bad';

export interface Affiliation {
  id: string;
  slug: string;
  name: string;
  description: string;
  history?: string;
  karma: Karma;
  races: string[]; // ID des races
  leaders?: string[]; // ID des personnages leaders
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  surname?: string;
  race: string; // ID de la race
  affiliation?: string; // ID de l'affiliation
  age?: number;
  description: string;
  history?: string;
  karma?: Karma;
  // Nouvelles propriétés pour les images
  previewImage?: string; // URL ou chemin local de l'image principale
  additionalImages?: string[]; // Liste d'URLs ou chemins locaux pour les images additionnelles
}