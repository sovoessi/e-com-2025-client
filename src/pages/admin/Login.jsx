import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real authentication logic
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate login success
    alert("Login successful! (Replace with real logic)");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Welcome back! Please sign in to manage your store.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/admin/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;