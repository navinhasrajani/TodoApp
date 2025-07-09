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
  } = todo;

  return (
    <div className={`todo-card ${isCompleted ? "completed" : ""}`}>
      <div className="todo-header">
        <h3 className="font-bold">{title}</h3>
        <button onClick={() => onDelete(_id)}>❌</button>
      </div>

      <p className="todo-description">{description || "No description"}</p>

      <div className="todo-created">
        <strong>Created:</strong> {moment(createdAt).format("MMM D, YYYY hh:mm A")}
      </div>

      <div className="todo-tags">
        <span className="todo-badge">Category: {category}</span>
        <span
          className={`todo-badge ${
            priority === "high"
              ? "priority-high"
              : priority === "low"
              ? "priority-low"
              : "priority-medium"
          }`}
        >
          Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(todo)}
            style={{ marginRight: "0.4rem" }}
          />
          Completed
        </label>
      </div>
    </div>
  );
};

export default TodoItem;
