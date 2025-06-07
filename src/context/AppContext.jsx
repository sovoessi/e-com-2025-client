import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const isAdmin = useMemo(() => user?.role === "admin", [user]);
	const navigate = useNavigate();

	const API_URL = import.meta.env.VITE_API_URL;

	// fetch products from the API
	const fetchProducts = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_URL}/products`);
			return response.data;
		} catch (err) {
			setError(err.message);
			toast.error("Failed to fetch products.");
			return [];
		} finally {
			setLoading(false);
		}
	};

	// fetch product by ID from the API
	const fetchProductById = async (id) => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_URL}/products/${id}`);
			return response.data;
		} catch (err) {
			setError(err.message);
			toast.error("Failed to fetch product details.");
			return null;
		} finally {
			setLoading(false);
		}
	};

	// update product by ID
	const updateProductById = async (id, productData) => {
		setLoading(true);
		try {
			const response = await axios.put(
				`${API_URL}/products/${id}`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast("Product updated successfully!");
			return response.data;
		} catch (err) {
			setError(err.message);
			toast.error("Failed to update product.");
			return null;
		} finally {
			setLoading(false);
		}
	};

	// delete product by ID
	const deleteProductById = async (id) => {
		setLoading(true);
		try {
			await axios.delete(`${API_URL}/products/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast("Product deleted successfully!");
		} catch (err) {
			setError(err.message);
			toast.error("Failed to delete product.");
		} finally {
			setLoading(false);
		}
	};

	// create new product
	const createProduct = async (productData) => {
		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/products`, productData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast("Product created successfully!");
			return response.data;
		} catch (err) {
			setError(err.message);
			toast.error("Failed to create product.");
			return null;
		} finally {
			setLoading(false);
		}
	};

	// fetch user profile
	const fetchUserProfile = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUser(response.data);
			sessionStorage.setItem("user", JSON.stringify(response.data));
		} catch (err) {
			setError(err.message);
			toast.error("Failed to fetch user profile.");
		} finally {
			setLoading(false);
		}
	};

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
			toast.error("Login failed. Please check your credentials.");
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
		const storedUser = sessionStorage.getItem("user");
		if (storedToken) setToken(storedToken);
		if (storedUser) setUser(JSON.parse(storedUser));
	}, []);

	const contextValue = useMemo(
		() => ({
			loading,
			error,
			toast,
			fetchProducts,
			fetchProductById,
			updateProductById,
			deleteProductById,
			createProduct,
			fetchUserProfile,
			token,
			user,
			isAdmin,
			navigate,
			login,
			register,
			handleLogin,
			handleLogout,
		}),
		[loading, error, token, user, isAdmin, navigate]
	);

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
