const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}
// Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        const token = generateToken(newUser);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }

}

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found", user)
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log("Password does not match")
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({
            _id: user._id,
            user: user,
            username: user.username,
            email: user.email,
            token
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', err: err.message });
    }
}

//Exports
module.exports = {
    register,
    login
};