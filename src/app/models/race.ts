// src/app/models/race.ts
export interface Race {
  id: string;
  slug: string;
  name: string;
  description: string;
  traits: string[];
  history?: string;
  regions?: string[];
  image?: string;
}