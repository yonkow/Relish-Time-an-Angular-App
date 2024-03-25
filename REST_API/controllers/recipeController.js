const router = require('express').Router();
const recipeService = require('../services/recipeService');

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
