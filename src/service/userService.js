const userRepository = require('../repository/userRepository');

const signIn = (email, password) => {
    return userRepository.findUserByEmailAndPassword(email, password).id;
};

const signUp = (image, email, password, nickname) => {
    userRepository.saveUser(image, email, password, nickname);
};

const searchUserImageAndNickname = (id) => {
    const foundUser = userRepository.findUserById(id);

    return {
        imageUrl: foundUser.imageUrl,
        nickname: foundUser.nickname,
    };
};

const searchUserImageAndEmailAndNickname = (id) => {
    const foundUser = userRepository.findUserById(id);

    return {
        imageUrl: foundUser.imageUrl,
        email: foundUser.email,
        nickname: foundUser.nickname,
    };
};

const updateUserImageAndNickname = (id, image, nickname) => {
    userRepository.updateUserImageAndNicknameById(id, image, nickname);
};

const updateUserPassword = (id, password) => {
    userRepository.updateUserPasswordById(id, password);
};

module.exports = {
    signIn,
    signUp,
    searchUserImageAndNickname,
    searchUserImageAndEmailAndNickname,
    updateUserImageAndNickname,
    updateUserPassword,
};
