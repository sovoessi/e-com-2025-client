import React, { useState } from "react";
import { Link } from "react-router-dom";

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

const OrdersAdmin = () => {
	const [orders] = useState(initialOrders);

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-6xl mx-auto px-4'>
				<h1 className='text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight'>
					All Orders
				</h1>
				{orders.length === 0 ? (
					<div className='text-center text-gray-500 py-16'>
						No orders found.
					</div>
				) : (
					<div className='overflow-x-auto bg-white rounded-xl shadow-lg'>
						<table className='min-w-full text-left'>
							<thead>
								<tr className='text-gray-500 text-sm border-b'>
									<th className='py-3 px-4'>Order #</th>
									<th className='px-4'>Date</th>
									<th className='px-4'>Customer</th>
									<th className='px-4'>Status</th>
									<th className='px-4'>Total</th>
									<th className='px-4'>Address</th>
									<th className='px-4'></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr
										key={order.id}
										className='border-b last:border-0 hover:bg-blue-50 transition'
									>
										<td className='py-3 px-4 font-bold text-blue-700'>
											{order.id}
										</td>
										<td className='px-4'>{order.date}</td>
										<td className='px-4'>{order.customer}</td>
										<td className='px-4'>
											<span
												className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
													statusColors[order.status] ||
													"bg-gray-100 text-gray-700"
												}`}
											>
												{order.status}
											</span>
										</td>
										<td className='px-4 font-semibold'>{order.total}</td>
										<td className='px-4 text-xs text-gray-500 max-w-xs truncate'>
											{order.address}
										</td>
										<td className='px-4'>
											<Link
												to={`/admin/store/orders/${order.id}`}
												className='text-blue-600 hover:underline font-medium text-sm'
												aria-label={`View details for order ${order.id}`}
											>
												View Details
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='p-4 text-xs text-gray-400 text-center'>
							For customer support,{" "}
							<a
								href='/contact'
								className='text-blue-600 hover:underline'
							>
								contact us
							</a>
							.
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default OrdersAdmin;
