import React from "react";

const AboutUs = () => (
	<main className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4'>
		<div className='max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
			<h1 className='text-3xl font-extrabold text-gray-900 mb-4 text-center'>
				About E-Com 2025
			</h1>
			<p className='text-gray-700 text-lg mb-4 text-center'>
				Your trusted destination for the latest products, unbeatable deals, and
				a seamless shopping experience.
			</p>
			<div className='space-y-4 text-gray-600'>
				<p>
					<span className='font-semibold text-blue-600'>Our Mission:</span> To
					empower shoppers with choice, value, and convenience. We curate
					top-quality products and deliver them to your door with care.
				</p>
				<p>
					<span className='font-semibold text-blue-600'>Why Shop With Us?</span>
				</p>
				<ul className='list-disc ml-6 mt-2'>
					<li>Exclusive member-only offers and flash sales</li>
					<li>Fast, reliable shipping and easy returns</li>
					<li>Friendly customer support, always here for you</li>
					<li>Secure checkout and privacy-first policies</li>
				</ul>
				<p>
					Join thousands of happy customers who trust E-Com 2025 for their
					everyday needs. Thank you for being part of our journey!
				</p>
				
			</div>
		</div>
	</main>
);

export default AboutUs;
