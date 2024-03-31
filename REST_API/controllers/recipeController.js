const router = require('express').Router();
const recipeService = require('../services/recipeService');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeService
            .getAll()
            .populate('owner')
            .populate('likes')
            .populate('comments');
        res.status(200).send(recipes);
    } catch (err) {
        res.status(409).send({ message: `${err}` });
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
        res.status(409).send({ message: `${err}` });
    }
});

router.get('/profile/:userId', authMiddleware, async (req, res) => {
    const userId = req.params['userId'];
    try {
        const recipes = await recipeService
            .getAllForProfile(userId)
            .populate('owner')
            .populate('likes')
            .populate('comments');
        res.status(200).send(recipes);
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
});

router.get('/profile/liked', authMiddleware, async (req, res) => {
    try {
        const recipes = await recipeService.getLikedRecipes(userId);
        res.status(200).send(recipes);
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
});

router.post('/create', authMiddleware, async (req, res) => {
    const user = req.body.owner;
    const recipeData = req.body;

    try {
        await recipeService.createRecipe(recipeData, user);
        res.status(200).json({ message: 'success' });
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
    }
});

router.put('/:recipeId', authMiddleware, async (req, res) => {
    try {
        const recipeId = req.params['recipeId'];
        const recipe = await recipeService.edit(recipeId, req.body);

        res.status(200).send(recipe);
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
    }
});

router.put('/:recipeId/like', async (req, res) => {
    try {
        const recipeId = req.params['recipeId'];
        const recipe = await recipeService.like(recipeId, req.body.user);

        res.status(200).send(recipe);
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
    }
});

router.delete('/:recipeId', authMiddleware, async (req, res) => {
    try {
        const recipeId = req.params['recipeId'];
        await recipeService.delete(recipeId, req.user._id);
        res.status(200).json('Delete succesfully!');
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
    }
});

module.exports = router;
