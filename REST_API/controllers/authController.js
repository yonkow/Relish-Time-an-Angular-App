const router = require('express').Router();
const userService = require('../services/authService')

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        const { token, user } = await userService.register(userData);

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
        const { token, user } = await userService.login(userData);
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
    .json({message: 'Logout successfuly!'});
})


module.exports = router;