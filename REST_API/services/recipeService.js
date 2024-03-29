const Recipe = require('../models/recipe');
const User = require('../models/user');

exports.getAll = () => Recipe.find().sort({ 'createdAt': -1 });

exports.createRecipe = async (recipeData, user) => {
    const recipe = await Recipe.create(recipeData);

    if (!recipe) {
        throw new Error ('Recipe could not create!')
    }

    const recipeId = recipe._id

    const createdRecipes = [...user.createdRecipes, recipeId];
    await User.findByIdAndUpdate(user._id, {createdRecipes: createdRecipes})

    return recipe
}

exports.like = async (recipeId, user) => {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new Error('Recipe not found!')
    }

    if (recipe.likes.includes(user._id)) {
        throw new Error('User already liked this recipe!');
    }

    const likes = [...recipe.likes, user._id]

    const likedRecipes = [...user.likedRecipes, recipe._id]
    await User.findByIdAndUpdate(user._id, { likedRecipes })
    return await Recipe.findByIdAndUpdate(recipeId, { likes })
}