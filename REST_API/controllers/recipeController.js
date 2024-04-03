const router = require('express').Router();
const recipeService = require('../services/recipeService');
const authService = require('../services/authService');
const { authMiddleware, isAuth } = require('../middlewares/authMiddleware');
const { errorMessenger } = require('../utils/errorMessageUtil');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeService
            .getAll()
            .populate('owner')
            .populate('likes')
            .populate('comments');
        res.status(200).send(recipes);
    } catch (err) {
        res.status(409).send({ message: errorMessenger(err) });
    }
});

router.get('/:recipeId', async (req, res) => {
    const recipeId = req.params['recipeId'];
    try {
        const recipe = await recipeService
            .getOne(recipeId)
            .populate('owner')
            .populate('likes');
        res.status(200).send(recipe);
    } catch (err) {
        res.status(408).send({ message: errorMessenger(err) });
    }
});

router.post('/create', authMiddleware, isAuth, async (req, res) => {
    const user = req.body.owner;
    const recipeData = req.body;

    try {
        await recipeService.createRecipe(recipeData, user);
        res.status(200).json({ message: 'success' });
    } catch (err) {
        res.status(409).send({ message: errorMessenger(err) });
    }
});

router.put('/:recipeId', authMiddleware, isAuth, async (req, res) => {
    try {
        const recipeId = req.params['recipeId'];
        const recipe = await recipeService.edit(recipeId, req.body);

        res.status(200).send(recipe);
    } catch (err) {
        res.status(409).send({ message: errorMessenger(err) });
    }
});

router.put('/:recipeId/like', authMiddleware, isAuth, async (req, res) => {
    try {
        const recipeId = req.params['recipeId'];
        const user = await authService.findOne(req.body.user._id);
        if (!user) {
            throw new Error('User does not exist!');
        }

        const recipe = await recipeService.like(recipeId, user);

        res.status(200).send(recipe);
    } catch (err) {
        res.status(408).send({ message: errorMessenger(err) });
    }
});

router.delete('/:recipeId', authMiddleware, isAuth, async (req, res) => {
    try {
        const recipeId = req.params['recipeId'];
        await recipeService.delete(recipeId, req.user._id);
        res.status(200).json('Delete succesfully!');
    } catch (err) {
        res.status(408).send({ message: errorMessenger(err) });
    }
});

module.exports = router;
