import { createContext, useContext, useState, useEffect } from "react";

const ThemeConext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    // setTheme( currTheme => currTheme === 'light' ? 'dark' : 'light');
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeConext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeConext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeConext);
};

export { ThemeProvider, useTheme };
