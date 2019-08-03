const express = require('express');
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());

// database
require('./postgre');

// router
const api = require('./routes');
app.use('/api', api);

app.listen(PORT || 3000, err => {
  if (err) throw err;
  console.log('server on');
});
