const express = require('express');
const multer = require('multer');

const postController = require('../controller/postController');

const filename = (request, file, callback) => {
    callback(null, file.originalname);
};

const storage = multer.diskStorage({filename});

const upload = multer({storage});

const router = express.Router();

router.get('/', postController.searchAllPost);

router.get('/:id', postController.searchPost);

router.post('/', upload.single('post-image'), postController.createPost);

router.patch('/:id', upload.single('post-image'), postController.editPost);

router.delete('/:id', postController.deletePost);

module.exports = router;
