const { Client } = require('pg');
// const {
//   postgresql: { user, password, host, port, database }
// } = require('../config.json');

// const connectionString = `tcp://${user}:${password}@${host}:${port}/${database}`;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect((err, client) => {
  console.log('err: ', err);
  console.log('client: ', client);
});

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
