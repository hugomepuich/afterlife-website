// src/app/scripts/seed-areas.js
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

// Initial area data
const initialAreas = [
  {
    id: randomUUID(),
    slug: 'silvermoon-city',
    name: 'Silvermoon City',
    type: 'city',
    description: 'The majestic capital city, known for its towering spires and magical fountains. Home to the royal family and center of commerce.',
    history: 'Founded over 500 years ago, Silvermoon City began as a small trading post at the confluence of two great rivers. As trade flourished, the city grew rapidly under the protection of the royal family.\n\nDuring the Great War, the city was nearly destroyed but was rebuilt even grander than before, incorporating advanced magical architecture and defensive enchantments.',
    dangerLevel: 0,
    connectedAreas: []
  },
  {
    id: randomUUID(),
    slug: 'westwood-forest',
    name: 'Westwood Forest',
    type: 'hunt-zone',
    description: 'A dense forest west of Silvermoon City, home to abundant wildlife and strange magical creatures.',
    history: 'The Westwood has always been a place of mystery. Ancient trees whisper secrets to those who know how to listen, and forgotten ruins dot the landscape, hinting at civilizations long gone.',
    dangerLevel: 3,
    connectedAreas: []
  },
  {
    id: randomUUID(),
    slug: 'crystal-caverns',
    name: 'Crystal Caverns',
    type: 'dungeon',
    description: 'A vast network of underground caves filled with luminescent crystals and dangerous creatures.',
    history: 'The Crystal Caverns were discovered by miners two centuries ago. What started as a simple mining operation quickly became a nightmare as the miners delved too deep and awakened ancient guardians.',
    dangerLevel: 8,
    connectedAreas: []
  },
  {
    id: randomUUID(),
    slug: 'tranquil-glade',
    name: 'Tranquil Glade',
    type: 'peace-zone',
    description: 'A serene clearing in the Westwood Forest where magic prevents all forms of violence and conflict.',
    history: 'Created by a powerful druid circle after the Great War, the Tranquil Glade serves as neutral ground where enemies can meet in peace. The magical wards have never failed in over three centuries.',
    dangerLevel: 0,
    connectedAreas: []
  },
  {
    id: randomUUID(),
    slug: 'eastport-village',
    name: 'Eastport Village',
    type: 'city',
    description: 'A small fishing village on the eastern coast, known for its seafood and skilled navigators.',
    history: 'Eastport began as a seasonal camp for fisherfolk but grew into a permanent settlement as maritime trade became more important. Despite its small size, the village has produced many famous explorers and sea captains.',
    dangerLevel: 1,
    connectedAreas: []
  },
  {
    id: randomUUID(),
    slug: 'haunted-ruins',
    name: 'Haunted Ruins',
    type: 'dungeon',
    description: 'The remnants of an ancient temple, now overrun with undead and malevolent spirits.',
    history: 'Once a place of worship for a now-extinct civilization, the temple fell to darkness when forbidden rituals were performed during a solar eclipse. The souls of those sacrificed remain, forever bound to the ruins.',
    dangerLevel: 9,
    connectedAreas: []
  }
];

// Connect the areas
// Silvermoon connects to Westwood and Eastport
initialAreas[0].connectedAreas = [initialAreas[1].id, initialAreas[4].id];
// Westwood connects to Silvermoon, Crystal Caverns, and Tranquil Glade
initialAreas[1].connectedAreas = [initialAreas[0].id, initialAreas[2].id, initialAreas[3].id];
// Crystal Caverns connects to Westwood and Haunted Ruins
initialAreas[2].connectedAreas = [initialAreas[1].id, initialAreas[5].id];
// Tranquil Glade connects to Westwood
initialAreas[3].connectedAreas = [initialAreas[1].id];
// Eastport connects to Silvermoon and Haunted Ruins
initialAreas[4].connectedAreas = [initialAreas[0].id, initialAreas[5].id];
// Haunted Ruins connects to Crystal Caverns and Eastport
initialAreas[5].connectedAreas = [initialAreas[2].id, initialAreas[4].id];

// Function to seed the database
function seedAreas() {
  const DB_DIR = path.join(process.cwd(), 'src', 'data');
  
  // Ensure the directory exists
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  
  const filePath = path.join(DB_DIR, 'areas.json');
  
  // Check if the file already exists with data
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const existingAreas = JSON.parse(data);
      
      if (existingAreas.length > 0) {
        console.log('Areas database already contains data, skipping seed');
        return;
      }
    } catch (error) {
      console.error('Error reading existing areas:', error);
    }
  }
  
  // Write initial data
  fs.writeFileSync(filePath, JSON.stringify(initialAreas, null, 2));
  console.log('Database seeded with initial areas');
}

// Execute the function
seedAreas();