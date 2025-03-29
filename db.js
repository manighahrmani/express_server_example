import pkg from 'pg';
export const { Client } = pkg;
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

export async function readSqlFile(filename) {
  const path = join(__dirname, 'db', filename);
  return await readFile(path, 'utf8');
}
