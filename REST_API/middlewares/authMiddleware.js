const jwt = require('../lib/jsonwebtoken')

const { SECRET } = require('../config');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth-cookie']

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;

        next();
    } catch (error) {
        // TODO: return unvalid token .... from client
        res.redirect('/');
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    };

    next();
}