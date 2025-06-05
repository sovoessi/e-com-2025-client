import React, { useState } from "react";

const categories = [
	{ label: "All", value: "all" },
	{ label: "Clothing", value: "clothing" },
	{ label: "Mugs", value: "mugs" },
	{ label: "Tote Bags", value: "tote-bags" },
	{ label: "Sandals", value: "sandals" },
	{ label: "Accessories", value: "accessories" },
];

const genders = [
	{ label: "All", value: "all" },
	{ label: "Men", value: "men" },
	{ label: "Women", value: "women" },
	{ label: "Kids", value: "kids" },
];

const products = [
	{
		id: 1,
		name: "Men's Classic T-Shirt",
		price: "$29",
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
		category: "clothing",
		gender: "men",
	},
	{
		id: 2,
		name: "Women's Summer Sandals",
		price: "$39",
		image:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
		category: "sandals",
		gender: "women",
	},
	{
		id: 3,
		name: "Kids' Fun Tote Bag",
		price: "$19",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
		category: "tote-bags",
		gender: "kids",
	},
	{
		id: 4,
		name: "Ceramic Coffee Mug",
		price: "$15",
		image:
			"https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=400&q=80",
		category: "mugs",
		gender: "all",
	},
	{
		id: 5,
		name: "Women's Canvas Tote",
		price: "$25",
		image:
			"https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
		category: "tote-bags",
		gender: "women",
	},
	{
		id: 6,
		name: "Men's Leather Sandals",
		price: "$45",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		category: "sandals",
		gender: "men",
	},
	{
		id: 7,
		name: "Kids' Cartoon Mug",
		price: "$12",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		category: "mugs",
		gender: "kids",
	},
	{
		id: 8,
		name: "Unisex Baseball Cap",
		price: "$22",
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
		category: "accessories",
		gender: "all",
	},
];

const Shop = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedGender, setSelectedGender] = useState("all");

	const filteredProducts = products.filter((product) => {
		const matchCategory =
			selectedCategory === "all" || product.category === selectedCategory;
		const matchGender =
			selectedGender === "all" ||
			product.gender === selectedGender ||
			product.gender === "all";
		return matchCategory && matchGender;
	});

	return (
		<main className='bg-gray-50 min-h-screen py-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
					Shop
				</h1>
				{/* Filters */}
				<div className='flex flex-col md:flex-row gap-4 justify-between mb-10'>
					<div className='flex gap-2 flex-wrap'>
						{categories.map((cat) => (
							<button
								key={cat.value}
								className={`px-4 py-2 rounded-full border transition text-sm font-medium ${
									selectedCategory === cat.value
										? "bg-blue-600 text-white border-blue-600"
										: "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
								}`}
								onClick={() => setSelectedCategory(cat.value)}
								type='button'
							>
								{cat.label}
							</button>
						))}
					</div>
					<div className='flex gap-2 flex-wrap'>
						{genders.map((g) => (
							<button
								key={g.value}
								className={`px-4 py-2 rounded-full border transition text-sm font-medium ${
									selectedGender === g.value
										? "bg-blue-600 text-white border-blue-600"
										: "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
								}`}
								onClick={() => setSelectedGender(g.value)}
								type='button'
							>
								{g.label}
							</button>
						))}
					</div>
				</div>
				{/* Products Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{filteredProducts.length === 0 ? (
						<div className='col-span-full text-center text-gray-500 py-16'>
							No products found.
						</div>
					) : (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className='bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col items-center'
							>
								<img
									src={product.image}
									alt={product.name}
									className='w-36 h-36 object-cover rounded mb-4'
									loading='lazy'
								/>
								<h3 className='text-base font-semibold text-gray-800 mb-1 text-center'>
									{product.name}
								</h3>
								<span className='text-blue-600 font-bold text-lg mb-3'>
									{product.price}
								</span>
								<button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium'>
									Add to Cart
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</main>
	);
};

export default Shop;
