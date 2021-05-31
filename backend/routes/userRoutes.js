const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const auth = require('../config/auth');


router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);

router.get('/:userId', userController.getUserDetails);

module.exports = router;