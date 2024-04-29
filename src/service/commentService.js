const commentRepository = require('../repository/commentRepository');

const createComment = (postId, content) => {
    commentRepository.saveComment(0, parseInt(postId), content);
};

const deleteComment = (id) => {
    commentRepository.deleteCommentById(parseInt(id));
};

module.exports = {createComment, deleteComment};
