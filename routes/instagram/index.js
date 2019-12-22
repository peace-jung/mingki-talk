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

  const originPath = path.join(__dirname, '../../uploads/instagram');
  const file = await fs.readFileSync(originPath + '/' + filename, 'binary');

  fs.readdir(originPath, function(error, filelist) {
    console.log('=================');
    console.log(filelist);
    console.log('=================');
  });

  res.setHeader('Content-type', 'image/png');
  res.write(file, 'binary');
  res.end();
});

module.exports = router;
