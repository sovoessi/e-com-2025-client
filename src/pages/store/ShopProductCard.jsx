import React from 'react'

const ShopProductCard = ({product, addToCart}) => {
  return (
		<>
			<div className='w-full aspect-[4/3] mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-full object-cover object-center'
					loading='lazy'
				/>
			</div>
			<h3 className='text-base font-semibold text-gray-800 mb-1 text-center w-full truncate'>
				{product.name}
			</h3>
			<span className='text-blue-600 font-bold text-lg mb-1'>
				{product.price}
			</span>
			<span className='text-gray-500 text-xs mb-3'>
				{product.reviews ?? 0} reviews
			</span>
			<button
				className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium mt-auto'
				onClick={() => addToCart(product.id)}
				aria-label={`Add ${product.name} to cart`}
			>
				Add to Cart
			</button>
		</>
	);
}

export default ShopProductCard