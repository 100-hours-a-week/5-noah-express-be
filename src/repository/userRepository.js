require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const DuplicateEmailError = require('../error/DuplicateEmailError');
const DuplicateNicknameError = require('../error/DuplicateNicknameError');
const UserNotFoundError = require('../error/UserNotFoundError');

const saveJson = (json) => {
    fs.writeFileSync(`${process.env.JSON_PATH}/${process.env.USER_JSON_NAME}`, JSON.stringify(json, null, 2));
};

const parseJson = () => {
    if (!fs.existsSync(process.env.JSON_PATH)) {
        fs.mkdirSync(process.env.JSON_PATH);
    }

    if (!fs.existsSync(`${process.env.JSON_PATH}/${process.env.USER_JSON_NAME}`)) {
        saveJson({
            sequence: 1,
            users: [{
                id: 0,
                imageUrl: 'user-images/noah.png',
                email: 'noah',
                password: 'password',
                nickname: 'noah',
            }],
        });
    }

    return JSON.parse(fs.readFileSync(`${process.env.JSON_PATH}/${process.env.USER_JSON_NAME}`).toString());
};

const checkDuplicateEmail = (email) => {
    if (parseJson().users.some((user) => user.email === email)) {
        throw new DuplicateEmailError();
    }
};

const checkDuplicateNickname = (nickname) => {
    if (parseJson().users.some((user) => user.nickname === nickname)) {
        throw new DuplicateNicknameError();
    }
};

const saveImageAndGetImageUrl = (image) => {
    let imageUrl = '';

    if (image) {
        imageUrl = `user-images/${uuidv4(undefined, undefined, undefined)}${path.extname(image.originalname)}`;

        fs.renameSync(image.path, `public/${imageUrl}`);
    }

    return imageUrl;
};

const deleteImage = (imageUrl) => {
    if (imageUrl) {
        fs.unlinkSync(`public/${imageUrl}`);
    }
};

const findUserByEmailAndPassword = (email, password) => {
    const foundUser = parseJson().users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
        throw new UserNotFoundError();
    }

    return foundUser;
};

const findUserById = (id) => {
    const foundUser = parseJson().users.find((user) => user.id === id);

    if (!foundUser) {
        throw new UserNotFoundError();
    }

    return foundUser;
};

const saveUser = (image, email, password, nickname) => {
    checkDuplicateEmail(email);

    checkDuplicateNickname(nickname);

    const json = parseJson();

    const imageUrl = saveImageAndGetImageUrl(image);

    json.users.push({
        'id': json.sequence++,
        'imageUrl': imageUrl,
        'email': email,
        'password': password,
        'nickname': nickname,
    });

    saveJson(json);
};

const updateUserImageAndNicknameById = (id, image, nickname) => {
    const json = parseJson();

    const foundUser = json.users.find((user) => user.id === id);

    if (!foundUser) {
        throw new UserNotFoundError();
    }

    checkDuplicateNickname(nickname);

    deleteImage(foundUser.imageUrl);

    foundUser.imageUrl = saveImageAndGetImageUrl(image);
    foundUser.nickname = nickname;

    saveJson(json);
};

const updateUserPasswordById = (id, password) => {
    const json = parseJson();

    const foundUser = json.users.find((user) => user.id === id);

    if (!foundUser) {
        throw new UserNotFoundError();
    }

    foundUser.password = password;

    saveJson(json);
};

module.exports = {
    findUserByEmailAndPassword,
    findUserById,
    saveUser,
    updateUserImageAndNicknameById,
    updateUserPasswordById,
};
