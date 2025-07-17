import { useState } from "react";
import axios from "axios";
import Logo from "../assets/Logo-nobg.png";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      });

      setError("");
      localStorage.setItem("token", res.data.token);
      console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      setError(message);
      console.error("Registration failed:", message);
    }
  };

  return (
    <div className="flex min-w-auto items-center justify-center divide-x-0 divide-gray-500">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img src={Logo} alt="TüDü Logo" className="min-w-1/2" />
      </div>

      <div className="w-full md:w-1/2">
        <div className="max-w-2xl p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="justify-items-end">
              <p className="text-sm text-neutral-600 underline">
                Already have an account?{" "}
                <NavLink to="/login" className="text-blue-700">
                  Login!
                </NavLink>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Account
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

export default SignUp;
