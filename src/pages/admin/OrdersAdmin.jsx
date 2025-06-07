import React from "react";
import { Link } from "react-router-dom";

const orders = [
	{
		id: "ORD-1001",
		date: "2025-06-01",
		status: "Delivered",
		total: "$93",
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
		items: [{ name: "Women's Summer Sandals", qty: 1, price: "$39" }],
	},
	{
		id: "ORD-1003",
		date: "2025-05-10",
		status: "Processing",
		total: "$19",
		items: [{ name: "Kids' Fun Tote Bag", qty: 1, price: "$19" }],
	},
];

const statusColors = {
	Delivered: "bg-green-100 text-green-700",
	Shipped: "bg-blue-100 text-blue-700",
	Processing: "bg-yellow-100 text-yellow-700",
};

const Orders = () => {
	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-4xl mx-auto px-4'>
				<h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
					My Orders
				</h1>
				{orders.length === 0 ? (
					<div className='text-center text-gray-500 py-16'>
						You have no orders yet.
					</div>
				) : (
					<div className='space-y-6'>
						{orders.map((order) => (
							<div
								key={order.id}
								className='bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
							>
								<div>
									<div className='flex items-center gap-2 mb-2'>
										<span className='font-semibold text-gray-800'>Order</span>
										<span className='text-gray-600'>{order.id}</span>
									</div>
									<div className='text-sm text-gray-500 mb-1'>
										Placed on {order.date}
									</div>
									<div
										className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
											statusColors[order.status] || "bg-gray-100 text-gray-700"
										}`}
									>
										{order.status}
									</div>
								</div>
								<div className='flex flex-col md:items-end'>
									<div className='text-lg font-bold text-blue-600 mb-2'>
										{order.total}
									</div>
									<Link
										to={`/admin/store/orders/${order.id}`}
										className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium text-center'
									>
										View Details
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</main>
	);
};

export default Orders;
