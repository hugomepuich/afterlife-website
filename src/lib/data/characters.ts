import { getCollection } from '@/lib/db'; // Assurez-vous que le chemin est correct

// /src/lib/data/characters.ts
export interface Character {
    id: string;
    slug: string;
    name: string;
    surname?: string;
    race: string;
    affiliation?: string;
    age?: number;
    description: string;
    history?: string;
    karma?: 'good' | 'neutral' | 'bad';
    // Nouvelles propriétés pour les images
    previewImage?: string; // URL ou chemin local de l'image principale
    additionalImages?: string[]; // Liste d'URLs ou chemins locaux pour les images additionnelles
  }
  
  // Ces données seraient normalement stockées dans une base de données
  // et récupérées via une API
  /*const charactersData: Character[] = [
    {
      id: '1',
      slug: 'aragorn',
      name: 'Aragorn',
      surname: 'II Elessar',
      race: 'Human',
      affiliation: 'rangers-of-the-north',
      age: 87,
      description: 'Aragorn II, son of Arathorn, is a Ranger of the North and the rightful heir to the throne of Gondor.',
      history: 'Raised in Rivendell under the name Estel, Aragorn learned of his heritage at the age of 20. He spent many years wandering the wilderness, serving in the armies of Rohan and Gondor under the name Thorongil. During the War of the Ring, he joined the Fellowship and eventually claimed his birthright as King of Gondor.',
      karma: 'good'
    },
    {
      id: '2',
      slug: 'gandalf',
      name: 'Gandalf',
      surname: 'the Grey',
      race: 'Maia',
      affiliation: 'istari',
      description: 'Gandalf is one of the Istari, powerful wizards sent to Middle-earth to contest the will of Sauron.',
      history: 'Gandalf was sent to Middle-earth around the year 1000 of the Third Age. For more than 2,000 years, he worked tirelessly to oppose Sauron. He played a crucial role in the formation of the Fellowship of the Ring and the ultimate destruction of the One Ring.',
      karma: 'good'
    },
    {
      id: '3',
      slug: 'gollum',
      name: 'Gollum',
      surname: '',
      race: 'Hobbit',
      age: 589,
      description: 'Formerly known as Sméagol, Gollum is a creature corrupted by the One Ring.',
      history: 'Originally a Stoor Hobbit, Sméagol found the One Ring and was corrupted by its power over hundreds of years. His obsession with the Ring transformed him into the creature known as Gollum.',
      karma: 'bad'
    }
  ]; */

  const charactersData: Character[] = getCharacters();
  
  export function getCharacters(): Character[] {
    // Récupérer les personnages depuis le stockage
    const storedCharacters = getCollection<Character>('characters');
    
    // Si des personnages sont stockés, les utiliser
    // Sinon, utiliser les données par défaut
    return storedCharacters;
  }
  
// /src/lib/data/characters.ts
export function getCharacterBySlug(slug: string): Character | undefined {
    // Ajoutez des logs pour déboguer

    
    console.log("Recherche du personnage avec slug:", slug);
    console.log("Personnages disponibles:", charactersData);
    
    // Rendez la recherche insensible à la casse
    return charactersData.find(
      character => character.slug.toLowerCase() === slug.toLowerCase()
    );
  }
  
  export function getCharactersByAffiliation(affiliationSlug: string): Character[] {
    return charactersData.filter(character => character.affiliation === affiliationSlug);
  }
  
  export function getCharactersByRace(raceSlug: string): Character[] {
    return charactersData.filter(character => character.race.toLowerCase() === raceSlug);
  }