import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<nav className='bg-white shadow sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
				<Link
					to='/'
					className='text-2xl font-bold text-blue-600 tracking-tight'
				>
					E-Com 2025
				</Link>
				{/* Hamburger for mobile */}
				<button
					className='md:hidden flex items-center px-2 py-1 rounded hover:bg-blue-50 focus:outline-none'
					aria-label='Toggle navigation'
					onClick={() => setOpen((prev) => !prev)}
				>
					<svg
						className='w-7 h-7 text-blue-600'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						{open ? (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						) : (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						)}
					</svg>
				</button>
				{/* Desktop Menu */}
				<div className='hidden md:flex items-center gap-6'>
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
			{/* Mobile Menu */}
			{open && (
				<div className='md:hidden bg-white shadow px-4 pb-4'>
					<div className='flex flex-col gap-2'>
						<Link
							to='/'
							className='block py-2 text-gray-700 hover:text-blue-600 transition'
							onClick={() => setOpen(false)}
						>
							Home
						</Link>
						<Link
							to='/shop'
							className='block py-2 text-gray-700 hover:text-blue-600 transition'
							onClick={() => setOpen(false)}
						>
							Shop
						</Link>
						<Link
							to='/about'
							className='block py-2 text-gray-700 hover:text-blue-600 transition'
							onClick={() => setOpen(false)}
						>
							About Us
						</Link>
						<Link
							to='/contact'
							className='block py-2 text-gray-700 hover:text-blue-600 transition'
							onClick={() => setOpen(false)}
						>
							Contact Us
						</Link>
						<Link
							to='/login'
							className='block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
							onClick={() => setOpen(false)}
						>
							Login
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
