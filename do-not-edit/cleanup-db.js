import { client } from './db.js';
import dbConfig from '../db-config.js';

async function cleanupDatabase() {
  try {
    await client.connect();

    const dbName = dbConfig.database;
    await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
    console.log(`Database '${dbName}' dropped successfully`);
  } catch (err) {
    console.error('Error cleaning up database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

cleanupDatabase();
