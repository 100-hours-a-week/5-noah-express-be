const CustomError = require('./CustomError');

class DuplicateNicknameError extends CustomError {
    constructor() {
        super(409, 'DUPLICATE_NICKNAME');
    }
}

module.exports = DuplicateNicknameError;
