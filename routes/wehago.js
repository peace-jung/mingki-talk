const express = require('express');
const router = express.Router();

// SECTION /wehago

/**
 * get token
 * /wehago
 */
router.get('/', async (req, res) => {
  console.log('GET /wehago');

  console.log(req.params);
  res.send({ result: 'hello', type: 'GET' });
});

module.exports = router;
