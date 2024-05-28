const express = require('express');
const multer = require('multer');

const validateUser = require('./validate/validateUser');

const userController = require('../controller/userController');

const filename = (request, file, callback) => {
    callback(null, file.originalname);
};

const storage = multer.diskStorage({filename});

const upload = multer({storage});

const router = express.Router();

router.get('/update/image-and-nickname', validateUser, userController.searchUserImageAndEmailAndNickname);

router.post('/update/image-and-nickname', validateUser, upload.single('image'), userController.updateUserImageAndNickname);

router.post('/update/password', validateUser, userController.updateUserPassword);

module.exports = router;
