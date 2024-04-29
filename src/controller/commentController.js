const commentService = require('../service/commentService');

const createComment = (request, response, next) => {
    const postId = request.params.postId;
    const {content} = request.body;

    try {
        commentService.createComment(postId, content);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const deleteComment = (request, response, next) => {
    const id = request.body.id;

    try {
        commentService.deleteComment(id);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {createComment, deleteComment};
