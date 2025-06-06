import React, { useState } from "react";

// Example product data (replace with real data/fetch in production)
const product = {
	id: 1,
	name: "Men's Classic T-Shirt",
	price: "$29",
	images: [
		"https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
		"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
		"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=40",
	],
	description:
		"A timeless classic. Soft, comfortable, and perfect for everyday wear. 100% cotton. Available in multiple sizes.",
	sizes: ["S", "M", "L", "XL", "XXL"],
	reviews: 120,
	rating: 4.2,
};

// Example related products (replace with real data/fetch in production)
const relatedProducts = [
  {
    id: 2,
    name: "Women's Classic T-Shirt",
    price: "$27",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 3,
    name: "Unisex Hoodie",
    price: "$49",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=90",
  },
  {
    id: 4,
    name: "Classic Cap",
    price: "$19",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=50",
  },
];


const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

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
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-10'>
				{/* Product Images */}
				<div className='flex-1 flex flex-col items-center'>
					<div className='w-full flex items-center justify-center mb-4'>
						<img
							src={selectedImage}
							alt={product.name}
							className='rounded-xl shadow-lg w-full max-w-xs object-cover'
						/>
					</div>
					<div className='flex gap-2'>
						{product.images.map((img, idx) => (
							<button
								key={img}
								type='button'
								onClick={() => setSelectedImage(img)}
								className={`border-2 rounded-lg p-1 transition ${
									selectedImage === img
										? "border-blue-600"
										: "border-transparent hover:border-gray-300"
								}`}
								aria-label={`View product image ${idx + 1}`}
							>
								<img
									src={img}
									alt={`Thumbnail ${idx + 1}`}
									className='w-16 h-16 object-cover rounded'
									loading='lazy'
								/>
							</button>
						))}
					</div>
				</div>
				{/* Product Details */}
				<div className='flex-1 flex flex-col gap-6'>
					<h1 className='text-3xl font-bold text-gray-900'>{product.name}</h1>
					<div className='flex items-center gap-2'>
						<span className='text-xl font-semibold text-blue-600'>
							{product.price}
						</span>
						<span className='ml-4 text-yellow-500 flex items-center'>
							{/* Star rating */}
							{[...Array(5)].map((_, i) => (
								<svg
									key={i}
									className={`w-5 h-5 ${
										i < Math.round(product.rating)
											? "fill-yellow-400"
											: "fill-gray-200"
									}`}
									viewBox='0 0 20 20'
								>
									<polygon points='10,1 12.6,7.5 19.5,7.5 14,12 16,19 10,15 4,19 6,12 0.5,7.5 7.4,7.5' />
								</svg>
							))}
							<span className='ml-2 text-gray-500 text-sm'>
								({product.reviews} reviews)
							</span>
						</span>
					</div>
					<p className='text-gray-700'>{product.description}</p>
					{/* Size selection */}
					<div>
						<label className='block text-gray-800 font-medium mb-2'>Size</label>
						<div className='flex gap-2'>
							{product.sizes.map((size) => (
								<button
									key={size}
									type='button'
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
						<label className='block text-gray-800 font-medium mb-2'>
							Quantity
						</label>
						<input
							type='number'
							min={1}
							max={10}
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
							className='w-20 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
						/>
					</div>
					{/* Action buttons */}
					<div className='flex gap-4 mt-4'>
						<button
							onClick={handleAddToCart}
							className='bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition'
						>
							Add to Cart
						</button>
						<button
							onClick={handleBuyNow}
							className='bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition'
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			{/* Related Products */}
			{/* Other people also bought */}
			<section className='max-w-5xl mx-auto mt-16 px-4'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					Other people also bought
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
					{relatedProducts.map((item) => (
						<div
							key={item.id}
							className='bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center p-4'
						>
							<img
								src={item.image}
								alt={item.name}
								className='w-full h-40 object-cover rounded mb-4'
								loading='lazy'
							/>
							<h3 className='text-lg font-semibold text-gray-800 mb-1 text-center w-full truncate'>
								{item.name}
							</h3>
							<span className='text-blue-600 font-bold text-lg mb-3'>
								{item.price}
							</span>
							<a
								href={`/shop/products/${item.id}`}
								className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center font-medium'
							>
								View Details
							</a>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default ProductPage;