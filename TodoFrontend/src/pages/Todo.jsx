import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../reducers/todoReducers";
import axios from "axios";
import TodoItem from "../components/Todo/TodoItem";

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "general",
  });
  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. User not logged in.");

        const res = await axios.get("http://localhost:3000/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "SET_TODOS", payload: res.data });
      } catch (err) {
        console.error("Failed to fetch todos:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. User not logged in.");

      const res = await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        dispatch({ type: "DELETE_TODO", payload: id });
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo:", res.data);
      }
    } catch (err) {
      console.error("Failed to delete todo:", err.message);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. User not logged in.");

      const res = await axios.put(
        `http://localhost:3000/todos/${todo._id}`,
        { isCompleted: !todo.isCompleted },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        dispatch({ type: "TOGGLE_TODO", payload: { _id: todo._id } });
        console.log("Todo toggled successfully");
      } else {
        console.error("Failed to toggle todo:", res.data);
      }
    } catch (err) {
      console.error("Failed to toggle todo:", err.message);
    }
  };

  const filteredAndSortedTodos = todos
    .filter((todo) =>
      `${todo.title} ${todo.description || ""}`
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const incompleteTodos = filteredAndSortedTodos.filter(
    (todo) => !todo.isCompleted
  );
  const completedTodos = filteredAndSortedTodos.filter(
    (todo) => todo.isCompleted
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "title") {
      setIsExpanded(value.trim() !== "");
    }
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    console.log(newTodo);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/todos/", newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "ADD_TODO", payload: res.data });
      setNewTodo({
        title: "",
        description: "",
        priority: "medium",
        category: "general",
      });
      setIsExpanded(false); // collapse back after add
    } catch (err) {
      console.error("Failed to add todo:", err.message);
    }
  };

  return (
    <div className="home flex flex-col justify-center px-6 py-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">📋 Todos</h1>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search in todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-64 border rounded-md bg-gray-100 focus:outline-none"
        />
      </div>
      <form
        className="mb-6 bg-white p-4 rounded shadow transition-all duration-300"
        onSubmit={handleTodoSubmit}
      >
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={(e) => handleInputChange(e)}
          className="p-2 border rounded w-full mb-2"
          placeholder="What is needed to be Done?"
          required
        />
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 transition-all">
            <input
              type="text"
              name="description"
              placeholder="Description (optional)"
              value={newTodo.description}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />

            <input
              type="text"
              name="category"
              placeholder="Category (default: general)"
              value={newTodo.category}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />

            <select
              name="priority"
              value={newTodo.priority}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        )}

        {isExpanded && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Todo
          </button>
        )}
      </form>
      {loading ? (
        <p className="text-center text-gray-500">Loading todos...</p>
      ) : filteredAndSortedTodos.length === 0 ? (
        <p className="text-center text-gray-500 italic">No todos found.</p>
      ) : (
        <>
          {incompleteTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}

          {completedTodos.length > 0 && (
            <>
              <h2 className="mt-8 mb-2 text-xl font-semibold text-gray-600">
                ✅ Completed
              </h2>
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Todo;
