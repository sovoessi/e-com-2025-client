import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const statusColors = {
	shipped: "bg-blue-100 text-blue-700",
	delivered: "bg-green-100 text-green-700",
	processing: "bg-yellow-100 text-yellow-700",
	cancelled: "bg-red-100 text-red-700",
	pending: "bg-gray-100 text-gray-700",
};

function parseShippingAddress(addressStr) {
	// Example: "Jane Doe, 123 Main St, New York, 10001, USA, 555-1234, jane@example.com"
	const [name, address, city, postal, country] = addressStr
		.split(",")
		.map((s) => s.trim());
	return { name, address, city, postal, country };
}

const OrderDetailsUser = () => {
	const { id } = useParams();
	const { fetchOrderById } = useAppContext();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadOrder = async () => {
			setLoading(true);
			const data = await fetchOrderById(id);
			setOrder(data);
			setLoading(false);
		};
		loadOrder();
	}, [id, fetchOrderById]);

	if (loading) {
		return (
			<main className='bg-gray-50 min-h-screen py-10 flex items-center justify-center'>
				<div className='text-gray-500'>Loading order details...</div>
			</main>
		);
	}

	if (!order) {
		return (
			<main className='bg-gray-50 min-h-screen py-10 flex items-center justify-center'>
				<div className='text-red-500'>Order not found.</div>
			</main>
		);
	}

	const shipping = parseShippingAddress(order.shippingAddress);

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-3xl mx-auto px-4'>
				<div className='mb-6 flex items-center gap-2 text-sm text-gray-500'>
					<Link
						to='/shop/orders'
						className='hover:underline text-blue-600'
					>
						My Orders
					</Link>
					<span>/</span>
					<span className='text-gray-700 font-semibold'>
						Order #{order._id}
					</span>
				</div>
				<h1 className='text-2xl font-extrabold mb-4 text-gray-900'>
					Order #{order._id}
				</h1>
				<div className='bg-white rounded-xl shadow p-6 mb-8'>
					<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4'>
						<div>
							<div className='text-gray-700 font-semibold mb-1'>
								Status:{" "}
								<span
									className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
										statusColors[order.status] || "bg-gray-100 text-gray-700"
									}`}
								>
									{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
								</span>
							</div>
							<div className='text-gray-500 text-sm'>
								Placed on {new Date(order.createdAt).toLocaleDateString()}
							</div>
						</div>
						<div className='text-gray-700 text-sm'>
							<span className='font-semibold'>Total:</span>{" "}
							<span className='text-blue-700 font-bold text-lg'>
								${order.totalAmount?.toFixed(2)}
							</span>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<h3 className='font-bold mb-2 text-gray-900'>Shipping Address</h3>
							<div className='text-gray-700 text-sm'>
								<div>{shipping.name}</div>
								<div>{shipping.address}</div>
								<div>
									{shipping.city}, {shipping.postal}
								</div>
								<div>{shipping.country}</div>
							</div>
						</div>
						<div>
							<h3 className='font-bold mb-2 text-gray-900'>Payment Method</h3>
							<div className='text-gray-700 text-sm'>
								{order.paymentMethod === "credit_card"
									? "Stripe"
									: order.paymentMethod.charAt(0).toUpperCase() +
									  order.paymentMethod.slice(1)}
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-xl shadow p-6'>
					<h3 className='font-bold mb-4 text-gray-900'>Order Items</h3>
					<ul className='divide-y divide-gray-200'>
						{order.products.map((item, idx) => (
							<li
								key={idx}
								className='flex items-center gap-4 py-4'
							>
								<img
									src={item.productId?.images?.[0] || "/placeholder.png"}
									alt={item.productId?.name || "Product"}
									className='w-16 h-16 object-cover rounded border'
								/>
								<div className='flex-1'>
									<div className='font-semibold text-gray-900'>
										{item.productId?.name || "Unknown Product"}
									</div>
									{item.size && (
										<div className='text-sm text-gray-500'>
											Size: {item.size}
										</div>
									)}
								</div>
								<div className='text-gray-700 text-sm'>
									Qty: <span className='font-semibold'>{item.quantity}</span>
								</div>
								<div className='text-blue-700 font-bold text-base ml-4'>
									$
									{item.productId?.price
										? (item.productId.price * item.quantity).toFixed(2)
										: "N/A"}
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className='mt-8 text-center text-xs text-gray-400'>
					Thank you for shopping with us! Need help?{" "}
					<a
						href='/contact'
						className='text-blue-600 hover:underline'
					>
						Contact support
					</a>
				</div>
			</div>
		</main>
	);
};

export default OrderDetailsUser;
