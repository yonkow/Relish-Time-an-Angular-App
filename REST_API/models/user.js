const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // rePass:
})

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

const User = mongoose.model('User', userSchema);

module.exports = User;