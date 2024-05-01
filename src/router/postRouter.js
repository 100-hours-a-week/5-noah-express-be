const express = require('express');
const multer = require('multer');

const validateUser = require('./validate/validateUser');

const postController = require('../controller/postController');
const commentRouter = require('./commentRouter');

const filename = (request, file, callback) => {
    callback(null, file.originalname);
};

const storage = multer.diskStorage({filename});

const upload = multer({storage});

const router = express.Router();

router.get('/', postController.searchAllPost);

router.get('/:id', postController.searchPost);

router.post('/', validateUser, upload.single('image'), postController.createPost);

router.patch('/:id', validateUser, upload.single('image'), postController.editPost);

router.delete('/:id', validateUser, postController.deletePost);

router.use('/:postId/comments', commentRouter);

module.exports = router;
