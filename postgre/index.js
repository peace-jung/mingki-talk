const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect((err, client) => {
  if (err) throw err;
  console.log('connecting successfully');
  // client.query('SELECT NOW()', (err, res) => {
  //   if (err) throw err;
  //   console.log('success');
  //   client.end();
  // });
});

const user = require('./user')(client);
const list = require('./list')(client);
const friend = require('./friend')(client);

module.exports = { client, user, list, friend };
