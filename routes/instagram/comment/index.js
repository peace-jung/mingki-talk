const express = require('express');
const router = express.Router();

const { isUndefined } = require('./../../../utils/validate');
const { comment } = require('./../../../postgre');

// SECTION /instagram/comment

// 댓글 가져오기
router.get('/', async (req, res) => {
  const ownerId = req.body.ownerId;
  const postCreated = req.body.postCreated;

  if (isUndefined([ownerId, postCreated])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await comment.get({ ownerId, postCreated });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log('get comment', result);
  return res.send(result);
});

// 댓글쓰기
router.post('/add', async (req, res) => {
  const ownerId = req.body.ownerId;
  const postCreated = req.body.postCreated;
  const userId = req.body.userId;
  const content = req.body.content;

  if (isUndefined([ownerId, postCreated, userId, content])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await comment.add({ ownerId, postCreated, userId, content });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log('add comment', result);
  return res.send(result);
});

module.exports = router;
