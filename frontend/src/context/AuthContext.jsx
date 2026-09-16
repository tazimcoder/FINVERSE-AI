/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Context
 * ==========================================================
 *
 * Responsibility:
 *
 * - Store authenticated user
 * - Store JWT token
 * - Restore authentication after refresh
 * - Fetch latest user from backend
 * - Provide login/logout functionality
 * - Provide user role information
 *
 * ==========================================================
 */

import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getMeApi,
} from "../features/auth/api/authApi";


/* ==========================================================
   Auth Context
   ========================================================== */

export const AuthContext = createContext(null);


/* ==========================================================
   Auth Provider
   ========================================================== */

function AuthProvider({ children }) {

    // ======================================================
    // Authentication State
    // ======================================================

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);


    // ======================================================
    // Logout
    // ======================================================

    const logout = useCallback(() => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setToken(null);

        setUser(null);

    }, []);


    // ======================================================
    // Get Current User
    // ======================================================

    const loadCurrentUser = useCallback(
        async (savedToken) => {

            try {

                const response =
                    await getMeApi(savedToken);

                /*
                 * Backend response can be:
                 *
                 * {
                 *     success: true,
                 *     data: {
                 *         id,
                 *         full_name,
                 *         email,
                 *         role,
                 *         is_active
                 *     }
                 * }
                 */

                const currentUser =
                    response?.data?.data ||
                    response?.data?.user ||
                    response?.data ||
                    null;


                if (!currentUser) {

                    throw new Error(
                        "Unable to load authenticated user."
                    );

                }


                setUser(currentUser);


                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );


                return currentUser;

            }

            catch (error) {

                console.error(
                    "Load Current User Error:",
                    error
                );

                /*
                 * Token invalid / expired
                 */

                logout();

                return null;

            }

        },
        [logout]
    );


    // ======================================================
    // Restore Authentication
    // ======================================================

    useEffect(() => {

        let mounted = true;


        async function restoreAuthentication() {

            try {

                const savedToken =
                    localStorage.getItem("token");


                if (!savedToken) {

                    if (mounted) {

                        setToken(null);

                        setUser(null);

                    }

                    return;

                }


                if (mounted) {

                    setToken(savedToken);

                }


                /*
                 * IMPORTANT:
                 *
                 * Backend se fresh user data
                 * lekar aayenge.
                 *
                 * Isse Admin/User role
                 * database ke according rahega.
                 */

                const currentUser =
                    await loadCurrentUser(savedToken);


                if (
                    mounted &&
                    currentUser
                ) {

                    setUser(currentUser);

                }

            }

            catch (error) {

                console.error(
                    "Auth Restore Error:",
                    error
                );

                if (mounted) {

                    logout();

                }

            }

            finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        }


        restoreAuthentication();


        return () => {

            mounted = false;

        };

    }, [loadCurrentUser, logout]);


    // ======================================================
    // Login
    // ======================================================

    const login = useCallback(
        ({ token: newToken, user: loggedInUser }) => {

            if (!newToken) {

                throw new Error(
                    "Login failed: JWT token missing."
                );

            }


            localStorage.setItem(
                "token",
                newToken
            );


            if (loggedInUser) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(loggedInUser)
                );

            }


            setToken(newToken);

            setUser(loggedInUser || null);

        },
        []
    );


    // ======================================================
    // Authentication Information
    // ======================================================

    const isAuthenticated =
        Boolean(token);


    const role =
        user?.role || null;


    const isAdmin =
        role === "ADMIN";


    const isUser =
        role === "USER";


    // ======================================================
    // Context Value
    // ======================================================

    const contextValue = {

        user,

        token,

        role,

        loading,

        isAuthenticated,

        isAdmin,

        isUser,

        login,

        logout,

        reloadUser: () =>
            loadCurrentUser(token),

        updateUser: (newData) => {
            setUser((prev) => {
                const updated = { ...prev, ...newData };
                localStorage.setItem("user", JSON.stringify(updated));
                return updated;
            });
        },

    };


    // ======================================================
    // Provider
    // ======================================================

    return (

        <AuthContext.Provider
            value={contextValue}
        >

            {children}

        </AuthContext.Provider>

    );

}


export default AuthProvider;