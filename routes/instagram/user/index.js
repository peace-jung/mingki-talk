const express = require('express');
const router = express.Router();

// import routers
const account = require('./account');
const signup = require('./signup');
const detail = require('./detail');

// use routers
router.use('/login', account);
router.use('/signup', signup);
router.use('/detail', detail);

module.exports = router;
