const express = require('express');
const router = express.Router();

const { isUndefined } = require('./../../../utils/validate');
const { post } = require('./../../../postgre');

router.get('/', (req, res) => {
  console.log('GET / : check in');
  // console.log('postgre', list.insert({ id: '1111', pw: '1111' }));
  res.send({ result: 'hello mingki', type: 'GET' });
});

router.post('/', (req, res) => {
  const userId = req.body.userId;
  const photo = req.body.photo;
  const content = req.body.content;

  console.log('Upload Post');

  if (isUndefined([userId, photo, content])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: '400',
      message: '파라미터 값이 없습니다.'
    });
  }
  // console.log('postgre', list.select({ id: '1111', pw: '1111' }));
  res.send({ result: 'hello mingki', type: 'POST' });
});

module.exports = router;
