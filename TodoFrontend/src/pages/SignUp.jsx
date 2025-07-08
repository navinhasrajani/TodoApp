import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // If using React Router for navigation

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      });

      setError(""); // Clear any previous error
      localStorage.setItem("token", res.data.token);
      console.log("Registration successful:", res.data);
      navigate('login')
    } catch (error) {
      // Handle Axios errors
      const message = error.response?.data?.message || "Registration failed";
      setError(message);
      console.error("Registration failed:", message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="username">Username</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </td>
          </tr>
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
              <button type="submit">Register</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        {username} {email} {password}
      </p>
      <p className="text-red-500">{error && error}</p>
    </form>
  );
};

export default SignUp;
