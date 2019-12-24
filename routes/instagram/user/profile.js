const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { user } = require('./../../../postgre');

// SECTION /instagram/user

/**
 * /instagram/user/profile
 */
router.put('/info', async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name || null;
  const phone = req.body.phone || null;
  const profile_img = req.body.profile_img || null;
  const title = req.body.title || null;
  const birthday = req.body.birthday || null;

  if (!userId)
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: 'userId 값이 없습니다.'
    });

  const data = {
    userId,
    name,
    phone,
    profile_img,
    title,
    birthday
  };
  console.log('body ::', req.body);
  console.log('data ::', data);

  const result = await user.profile.updateProfile(data);
  if (result.error) {
    return res.status(400).json(result);
  }

  return res.send({ result });
});

/**
 * /instagram/user/profile
 */
router.put('/pw', async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password || null;
  const new_password = req.body.new_password || null;

  if (!userId)
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: 'userId 값이 없습니다.'
    });

  const data = {
    userId,
    password,
    new_password
  };

  const result = await user.profile.updatePassword(data);
  if (result.error) {
    return res.status(400).json(result);
  }

  return res.send({ result });
});

module.exports = router;
