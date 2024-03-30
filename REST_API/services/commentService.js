const Recipe = require('../models/recipe');
const User = require('../models/user');
const {Comment} = require('../models/comment');

exports.getAll = (recipeId) => Comment.find({recipe: `${recipeId}`});

exports.addComment = async (commentData) => {
    const comment = await Comment.create(commentData);

    if (!comment) {
        throw new Error ('Comment could not create!')
    }

    const commentId = comment._id
    const recipeId = comment.recipe
    const ownerId = comment.owner

    const user = await User.findByIdAndUpdate(ownerId, {$push: {commentedRecipes: recipeId}})
    if (!user) {
        throw new Error ('User does not exist!')
    }
    const recipe = await Recipe.findByIdAndUpdate(recipeId, {$push: {comments: commentId}})
    if (!recipe) {
        throw new Error ('Recipe does not exist!')
    }
    return comment
}