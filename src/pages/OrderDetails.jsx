import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Mock order data (should be fetched in real app)
const orders = [
	{
		id: "ORD-1001",
		date: "2025-06-01",
		status: "Delivered",
		total: "$93",
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
		address: "123 Main St, Springfield, USA",
		items: [{ name: "Women's Summer Sandals", qty: 1, price: "$39" }],
	},
	{
		id: "ORD-1003",
		date: "2025-05-10",
		status: "Processing",
		total: "$19",
		address: "123 Main St, Springfield, USA",
		items: [{ name: "Kids' Fun Tote Bag", qty: 1, price: "$19" }],
	},
];

const statusColors = {
	Delivered: "bg-green-100 text-green-700",
	Shipped: "bg-blue-100 text-blue-700",
	Processing: "bg-yellow-100 text-yellow-700",
};

const OrderDetails = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	const order = orders.find((o) => o.id === orderId);

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
				<div className='bg-white rounded-lg shadow p-6'>
					<h1 className='text-2xl font-bold text-gray-900 mb-2'>
						Order {order.id}
					</h1>
					<div className='mb-4 flex flex-wrap gap-4 items-center'>
						<span className='text-gray-600 text-sm'>
							Placed on {order.date}
						</span>
						<span
							className={`px-3 py-1 rounded-full text-xs font-medium ${
								statusColors[order.status] || "bg-gray-100 text-gray-700"
							}`}
						>
							{order.status}
						</span>
					</div>
					<div className='mb-6'>
						<div className='font-semibold text-gray-800 mb-1'>
							Shipping Address
						</div>
						<div className='text-gray-600 text-sm'>{order.address}</div>
					</div>
					<div>
						<div className='font-semibold text-gray-800 mb-2'>Items</div>
						<div className='divide-y'>
							{order.items.map((item, idx) => (
								<div
									key={idx}
									className='flex justify-between py-2 text-sm'
								>
									<span>
										{item.name}{" "}
										<span className='text-gray-400'>x{item.qty}</span>
									</span>
									<span className='font-medium'>{item.price}</span>
								</div>
							))}
						</div>
					</div>
					<div className='flex justify-end mt-6'>
						<span className='text-lg font-bold text-blue-600'>
							Total: {order.total}
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};

export default OrderDetails;
