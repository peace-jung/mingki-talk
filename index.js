const express = require('express');
const PORT = process.env.PORT;
const app = express();
const cors = require('cors');

// middleware
// express
app.use(express.json());
// cors
let corsOptions = {
  origin: ['https://mingstagram.netlify.com', 'http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));

// database
require('./postgre');

// router
const routes = require('./routes');
app.use('/', routes);

// server on
app.listen(PORT || 3001, err => {
  if (err) throw err;
  console.log('server on');
});
