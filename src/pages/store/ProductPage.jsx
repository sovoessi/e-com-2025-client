import React, { useState } from "react";

// Example product data (replace with real data/fetch in production)
const product = {
  id: 1,
  name: "Men's Classic T-Shirt",
  price: "$29",
  image:
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  description:
    "A timeless classic. Soft, comfortable, and perfect for everyday wear. 100% cotton. Available in multiple sizes.",
  sizes: ["S", "M", "L", "XL", "XXL"],
  reviews: 120,
  rating: 4.2,
};

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  // Add to cart handler (replace with context or redux in real app)
  const handleAddToCart = () => {
    // Example: send to cart context or API
    alert(
      `Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`
    );
  };

  // Proceed to payment handler (best practice: add to cart, then redirect)
  const handleBuyNow = () => {
    handleAddToCart();
    // Example: redirect to checkout page
    window.location.href = "/checkout";
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg w-full max-w-xs object-cover"
          />
        </div>
        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-blue-600">
              {product.price}
            </span>
            <span className="ml-4 text-yellow-500 flex items-center">
              {/* Star rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-400"
                      : "fill-gray-200"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <polygon points="10,1 12.6,7.5 19.5,7.5 14,12 16,19 10,15 4,19 6,12 0.5,7.5 7.4,7.5" />
                </svg>
              ))}
              <span className="ml-2 text-gray-500 text-sm">
                ({product.reviews} reviews)
              </span>
            </span>
          </div>
          <p className="text-gray-700">{product.description}</p>
          {/* Size selection */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Size
            </label>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`px-4 py-2 rounded-lg border font-semibold transition ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity selection */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {/* Action buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;