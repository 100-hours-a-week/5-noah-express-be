// 인증, 인가는 과제 밖이기 때문에 테스트 사용자로 고정

const userRepository = require('../repository/userRepository');
const postRepository = require('../repository/postRepository');
const commentRepository = require('../repository/commentRepository');

const searchAllPost = () => {
    const foundPosts = postRepository.findAllPost();

    const postsDto = [];

    foundPosts.forEach(post => {
        const foundUser = userRepository.findUserById(post.userId);

        postsDto.push({
            'id': post.id,
            'author': {
                'name': foundUser.nickname,
                'imageUrl': foundUser.imageUrl,
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

const searchPost = (id) => {
    // INFO: validate가 없기 때문에 중구난방 parseInt
    id = parseInt(id);

    const foundPost = postRepository.findPostById(id);

    const foundPostUser = userRepository.findUserById(foundPost.userId);

    const count = commentRepository.findCommentCountByPostId(id);

    return {
        'id': foundPost.id,
        'author': {
            'name': foundPostUser.nickname,
            'imageUrl': foundPostUser.imageUrl,
        },
        'createdDate': foundPost.createdDate,
        'imageUrl': foundPost.imageUrl,
        'title': foundPost.title,
        'content': foundPost.content,
        'views': foundPost.views,
        'comments': count,
    };
};

const createPost = (userId, image, title, content) => {
    postRepository.savePost(userId, image, title, content);
};

// TODO 여기 parseInt 빼야될꺼 같은데
const editPost = (userId, id, image, title, content) => {
    postRepository.updatePostById(userId, parseInt(id), image, title, content);
};

const deletePost = (userId, id) => {
    postRepository.deletePostById(userId, parseInt(id));
};

module.exports = {
    searchAllPost,
    searchPost,
    createPost,
    editPost,
    deletePost,
};
