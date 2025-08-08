const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');

const {getProfile} = require('../controllers/profileController');

// Get user profile
router.get('/', middleware ,getProfile);

module.exports = router;