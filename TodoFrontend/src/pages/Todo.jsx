import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../reducers/todoReducers";
import axios from "axios";
import TodoItem from "../components/Todo/TodoItem";
const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [searchTerm, setSearchTerm] = useState("")

  //fetching todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. User not logged in.");
        }
        const res = await axios.get("http://localhost:3000/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(res.data);
        dispatch({ type: "SET_TODOS", payload: res.data });
      } catch (err) {
        console.error("Failed to fetech todos", err.message);
      }
    };
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. User not logged in.");
      }
      const res = await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        dispatch({ type: "DELETE_TODO", payload: id });
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo", res.data);
      }
    } catch (err) {
      console.error("Failed to delete todo", err.message);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. User not logged in.");
      }
      const res = await axios.put(
        `http://localhost:3000/todos/${todo._id}`,
        {
          isCompleted: !todo.isCompleted,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "TOGGLE_TODO", payload: { _id: todo._id } });
        console.log("Todo toggled successfully");
      } else {
        console.error("Failed to toggle todo--", res.data);
      }
    } catch (err) {
      console.error("Failed to toggle todo-", err.message);
    }
  };

  const filteredTodos = todos.filter((todo) =>
  `${todo.title} ${todo.description || ""}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  return (
    <div className="home flex flex-col justify-center">
      <h1 className="flex content-center justify-center text-6xl">Todos</h1>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search in todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex px-4 py-2 mr-4 underline rounded-md w-64 bg-gray-200"
        />
      </div>

      {filteredTodos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo._id}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
      ))}
    </div>
  );
};

export default Todo;
