// src/lib/data/areas.ts
import { getCollection } from '@/lib/db';
import { Area } from '@/app/models/area';

/**
 * Gets all areas from the collection
 */
export function getAreas(): Area[] {
  return getCollection<Area>('areas');
}

/**
 * Gets an area by its slug
 */
export function getAreaBySlug(slug: string): Area | undefined {
  const areas = getAreas();
  return areas.find(area => area.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Gets areas by type
 */
export function getAreasByType(type: string): Area[] {
  const areas = getAreas();
  return areas.filter(area => area.type === type);
}

/**
 * Gets areas connected to a specific area
 */
export function getConnectedAreas(areaId: string): Area[] {
  const areas = getAreas();
  const area = areas.find(a => a.id === areaId);
  
  if (!area || !area.connectedAreas || area.connectedAreas.length === 0) {
    return [];
  }
  
  return areas.filter(a => area.connectedAreas?.includes(a.id));
}

/**
 * Gets areas by danger level range
 */
export function getAreasByDangerLevel(min: number, max: number): Area[] {
  const areas = getAreas();
  return areas.filter(area => {
    if (area.dangerLevel === undefined) return false;
    return area.dangerLevel >= min && area.dangerLevel <= max;
  });
}