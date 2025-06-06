import React from "react";
import { Link } from "react-router-dom";

const HomeProductCard = ({ product }) => {
	return (
		<>
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
				to={`/shop/products/${product.id}`}
				className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center font-medium'
			>
				View Details
			</Link>
		</>
	);
};

export default HomeProductCard;
