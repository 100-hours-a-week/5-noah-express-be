const postService = require('../service/postService');

const searchAllPost = (request, response, next) => {
    try {
        response.json(postService.searchAllPost());
    } catch (error) {
        next(error);
    }
};

const searchPost = (request, response, next) => {
    try {
        const id = request.params.id;

        response.json(postService.searchPost(id));
    } catch (error) {
        next(error);
    }
};

const createPost = (request, response, next) => {
    const userId = request.session.userId;
    const image = request.file;
    const {title, content} = request.body;

    try {
        postService.createPost(userId, image, title, content);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const editPost = (request, response, next) => {
    const userId = request.session.userId;
    const id = request.params.id;
    const image = request.file;
    const {title, content} = request.body;

    try {
        postService.editPost(userId, id, image, title, content);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const deletePost = (request, response, next) => {
    const userId = request.session.userId;
    const id = request.params.id;

    try {
        postService.deletePost(userId, id);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {searchAllPost, searchPost, createPost, editPost, deletePost};
