const User = require('../models/User');
const Todo = require('../models/Todo');

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate('todos') // fetch the actual todo docs, not just IDs
      .select('username email createdAt preferences todos');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const completed = user.todos.filter(todo => todo.isCompleted).length;
    const incomplete = user.todos.length - completed;

    res.json({
      username: user.username,
      email: user.email,
      joined: user.createdAt,
      preferences: user.preferences,
      stats: {
        total: user.todos.length,
        completed,
        incomplete
      }
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching profile',
      error: err.message
    });
  }
}

module.exports = {
    getProfile
}