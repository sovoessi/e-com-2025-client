import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Profile = () => {
  const { user } = useAppContext();
  const [selected, setSelected] = useState("overview");

  // Dummy message data for illustration
  const messages = [
    { id: 1, subject: "Welcome!", content: "Thanks for joining our store." },
    { id: 2, subject: "Order Update", content: "Your order #1234 has shipped." },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow flex flex-col md:flex-row min-h-[400px]">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r bg-gray-50 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
        <nav className="flex md:flex-col">
          <button
            className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
              selected === "overview" ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-700"
            }`}
            onClick={() => setSelected("overview")}
          >
            Profile Overview
          </button>
          <button
            className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
              selected === "orders" ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-700"
            }`}
            onClick={() => setSelected("orders")}
          >
            My Orders
          </button>
          <button
            className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
              selected === "password" ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-700"
            }`}
            onClick={() => setSelected("password")}
          >
            Change Password
          </button>
          <button
            className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
              selected === "messages" ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-700"
            }`}
            onClick={() => setSelected("messages")}
          >
            Messages
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6">
        {selected === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.username}!</h2>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Email:</span> {user?.email}
              </div>
              <div>
                <span className="font-semibold">Username:</span> {user?.username || "-"}
              </div>
              <div>
                <span className="font-semibold">Member since:</span>{" "}
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
              </div>
            </div>
          </div>
        )}

        {selected === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <Link
              to="/shop/orders"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Order History
            </Link>
          </div>
        )}

        {selected === "password" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form className="max-w-sm space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled
                title="Feature coming soon"
              >
                Change Password
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">Password change feature coming soon.</p>
          </div>
        )}

        {selected === "messages" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            <ul className="space-y-3">
              {messages.length === 0 ? (
                <li className="text-gray-500">No messages yet.</li>
              ) : (
                messages.map((msg) => (
                  <li key={msg.id} className="border rounded p-3 bg-gray-50">
                    <div className="font-semibold">{msg.subject}</div>
                    <div className="text-gray-700">{msg.content}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;