import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    // Synchronize to LocalStorage whenever state changes
    useEffect(() => {
        if (isLoggedIn && user && token) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, [isLoggedIn, user, token]);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
        // Clean out sensitive TurfContext localStorage data manually
        localStorage.removeItem("bookingTurfData");
        localStorage.removeItem("currentTurfContext");
        localStorage.removeItem("currentBookingContext");
        toast.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
