//Todo model
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, maxLength: 500},
    isCompleted: {type: Boolean, default: false},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'medium'},
    createdAt: {type: Date,default: Date.now},
})

const Todo = mongoose.model('Todo', todoSchema, 'Todos');
module.exports = Todo;