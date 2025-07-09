import { createContext, useContext, useState, useEffect } from 'react';

const ThemeConext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme( currTheme => currTheme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        const root = document.documentElement;
        theme === "dark" ? root.classList.add('dark') : root.classList.remove('dark');
    }, [theme])
    

    return(
        <ThemeConext.Provider value = {{theme, toggleTheme}}>
            {children}
        </ThemeConext.Provider>
    )
}

const useTheme = () => {
    return useContext(ThemeConext)
}

export {ThemeProvider, useTheme};