const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { friend } = require('./../../../postgre');

/**
 * get follow list
 * /instagram/follow
 */
router.get('/', async (req, res) => {
  const query = req.query.query;
  const userId = req.query.userId;

  if (
    isUndefined([query, userId]) &&
    (query === 'follow' || query === 'follower')
  ) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: '400'
    });
  }

  const result = await friend.select(query, userId);

  if (result.error) {
    return res.status(400).json({
      error: result.error,
      code: result.code,
      message: '망해써요'
    });
  }

  return res.send(result);
});

/**
 * add follow user
 * /instagram/follow
 */
router.post('/', async (req, res) => {
  const user = req.body.user;
  const follow = req.body.friend;

  if (isUndefined([user, follow])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: '400'
    });
  }

  const result = await friend.insert(user, follow);

  if (result.error) {
    return res.status(400).json({
      error: result.error,
      code: result.code,
      message: '망해써요'
    });
  }

  return res.send(result);
});

router.post('/asdfadf', async (req, res) => {
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
