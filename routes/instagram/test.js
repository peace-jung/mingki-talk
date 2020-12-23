const express = require('express');
const router = express.Router();

router.put('/', async (req, res) => {
  console.log('PUT /test');
  console.warn('req.body', req.body);
  res.send({ result: 'success' });
});

module.exports = router;
