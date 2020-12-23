const express = require('express');
const router = express.Router();

// SECTION /wehago

// use routers
router.get('/', async (req, res) => {
  console.log('GET /wehago');

  console.log(req.query);
  res.send({ result: req.query, type: 'GET' });
});

module.exports = router;
