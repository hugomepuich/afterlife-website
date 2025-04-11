// /models/area.ts
export type AreaType = 'city' | 'dungeon' | 'hunt-zone' | 'peace-zone';

export interface Area {
  id: string;
  slug: string;
  name: string;
  type: AreaType;
  description: string;
  history?: string;
  inhabitants?: string[];
  dangerLevel?: number; // Pour les zones de chasse/donjons
  connectedAreas?: string[]; // ID des zones reliées
  previewImage?: string; // URL ou chemin local de l'image principale
  additionalImages?: string[]; // Liste d'URLs ou chemins locaux pour les images additionnelles
}