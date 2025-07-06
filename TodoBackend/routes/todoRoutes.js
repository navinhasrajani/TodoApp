//Todo routes
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// Add todo
router.post('/', middleware, createTodo);

// Get all todos
router.get('/', middleware, getTodos);

// Update todo
router.put('/:id', middleware, updateTodo);

// Delete todo
router.delete('/:id', middleware, deleteTodo);

module.exports = router;