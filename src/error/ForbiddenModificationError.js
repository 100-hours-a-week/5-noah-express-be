const CustomError = require('./CustomError');

class ForbiddenModificationError extends CustomError {
    constructor() {
        super(403, 'FORBIDDEN_MODIFICATION_ERROR');
    }
}

module.exports = ForbiddenModificationError;
