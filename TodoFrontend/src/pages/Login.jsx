import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // If using React Router for navigation

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

      setError(""); // Clear any previous error
      localStorage.setItem("token", res.data.token);

      dispatch({
        type: "LOGIN",
        payload: { token: res.data.token, user: res.data.user },
      });

      console.log("Login successful:", res.data);
      navigate("/"); // Navigate to home
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      console.error("Login failed:", message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="email">Email</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password</label>
            </td>
            <td>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-center">
              <button type="submit">Login</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-red-500">{error && error}</p>
    </form>
  );
};

export default Login;
