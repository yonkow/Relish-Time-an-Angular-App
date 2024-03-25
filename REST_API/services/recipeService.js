const Recipe = require('../models/recipe');
const jwt = require('../lib/jsonwebtoken');

exports.createRecipe = async (recipeData) => {
    const item = await Recipe.create(recipeData)
}