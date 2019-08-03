const { Client } = require('pg');
// const {
//   postgresql: { user, password, host, port, database }
// } = require('../config.json');

// const connectionString = `tcp://${user}:${password}@${host}:${port}/${database}`;
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
