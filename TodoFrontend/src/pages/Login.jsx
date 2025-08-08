import { useState } from "react";
import axios from "axios";
import Logo from "../assets/Logo-nobg.png";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      setError("");
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "LOGIN",
        payload: { token: res.data.token, user: res.data.user },
      });

      console.log("Login successful:", res.data);
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      console.error("Login failed:", message);
    }
  };

  return (
    <div className="flex min-w-auto items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Left logo panel */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-9">
        <img src={Logo} alt="TüDü Logo" className="min-w-1/2" />
      </div>

      {/* Right login panel */}
      <div className="w-full md:w-1/2">
        <div className="max-w-2xl p-8 md:p-20 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Signup link */}
            <div className="justify-items-end">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 underline">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-blue-700 dark:text-blue-400 hover:underline"
                >
                  Sign Up!
                </NavLink>
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Login
            </button>

            {/* Error message */}
            {error && (
              <div className="mb-4 text-center text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-2 rounded">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
