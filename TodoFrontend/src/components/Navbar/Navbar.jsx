import "./Navbar.css";
import lightTheme from "../../assets/lightTheme.png";
import darkTheme from "../../assets/nightTheme.png";
import logout from "../../assets/logout.png";
import Logo from "../../assets/logo-nobg.png";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar flex justify-between items-center text-black p-4 rounded">
      <div>
        <NavLink to='/' className='logo'><img src={Logo} alt="Logo" className="w-24" /></NavLink>
      </div>

      <div className="text-2xl">
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? 'navbar-active': ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/todos" className={({isActive}) => isActive ? 'navbar-active': ''}>Todos</NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({isActive}) => isActive ? 'navbar-active': ''}>Categories</NavLink>
          </li>
        </ul>
      </div>

      <div>
        <ul className="flex space-x-4 items-center">
          {state.isAuthenticated ? (
            <>
              <li>
                <NavLink to="/profile" className={({isActive}) => isActive ? 'navbar-active': ''}>Profile</NavLink>
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
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
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
