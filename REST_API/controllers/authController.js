const router = require('express').Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const authService = require('../services/authService')

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        const { token, user } = await authService.register(userData);

        if (process.env.NODE_ENV === 'production') {
            res.cookie('auth-cookie', token, { httpOnly: true, sameSite: 'none', secure: true })
        } else {
            res.cookie('auth-cookie', token, { httpOnly: true })
        }
        res.status(200)
            .send({ username: user.username, email: user.email, id: user._id });

    } catch (err) {
        res.status(409)
            .send({ message: `${err.message}` });
        return;
    }
});

router.post('/login', async (req, res) => {
    const userData = req.body;

    try {
        const { token, user } = await authService.login(userData);
        if (process.env.NODE_ENV === 'production') {
            res.cookie('auth-cookie', token, { httpOnly: true, sameSite: 'none', secure: true })
        } else {
            res.cookie('auth-cookie', token, { httpOnly: true })
        }
        res.status(200)
            .send({ username: user.username, email: user.email, id: user._id });

    } catch (err) {
        res.status(409)
            .send({ message: `${err.message}` });
        return;
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('auth-cookie')
    res.status(204)
        .json({ message: 'Logout successfuly!' });
})

router.get('/profile', authMiddleware, async (req, res) => {
    const { _id: userId} = req.user;
    try {
        const user = await authService.findOne(userId)
        res.status(200).json(user)
    }
    catch {
        next
    }
})

module.exports = router;