require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const PostNotFoundError = require('../error/PostNotFoundError');

const saveJson = (json) => {
    fs.writeFileSync(`${process.env.JSON_PATH}/${process.env.POST_JSON_NAME}`, JSON.stringify(json, null, 2));
};

const parseJson = () => {
    if (!fs.existsSync(process.env.JSON_PATH)) {
        fs.mkdirSync(process.env.JSON_PATH);
    }

    if (!fs.existsSync(`${process.env.JSON_PATH}/${process.env.POST_JSON_NAME}`)) {
        saveJson({
            sequence: 1, posts: [{
                id: 0,
                userId: 0,
                createdDate: '2024-04-03 09:00:00',
                imageUrl: 'post-images/noah.png',
                title: '제목 1',
                content: '내용 1',
                views: 0,
                likes: 0,
            }],
        });
    }

    return JSON.parse(fs.readFileSync(`${process.env.JSON_PATH}/${process.env.POST_JSON_NAME}`).toString());
};

const saveImageAndGetImageUrl = (image) => {
    let imageUrl = '';

    if (image) {
        imageUrl = `post-images/${uuidv4(undefined, undefined, undefined)}${path.extname(image.originalname)}`;

        fs.renameSync(image.path, `public/${imageUrl}`);
    }

    return imageUrl;
};

const deleteImage = (imageUrl) => {
    if (imageUrl) {
        fs.unlinkSync(`public/${imageUrl}`);
    }
};

const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const findAllPost = () => {
    return parseJson().posts;
};

const findPostById = (id) => {
    const foundPost = parseJson().posts.find(post => post.id === id);

    if (!foundPost) {
        throw new PostNotFoundError();
    }

    return foundPost;
};

const savePost = (userId, image, title, content) => {
    const json = parseJson();

    const imageUrl = saveImageAndGetImageUrl(image);

    json.posts.push({
        'id': json.sequence++,
        'userId': userId,
        'createdDate': getDate(),
        'imageUrl': imageUrl,
        'title': title,
        'content': content,
        'views': 0,
        'likes': 0,
    });

    saveJson(json);
};

const updatePostById = (id, image, title, content) => {
    const json = parseJson();

    const foundPost = json.posts.find(post => post.id === id);

    if (!foundPost) {
        throw new PostNotFoundError();
    }

    deleteImage(foundPost.imageUrl);

    foundPost.imageUrl = saveImageAndGetImageUrl(image);
    foundPost.title = title;
    foundPost.content = content;

    saveJson(json);
};

const deletePostById = (id) => {
    const json = parseJson();

    const foundPost = json.posts.find(post => post.id === id);

    if (!foundPost) {
        throw new PostNotFoundError();
    }

    deleteImage(foundPost.imageUrl);

    json.posts.splice(foundPost.id, 1);

    saveJson(json);
};

module.exports = {
    findAllPost, findPostById, savePost, updatePostById, deletePostById,
};
