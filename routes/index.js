const express = require('express');
const router = express.Router();

// import routers
const instagram = require('./instagram');

// use routers
router.use('/instagram', instagram);

module.exports = router;
