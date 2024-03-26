const router = require('express').Router();
const recipeService = require('../services/recipeService');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeService.getAll()
            .populate('owner')
            .populate('likes')
            .populate('comments')
        console.log(recipes);
        res.status(200).json(recipes)
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
        return;
    }
})

router.post('/create', async (req, res) => {
    const owner = req.user._id;
    const recipeData = req.body;

    try {
        await recipeService.createRecipe(recipeData);
        res.status(200).json({message: 'success'})
    } catch (err) {
        res.status(409).send({ message: `${err.message}` });
        return;
    }
});

module.exports = router;
