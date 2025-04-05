import { Client, client, readSqlFile } from './db.js';
import dbConfig from '../db-config.json';

async function setupDatabase() {
  try {
    await client.connect();

    const createDbSql = await readSqlFile('create-db.sql');
    await client.query(createDbSql);
    console.log('Database created successfully');

    await client.end();

    const dbClient = new Client(dbConfig);
    await dbClient.connect();

    const createTablesSql = await readSqlFile('create-tables.sql');
    await dbClient.query(createTablesSql);
    console.log('Tables created successfully');

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
