import { Client, client, readSqlFile } from './db.js';

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
