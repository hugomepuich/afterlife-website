// /scripts/seed.js
const fs = require('fs');
const path = require('path');

// Données initiales des personnages
const initialCharacters = [
  {
    id: '1',
    slug: 'ivy',
    name: 'Ivy',
    surname: 'Arlaeros',
    race: 'Human',
    affiliation: 'No Affiliation',
    age: 0,
    description: 'Aragorn II, son of Arathorn, is a Ranger of the North and the rightful heir to the throne of Gondor.',
    history: 'Raised in Rivendell under the name Estel, Aragorn learned of his heritage at the age of 20. He spent many years wandering the wilderness, serving in the armies of Rohan and Gondor under the name Thorongil. During the War of the Ring, he joined the Fellowship and eventually claimed his birthright as King of Gondor.',
    karma: 'bad'
  }
];

// Fonction pour initialiser la base de données
function seedDatabase() {
  const DB_DIR = path.join(__dirname, '..', 'src', 'data');
  
  // Assurez-vous que le répertoire existe
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  
  const filePath = path.join(DB_DIR, 'characters.json');
  
  // Vérifiez si le fichier existe déjà et contient des données
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const existingCharacters = JSON.parse(data);
      
      if (existingCharacters.length > 0) {
        console.log('Database already contains characters, skipping seed');
        return;
      }
    } catch (error) {
      console.error('Error reading existing characters:', error);
    }
  }
  
  // Écrire les données initiales
  fs.writeFileSync(filePath, JSON.stringify(initialCharacters, null, 2));
  console.log('Database seeded with initial characters');
}

// Exécuter la fonction
seedDatabase();