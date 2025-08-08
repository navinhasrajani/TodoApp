import { useEffect, useReducer, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { todoReducer } from "../reducers/todoReducers";
import axios from "axios";
import TodoItem from "../components/Todo/TodoItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "general",
    deadline: null,
  });
  useEffect(() => {
    // If we redirected with state { focus: true }
    if (location.state?.focus) {
      inputRef.current?.focus();
    }
  }, [location]);
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

  const updateTodo = async (id, editedTodo) => {
    // console.log(id,editedTodo);
    try{
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. User not logged in.");

      const res = await axios.put(`http://localhost:3000/todos/${id}`, editedTodo,{ headers: { Authorization: `Bearer ${token}` }});
      if (res.status === 200) {
        dispatch({type: "UPDATE_TODO", payload: res.data});
        console.log("Todo updated successfully");
      } else {
        console.error("Failed to update todo:", res.status);
      }
      // console.log(res);
    }catch (err) {
      console.error("Failed to delete todo:", err.message);
    }
  }

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
        deadline: null,
      });
      setIsExpanded(false); // collapse back after add
    } catch (err) {
      console.error("Failed to add todo:", err.message);
    }
  };

  return (
    <div className="home flex flex-col justify-center px-6 py-4 max-w-4xl mx-auto ">
      <h1 className="text-4xl font-bold text-center mb-6">📋 Todos</h1>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search in todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <form
        className="mb-6 bg-white dark:bg-gray-900 p-4 rounded shadow transition-all duration-300"
        onSubmit={handleTodoSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          name="title"
          value={newTodo.title}
          onChange={(e) => handleInputChange(e)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full mb-2 
               bg-white dark:bg-gray-800 text-black dark:text-white 
               placeholder-gray-500 dark:placeholder-gray-400"
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
              className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full 
                   bg-white dark:bg-gray-800 text-black dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400"
            />

            <input
              type="text"
              name="category"
              placeholder="Category (default: general)"
              value={newTodo.category}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full 
                   bg-white dark:bg-gray-800 text-black dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400"
            />

            <select
              name="priority"
              value={newTodo.priority}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full 
                   bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <DatePicker
              selected={newTodo.deadline}
              onChange={(date) =>
                setNewTodo((prev) => ({ ...prev, deadline: date }))
              }
              showTimeSelect
              timeIntervals={15}
              minDate={new Date()}
              dateFormat="Pp"
              placeholderText="Select date and time"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                   bg-white dark:bg-gray-800 text-black dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        )}

        {isExpanded && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 
                 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Todo
          </button>
        )}
      </form>
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading todos...
        </p>
      ) : filteredAndSortedTodos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic">
          No todos found.
        </p>
      ) : (
        <>
          {incompleteTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
            />
          ))}

          {completedTodos.length > 0 && (
            <>
              <h2 className="mt-8 mb-2 text-xl font-semibold text-gray-600 dark:text-gray-300">
                ✅ Completed
              </h2>
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
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
