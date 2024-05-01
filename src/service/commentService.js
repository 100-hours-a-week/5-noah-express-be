const commentRepository = require('../repository/commentRepository');

const createComment = (userId, postId, content) => {
    commentRepository.saveComment(userId, parseInt(postId), content);
};

const deleteComment = (userId, id) => {
    commentRepository.deleteCommentById(userId, parseInt(id));
};

module.exports = {createComment, deleteComment};
