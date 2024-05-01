const CustomError = require('./CustomError');

class DuplicateEmailError extends CustomError {
    constructor() {
        super(409, 'DUPLICATE_EMAIL');
    }
}

module.exports = DuplicateEmailError;
