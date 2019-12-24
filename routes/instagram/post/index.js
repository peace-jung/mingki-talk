const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  dest: 'uploads/instagram/', // path
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const { isUndefined } = require('./../../../utils/validate');
const { user, post } = require('./../../../postgre');

// SECTION /instagram/post

// 글쓰기
router.post('/', upload.array('file', 5), async (req, res) => {
  const userId = req.body.userId;
  const content = req.body.content;
  const photos = req.files;

  console.log('photos', photos);

  const newPhotos = photos.map(p => {
    return {
      fieldname: p.fieldname,
      originalname: p.originalname,
      mimetype: p.mimetype,
      filename: p.filename,
      fullPath: p.fullPath,
      size: p.size
    };
  });
  // console.log('newPhotos', newPhotos);

  // console.log('Upload Post', userId, newPhotos, content);

  if (isUndefined([userId, newPhotos, content])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.upload({ userId, photos: newPhotos, content });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log(result);
  return res.send(result);
});

// 글삭제
router.delete('/', async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  const data = { userId, postId };

  if (isUndefined([userId, postId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.delete(data);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.send(result);
});

// 글수정
router.put('/', async (req, res) => {
  const userId = req.body.userId || null;
  const postId = req.body.postId || null;
  const content = req.body.content || null;

  const data = { userId, postId, content };

  if (isUndefined([userId, postId, content])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.update(data);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.send(result);
});

// 좋아요
router.post('/like', async (req, res) => {
  const userId = req.body.userId; // user id
  const contentUserID = req.body.contentUserID; // content id
  const contentDataId = req.body.contentDataId; // content id
  const like = req.body.like; // true, false

  if (
    typeof like !== 'boolean' ||
    isUndefined([userId, contentUserID, contentDataId, like])
  ) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.contentLike({
    userId,
    contentUserID,
    contentDataId,
    like
  });
  if (result.error) {
    return res.status(400).json(result);
  }
  console.warn('like', result);
  return res.send(result);
});

// main
router.get('/main', async (req, res) => {
  const userId = req.query.userId; // user id

  if (isUndefined([userId])) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 400,
      message: '파라미터 값이 없습니다.'
    });
  }

  const result = await post.allPost(userId);
  if (result.error) {
    return res.status(400).json(result);
  }
  console.warn('allPost', result);
  return res.send(result);
});

// 유저 1명의 게시글 리스트 가져오기
router.get('/:userId', async (req, res) => {
  // const userId = req.query.id;
  const userId = req.params.userId;
  const loginId = req.query.loginId;

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
  const result = await post.get({ userId, loginId });

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
  const loginId = req.query.loginId;

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
  const result = await post.get({ userId, postId, loginId });

  // TODO Image List 를 찾아서 줘야함
  if (result.error) {
    return res.status(400).json(result);
  }
  console.log(result);
  return res.send(result);
});

module.exports = router;
