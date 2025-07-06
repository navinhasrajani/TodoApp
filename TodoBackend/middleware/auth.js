// Middleware for authentication in a Node.js application using JWT
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    return res.status(401).json({ message: 'No token provided' });
};

module.exports = authMiddleware;
