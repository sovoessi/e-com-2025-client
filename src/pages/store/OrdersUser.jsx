import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const statusColors = {
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrdersUser = () => {
  const [orders, setOrders] = useState([]);
  const { fetchOrders } = useAppContext();

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    loadOrders();
  }, [fetchOrders]);

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
          My Orders
        </h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500 mb-4">You have no orders yet.</p>
            <Link
              to="/shop"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">Order #</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b last:border-0">
                    <td className="py-3 font-bold text-blue-700">{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="font-semibold">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td>
                      <div className="flex -space-x-2">
                        {order.products.map((item, idx) => (
                          <img
                            key={idx}
                            src={item.productId?.images?.[0] || "/placeholder.png"}
                            alt={item.productId?.name || "Product"}
                            className="w-8 h-8 rounded border bg-gray-100"
                            title={item.productId?.name}
                          />
                        ))}
                      </div>
                    </td>
                    <td>
                      <Link
                        to={`/shop/orders/${order._id}`}
                        className="text-blue-600 hover:underline font-medium text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 text-xs text-gray-400 text-center">
              Need help?{" "}
              <a
                href="/contact"
                className="text-blue-600 hover:underline"
              >
                Contact support
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersUser;