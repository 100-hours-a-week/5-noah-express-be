const express = require('express');
const multer = require('multer');

const userController = require('../controller/userController');
const signUpErrorHandler = require('./errorHandler/signUpErrorHandler');

const filename = (request, file, callback) => {
    callback(null, file.originalname);
};

const storage = multer.diskStorage({filename});

const upload = multer({storage});

const router = express.Router();

router.post('/', upload.single('image'), userController.signUp, signUpErrorHandler);

module.exports = router;
