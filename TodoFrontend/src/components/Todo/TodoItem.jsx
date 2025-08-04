import moment from "moment";
import "./TodoItem.css";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const {
    _id,
    title,
    description,
    createdAt,
    isCompleted,
    priority = "medium",
    category = "general",
    deadline,
  } = todo;

  return (
  <div
  className={`p-4 mb-4 rounded-lg transition-all border shadow-sm hover:shadow-md ${
    isCompleted
      ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
  }`}
>
      <div className="flex justify-between items-center mb-2">
        <h3
          className={`font-bold text-lg ${
            isCompleted
              ? "line-through text-gray-500 dark:text-gray-400"
              : "text-gray-800 dark:text-white"
          }`}
        >
          {title}
        </h3>
        <button
          onClick={() => onDelete(_id)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>

      <p
        className={`mb-2 ${
          isCompleted
            ? "line-through text-gray-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        <strong className="text-gray-600 dark:text-gray-400">
          Description:
        </strong>{" "}
        {description || "No description"}
      </p>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        <strong>Deadline:</strong>{" "}
        {deadline ? moment(deadline).format("MMM D, YYYY hh:mm A") : "No deadline"}
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <strong>Created:</strong>{" "}
        {moment(createdAt).format("MMM D, YYYY hh:mm A")}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
          Category: {category}
        </span>

        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            priority === "high"
              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              : priority === "low"
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
          }`}
        >
          Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>

        <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(todo)}
            className="mr-2"
          />
          Completed
        </label>
      </div>
    </div>
  );
};

export default TodoItem;
