const commentService = require('../service/commentService');

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
    const id = request.body.id;

    try {
        commentService.deleteComment(userId, id);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {createComment, deleteComment};
