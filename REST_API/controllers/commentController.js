const router = require('express').Router();
const commentService = require('../services/commentService');
const { errorMessenger } = require('../utils/errorMessageUtil');


router.get('', async (req, res) => {
    const recipeId = req.headers.recipeid;
    try {
        const comments = await commentService
            .getAll(recipeId)
            .populate('owner');
        res.status(200).send(comments);
    } catch (err) {
        res.status(409).send({ message: errorMessenger(err) });
    }
});

router.post('/create', async (req, res) => {
    const commentData = req.body;

    try {
        const comment = await commentService.addComment(commentData);
        res.status(200).send(comment);
    } catch (err) {
        res.status(409).send({ message: errorMessenger(err) });
    }
});

module.exports = router;
