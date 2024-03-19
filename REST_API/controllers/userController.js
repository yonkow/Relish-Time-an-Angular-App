const router = require('express').Router();

const userService = require('../services/userService')

router.post('/register', async (req, res) => {
    const userData = req.body;

    const result = await userService.register(userData);

    res.json(result);
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