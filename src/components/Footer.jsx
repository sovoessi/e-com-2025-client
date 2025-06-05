import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
	<footer className='bg-white border-t mt-16'>
		<div className='max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
			<div className='text-gray-500 text-sm'>
				&copy; {new Date().getFullYear()} E-Com 2025. All rights reserved.
			</div>
			<div className='flex gap-6'>
				<Link
					to='/privacy'
					className='text-gray-500 hover:text-blue-600 text-sm transition'
				>
					Privacy Policy
				</Link>
				<Link
					to='/terms'
					className='text-gray-500 hover:text-blue-600 text-sm transition'
				>
					Terms of Service
				</Link>
				<a
					href='https://github.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-gray-500 hover:text-blue-600 text-sm transition'
				>
					GitHub
				</a>
			</div>
		</div>
	</footer>
);

export default Footer;
