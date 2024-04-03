const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        createdRecipes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Recipe',
            },
        ],
        likedRecipes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Recipe',
            },
        ],
        commentedRecipes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Recipe',
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
