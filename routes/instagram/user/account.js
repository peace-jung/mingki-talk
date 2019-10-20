const express = require('express');
const router = express.Router();
const { isUndefined } = require('./../../../utils/validate');
const { user } = require('./../../../postgre');

// SECTION /instagram/user/login
/**
 * get token
 * /instagram/user/login
 */
router.get('/', async (req, res) => {
  console.log('GET /instagram/user/login');
  const users = await user.account.getAllUser();
  console.log(users);
  res.send({ result: 'hello mingki', type: 'GET' });
});

/**
 * login
 * /instagram/user/login
 */
router.post('/', async (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;

  console.log('login', userId, userPw);

  if (isUndefined([userId, userPw])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: '400',
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await user.account.login({ userId, userPw });
  if (result.error) {
    return res.status(result.code).json({
      error: result.error,
      code: result.code
    });
  }

  return res.send(result);

  // let data = {};
  // let result = {};
  // switch (method) {
  //   case 'SELECT':
  //     result = await user.select(req.body);
  //     break;
  //   case 'INSERT':
  //     const {
  //       id,
  //       password,
  //       name,
  //       phone = null,
  //       profile_img = null,
  //       title = null,
  //       birthday = null
  //     } = req.body;

  //     data = {
  //       id,
  //       password,
  //       name,
  //       phone,
  //       profile_img,
  //       title,
  //       birthday
  //     };
  //     result = await user.insert(data);
  //     break;
  //   case 'DELETE':
  //     data = {
  //       service,
  //       tokenId,
  //       userId
  //     };
  //     result = user.delete(data);
  //     break;
  //   case 'UPDATE':
  //     data = {
  //       service,
  //       tokenId,
  //       userId
  //     };
  //     result = user.update(data);
  //     break;
  //   default:
  //     break;
  // }

  // if (result.error) {
  //   return res.status(result.code).json({
  //     error: result.error,
  //     code: result.code
  //   });
  // }

  // res.send(result);
});

module.exports = router;
