import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../reducers/todoReducers";
import axios from "axios";
import TodoItem from "../components/Todo/TodoItem";

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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

const incompleteTodos = filteredAndSortedTodos.filter((todo) => !todo.isCompleted);
const completedTodos = filteredAndSortedTodos.filter((todo) => todo.isCompleted);

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