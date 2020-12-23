const express = require('express');
const router = express.Router();

// import routers
const instagram = require('./instagram');
const test = require('./test.js');
const wehago = require('./wehago.js');

// use routers
router.use('/instagram', instagram);
router.use('/test', test);
router.use('/wehago', wehago);

module.exports = router;
