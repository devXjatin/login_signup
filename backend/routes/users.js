const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller')

//register route
router.route("/register").post(userController.register);

//login router
router.route("/login").post(userController.login);

module.exports = router;