const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect((err, client) => {
  if (err) throw err;
  console.log('connecting successfully');
  client.query('SELECT NOW()', (err, res) => {
    if (err) throw err;
    console.log('success');
    client.end();
  });
});
