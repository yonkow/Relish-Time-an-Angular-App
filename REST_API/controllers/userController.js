const router = require('express').Router();

const userService = require('../services/userService')

// router.post('/register', async (req, res) => {
//     const userData = req.body;
//     const result = await userService.register(userData);
//     console.log(result);
//     if(result) {

//         res.status(200).send({ 'message': 'Registration succsessful.' });
//     }
// });

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.register(userData);
        
        if (process.env.NODE_ENV === 'production') {
            res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
        } else {
            res.cookie(authCookieName, token, { httpOnly: true })
        }
        res.status(200)
            .send(createdUser);
    } catch (err) {
        // TODO: this errors need to be in errorHandler
        if (err.name === 'MongoError' && err.code === 11000) {
            let field = err.message.split("index: ")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));

            res.status(409)
                .send({ message: `This ${field} is already registered!` });
            return;
        }
    }
});

router.post('/login', async (req, res) => {
    const userData = req.body;

    const result = await userService.login(userData);

    res.json(result);
})

router.get('/logout', async (req, res) => {
    // TODO needs to validate token - now is hardcoded
    res.json({ ok: true });
})


module.exports = router;