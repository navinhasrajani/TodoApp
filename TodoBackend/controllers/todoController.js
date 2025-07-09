//Todo controllers
const Todo = require('../models/Todo');
// Get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.status(200).json(todos);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

//Create new todo
const createTodo = async (req, res) => {
    try {
        const { title, description, priority, category } = req.body;
        console.log(title, description, priority, category);
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTodo = new Todo({
            user: req.user._id,
            title,
            description,
            priority: priority || 'medium',
            category,
        })

        const savedTodo = await newTodo.save();
        // console.log(savedTodo);
        res.status(201).json(savedTodo);
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating todo', error: err.message });
    }
};

// Update todo by ID
const updateTodo = async (req, res) => {
    try {
        const { title, description, priority, isCompleted, category } = req.body;
        const todoId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todoId, user: req.user.id },
            { title, description, priority, category, isCompleted },
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    }
    catch (err) {
        res.status(400).json({ message: 'Error finding todo', error: err.message });
    }
}

// Delete todo by ID
const deleteTodo = async(req, res) => {
    try{
        const deletedTodo = await Todo.findByIdAndDelete(
            {_id: req.params.id, user: req.user.id},
        )

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting todo', error: err.message });
    }
}

// Exporting the controllers
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};