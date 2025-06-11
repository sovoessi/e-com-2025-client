import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Cart = () => {
	const [cart, setCart] = useState(() => {
		const stored = localStorage.getItem("cart");
		return stored ? JSON.parse(stored) : [];
	});

	// Sync cart to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const handleQuantityChange = (id, size, qty) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === id && item.size === size
					? { ...item, quantity: Math.max(1, qty) }
					: item
			)
		);
	};

	const handleRemove = (id, size) => {
		setCart((prev) =>
			prev.filter((item) => !(item.id === id && item.size === size))
		);
	};

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	// Marketing: Free shipping threshold
	const freeShippingThreshold = 150;
	const shippingMsg =
		subtotal >= freeShippingThreshold
			? "You qualify for free shipping!"
			: `Add $${(freeShippingThreshold - subtotal).toFixed(
					2
			  )} for free shipping`;

	// Place order handler
	const handlePlaceOrder = () => {
		window.location.href = "/shop/place-order";
	};

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-3xl mx-auto px-4'>
				<h1 className='text-3xl font-extrabold mb-8 text-gray-900'>
					Your Cart
				</h1>
				{cart.length === 0 ? (
					<div className='bg-white rounded-xl shadow p-8 text-center'>
						<p className='text-gray-500 mb-4'>Your cart is empty.</p>
						<NavLink
							to='/shop'
							className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition'
						>
							Continue Shopping
						</NavLink>
					</div>
				) : (
					<div className='bg-white rounded-xl shadow-lg p-6'>
						<ul className='divide-y divide-gray-200'>
							{cart.map((item) => (
								<li
									key={item.id + item.size}
									className='flex flex-col sm:flex-row items-center gap-4 py-4'
								>
									<img
										src={item.images[0]}
										alt={item.name}
										className='w-24 h-24 object-cover rounded-lg border'
									/>
									<div className='flex-1 w-full'>
										<div className='flex flex-col sm:flex-row sm:items-center justify-between'>
											<div>
												<h2 className='font-bold text-lg text-gray-900'>
													{item.name}
												</h2>
												<div className='text-sm text-gray-500'>
													Size: {item.size}
												</div>
												<button
													onClick={() => handleRemove(item.id, item.size)}
													className='mt-2 text-xs text-red-500 hover:underline'
												>
													Remove
												</button>
											</div>
											<div className='flex items-center gap-2 mt-2 sm:mt-0'>
												<input
													type='number'
													min={1}
													value={item.quantity}
													onChange={(e) =>
														handleQuantityChange(
															item.id,
															item.size,
															Number(e.target.value)
														)
													}
													className='w-16 px-2 py-1 border rounded text-center'
												/>
												<span className='text-gray-700 font-semibold'>
													x ${item.price.toFixed(2)}
												</span>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
						<div className='mt-6 flex flex-col gap-2'>
							<div className='flex justify-between text-lg font-bold'>
								<span>Subtotal</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<div className='flex justify-between text-sm text-gray-500'>
								<span>Shipping</span>
								<span>
									{subtotal >= freeShippingThreshold ? (
										<span className='text-green-600 font-semibold'>Free</span>
									) : (
										"$9.99"
									)}
								</span>
							</div>
							<div className='text-xs text-blue-600 mt-1'>{shippingMsg}</div>
						</div>
						<div className='mt-8 flex flex-col gap-4'>
							<button
								onClick={handlePlaceOrder}
								className='w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition'
							>
								<svg
									className='w-6 h-6'
									fill='none'
									viewBox='0 0 24 24'
								>
									<rect
										x='2'
										y='6'
										width='20'
										height='12'
										rx='2'
										fill='#fff'
										stroke='#2563eb'
										strokeWidth='2'
									/>
									<path
										d='M7 12h10M7 16h6'
										stroke='#2563eb'
										strokeWidth='2'
										strokeLinecap='round'
									/>
								</svg>
								Proceed to Checkout
							</button>
						</div>
						<div className='mt-6 text-center text-xs text-gray-400'>
							<span>
								Secure checkout • 30-day easy returns • Trusted by 10,000+
								customers
							</span>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default Cart;
