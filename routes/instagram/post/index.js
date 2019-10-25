const express = require('express');
const router = express.Router();

const { isUndefined } = require('./../../../utils/validate');
const { post } = require('./../../../postgre');

// SECTION /instagram/post
// 유저 1명의 게시글 리스트 가져오기
router.get('/', async (req, res) => {
  const userId = req.query.id;

  console.log('Get User Post', userId);

  if (isUndefined([userId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.get({ userId });

  // TODO Image List 를 찾아서 줘야함
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log(result);
  return res.send(result);
});

// 글쓰기
router.post('/', async (req, res) => {
  const userId = req.body.userId;
  const photo = req.body.photo;
  const content = req.body.content;

  console.log('Upload Post', userId, photo, content);

  if (isUndefined([userId, photo, content])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.upload({ userId, photo, content });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log(result);
  return res.send(result);
});

module.exports = router;
