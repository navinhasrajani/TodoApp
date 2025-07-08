import { createContext, useContext, useReducer, useEffect } from "react";

const initailState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                user: null,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initailState);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({ type: "LOGIN", payload: { token } });
        }
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);