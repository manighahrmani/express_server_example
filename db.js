import pkg from 'pg';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
export const { Client } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '', // Add your password for the PostgreSQL user here
  port: 5432,
});

export async function readSqlFile(filename) {
  const path = join(__dirname, 'db', filename);
  return await readFile(path, 'utf8');
}
