const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: String,
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
