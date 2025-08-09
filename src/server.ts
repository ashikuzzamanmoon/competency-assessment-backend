import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';

// Loading .env file at the very beginning
dotenv.config({ path: path.join(process.cwd(), '.env') });

import config from './config'; // Importing config after dotenv has been loaded

const port = config.port || 5000;

async function main() {
  try {
    // Ensure the database URL is not undefined before connecting
    if (!config.database_url) {
      throw new Error('DATABASE_URL is not defined in the .env file');
    }
    await mongoose.connect(config.database_url);
    console.log(`🛢️  Database is connected successfully`);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }
}

main();
