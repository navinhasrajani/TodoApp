import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from './context/ThemeContext';
// import { ThemeProvider } from './context/theme-context.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
