const express = require('express');
const router = express.Router();

//user route
router.use('/user', require('./users'))

module.exports = router;