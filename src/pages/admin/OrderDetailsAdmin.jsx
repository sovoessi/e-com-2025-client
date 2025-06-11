import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const statusColors = {
	pending: "bg-gray-100 text-gray-700",
	cancelled: "bg-red-100 text-red-700",
	delivered: "bg-green-100 text-green-700",
	shipped: "bg-blue-100 text-blue-700",
	processing: "bg-yellow-100 text-yellow-700",
};

const statusOptions = ["Processing", "Shipped", "Delivered"];

const OrderDetailsAdmin = () => {
	const { id } = useParams(); // <-- match param name from route: /admin/store/orders/:id
	const [orders, setOrders] = useState([]);

	const { fetchOrdersAdmin, navigate } = useAppContext();

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
	}, []);

	const orderIndex = orders.findIndex((o) => o._id === id);
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
							Order <span className='text-blue-600'>{order._id}</span>
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
							<span className='font-medium text-gray-700'>
								{new Date(order.createdAt).toLocaleDateString()}
							</span>
						</span>
						<span className='text-lg font-bold text-blue-600'>
							Total: {order.totalAmount.toFixed(2)}
						</span>
					</div>
					<div className='mb-4'>
						<div className='font-semibold text-gray-800 mb-1'>Customer</div>
						<div className='text-gray-700 text-sm'>{order.userId.email}</div>
					</div>
					{order.shippingAddress && (
						<div className='mb-6'>
							<div className='font-semibold text-gray-800 mb-1'>
								Shipping Address
							</div>
							<div className='text-gray-600 text-sm'>{order.shippingAddress}</div>
						</div>
					)}
					<div>
						<div className='font-semibold text-gray-800 mb-3'>Items</div>
						<div className='divide-y border rounded-lg overflow-hidden'>
							{order.products.map((item, idx) => (
								<div
									key={idx}
									className='flex justify-between items-center py-3 px-4 bg-gray-50 even:bg-white'
								>
									<span className='flex-1 text-gray-800'>
										{item.productId?.name || "Unknown Product"}
										<span className='ml-2 text-gray-400 font-normal'>
											x{item.quantity}
										</span>
									</span>
									<span className='font-medium text-gray-700'>
										{item.productId?.price !== undefined
											? `$${item.productId.price.toFixed(2)}`
											: "N/A"}
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
