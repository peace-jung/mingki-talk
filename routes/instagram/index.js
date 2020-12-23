const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// SECTION /instagram

// import routers
const user = require('./user');
const post = require('./post');
const comment = require('./comment');
const search = require('./search');
const follow = require('./follow');
// const list = require('./list');

// use routers
router.use('/user', user);
router.use('/post', post);
router.use('/comment', comment);
router.use('/search', search);
router.use('/follow', follow);
// router.use('/list', list);

router.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  if (!filename) {
    return res.status(400).json({
      error: 'Check Parameters',
      code: 404,
      message: '파일 이름을 확인해주세요'
    });
  }

  try {
    const originPath = path.join(__dirname, '../../uploads/instagram');
    const file = fs.readFileSync(originPath + '/' + filename, 'binary');

    res.setHeader('Content-type', 'image/png');
    res.write(file, 'binary');
    res.end();
  } catch (error) {
    return res.status(400).json({
      error: 'Undefined File',
      code: 404,
      message: '서버에 문제가 발생했다.'
    });
  }
});

module.exports = router;
