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

const freeShippingThreshold = 150;

const CardTotal = ({ cart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= freeShippingThreshold ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h3>
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Shipping</span>
        <span>
          {shipping === 0 ? (
            <span className="text-green-600 font-semibold">Free</span>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </div>
      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="mt-2 text-xs text-blue-600">
        {subtotal >= freeShippingThreshold
          ? "You qualify for free shipping!"
          : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} for free shipping`}
      </div>
    </div>
  );
};

const PlaceOrder = () => {
  const [delivery, setDelivery] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    phone: "",
    email: "",
  });
  const [payment, setPayment] = useState("stripe");

  const handleDeliveryChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Here you would handle order submission
    alert("Order placed! (Demo)");
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Left: Delivery Info */}
        <section className="flex-1 bg-white rounded-xl shadow p-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Delivery Information</h2>
          <form className="space-y-5" onSubmit={handlePlaceOrder} autoComplete="off">
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                value={delivery.name}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="address">
                Address
              </label>
              <input
                required
                type="text"
                name="address"
                id="address"
                value={delivery.address}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Street address"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="city">
                  City
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  value={delivery.city}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="City"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="postal">
                  Postal Code
                </label>
                <input
                  required
                  type="text"
                  name="postal"
                  id="postal"
                  value={delivery.postal}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Postal code"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="country">
                  Country
                </label>
                <input
                  required
                  type="text"
                  name="country"
                  id="country"
                  value={delivery.country}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Country"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  id="phone"
                  value={delivery.phone}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={delivery.email}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@email.com"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition"
            >
              Place Order
            </button>
            <div className="text-xs text-gray-400 mt-2 text-center">
              100% Secure • Fast delivery • Easy returns
            </div>
          </form>
        </section>

        {/* Right: Card Total & Payment */}
        <aside className="w-full md:w-96 flex flex-col gap-6">
          <CardTotal cart={mockCart} />
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Payment Method</h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={payment === "stripe"}
                  onChange={handlePaymentChange}
                  className="accent-blue-600"
                />
                <span className="flex items-center gap-2">
                  <svg className="w-7 h-7" viewBox="0 0 48 48">
                    <rect width="48" height="48" rx="8" fill="#635BFF" />
                    <text
                      x="50%"
                      y="60%"
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="18"
                      fontWeight="bold"
                      fontFamily="Arial"
                      dy=".3em"
                    >
                      Stripe
                    </text>
                  </svg>
                  <span className="font-semibold text-gray-700">Credit/Debit Card (Stripe)</span>
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={payment === "paypal"}
                  onChange={handlePaymentChange}
                  className="accent-blue-600"
                />
                <span className="flex items-center gap-2">
                  <svg className="w-7 h-7" viewBox="0 0 48 48">
                    <rect width="48" height="48" rx="8" fill="#FFC439" />
                    <text
                      x="50%"
                      y="60%"
                      textAnchor="middle"
                      fill="#003087"
                      fontSize="16"
                      fontWeight="bold"
                      fontFamily="Arial"
                      dy=".3em"
                    >
                      PayPal
                    </text>
                  </svg>
                  <span className="font-semibold text-gray-700">PayPal</span>
                </span>
              </label>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <span>
                All transactions are secure and encrypted. We never store your payment details.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default PlaceOrder;