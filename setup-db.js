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
  database: 'postgres', // Default database for initial connection
  password: '', // Your PostgreSQL password if set
  port: 5432,
});

async function setupDatabase() {
  try {
    await client.connect();

    // Create database
    const createDbSql = await readSqlFile('create-db.sql');
    await client.query(createDbSql);
    console.log('Database created successfully');

    // Connect to the new database
    await client.end();
    const dbClient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'message_board',
      password: '',
      port: 5432,
    });
    await dbClient.connect();

    // Create tables
    const createTablesSql = await readSqlFile('create-tables.sql');
    await dbClient.query(createTablesSql);
    console.log('Tables created successfully');

    // Seed data
    const seedDataSql = await readSqlFile('seed-data.sql');
    await dbClient.query(seedDataSql);
    console.log('Data seeded successfully');

    await dbClient.end();
  } catch (err) {
    console.error('Error setting up database:', err);
    process.exit(1);
  }
}

setupDatabase();
