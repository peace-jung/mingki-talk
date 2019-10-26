const express = require('express');
const router = express.Router();

// SECTION /instagram

// import routers
const user = require('./user');
const post = require('./post');
// const friend = require('./friend');
// const list = require('./list');

// use routers
router.use('/user', user);
router.use('/post', post);
// router.use('/friend', friend);
// router.use('/list', list);

module.exports = router;
