const User = require("../database/models/User");
const ErrorHandler = require("../utils/errorHandler");

async function createUser({
    auth_kind,
    auth_properties,
    dob,
    email,
    name,
    roles,
    territory,
}) {
    return await User.create({
        auth_kind,
        auth_properties,
        dob,
        email,
        name,
        roles,
        territory,
    });
}

async function findUserByUID(_id, enableErrorThrow = false) {
    const user = await User.findById(_id);
    if (!user && enableErrorThrow) {
        throw new ErrorHandler("User doesn't exit for this _id", 404);
    }
    return user;
}

async function updateBasicInformationOfUserByUID({
    _id,
    name,
    dob,
    gender,
    phone,
    address,
}) {
    const user = await findUserByUID(_id, true);
    return await User.findByIdAndUpdate(
        user._id,
        {
            name,
            dob,
            gender,
            phone,
            address,
        },
        { new: true, runValidators: true }
    );
}

module.exports = {
    createUser,
    findUserByUID,
    updateBasicInformationOfUserByUID,
};
