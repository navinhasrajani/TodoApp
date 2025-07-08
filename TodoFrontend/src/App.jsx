import Navbar from './components/Navbar/Navbar';
import {useTheme} from './context/ThemeContext';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
  const {theme, toggleTheme} = useTheme();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
