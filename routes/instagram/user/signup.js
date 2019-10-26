const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { user } = require('./../../../postgre');

// SECTION /instagram/user

/**
 * signup
 * /instagram/user/signup
 */
router.post('/', async (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;
  const name = req.body.name;
  const phone = req.body.phone || null;
  const profile_img = req.body.profile_img || null;
  const title = req.body.title || null;
  const birthday = req.body.birthday || null;

  if (isUndefined([userId, userPw, name])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
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
    return res.status(400).json(result);
  }

  return res.send(result);
});

module.exports = router;
