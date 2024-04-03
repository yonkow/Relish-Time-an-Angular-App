const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        content: String,
        recipe: {
            type: mongoose.Types.ObjectId,
            ref: 'Recipe',
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment: Comment };
