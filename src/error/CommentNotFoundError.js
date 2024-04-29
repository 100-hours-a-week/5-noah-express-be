const CustomError = require('./CustomError');

class CommentNotFoundError extends CustomError {
    constructor() {
        super(404, 'COMMENT_NOT_FOUND');
    }
}

module.exports = CommentNotFoundError;
