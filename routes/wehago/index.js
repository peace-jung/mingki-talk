const express = require('express');
const router = express.Router();

// SECTION /wehago

// use routers
router.get('/', async (req, res) => {
  console.log('GET /wehago');

  console.log(JSON.stringify(req));
  res.send({ result: JSON.stringify(req), type: 'GET' });
});

module.exports = router;
