/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Context
 * ==========================================================
 */

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedToken = localStorage.getItem("token");

        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {

            setToken(savedToken);

            setUser(JSON.parse(savedUser));

        }

        setLoading(false);

    }, []);

    const login = ({ token, user }) => {

        localStorage.setItem("token", token);

        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);

        setUser(user);

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;