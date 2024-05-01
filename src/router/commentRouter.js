const express = require('express');

const validateUser = require('./validate/validateUser');

const commentController = require('../controller/commentController');

const router = express.Router({mergeParams: true});

router.post('/', validateUser, commentController.createComment);

router.delete('/', validateUser, commentController.deleteComment);

module.exports = router;
