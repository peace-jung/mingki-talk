const express = require('express');
const router = express.Router();

// import routers
const account = require('./account');
const signup = require('./signup');
const detail = require('./detail');
const profile = require('./profile');

// use routers
router.use('/login', account);
router.use('/signup', signup);
router.use('/detail', detail);
router.use('/profile', profile);

module.exports = router;
