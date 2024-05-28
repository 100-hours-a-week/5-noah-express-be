const commentService = require('../service/commentService');

const searchComment = (request, response, next) => {
    const postId = request.params.postId;

    try {
        response.json(commentService.searchComment(postId));
    } catch (error) {
        next(error);
    }
};

const createComment = (request, response, next) => {
    const userId = request.session.userId;
    const postId = request.params.postId;
    const {content} = request.body;

    try {
        commentService.createComment(userId, postId, content);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const deleteComment = (request, response, next) => {
    const userId = request.session.userId;
    const id = request.params.id;

    try {
        commentService.deleteComment(userId, id);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    searchComment,
    createComment,
    deleteComment,
};
