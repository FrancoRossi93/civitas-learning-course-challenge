// scripts/init-db.ts
import { setupDB } from './db'; // Adjust the path as needed

setupDB().then(() => {
  console.log('Database setup complete');
}).catch((error) => {
  console.error('Failed to setup database:', error);
});
