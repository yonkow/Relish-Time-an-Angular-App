const router = require('express').Router();

const authController = require('./controllers/authController')
const recipeController = require('./controllers/recipeController')
const commentController = require('./controllers/commentController')

router.use('/auth', authController);
router.use('/recipes', recipeController)
router.use('/comments', commentController)

module.exports = router;