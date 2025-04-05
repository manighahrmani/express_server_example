import { Client, client, readSqlFile } from './db.js';
import dbConfig from '../db-config.js';

async function setupDatabase() {
  try {
    await client.connect();

    const dbName = dbConfig.database;
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database '${dbName}' created successfully`);

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
