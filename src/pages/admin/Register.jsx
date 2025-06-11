import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const {navigate, toast, register} = useAppContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      toast.error(error);
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      toast.error(error);
      return;
    }
    register(form.username, form.email, form.password)
      .catch((err) => {
        setError(err.message || "Registration failed. Please try again.");
        toast.error(error);
      });
    toast("Registration successful! ");
    navigate("/shop");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-base mb-6 text-center">
          Join our community and unlock member-only offers!
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="username"
            >
              Your Username
            </label>
            <input
              id="name"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={handleChange}
              placeholder="Your username"
            />
          </div>
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
              autoComplete="new-password"
              required
              className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="confirm"
            >
              Confirm Password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat your password"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition text-lg"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/shop/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
          We respect your privacy. No spam, ever.
        </div>
      </div>
    </main>
  );
};

export default Register;