const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../config');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth-cookie'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        next();
    } catch (error) {
        console.log('authMiddleware error: ', error.message);
        res.status(401).json({ error: error.message });
        return;
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
