import React, { useState } from "react";

const ContactUs = () => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Replace with real submission logic
		setSubmitted(true);
	};

	return (
		<main className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4'>
			<div className='max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
				<h1 className='text-3xl font-extrabold text-gray-900 mb-4 text-center'>
					Contact us
				</h1>
				<p className='text-gray-700 text-lg mb-6 text-center'>
					Have a question, feedback, or need help? Our team is here for you!
				</p>
				{submitted ? (
					<div className='text-green-600 text-center font-semibold py-8'>
						Thank you for reaching out! We’ll get back to you soon.
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className='space-y-5'
					>
						<div>
							<label
								className='block text-gray-700 text-sm font-medium mb-1'
								htmlFor='name'
							>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								required
								className='w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={form.name}
								onChange={handleChange}
								placeholder='Your name'
							/>
						</div>
						<div>
							<label
								className='block text-gray-700 text-sm font-medium mb-1'
								htmlFor='email'
							>
								Email
							</label>
							<input
								id='email'
								name='email'
								type='email'
								required
								className='w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={form.email}
								onChange={handleChange}
								placeholder='you@email.com'
							/>
						</div>
						<div>
							<label
								className='block text-gray-700 text-sm font-medium mb-1'
								htmlFor='message'
							>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								required
								rows={4}
								className='w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={form.message}
								onChange={handleChange}
								placeholder='How can we help you?'
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition text-lg'
						>
							Send Message
						</button>
					</form>
				)}
				<div className='mt-6 text-center text-sm text-gray-500'>
					Or email us directly at{" "}
					<a
						href='mailto:support@ecom2025.com'
						className='text-blue-600 hover:underline font-medium'
					>
						support@ecom2025.com
					</a>
				</div>
			</div>
		</main>
	);
};

export default ContactUs;
