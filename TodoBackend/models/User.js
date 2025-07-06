//User model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 20 },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email'] },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
})

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
userSchema.methods.matchPassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema, 'Users');
module.exports = User;