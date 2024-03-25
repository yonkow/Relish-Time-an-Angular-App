const router = require('express').Router();

const authController = require('./controllers/authController')
const recipeController = require('./controllers/recipeController')

router.use('/auth', authController);
router.use('/recipes', recipeController)

module.exports = router;