import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
	<nav className='bg-white shadow sticky top-0 z-50'>
		<div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
			<Link
				to='/'
				className='text-2xl font-bold text-blue-600 tracking-tight'
			>
				E-Com 2025
			</Link>
			<div className='flex items-center gap-6'>
				<Link
					to='/'
					className='text-gray-700 hover:text-blue-600 transition'
				>
					Home
				</Link>
				<Link
					to='/shop'
					className='text-gray-700 hover:text-blue-600 transition'
				>
					Shop
				</Link>
				<Link
					to='/about'
					className='text-gray-700 hover:text-blue-600 transition'
				>
					About Us

				</Link>
				<Link
					to='/contact'
					className='text-gray-700 hover:text-blue-600 transition'
				>
					Contact Us
				</Link>
				<Link
					to='/login'
					className='ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
				>
					Login
				</Link>
			</div>
		</div>
	</nav>
);

export default Navbar;
