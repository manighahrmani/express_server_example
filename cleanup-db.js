import pkg from 'pg';
const { Client } = pkg;
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readSqlFile = async (filename) => {
  const path = join(__dirname, 'db', filename);
  return await readFile(path, 'utf8');
};

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Connect to default database
  password: '', // Your PostgreSQL password if set
  port: 5432,
});

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
