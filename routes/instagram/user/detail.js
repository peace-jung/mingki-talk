const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { user } = require('./../../../postgre');

// SECTION /instagram/user

/**
 * detail
 * /instagram/user/detail
 */
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const myId = req.query.myId;

  if (isUndefined([userId, myId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await user.account.searchUser(userId, myId);
  if (result.error) {
    return res.status(400).json(result);
  }

  return res.send(result);
});

module.exports = router;
