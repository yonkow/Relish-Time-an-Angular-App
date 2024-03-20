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
        
        if (result) {
            res.status(200).send({ message: 'Registration successful' });
        } else {
            res.status(500).send({ message: 'Registration failed' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ message: 'Internal server error' });
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