import React from "react";
import StarRating from "../../components/StarRating";

const ShopProductCard = ({ product, addToCart }) => (
	<div className='flex flex-col items-center text-center h-full'>
		<div className='w-full aspect-[4/3] mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100'>
			<img
				src={product.image}
				alt={product.name}
				className='w-full h-full object-cover object-center'
				loading='lazy'
			/>
		</div>
		<h3 className='text-lg font-semibold mb-1'>{product.name}</h3>
		<div className='flex flex-col items-center justify-center mb-2'>
			<StarRating rating={product.rating || 0} />
			<span className='mt-1 text-xs text-gray-500'>
				({product.reviews} reviews)
			</span>
		</div>
		<div className='font-bold text-blue-700 mb-3'>{product.price}</div>
		<button
			onClick={() => addToCart(product.id)}
			className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
		>
			Add to Cart
		</button>
	</div>
);

export default ShopProductCard;
