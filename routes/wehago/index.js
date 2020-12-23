const express = require('express');
const router = express.Router();

// SECTION /wehago

// use routers
router.post('/', async (req, res) => {
  console.log('POST /wehago');

  console.log(req.body);
  res.send({ result: req.body, type: 'POST' });
});

module.exports = router;
