import React from "react";
import { useParams, Link } from "react-router-dom";

const mockOrder = {
  id: "1001",
  date: "2025-06-01",
  total: 129.97,
  status: "Shipped",
  shipping: {
    name: "Jane Doe",
    address: "123 Main St",
    city: "New York",
    postal: "10001",
    country: "USA",
  },
  payment: "Stripe",
  items: [
    {
      name: "Premium Hoodie",
      qty: 2,
      price: 49.99,
      image: "/images/hoodie.jpg",
      size: "M",
    },
    {
      name: "Classic Sneakers",
      qty: 1,
      price: 89.99,
      image: "/images/sneakers.jpg",
      size: "42",
    },
  ],
};

const statusColors = {
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderDetailsUser = () => {
  const { id } = useParams();
  // In real app, fetch order by id
  const order = mockOrder; // Replace with fetched order

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/shop/orders" className="hover:underline text-blue-600">
            My Orders
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">
            Order #{order.id}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold mb-4 text-gray-900">
          Order #{order.id}
        </h1>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <div className="text-gray-700 font-semibold mb-1">
                Status:{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[order.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                Placed on {order.date}
              </div>
            </div>
            <div className="text-gray-700 text-sm">
              <span className="font-semibold">Total:</span>{" "}
              <span className="text-blue-700 font-bold text-lg">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-gray-900">
                Shipping Address
              </h3>
              <div className="text-gray-700 text-sm">
                <div>{order.shipping.name}</div>
                <div>{order.shipping.address}</div>
                <div>
                  {order.shipping.city}, {order.shipping.postal}
                </div>
                <div>{order.shipping.country}</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-gray-900">
                Payment Method
              </h3>
              <div className="text-gray-700 text-sm">
                {order.payment}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold mb-4 text-gray-900">Order Items</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Size: {item.size}
                  </div>
                </div>
                <div className="text-gray-700 text-sm">
                  Qty:{" "}
                  <span className="font-semibold">{item.qty}</span>
                </div>
                <div className="text-blue-700 font-bold text-base ml-4">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          Thank you for shopping with us! Need help?{" "}
          <a
            href="/contact"
            className="text-blue-600 hover:underline"
          >
            Contact support
          </a>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailsUser;