const express = require('express');
const router = express.Router();

// import routers
const instagram = require('./instagram');
const wehago = require('./wehago');

// use routers
router.use('/instagram', instagram);
router.use('/wehago', wehago);

module.exports = router;
