import {useTheme} from './context/ThemeContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
  const {theme, toggleTheme} = useTheme();
  return (
    <>
      <div> 
        <Login />
        {/* <SignUp/> */}
      </div>
    </>
  )
}

export default App
