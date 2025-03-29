import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(express.static('client'));

// Database connection
const dbClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'message_board',
  password: '',
  port: 5432,
});

// Connect to the database
// This is a self-invoking async function to connect to the database
(async () => {
  await dbClient.connect();
})();

// API endpoint to get messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await dbClient.query(
      'SELECT * FROM messages ORDER BY created_at DESC',
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching messages');
  }
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
