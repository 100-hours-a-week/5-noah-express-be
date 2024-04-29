// TODO postRepository와 json 겹침, 분리

require('dotenv').config();
const fs = require('fs');

const CommentNotFoundError = require('../error/CommentNotFoundError');

const saveJson = (json) => {
    fs.writeFileSync(`${process.env.JSON_PATH}/${process.env.COMMENT_JSON_NAME}`, JSON.stringify(json, null, 2));
};

const parseJson = () => {
    if (!fs.existsSync(process.env.JSON_PATH)) {
        fs.mkdirSync(process.env.JSON_PATH);
    }

    if (!fs.existsSync(`${process.env.JSON_PATH}/${process.env.COMMENT_JSON_NAME}`)) {
        saveJson({
            sequence: 3, comments: [{
                id: 0, userId: 0, postId: 0, createdDate: '2024-04-03 10:00:00', content: '테스트 댓글 1',
            }, {
                id: 1, userId: 0, postId: 0, createdDate: '2024-04-03 11:00:00', content: '테스트 댓글 2',
            }, {
                id: 2, userId: 0, postId: 0, createdDate: '2024-04-03 12:00:00', content: '테스트 댓글 3',
            }],
        });
    }

    return JSON.parse(fs.readFileSync(`${process.env.JSON_PATH}/${process.env.COMMENT_JSON_NAME}`).toString());
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

const findCommentCountByPostId = (postId) => {
    let count = 0;

    parseJson().comments.forEach(comment => {
        if (comment.postId === postId) {
            count++;
        }
    });

    return count;
};

const findAllCommentByPostId = (postId) => {
    return parseJson().comments.filter(comment => comment.postId === postId);
};

const saveComment = (userId, postId, content) => {
    const json = parseJson();

    json.comments.push({
        'id': json.sequence++, 'userId': userId, 'postId': postId, 'createdDate': getDate(), 'content': content,
    });

    saveJson(json);
};

const updateCommentById = (id, content) => {
    const json = parseJson();

    const foundComment = json.comments.find(comment => comment.id === id);

    if (!foundComment) {
        throw new CommentNotFoundError();
    }

    foundComment.content = content;

    saveJson(json);
};

const deleteCommentById = (id) => {
    const json = parseJson();

    const foundCommentIndex = json.comments.findIndex(comment => comment.id === id);

    if (foundCommentIndex === -1) {
        throw new CommentNotFoundError();
    }

    json.comments.splice(foundCommentIndex, 1);

    saveJson(json);
};

module.exports = {findCommentCountByPostId, findAllCommentByPostId, saveComment, updateCommentById, deleteCommentById};
