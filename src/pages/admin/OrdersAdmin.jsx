import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";

const statusColors = {
	pending: "bg-gray-100 text-gray-700",
	cancelled: "bg-red-100 text-red-700",
	delivered: "bg-green-100 text-green-700",
	shipped: "bg-blue-100 text-blue-700",
	processing: "bg-yellow-100 text-yellow-700",
};

const OrdersAdmin = () => {
	const [orders, setOrders] = useState([]);
	const { fetchOrdersAdmin } = useAppContext();

	useEffect(() => {
		const loadOrders = async () => {
			const data = await fetchOrdersAdmin();
			if (!data || !Array.isArray(data)) {
				console.error("Invalid data format:", data);
				return;
			}
			setOrders(data);
		};
		loadOrders();
	}, [fetchOrdersAdmin]);

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
											{order._id}
										</td>
										<td className='px-4'>
											{new Date(order.createdAt).toLocaleDateString()}
										</td>
										<td className='px-4'>{order.userId.email}</td>
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
										<td className='px-4 font-semibold'>
											${order.totalAmount?.toFixed(2)}
										</td>
										<td className='px-4 text-xs text-gray-500 max-w-xs truncate'>
											{order.shippingAddress}
										</td>
										<td className='px-4'>
											<Link
												to={`/admin/store/orders/${order._id}`}
												className='text-blue-600 hover:underline font-medium text-sm'
												aria-label={`View details for order ${order._id}`}
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
