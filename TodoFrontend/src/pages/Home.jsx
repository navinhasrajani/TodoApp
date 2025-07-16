import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [username, setUsername] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [latestTodos, setLatestTodos] = useState([]);
  const [quote, setQuote] = useState("");

  const fetchTodos = async (token) => {
    // console.log("runnin fetch function", token);
    const res = await axios.get("http://localhost:3000/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const todos = res.data;
    const pendingTodos = todos.filter((todo) => !todo.isCompleted);
    const recent = [...todos]
      .filter((todo) => !todo.isCompleted)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    setPendingCount(pendingTodos.length);
    setLatestTodos(recent);
  };

  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://api.quotable.io/random");
      // console.log(res)
      if (res.data) {
        setQuote(res.data.content + " — " + res.data.author);
      }
    } catch (err) {
      console.error("Could not fetch quote:", err.message);
      setQuote(
        "“Start where you are. Use what you have. Do what you can.” — Arthur Ashe"
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchTodos(token);
    fetchQuote();
    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    } catch (err) {
      console.error("Invalid token:", err.message);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl mb-4">
        Welcome <span className="font-bold underline">{username || "Guest"}</span>👋
      </h1>

      <p className="mb-6 text-gray-700">
        You have <span className="font-semibold">{pendingCount}</span> pending
        todos.
      </p>

      <h2 className="text-xl font-semibold mb-2">🕒 Latest Todos</h2>
      {latestTodos.length === 0 ? (
        <p className="text-gray-500 italic">No todos found.</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {latestTodos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white shadow-sm p-3 rounded border border-gray-200"
            >
              <p className="font-medium">{todo.title}</p>
              <p className="text-sm text-gray-500">
                {todo.description || "No description"}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-gray-800 italic">
        <p>“{quote}”</p>
      </div>

      <Link
        to="/todos"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ➕ Add a Todo
      </Link>
    </div>
  );
};

export default Home;
