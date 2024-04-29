// 인증, 인가는 과제 밖이기 때문에 테스트 사용자로 고정

const postRepository = require('../repository/postRepository');
const commentRepository = require('../repository/commentRepository');

// TODO DTO 구성 필요
const searchAllPost = () => {
    const foundPosts = postRepository.findAllPost();

    const postsDto = [];

    foundPosts.forEach(post => {
        postsDto.push({
            'id': post.id,
            'author': {
                'name': 'noah', 'imageUrl': 'user-images/noah.png',
            },
            'createdDate': post.createdDate,
            'title': post.title,
            'views': post.views,
            'likes': post.likes,
            'comments': commentRepository.findCommentCountByPostId(post.id),
        });
    });

    return postsDto;
};

// TODO DTO 구성 필요
const searchPost = (id) => {
    id = parseInt(id);

    const foundPost = postRepository.findPostById(id);
    const foundComments = commentRepository.findAllCommentByPostId(id);

    let count = 0;
    const commentsDto = [];

    foundComments.forEach(comment => {
        count++;
        commentsDto.push({
            'id': comment.id, 'author': {
                'name': 'noah', 'imageUrl': 'user-images/noah.png',
            }, 'createdDate': comment.createdDate, 'content': comment.content,
        });
    });

    return {
        'id': foundPost.id,
        'author': {
            'name': 'noah', 'imageUrl': 'user-images/noah.png',
        },
        'createdDate': foundPost.createdDate,
        'imageUrl': foundPost.imageUrl,
        'title': foundPost.title,
        'content': foundPost.content,
        'views': foundPost.views,
        'comments': {'count': count, 'comments': commentsDto},
    };
};

// userId 임의 지정
const createPost = (image, title, content) => {
    postRepository.savePost(0, image, title, content);
};

const editPost = (id, image, title, content) => {
    postRepository.updatePostById(parseInt(id), image, title, content);
};

const deletePost = (id) => {
    postRepository.deletePostById(parseInt(id));
};

// TODO post, comment 분리
const createComment = (postId, content) => {
    commentRepository.saveComment(0, parseInt(postId), content);
};

const deleteComment = (id) => {
    commentRepository.deleteCommentById(parseInt(id));
};

module.exports = {searchAllPost, searchPost, createPost, editPost, deletePost, createComment, deleteComment};
