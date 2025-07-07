import { createContext, useContext, useState } from 'react';

const ThemeConext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme( currTheme => currTheme === 'light' ? 'dark' : 'light');
    }

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