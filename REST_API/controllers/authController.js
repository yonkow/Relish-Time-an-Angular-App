const router = require('express').Router();
const { authMiddleware, isAuth } = require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const recipeService = require('../services/recipeService');

router.get('/profile', authMiddleware, async (req, res, next) => {
    if (!req.user) {
        res.status(204).json({});
        return next();
    }

    const { _id: userId } = req.user;

    try {
        const user = await authService.findOne(userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
});

router.get('/:userId/recipes/created', authMiddleware, isAuth, async (req, res) => {
    const userId = req.params['userId'];
    try {
        const recipes = await recipeService
            .getAllForProfile(userId)
        res.status(200).send(recipes);
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
});

router.get('/:userId/recipes/liked', authMiddleware, isAuth, async (req, res) => {
    try {
        const userId = req.params['userId'];
        const user = await authService.findOne(userId);
        if (!user) {
            throw new Error('There is not user!')
        }
        const recipes = user.likedRecipes;
        res.status(200).send(recipes);
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        const { token, user } = await authService.register(userData);

        if (process.env.NODE_ENV === 'production') {
            res.cookie('auth-cookie', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
        } else {
            res.cookie('auth-cookie', token, { httpOnly: true });
        }
        res.status(200).send({
            username: user.username,
            email: user.email,
            _id: user._id,
        });
    } catch (err) {
        res.status(403).send({ message: `${err.message}` });
        return;
    }
});

router.post('/login', async (req, res) => {
    const userData = req.body;

    try {
        const { token, user } = await authService.login(userData);
        if (process.env.NODE_ENV === 'production') {
            res.cookie('auth-cookie', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
        } else {
            res.cookie('auth-cookie', token, { httpOnly: true });
        }
        res.status(200).send({
            username: user.username,
            email: user.email,
            _id: user._id,
        });
    } catch (err) {
        res.status(401).send({ message: err.message });
        return;
    }
});

router.post('/logout', authMiddleware, isAuth, (req, res) => {
    res.clearCookie('auth-cookie');
    res.status(204).json({ message: 'Logout successfuly!' });
});

router.put('/:userId', authMiddleware, isAuth, async (req, res) => {
    const userId = req.params['userId'];
    const userData = req.body;
    try {
        const user = await authService.updateOne(userId, userData);
        res.status(200).send(user);
    } catch (err) {
        res.status(401).send({ message: `${err.message}` });
        return;
    }
});

module.exports = router;
