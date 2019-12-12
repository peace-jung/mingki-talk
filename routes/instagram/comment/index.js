const express = require('express');
const router = express.Router();

const { isUndefined } = require('./../../../utils/validate');
const { comment } = require('./../../../postgre');

// SECTION /instagram/comment

// 댓글 가져오기
router.get('/', async (req, res) => {
  const owner = req.query.owner;
  const postId = req.query.postId;

  if (isUndefined([owner, postId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await comment.get({ owner, postId });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log('get comment', result);
  return res.send(result);
});

// 댓글쓰기
router.post('/add', async (req, res) => {
  const owner = req.body.owner;
  const postId = req.body.postId;
  const userId = req.body.userId;
  const content = req.body.content;

  if (isUndefined([owner, postId, userId, content])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await comment.add({ owner, postId, userId, content });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log('add comment', result);
  return res.send(result);
});

module.exports = router;
