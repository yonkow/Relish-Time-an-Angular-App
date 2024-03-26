const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likesComment: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment