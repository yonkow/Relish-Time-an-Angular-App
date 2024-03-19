const jwt = require('jsonwebtoken')

const SECRET = 'thebestsecret';

exports.authMiddleware = (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);

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