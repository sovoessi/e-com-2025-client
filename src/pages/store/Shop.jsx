import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import ShopProductCard from "./ShopProductCard";

const categories = [
	{ label: "All", value: "all" },
	{ label: "Electronics", value: "electronics" },
	{ label: "Clothing", value: "clothing" },
	{ label: "Home", value: "home" },
	{ label: "books", value: "books" },
	{ label: "Toys", value: "toys" },
	{ label: "Sports", value: "sports" },
];

// "all","electronics", "clothing", "home", "books", "toys", "sports"

const genders = [
	{ label: "All", value: "all" },
	{ label: "Men", value: "men" },
	{ label: "Women", value: "women" },
	{ label: "Unisex", value: "unisex" },
	{ label: "Kids", value: "kids" },
];

function parsePrice(priceStr) {
	return Number(priceStr.replace(/[^0-9.]/g, ""));
}

const Shop = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedGender, setSelectedGender] = useState("all");
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("default");
	const [cart, setCart] = useState(() => new Map());
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);

	const [products, setProducts, user] = useState([]);

	const { navigate, fetchProducts, handleLogout } = useAppContext();

	useEffect(() => {
		// Fetch products from API or context
		const loadProducts = async () => {
			const fetchedProducts = await fetchProducts();
			setProducts(fetchedProducts);
		};
		loadProducts();
	}, [fetchProducts]);

	// Optional: Close dropdown when clicking outside
	const profileMenuRef = useRef(null);
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
	const addToCart = (productId) => {
		setCart((prevCart) => {
			const newCart = new Map(prevCart);
			newCart.set(productId, (newCart.get(productId) || 0) + 1);
			return newCart;
		});
	};

	const handleLogoutClick = () => {
		// Handle logout logic here
		console.log("User logged out");
		setProfileMenuOpen(false)
		handleLogout();
	};

	// Handle cart click (could open a modal or redirect to cart page)
	const handleCartClick = () => {
		// For now, just log the cart contents
		console.log("Cart contents:", Array.from(cart.entries()));
		// You can implement cart modal or redirect logic here
		navigate("/shop/cart");
	};

	// Total items in cart
	const cartCount = Array.from(cart.values()).reduce((a, b) => a + b, 0);

	const filteredProducts = products
		.filter((product) => {
			const matchCategory =
				selectedCategory === "all" || product.category === selectedCategory;
			const matchGender =
				selectedGender === "all" ||
				product.gender === selectedGender ||
				product.gender === "all";
			const matchSearch = product.name
				.toLowerCase()
				.includes(search.toLowerCase());
			return matchCategory && matchGender && matchSearch;
		})
		.sort((a, b) => {
			if (sortBy === "price-asc") {
				return parsePrice(a.price) - parsePrice(b.price);
			}
			if (sortBy === "price-desc") {
				return parsePrice(b.price) - parsePrice(a.price);
			}
			if (sortBy === "reviews-desc") {
				return (b.reviews || 0) - (a.reviews || 0);
			}
			if (sortBy === "reviews-asc") {
				return (a.reviews || 0) - (b.reviews || 0);
			}
			return 0;
		});

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-7xl mx-auto px-4'>
				{/* Top Bar with Icons and Search */}
				<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
					<h1 className='text-2xl font-bold text-gray-900 mb-2 md:mb-0'>
						Shop
					</h1>
					<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto md:justify-end'>
						<div className='relative flex-1 sm:w-64'>
							<span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
								{/* Search Icon */}
								<svg
									width='20'
									height='20'
									fill='none'
									viewBox='0 0 24 24'
								>
									<circle
										cx='11'
										cy='11'
										r='7'
										stroke='currentColor'
										strokeWidth='2'
									/>
									<path
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										d='M20 20l-3.5-3.5'
									/>
								</svg>
							</span>
							<input
								type='text'
								placeholder='Search products'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className='pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none'
								aria-label='Search products'
							/>
						</div>
						<div className='flex items-center gap-2 justify-end'>
							<button
								onClick={handleCartClick}
								type='button'
								className='relative p-2 rounded-full hover:bg-blue-50 transition'
								aria-label='Basket'
							>
								{/* Basket Icon */}
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
									<span
										className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-5 text-center'
										aria-label={`${cartCount} items in cart`}
									>
										{cartCount}
									</span>
								)}
							</button>
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
									onBlur={() =>
										setTimeout(() => setProfileMenuOpen(false), 100)
									}
								>
									{/* User Icon */}
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
									{/* Notification Badge */}
									<span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-5 text-center'>
										3
									</span>
								</button>
								{user ? (
								profileMenuOpen && (
									<div className='absolute right-0 top-full mt-2 min-w-full w-48 bg-white rounded-lg shadow-lg z-10'>
										<ul className='flex flex-col gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
											<li>
												<a
													href='/shop/profile'
													className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
													aria-label='Profile'
												>
													Profile
												</a>
											</li>
											<li>
												<a
													href='/shop/orders'
													className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
													aria-label='Orders'
												>
													Orders
												</a>
											</li>
											<li>
												<a
												onClick={handleLogoutClick}
													href='/shop'
													className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
													aria-label='Logout'
												>
													Logout
												</a>
											</li>
										</ul>
									</div>
								)) : (
									profileMenuOpen && (
									<div className='absolute right-0 top-full mt-2 min-w-full w-48 bg-white rounded-lg shadow-lg z-10'>
										<ul className='flex flex-col gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
											<li>
												<a
													href='/shop/login'
													className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
													aria-label='Login'
												>
													Login
												</a>
											</li>
											<li>
												<a
													href='/shop/register'
													className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-blue-50'
													aria-label='Register'
												>
													Register
												</a>
											</li>
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col lg:flex-row gap-10'>
					{/* Sidebar Filters */}
					<aside className='w-full lg:w-64 bg-white rounded-xl shadow p-6 mb-8 lg:mb-0 flex-shrink-0'>
						<div>
							<h2 className='text-lg font-semibold text-gray-800 mb-4'>
								Categories
							</h2>
							<ul className='space-y-2'>
								{categories.map((cat) => (
									<li key={cat.value}>
										<button
											className={`w-full text-left px-3 py-2 rounded-lg transition font-medium ${
												selectedCategory === cat.value
													? "bg-blue-600 text-white"
													: "text-gray-700 hover:bg-blue-50"
											}`}
											onClick={() => setSelectedCategory(cat.value)}
											type='button'
											aria-current={selectedCategory === cat.value}
										>
											{cat.label}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className='mt-8'>
							<h2 className='text-lg font-semibold text-gray-800 mb-4'>
								Gender
							</h2>
							<ul className='space-y-2'>
								{genders.map((g) => (
									<li key={g.value}>
										<button
											className={`w-full text-left px-3 py-2 rounded-lg transition font-medium ${
												selectedGender === g.value
													? "bg-blue-600 text-white"
													: "text-gray-700 hover:bg-blue-50"
											}`}
											onClick={() => setSelectedGender(g.value)}
											type='button'
											aria-current={selectedGender === g.value}
										>
											{g.label}
										</button>
									</li>
								))}
							</ul>
						</div>
					</aside>
					{/* Products Grid */}
					<section className='flex-1'>
						<div className='flex flex-col sm:flex-row items-center justify-between mb-6 gap-4'>
							<span className='text-gray-700 text-sm'>
								{filteredProducts.length} product
								{filteredProducts.length !== 1 ? "s" : ""}
							</span>
							<div className='flex items-center gap-2'>
								<label
									htmlFor='sort-by'
									className='text-gray-700 text-sm font-medium'
								>
									Sort by:
								</label>
								<select
									id='sort-by'
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className='rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white'
								>
									<option value='default'>Default</option>
									<option value='price-asc'>Price: Low to High</option>
									<option value='price-desc'>Price: High to Low</option>
									<option value='reviews-desc'>Reviews: Most to Least</option>
									<option value='reviews-asc'>Reviews: Least to Most</option>
								</select>
							</div>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
							{filteredProducts.length === 0 ? (
								<div className='col-span-full text-center text-gray-500 py-16'>
									No products found.
								</div>
							) : (
								filteredProducts.map((product) => (
									<div
										key={product.id}
										className='bg-white rounded-xl shadow hover:shadow-xl transition p-6 flex flex-col items-center'
									>
										<ShopProductCard
											product={product}
											addToCart={addToCart}
										/>
									</div>
								))
							)}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Shop;
