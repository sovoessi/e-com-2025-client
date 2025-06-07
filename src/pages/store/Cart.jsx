import React, { useState } from "react";

const mockCart = [
  {
    id: 1,
    name: "Premium Hoodie",
    image: "/images/hoodie.jpg",
    price: 49.99,
    quantity: 2,
    size: "M",
  },
  {
    id: 2,
    name: "Classic Sneakers",
    image: "/images/sneakers.jpg",
    price: 89.99,
    quantity: 1,
    size: "42",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(mockCart);

  const handleQuantityChange = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Marketing: Free shipping threshold
  const freeShippingThreshold = 150;
  const shippingMsg =
    subtotal >= freeShippingThreshold
      ? "You qualify for free shipping!"
      : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} for free shipping`;

  // Payment handlers (mock)
  const handleStripeCheckout = () => {
    alert("Redirecting to Stripe checkout...");
  };
  const handleCBCheckout = () => {
    alert("Paiement CB (carte bancaire) non disponible en démo.");
  };
  const handlePaypalCheckout = () => {
    alert("Redirecting to PayPal...");
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <a
              href="/shop"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h2 className="font-bold text-lg text-gray-900">
                          {item.name}
                        </h2>
                        <div className="text-sm text-gray-500">
                          Size: {item.size}
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="mt-2 text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, Number(e.target.value))
                          }
                          className="w-16 px-2 py-1 border rounded text-center"
                        />
                        <span className="text-gray-700 font-semibold">
                          x ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    "$9.99"
                  )}
                </span>
              </div>
              <div className="text-xs text-blue-600 mt-1">{shippingMsg}</div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={handleStripeCheckout}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <rect width="32" height="32" rx="8" fill="#635BFF" />
                  <text
                    x="16"
                    y="22"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#fff"
                    fontFamily="Arial"
                  >
                    S
                  </text>
                </svg>
                Pay with Stripe
              </button>
              <button
                onClick={handleCBCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-gray-800 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="6"
                    width="20"
                    height="12"
                    rx="2"
                    fill="#fff"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <rect x="4" y="10" width="6" height="2" fill="#2563eb" />
                </svg>
                Pay with CB
              </button>
              <button
                onClick={handlePaypalCheckout}
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold text-lg shadow hover:bg-yellow-300 transition"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect width="32" height="32" rx="8" fill="#fff" />
                  <text
                    x="16"
                    y="22"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#003087"
                    fontFamily="Arial"
                  >
                    P
                  </text>
                </svg>
                Pay with PayPal
              </button>
            </div>
            <div className="mt-6 text-center text-xs text-gray-400">
              <span>
                Secure checkout • 30-day easy returns • Trusted by 10,000+ customers
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;