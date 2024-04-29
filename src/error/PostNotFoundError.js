const CustomError = require('./CustomError');

class PostNotFoundError extends CustomError {
    constructor() {
        super(404, 'POST_NOT_FOUND');
    }
}

module.exports = PostNotFoundError;
