import Navbar from './components/Navbar/Navbar';
import {useTheme} from './context/ThemeContext';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Categories from './pages/Categories';
import CategoryItem from './components/Category/CategoryItem';
function App() {
  const {theme, toggleTheme} = useTheme();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
