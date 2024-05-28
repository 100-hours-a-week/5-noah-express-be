const commentRepository = require('../repository/commentRepository');
const userRepository = require('../repository/userRepository');

const searchComment = (postId) => {
    postId = parseInt(postId);

    const foundComments = commentRepository.findAllCommentByPostId(postId);

    const commentsDto = [];

    foundComments.forEach(comment => {
        const foundCommentUser = userRepository.findUserById(comment.userId);

        commentsDto.push({
            'id': comment.id,
            'author': {
                'name': foundCommentUser.nickname,
                'imageUrl': foundCommentUser.imageUrl,
            },
            'createdDate': comment.createdDate,
            'content': comment.content,
        });
    });

    return {
        'comments': commentsDto,
    };
};

const createComment = (userId, postId, content) => {
    commentRepository.saveComment(userId, parseInt(postId), content);
};

const deleteComment = (userId, id) => {
    commentRepository.deleteCommentById(userId, parseInt(id));
};

module.exports = {
    searchComment,
    createComment,
    deleteComment,
};
