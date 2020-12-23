const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { user } = require('./../../../postgre');

// SECTION /wehago

/**
 * get token
 * /instagram/user/login
 */
router.get('/', async (req, res) => {
  console.log('GET /wehago');

  console.log(req.params);
  res.send({ result: 'hello', type: 'GET' });
});

module.exports = router;
