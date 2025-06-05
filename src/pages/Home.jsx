import React from "react";
import { Link } from "react-router-dom";

const featuredProducts = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: "$99",
		image:
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 2,
		name: "Smart Watch",
		price: "$149",
		image:
			"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 3,
		name: "Bluetooth Speaker",
		price: "$59",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
	},
];

const newArrivals = [
	{
		id: 4,
		name: "VR Headset",
		price: "$299",
		image:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 5,
		name: "Smart Home Hub",
		price: "$89",
		image:
			"https://images.unsplash.com/photo-1512446733611-9099a758e082?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 6,
		name: "Wireless Charger",
		price: "$39",
		image:
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
	},
];

const topDeals = [
	{
		id: 7,
		name: "Noise Cancelling Earbuds",
		price: "$79",
		image:
			"https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 8,
		name: "4K Action Camera",
		price: "$129",
		image:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 9,
		name: "Fitness Tracker",
		price: "$49",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
	},
];

const ProductSection = ({ title, products }) => (
	<section className='max-w-7xl mx-auto px-4 py-12'>
		<h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
			{title}
		</h2>
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
			{products.map((product) => (
				<div
					key={product.id}
					className='bg-white rounded-xl shadow hover:shadow-xl transition p-6 flex flex-col items-center'
				>
					<div className='w-full aspect-[16/7] mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100'>
						<img
							src={product.image}
							alt={product.name}
							className='w-full h-full object-cover object-center'
							loading='lazy'
						/>
					</div>
					<h3 className='text-lg font-semibold text-gray-800 mb-2 text-center w-full truncate'>
						{product.name}
					</h3>
					<span className='text-blue-600 font-bold text-xl mb-4'>
						{product.price}
					</span>
					<Link
						to={`/product/${product.id}`}
						className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center font-medium'
					>
						View Details
					</Link>
				</div>
			))}
		</div>
	</section>
);

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
					src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'
					alt='E-Commerce Hero'
					className='rounded-lg shadow-lg w-full max-w-md'
					loading='lazy'
				/>
			</div>
		</section>

		{/* Featured Products */}
		<ProductSection
			title='Featured Products'
			products={featuredProducts}
		/>

		{/* New Arrivals */}
		<ProductSection
			title='New Arrivals'
			products={newArrivals}
		/>

		{/* Top Deals */}
		<ProductSection
			title='Top Deals'
			products={topDeals}
		/>

		{/* Call to Action */}
		<section className='bg-blue-700 py-12 mt-16'>
			<div className='max-w-2xl mx-auto text-center px-4'>
				<h2 className='text-3xl font-extrabold text-white mb-3 leading-tight'>
					Join Our Newsletter
				</h2>
				<p className='text-blue-100 mb-8 text-base md:text-lg leading-relaxed'>
					Get exclusive offers, updates, and more.{" "}
					<span className='font-semibold text-white'>No spam</span>, we promise!
				</p>
				<form
					className='flex flex-col sm:flex-row justify-center gap-4'
					autoComplete='off'
				>
					<label
						htmlFor='newsletter-email'
						className='sr-only'
					>
						Email address
					</label>
					<input
						id='newsletter-email'
						type='email'
						placeholder='Enter your email'
						className='px-5 py-3 rounded-lg w-full sm:w-auto text-white placeholder-gray-400
						focus:outline-none focus:ring-2 focus:ring-blue-300'
						required
						aria-label='Email address'
					/>
					<button
						type='submit'
						className='px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-white'
					>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	</main>
);

export default Home;
