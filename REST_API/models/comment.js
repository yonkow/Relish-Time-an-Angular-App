const mongoose = require('mongoose');
const User = require('./user');

const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    likesComment: [{
        type: mongoose.Types.ObjectId,
        ref: User
    }]
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment