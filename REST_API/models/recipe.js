const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    level: String,
    mealType: String,
    prepTime: Number,
    ingredients: [String],
    img: String,
    description: String,
    calories: Number,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe