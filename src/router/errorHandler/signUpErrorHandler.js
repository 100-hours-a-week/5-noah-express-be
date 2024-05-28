const DuplicateEmailError = require('../../error/DuplicateEmailError');
const DuplicateNicknameError = require('../../error/DuplicateNicknameError');

const signUpErrorHandler = (error, request, response, next) => {
    const {
        status,
        message,
    } = getErrorDetails(error);

    response.status(status).json({message});
};

const getErrorDetails = (error) => {
    if (error instanceof DuplicateEmailError || error instanceof DuplicateNicknameError) {
        return {
            status: error.status,
            message: error.message,
        };
    }

    console.error(error);

    return {
        status: 500,
        message: 'SERVER_ERROR',
    };
};

module.exports = signUpErrorHandler;
