const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../utils/validate');
const { friend } = require('./../../postgre');

router.post('/', async (req, res) => {
  const method = req.body.method; // [SELECT, INSERT, DELETE, UPDATE]
  const service = req.body.service; // []

  if (isUndefined([method, service])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: '400'
    });
  }

  let data = {};
  let result = {};
  switch (method) {
    case 'SELECT':
      data = {
        my_id: req.body.my_id
      };
      result = await friend.select(data);
      break;
    case 'INSERT':
      data = {
        my_id: req.body.my_id,
        f_id: req.body.f_id
      };
      result = await friend.insert(data);
      break;
    case 'UPDATE':
      result = await friend.update(data);
      break;
    case 'DELETE':
      result = await friend.delete(data);
      break;
    default:
      break;
  }

  if (result.error) {
    return res.status(result.code).json({
      error: result.error,
      code: result.code
    });
  }

  res.send(result);
});

module.exports = router;
