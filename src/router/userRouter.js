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

router.get('/image', validateUser, userController.searchUserImage, (error, request, response, next) => {
    response.status(error.status).json({message: error.message});
});

router.get('/update/image-and-nickname', validateUser, userController.searchUserInfoWithImageAndNickname, (error, request, response, next) => {
    // TODO 임시 구현임, 개발 필요
    console.log(error.message);

    response.status(error.status).json({message: error.message});
});

router.post('/update/image-and-nickname', validateUser, upload.single('image'), userController.updateUserImageAndNickname);

router.post('/update/password', validateUser, userController.updateUserPassword);

module.exports = router;
