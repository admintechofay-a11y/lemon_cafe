import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import MenuItem from './models/MenuItem.js';
import Category from './models/Category.js';
import { categoriesData, menuItemsData } from './config/seedData.js';

dotenv.config();

export async function seedDatabase() {
  try {
    await connectDB();

    console.log('[Seeder]: Clearing old menu and category records...');
    await MenuItem.deleteMany({});
    await Category.deleteMany({});

    console.log('[Seeder]: Inserting categories...');
    await Category.insertMany(categoriesData);

    console.log('[Seeder]: Inserting menu items...');
    await MenuItem.insertMany(menuItemsData);

    console.log(`[Seeder]: Successfully loaded ${categoriesData.length} categories and ${menuItemsData.length} menu items!`);
    process.exit(0);
  } catch (err) {
    console.error('[Seeder Error]:', err.message);
    process.exit(1);
  }
}

if (process.argv[2] === '-d' || process.argv[2] === '--destroy') {
  connectDB().then(async () => {
    await MenuItem.deleteMany({});
    await Category.deleteMany({});
    console.log('[Seeder]: Data destroyed.');
    process.exit(0);
  });
} else {
  seedDatabase();
}
