const express = require('express');
const router = express.Router();

// import routers
const account = require('./account');
const signup = require('./signup');

// use routers
router.use('/login', account);
router.use('/signup', signup);

module.exports = router;
