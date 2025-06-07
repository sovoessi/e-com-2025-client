import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Demo data, replace with API call in production
const initialOrders = [
	{
		id: "ORD-1001",
		date: "2025-06-01",
		status: "Delivered",
		total: "$93",
		customer: "Jane Doe",
		address: "123 Main St, Springfield, USA",
		items: [
			{ name: "Men's Classic T-Shirt", qty: 1, price: "$29" },
			{ name: "Ceramic Coffee Mug", qty: 2, price: "$30" },
			{ name: "Unisex Baseball Cap", qty: 1, price: "$22" },
		],
	},
	{
		id: "ORD-1002",
		date: "2025-05-20",
		status: "Shipped",
		total: "$39",
		customer: "John Smith",
		address: "456 Oak Ave, Springfield, USA",
		items: [{ name: "Women's Summer Sandals", qty: 1, price: "$39" }],
	},
	{
		id: "ORD-1003",
		date: "2025-05-10",
		status: "Processing",
		total: "$19",
		customer: "Emily Clark",
		address: "789 Pine Rd, Springfield, USA",
		items: [{ name: "Kids' Fun Tote Bag", qty: 1, price: "$19" }],
	},
];

const statusColors = {
	Delivered: "bg-green-100 text-green-700",
	Shipped: "bg-blue-100 text-blue-700",
	Processing: "bg-yellow-100 text-yellow-700",
};

const statusOptions = ["Processing", "Shipped", "Delivered"];

const OrderDetailsAdmin = () => {
	const { id } = useParams(); // <-- match param name from route: /admin/store/orders/:id
	const navigate = useNavigate();
	const [orders, setOrders] = useState(initialOrders);

	const orderIndex = orders.findIndex((o) => o.id === id);
	const order = orders[orderIndex];

	const handleStatusChange = (e) => {
		const newStatus = e.target.value;
		const updatedOrders = [...orders];
		updatedOrders[orderIndex] = { ...order, status: newStatus };
		setOrders(updatedOrders);
		// In production, trigger API update here
	};

	if (!order) {
		return (
			<main className='bg-gray-50 min-h-screen py-10'>
				<div className='max-w-2xl mx-auto px-4 text-center'>
					<h1 className='text-2xl font-bold text-gray-900 mb-4'>
						Order Not Found
					</h1>
					<Link
						to='/admin/store/orders'
						className='text-blue-600 hover:underline'
					>
						Back to Orders
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-2xl mx-auto px-4'>
				<button
					onClick={() => navigate(-1)}
					className='mb-6 text-blue-600 hover:underline text-sm'
				>
					&larr; Back to Orders
				</button>
				<div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2'>
						<h1 className='text-2xl font-bold text-gray-900'>
							Order <span className='text-blue-600'>{order.id}</span>
						</h1>
						<div className='flex items-center gap-2'>
							<span
								className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${
									statusColors[order.status] || "bg-gray-100 text-gray-700"
								}`}
							>
								{order.status}
							</span>
							<select
								value={order.status}
								onChange={handleStatusChange}
								className='ml-2 border rounded px-2 py-1 text-xs'
								aria-label='Update order status'
							>
								{statusOptions.map((status) => (
									<option
										key={status}
										value={status}
									>
										{status}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className='mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
						<span className='text-gray-500 text-sm'>
							Placed on{" "}
							<span className='font-medium text-gray-700'>{order.date}</span>
						</span>
						<span className='text-lg font-bold text-blue-600'>
							Total: {order.total}
						</span>
					</div>
					<div className='mb-4'>
						<div className='font-semibold text-gray-800 mb-1'>
							Customer
						</div>
						<div className='text-gray-700 text-sm'>{order.customer}</div>
					</div>
					{order.address && (
						<div className='mb-6'>
							<div className='font-semibold text-gray-800 mb-1'>
								Shipping Address
							</div>
							<div className='text-gray-600 text-sm'>{order.address}</div>
						</div>
					)}
					<div>
						<div className='font-semibold text-gray-800 mb-3'>Items</div>
						<div className='divide-y border rounded-lg overflow-hidden'>
							{order.items.map((item, idx) => (
								<div
									key={idx}
									className='flex justify-between items-center py-3 px-4 bg-gray-50 even:bg-white'
								>
									<span className='flex-1 text-gray-800'>
										{item.name}
										<span className='ml-2 text-gray-400 font-normal'>
											x{item.qty}
										</span>
									</span>
									<span className='font-medium text-gray-700'>
										{item.price}
									</span>
								</div>
							))}
						</div>
					</div>
					<div className='mt-8 text-xs text-gray-400 text-center'>
						Need help?{" "}
						<a
							href='/contact'
							className='text-blue-600 hover:underline'
						>
							Contact support
						</a>
					</div>
				</div>
			</div>
		</main>
	);
};

export default OrderDetailsAdmin;
