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
  const service = req.body.service; // [ALL, USERINFO, SEARCH]

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
      const tokenId = req.body.tokenId;
      const userId = req.body.userId;
      data = {
        service,
        tokenId,
        userId
      };
      result = await user.select(data);
      break;
    case 'INSERT':
      const {
        id,
        password,
        name,
        phone = null,
        profile_img = null,
        title = null,
        birthday = null
      } = req.body;

      data = {
        id,
        password,
        name,
        phone,
        profile_img,
        title,
        birthday
      };
      result = await user.insert(data);
      break;
    case 'DELETE':
      data = {
        service,
        tokenId,
        userId
      };
      result = user.delete(data);
      break;
    case 'UPDATE':
      data = {
        service,
        tokenId,
        userId
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

  res.send(result);
});

module.exports = router;
