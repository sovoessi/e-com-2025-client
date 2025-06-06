import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const API_URL = import.meta.env.VITE_API_URL;
	// Handle user login
	const login = async (email, password) => {
		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});
			handleLogin(response.data);
		} catch (err) {
			setError(err.message);
			toast("Login failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};

	// Handle user registration
	const register = async (username, email, password) => {
		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/auth/register`, {
				username,
				email,
				password,
			});
			handleLogin(response.data);
		} catch (err) {
			setError(err.message);
			toast.error("Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Handle user login
	const handleLogin = (userData) => {
		setToken(userData.token);
		setUser(userData.user);
		sessionStorage.setItem("token", userData.token);
		sessionStorage.setItem("user", JSON.stringify(userData.user));
		navigate("/admin");
		toast("Logged in successfully!");
	};

	// Handle user logout
	const handleLogout = () => {
		setToken(null);
		setUser(null);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		navigate("/");
		toast("Logged out successfully!");
	};

	// Fetch token from session storage on initial load
	useEffect(() => {
		const storedToken = sessionStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);
	// Fetch user from session storage on initial load
	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const contextValue = {
		loading,
		error,
		token,
		user,
		navigate,
		login,
		register,
		handleLogin,
		handleLogout,
	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};