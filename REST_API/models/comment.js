const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    commentOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    },
    commentLikes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment