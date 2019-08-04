const express = require('express');
const router = express.Router();

// import routers
const user = require('./user');
const list = require('./list');

// use routers
router.use('/user', user);
router.use('/list', list);

module.exports = router;
