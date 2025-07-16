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
    <div className="flex min-w-auto items-center justify-center divide-x-0 divide-gray-500">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img src={Logo} alt="TüDü Logo" />
      </div>
      <div className="w-full md:w-1/2">
        <div className="max-w-2xl p-20">
          {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="justify-items-end">
              <p className="text-sm text-neutral-600 underline">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-blue-700">
                  Sign Up!
                </NavLink>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {error && (
              <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-2 rounded">
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
