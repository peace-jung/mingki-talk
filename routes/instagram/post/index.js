const express = require('express');
const router = express.Router();

const { isUndefined } = require('./../../../utils/validate');
const { user, post } = require('./../../../postgre');

// SECTION /instagram/post

// 유저 1명의 게시글 리스트 가져오기
router.get('/:userId', async (req, res) => {
  // const userId = req.query.id;
  const userId = req.params.userId;

  console.log('Get User Post List', userId);

  if (isUndefined([userId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  // NOTE 유저가 있는지 check
  const checkUserExist = await user.account.checkUserExist(userId);
  if (checkUserExist.error) {
    return res.status(400).json(checkUserExist);
  }
  if (checkUserExist.data.length === 0) {
    return res.status(400).json({
      error: 'Not Found User',
      code: 404,
      message: '존재하지 않는 아이디'
    });
  }

  // NOTE 유저 post 조회
  const result = await post.get({ userId });

  // TODO Image List 를 찾아서 줘야함
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log(result);
  return res.send(result);
});

// 특정 유저, 특정 게시글 가져오기
router.get('/:userId/:postId', async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  console.log('Get One Post', userId, postId);

  if (isUndefined([userId, postId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  // NOTE 유저가 있는지 check
  const checkUserExist = await user.account.checkUserExist(userId);
  if (checkUserExist.error) {
    return res.status(400).json(checkUserExist);
  }
  if (checkUserExist.data.length === 0) {
    return res.status(400).json({
      error: 'Not Found User',
      code: 404,
      message: '존재하지 않는 아이디'
    });
  }

  // NOTE 유저 post 조회
  const result = await post.get({ userId, postId });

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
