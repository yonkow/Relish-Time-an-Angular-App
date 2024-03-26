const Recipe = require('../models/recipe');
const jwt = require('../lib/jsonwebtoken');

exports.getAll = () => Recipe.find().sort({'createdAt': -1});

exports.createRecipe = async (recipeData) => {
    const item = await Recipe.create(recipeData)
}