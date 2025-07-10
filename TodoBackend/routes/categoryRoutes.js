const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { getCategoryStats, editCategory, deleteCategory } = require('../controllers/categoryController');

// Get category stats
router.get('/', middleware, getCategoryStats);

//Edit category in all todos
router.patch('/:oldCategory', middleware, editCategory)

//Delete category and all todos with it
router.delete('/:category', middleware, deleteCategory);

module.exports = router;