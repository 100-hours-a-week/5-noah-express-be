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
    const image = request.file;
    const {title, content} = request.body;

    try {
        postService.createPost(image, title, content);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const editPost = (request, response, next) => {
    const id = request.params.id;
    const image = request.file;
    const {title, content} = request.body;

    try {
        postService.editPost(id, image, title, content);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const deletePost = (request, response, next) => {
    const id = request.params.id;

    try {
        postService.deletePost(id);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {searchAllPost, searchPost, createPost, editPost, deletePost};
