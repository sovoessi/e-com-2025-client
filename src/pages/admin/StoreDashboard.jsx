import React, { useState } from "react";
import { Link } from "react-router-dom";

const StoreDashboard = () => {
	const [selected, setSelected] = useState("overview");

	// Example admin messages (replace with API integration)
	const [messages] = useState([
		{
			id: 1,
			subject: "Promo Launch",
			content: "Spring sale starts next week!",
		},
		{
			id: 2,
			subject: "System Update",
			content: "Platform maintenance on June 10.",
		},
	]);

	// Suggestions for additional dashboard elements:
	// - Quick stats (orders, revenue, products, users)
	// - Product management shortcut
	// - Support tickets
	// - Announcements

	return (
		<div className='max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow flex flex-col md:flex-row min-h-[500px]'>
			{/* Sidebar */}
			<aside className='w-full md:w-1/4 border-b md:border-b-0 md:border-r bg-gray-50 rounded-t-lg md:rounded-l-lg md:rounded-tr-none'>
				<nav className='flex md:flex-col'>
					<button
						className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
							selected === "overview"
								? "bg-blue-50 font-semibold text-blue-700"
								: "text-gray-700"
						}`}
						onClick={() => setSelected("overview")}
					>
						Dashboard Overview
					</button>
					<button
						className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
							selected === "orders"
								? "bg-blue-50 font-semibold text-blue-700"
								: "text-gray-700"
						}`}
						onClick={() => setSelected("orders")}
					>
						Manage Orders
					</button>
					<button
						className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
							selected === "products"
								? "bg-blue-50 font-semibold text-blue-700"
								: "text-gray-700"
						}`}
						onClick={() => setSelected("products")}
					>
						Manage Products
					</button>
					<button
						className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
							selected === "password"
								? "bg-blue-50 font-semibold text-blue-700"
								: "text-gray-700"
						}`}
						onClick={() => setSelected("password")}
					>
						Change Password
					</button>
					<button
						className={`w-full text-left px-6 py-4 hover:bg-blue-100 transition ${
							selected === "messages"
								? "bg-blue-50 font-semibold text-blue-700"
								: "text-gray-700"
						}`}
						onClick={() => setSelected("messages")}
					>
						Messages to Clients
					</button>
				</nav>
			</aside>

			{/* Main Content */}
			<section className='flex-1 p-6'>
				{selected === "overview" && (
					<div>
						<h2 className='text-2xl font-bold mb-4'>Admin Store Dashboard</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
							{/* Example quick stats */}
							<div className='bg-blue-50 rounded-lg p-4'>
								<div className='text-sm text-gray-500'>Total Orders</div>
								<div className='text-2xl font-bold text-blue-700'>1,234</div>
							</div>
							<div className='bg-green-50 rounded-lg p-4'>
								<div className='text-sm text-gray-500'>Revenue (YTD)</div>
								<div className='text-2xl font-bold text-green-700'>$98,000</div>
							</div>
							<div className='bg-yellow-50 rounded-lg p-4'>
								<div className='text-sm text-gray-500'>Products</div>
								<div className='text-2xl font-bold text-yellow-700'>87</div>
							</div>
							<div className='bg-purple-50 rounded-lg p-4'>
								<div className='text-sm text-gray-500'>Customers</div>
								<div className='text-2xl font-bold text-purple-700'>542</div>
							</div>
						</div>
						<div className='space-x-4'>
							<Link
								to='/admin/store/orders'
								className='inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
							>
								Go to Orders
							</Link>
							<Link
								to='/admin/store/list-products'
								className='inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition'
							>
								Manage Products
							</Link>
						</div>
					</div>
				)}

				{selected === "orders" && (
					<div>
						<h2 className='text-2xl font-bold mb-4'>Manage Orders</h2>
						<Link
							to='/admin/store/orders'
							className='inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
						>
							View All Orders
						</Link>
					</div>
				)}

				{selected === "products" && (
					<div>
						<h2 className='text-2xl font-bold mb-4'>Manage Products</h2>
						<div className='space-x-4'>
							<Link
								to='/admin/store/list-products'
								className='inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition'
							>
								List Products
							</Link>
							<Link
								to='/admin/store/add-products'
								className='inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
							>
								Add New Product
							</Link>
						</div>
					</div>
				)}

				{selected === "password" && (
					<div>
						<h2 className='text-2xl font-bold mb-4'>Change Password</h2>
						<form className='max-w-sm space-y-4'>
							<div>
								<label className='block text-sm font-medium mb-1'>
									Current Password
								</label>
								<input
									type='password'
									className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
									autoComplete='current-password'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-1'>
									New Password
								</label>
								<input
									type='password'
									className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
									autoComplete='new-password'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-1'>
									Confirm New Password
								</label>
								<input
									type='password'
									className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
									autoComplete='new-password'
								/>
							</div>
							<button
								type='submit'
								className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
								disabled
								title='Feature coming soon'
							>
								Change Password
							</button>
						</form>
						<p className='text-xs text-gray-400 mt-2'>
							Password change feature coming soon.
						</p>
					</div>
				)}

				{selected === "messages" && (
					<div>
						<h2 className='text-2xl font-bold mb-4'>Messages to Clients</h2>
						<form className='mb-6 max-w-lg'>
							<div>
								<label className='block text-sm font-medium mb-1'>
									Subject
								</label>
								<input
									type='text'
									className='w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
									placeholder='Enter subject'
									disabled
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-1'>
									Message
								</label>
								<textarea
									className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
									rows={4}
									placeholder='Write your message to clients...'
									disabled
								/>
							</div>
							<button
								type='submit'
								className='mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
								disabled
								title='Feature coming soon'
							>
								Send Message
							</button>
						</form>
						<div>
							<h3 className='font-semibold mb-2'>Recent Messages</h3>
							<ul className='space-y-3'>
								{messages.length === 0 ? (
									<li className='text-gray-500'>No messages sent yet.</li>
								) : (
									messages.map((msg) => (
										<li
											key={msg.id}
											className='border rounded p-3 bg-gray-50'
										>
											<div className='font-semibold'>{msg.subject}</div>
											<div className='text-gray-700'>{msg.content}</div>
										</li>
									))
								)}
							</ul>
						</div>
					</div>
				)}
			</section>
		</div>
	);
};

export default StoreDashboard;