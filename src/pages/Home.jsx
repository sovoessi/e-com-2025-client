import React from "react";
import { Link } from "react-router-dom";

const featuredProducts = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: "$99",
		image:
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 2,
		name: "Smart Watch",
		price: "$149",
		image:
			"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 3,
		name: "Bluetooth Speaker",
		price: "$59",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
	},
];

const Home = () => (
	<main className='bg-gray-50 min-h-screen'>
		{/* Hero Section */}
		<section className='max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10'>
			<div className='flex-1'>
				<h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight'>
					Discover the Future of Shopping
				</h1>
				<p className='text-lg text-gray-600 mb-8'>
					Shop the latest electronics, gadgets, and more. Fast shipping. Secure
					checkout. Unbeatable prices.
				</p>
				<Link
					to='/shop'
					className='inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition'
				>
					Shop Now
				</Link>
			</div>
			<div className='flex-1 flex justify-center'>
				<img
					src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80'
					alt='E-Commerce Hero'
					className='rounded-lg shadow-lg w-full max-w-md'
					loading='lazy'
				/>
			</div>
		</section>

		{/* Featured Products */}
		<section className='max-w-7xl mx-auto px-4 py-12'>
			<h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
				Featured Products
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
				{featuredProducts.map((product) => (
					<div
						key={product.id}
						className='bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center'
					>
						<img
							src={product.image}
							alt={product.name}
							className='w-40 h-40 object-cover rounded mb-4'
							loading='lazy'
						/>
						<h3 className='text-lg font-semibold text-gray-800 mb-2'>
							{product.name}
						</h3>
						<span className='text-blue-600 font-bold text-xl mb-4'>
							{product.price}
						</span>
						<Link
							to={`/product/${product.id}`}
							className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
						>
							View Details
						</Link>
					</div>
				))}
			</div>
		</section>

		{/* Call to Action */}
		<section className='bg-blue-600 py-12 mt-16'>
			<div className='max-w-3xl mx-auto text-center'>
				<h2 className='text-3xl font-bold text-white mb-4'>
					Join Our Newsletter
				</h2>
				<p className='text-blue-100 mb-6'>
					Get exclusive offers, updates, and more. No spam, we promise!
				</p>
				<form className='flex flex-col sm:flex-row justify-center gap-4'>
					<input
						type='email'
						placeholder='Enter your email'
						className='px-4 py-2 rounded w-full sm:w-auto'
						required
					/>
					<button
						type='submit'
						className='px-6 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-blue-100 transition'
					>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	</main>
);

export default Home;
