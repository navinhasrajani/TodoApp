const Todo = require('../models/Todo');

//Category stats

const getCategoryStats = async (req, res) => {
    try {
        const categories = await Todo.aggregate([
            {
                $match: {
                    user: req.user._id, // 👈 Filter for logged-in user
                },
            },
            {
                $group: {
                    _id: { $ifNull: ["$category", "General"] },
                    todoCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    todoCount: 1,
                },
            },
        ]);

        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//oldCategory
const editCategory = async (req, res) => {
    const { newCategory } = req.body;
    const oldCategory = req.params.oldCategory;
    try {
        const result = await Todo.updateMany(
            {
                user: req.user._id,
                category: oldCategory
            },
            { $set: { category: newCategory } }
        );
        res.json({ updatedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const deleteCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const result = await Todo.deleteMany(
            {
                user: req.user._id,
                category: category
            }
        )
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No todos found with this category" });
        }
        res.json({ deletedCount: result.deletedCount });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getCategoryStats,
    editCategory,
    deleteCategory
}