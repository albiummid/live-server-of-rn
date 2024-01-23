const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const deepCopy = (data) => JSON.parse(JSON.stringify(data));

function randomString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

const compareHashedPassword = (password, encryptedPassword) =>
    bcrypt.compare(password, encryptedPassword);

const hashPassword = (password) => bcrypt.hash(password, 10);
const isValidMongooseId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
    deepCopy,
    randomString,
    compareHashedPassword,
    hashPassword,
    isValidMongooseId,
};
