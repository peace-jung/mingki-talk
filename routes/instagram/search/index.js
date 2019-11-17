const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { search } = require('./../../../postgre');

// SECTION /instagram/user

/**
 * get user or post or tag
 * /instagram/search
 */
router.get('/', async (req, res) => {
  const query = req.query.query;
  const result = await search.search(query);

  if (result.error) {
    return res.status(400).json(result);
  } else {
    return res.send({ ...result });
  }
});

module.exports = router;
