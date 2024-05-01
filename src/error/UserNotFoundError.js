const CustomError = require('./CustomError');

class UserNotFoundError extends CustomError {
    constructor() {
        super(404, 'USER_NOT_FOUND');
    }
}

module.exports = UserNotFoundError;
