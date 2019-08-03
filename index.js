const express = require('express');
const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
  console.log('check in');
  res.send({ result: 'hello mingki' });
});

app.listen(PORT, () => {
  console.log('mingki-talk server is on. port:', PORT);
});
