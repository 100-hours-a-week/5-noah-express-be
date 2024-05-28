const userService = require('../service/userService');

const signIn = (request, response, next) => {
    const {
        email,
        password,
    } = request.body;

    try {
        request.session.userId = userService.signIn(email, password);

        request.session.save(() => {
            response.sendStatus(200);
        });
    } catch (error) {
        next(error);
    }
};

const signUp = (request, response, next) => {
    const image = request.file;
    const {
        email,
        password,
        nickname,
    } = request.body;

    try {
        userService.signUp(image, email, password, nickname);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const searchUserImageAndNickName = (request, response, next) => {
    const id = request.session.userId;

    try {
        if (id) {
            response.json(userService.searchUserImageAndNickname(id));
        } else {
            response.sendStatus(401);
        }
    } catch (error) {
        next(error);
    }
};

const searchUserImageAndEmailAndNickname = (request, response, next) => {
    const id = request.session.userId;

    try {
        response.json(userService.searchUserImageAndEmailAndNickname(id));
    } catch (error) {
        next(error);
    }
};

const updateUserImageAndNickname = (request, response, next) => {
    const id = request.session.userId;
    const image = request.file;
    const nickname = request.body.nickname;

    try {
        userService.updateUserImageAndNickname(id, image, nickname);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const updateUserPassword = (request, response, next) => {
    const id = request.session.userId;
    const password = request.body.password;

    try {
        userService.updateUserPassword(id, password);

        response.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signIn,
    signUp,
    searchUserImageAndNickName,
    searchUserImageAndEmailAndNickname,
    updateUserImageAndNickname,
    updateUserPassword,
};
