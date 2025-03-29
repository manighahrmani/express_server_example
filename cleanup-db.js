import { client, readSqlFile } from './db.js';

async function cleanupDatabase() {
  try {
    await client.connect();

    // Drop the database
    const dropDbSql = await readSqlFile('drop-db.sql');
    await client.query(dropDbSql);
    console.log('Database dropped successfully');
  } catch (err) {
    console.error('Error cleaning up database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

cleanupDatabase();
