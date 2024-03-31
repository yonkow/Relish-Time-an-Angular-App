const User = require('../models/user');
const jwt = require('../lib/jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config')

exports.register = async (regData) => {

    if (regData.password !== regData.rePassword) {
        throw new Error('Password missmatch!');
    }
    const user = await User.findOne({ email: regData.email });
    if (user) {
        throw new Error('User with this email is already exist...');
    }

    const createdUser = await User.create(regData);
    return { token: await generateAccessToken(createdUser), user: createdUser };
};

exports.login = async (userData) => {

    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error('No such user or password');
    }
    const isValid = await bcrypt.compare(userData.password, user.password);
    if (!isValid) {
        throw new Error('No such user or password');
    }

    return { token: await generateAccessToken(user), user: user };
};

exports.findOne = async (userId) => await User.findById(userId, { password: 0, __v: 0 })

exports.updateOne = async (userId, userData) => await User.findByIdAndUpdate(userId, { ...userData })

function generateAccessToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    };

    return jwt.sing(payload, SECRET, { expiresIn: '1d' });
};