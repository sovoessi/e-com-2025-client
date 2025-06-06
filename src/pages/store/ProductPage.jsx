import React, { useState, useRef, useEffect } from "react";

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
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=70",
	},
	{
		id: 3,
		name: "Unisex Hoodie",
		price: "$49",
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=90",
	},
	{
		id: 4,
		name: "Classic Cap",
		price: "$19",
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=50",
	},
];

const ProductPage = () => {
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(product.images[0]);
	const [cart, setCart] = useState(() => new Map());
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);

	const profileMenuRef = useRef(null);

	// Close profile dropdown when clicking outside
	useEffect(() => {
		const handleClick = (e) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(e.target)
			) {
				setProfileMenuOpen(false);
			}
		};
		if (profileMenuOpen) {
			document.addEventListener("mousedown", handleClick);
		}
		return () => document.removeEventListener("mousedown", handleClick);
	}, [profileMenuOpen]);

	// Add to cart handler
	const handleAddToCart = () => {
		setCart((prevCart) => {
			const newCart = new Map(prevCart);
			const key = `${product.id}_${selectedSize}`;
			newCart.set(key, (newCart.get(key) || 0) + quantity);
			return newCart;
		});
		alert(
			`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`
		);
	};

	// Proceed to payment handler (best practice: add to cart, then redirect)
	const handleBuyNow = () => {
		handleAddToCart();
		window.location.href = "/checkout";
	};

	// Cart count
	const cartCount = Array.from(cart.values()).reduce((a, b) => a + b, 0);

	// Handle cart icon click
	const handleCartClick = () => {
		// For demo: show cart contents in alert, in real app redirect or open modal
		alert(
			cartCount === 0
				? "Your cart is empty."
				: `Cart items:\n${Array.from(cart.entries())
						.map(([key, qty]) => {
							const [id, size] = key.split("_");
							return `${qty} x ${product.name} (Size: ${size})`;
						})
						.join("\n")}`
		);
	};

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			{/* Top Bar with Cart and Profile */}
			<div className='max-w-4xl mx-auto px-4 flex justify-end mb-6'>
				<div className='flex items-center gap-4'>
					{/* Cart Icon */}
					<button
						onClick={handleCartClick}
						type='button'
						className='relative p-2 rounded-full hover:bg-blue-50 transition'
						aria-label='Basket'
					>
						<svg
							width='22'
							height='22'
							fill='none'
							viewBox='0 0 24 24'
							className='text-blue-600'
						>
							<path
								d='M6 9l1.5 9a2 2 0 002 2h5a2 2 0 002-2L18 9'
								stroke='currentColor'
								strokeWidth='2'
							/>
							<path
								d='M9 9V7a3 3 0 116 0v2'
								stroke='currentColor'
								strokeWidth='2'
							/>
							<rect
								x='3'
								y='9'
								width='18'
								height='2'
								rx='1'
								fill='currentColor'
								className='text-blue-100'
							/>
						</svg>
						{cartCount > 0 && (
							<span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-5 text-center'>
								{cartCount}
							</span>
						)}
					</button>
					{/* Profile Icon */}
					<div
						className='relative'
						ref={profileMenuRef}
					>
						<button
							type='button'
							className='relative p-2 rounded-full hover:bg-blue-50 transition'
							aria-label='User Profile'
							aria-haspopup='true'
							aria-expanded={profileMenuOpen}
							onClick={() => setProfileMenuOpen((open) => !open)}
							onBlur={() => setTimeout(() => setProfileMenuOpen(false), 100)}
						>
							<svg
								width='22'
								height='22'
								fill='none'
								viewBox='0 0 24 24'
								className='text-blue-600'
							>
								<circle
									cx='12'
									cy='8'
									r='4'
									stroke='currentColor'
									strokeWidth='2'
								/>
								<path
									d='M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4'
									stroke='currentColor'
									strokeWidth='2'
								/>
							</svg>
							<span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-5 text-center'>
								3
							</span>
						</button>
						{profileMenuOpen && (
							<div className='absolute right-0 top-full mt-2 min-w-full w-48 bg-white rounded-lg shadow-lg z-10'>
								<ul className='flex flex-col gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
									<li>
										<a
											href='/profile'
											className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
											aria-label='Profile'
										>
											Profile
										</a>
									</li>
									<li>
										<a
											href='/orders'
											className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
											aria-label='Orders'
										>
											Orders
										</a>
									</li>
									<li>
										<a
											href='/logout'
											className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
											aria-label='Logout'
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
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
				<div className='flex-1 flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-8 md:p-10'>
					<h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2'>
						{product.name}
					</h1>
					<div className='flex items-center gap-4 mb-2'>
						<span className='text-2xl font-bold text-blue-700'>
							{product.price}
						</span>
						<span className='flex items-center gap-1'>
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
							<span className='ml-2 text-gray-500 text-sm font-medium'>
								{product.rating} <span className='text-gray-400'>|</span>{" "}
								{product.reviews} reviews
							</span>
						</span>
					</div>
					<p className='text-gray-700 text-base leading-relaxed mb-2'>
						{product.description}
					</p>
					{/* Size selection */}
					<div>
						<label className='block text-gray-800 font-semibold mb-2'>
							Choose Size
						</label>
						<div className='flex gap-2 flex-wrap'>
							{product.sizes.map((size) => (
								<button
									key={size}
									type='button'
									className={`px-4 py-2 rounded-lg border font-semibold transition text-base
                                        ${
																					selectedSize === size
																						? "bg-blue-600 text-white border-blue-600 shadow"
																						: "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
																				}
                                    `}
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
						<label className='block text-gray-800 font-semibold mb-2'>
							Quantity
						</label>
						<div className='flex items-center gap-2'>
							<input
								type='number'
								min={1}
								max={10}
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								className='w-20 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base'
							/>
							<span className='text-gray-400 text-sm'>Max 10 per order</span>
						</div>
					</div>
					{/* Action button */}
					<div className='flex flex-col gap-2 mt-4'>
						<button
							onClick={handleAddToCart}
							className='bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition'
						>
							Add to Cart
						</button>
						{/* <button ...>Buy Now</button> removed as requested */}
						<div className='text-xs text-gray-500 mt-1'>
							<span className='font-medium text-green-600'>In stock</span> —
							Ships within 24 hours
						</div>
						<div className='flex gap-2 mt-2'>
							<span className='inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold'>
								Free shipping
							</span>
							<span className='inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-semibold'>
								Easy returns
							</span>
						</div>
					</div>
					{/* Social proof / urgency */}
					<div className='mt-4 flex items-center gap-2 text-sm text-gray-500'>
						<svg
							className='w-4 h-4 text-green-500'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<circle
								cx='10'
								cy='10'
								r='10'
							/>
						</svg>
						<span>12 people are viewing this right now</span>
					</div>
				</div>
			</div>

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
			{/* Our Promotions */}
			<section className='max-w-5xl mx-auto mt-16 px-4'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					Our Promotions
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
			{/* New Arrivals */}
			<section className='max-w-5xl mx-auto mt-16 px-4'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>New Arrivals</h2>
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