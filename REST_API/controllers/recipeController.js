const router = require('express').Router();
const recipeService = require('../services/recipeService');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeService.getAll()
            .populate('owner')
            .populate('likes')
        res.status(200).send(recipes)
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
})

router.get('/:recipeId', async (req, res) => {
    const recipeId = req.params['recipeId']
    try {
        const recipe = await recipeService.getOne(recipeId)
            .populate('owner')
            .populate('likes')
            .populate('comments')
        res.status(200).send(recipe)
    } catch (err) {
        res.status(409).send({ message: `${err}` });
    }
})

router.post('/create', async (req, res) => {

    const user = req.body.owner;
    const recipeData = req.body;

    try {
        await recipeService.createRecipe(recipeData, user);
        res.status(200).json({ message: 'success' })
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
    }
});

router.put('/:recipeId/like', async (req, res) => {

    try {
        const recipeId = req.params['recipeId']
        const recipe = await recipeService.like(recipeId, req.body.user);

        res.status(200).send(recipe);
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
    }
})

module.exports = router;
