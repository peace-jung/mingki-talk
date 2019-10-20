const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { user } = require('./../../../postgre');

/**
 * signup
 * /instagram/user/signup
 */
router.post('/', async (req, res) => {
  const {
    userId,
    userPw,
    name,
    phone = null,
    profile_img = null,
    title = null,
    birthday = null
  } = req.body;

  if (isUndefined([userId, userPw, name])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: '400',
      message: '파라미터 값이 없습니다.'
    });
  }

  const data = {
    userId,
    userPw,
    name,
    phone,
    profile_img,
    title,
    birthday
  };

  const result = await user.account.signup(data);
  if (result.error) {
    return res.status(result.code).json({
      error: result.error,
      code: result.code
    });
  }

  return res.send(result);
});

module.exports = router;
