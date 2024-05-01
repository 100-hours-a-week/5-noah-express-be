const UnauthorizedUserError = require('../../error/UnauthorizedUserError');

const validateUser = (request, response, next) => {
    if (request.session.userId) {
        next();
    } else {
        next(new UnauthorizedUserError());
    }
};

module.exports = validateUser;
