import "./Navbar.css";
import lightTheme from "../../assets/lightTheme.png";
import darkTheme from "../../assets/nightTheme.png";
import logout from "../../assets/logout.png";
import Logo from "../../assets/logo-nobg.png";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar flex justify-between items-center text-black p-4">
      <div className="logo">
        <img src={Logo} alt="Logo" className="w-24" />
      </div>

      <div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
      </div>

      <div>
        <ul className="flex space-x-4 items-center">
          {state.isAuthenticated ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <img
                    src={logout}
                    alt="Logout"
                    className="w-6 h-6 cursor-pointer"
                  />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
          <li>
            <img
              className="cursor-pointer w-7 h-7"
              src={theme === "light" ? darkTheme : lightTheme}
              alt="Toggle Theme"
              onClick={toggleTheme}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
