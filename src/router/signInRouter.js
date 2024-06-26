const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.post('/', userController.signIn);

module.exports = router;
