const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// TODO: implement from older
exports.register = async (userData) => {
    // ! Comaring the passwords will be in Front-End
    // if (userData.password !== userData.rePass) {
    //     throw new Error('Password missmatch!');
    // }

    const user = await User.create(userData);

    return generateAccessToken(user);
};

exports.login = async (userData) => {
    debugger;
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error('No such user or password');
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error('No such user or password');
    }

    return generateAccessToken(user);
};

function generateAccessToken(user) {
    // TODO: convert token - from older apps
    const accessToken = jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        'thebestsecret'
    );

    return {
        _id: user._id,
        email: user.email,
        accessToken,
    };
}
