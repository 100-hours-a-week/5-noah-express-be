const express = require('express');

const commentController = require('../controller/commentController');

const router = express.Router({mergeParams: true});

router.post('/', commentController.createComment);

router.delete('/', commentController.deleteComment);

module.exports = router;
