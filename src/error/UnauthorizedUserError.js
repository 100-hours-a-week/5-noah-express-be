const CustomError = require('./CustomError');

class UnauthorizedUserError extends CustomError {
    constructor() {
        super(401, 'UNAUTHORIZED_USER');
    }
}

module.exports = UnauthorizedUserError;
