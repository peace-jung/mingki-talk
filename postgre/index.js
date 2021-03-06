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
const post = require('./post')(client);
const comment = require('./comment')(client);
const search = require('./search')(client);
const friend = require('./friend')(client);
// const list = require('./list')(client);

module.exports = {
  client,
  user,
  post,
  comment,
  search,
  friend
};
