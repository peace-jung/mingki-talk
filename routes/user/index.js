const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../utils/validate');
const { user } = require('./../../postgre');

router.get('/', (req, res) => {
  console.log('GET /api/user/');
  res.send({ result: 'hello mingki', type: 'GET' });
});

router.post('/', async (req, res) => {
  const method = req.body.method; // [SELECT, INSERT, DELETE, UPDATE]
  const service = req.body.service; // [ALL, USER, SEARCH]

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
        service
      };
      result = await user.select(data);
      break;
    case 'INSERT':
      data = {
        service
      };
      result = user.insert(data);
      break;
    case 'DELETE':
      data = {
        service
      };
      result = user.delete(data);
      break;
    case 'UPDATE':
      data = {
        service
      };
      result = user.update(data);
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

  console.log('object', result.rows);

  res.send({ result: result.rows });
});

module.exports = router;
