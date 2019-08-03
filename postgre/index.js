const { Client } = require('pg');
// const {
//   postgresql: { user, password, host, port, database }
// } = require('../config.json');

// const connectionString = `tcp://${user}:${password}@${host}:${port}/${database}`;
console.log(process.env);
console.log(process.env.DATABASE_URL);
// const client = new Client({
//   user,
//   host,
//   database,
//   password,
//   port
// });

// client.connect((err, client) => {
//   console.log('err: ', err);
//   console.log('client: ', client);
// });

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
