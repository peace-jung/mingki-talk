const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('check in');
  res.send({ result: 'hello mingki' });
});

module.exports = router;
