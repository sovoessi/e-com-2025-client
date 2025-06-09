import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const categories = ["All", "electronics", "clothing", "home", "books", "toys", "sports"];
const genders = ["All", "men", "women", "unisex", "kids"];

const EditProduct = () => {
  const { id } = useParams();
  const { fetchProductById, updateProductById, loading, navigate } = useAppContext();
  const [form, setForm] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchProductById(id).then((product) => {
      if (product) {
        setForm({
          ...product,
          sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes,
        });
      }
    });
  }, [id]);

  if (!form) return <div className="text-center py-10">Loading...</div>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "sizes") {
        value.split(",").map((size) => data.append("sizes", size.trim()));
      } else if (key !== "images") {
        data.append(key, value);
      }
    });
    imageFiles.forEach((file) => data.append("images", file));
    const res = await updateProductById(id, data);
    if (res) navigate("/admin/store/list-products");
  };

  return (
		<div className='max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8'>
			<Link
				to='/admin/store'
				className='inline-block mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 border border-gray-300 transition'
				aria-label='Back to Dashboard'
			>
				Back to Dashboard
			</Link>
			<h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
			<form
				onSubmit={handleSubmit} 
				className='space-y-4'
				encType='multipart/form-data'
			>
				<input
					className='w-full border p-2 rounded'
					name='name'
					placeholder='Product Name'
					value={form.name}
					onChange={handleChange}
					required
				/>
				<textarea
					className='w-full border p-2 rounded'
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleChange}
					required
				/>
				<input
					className='w-full border p-2 rounded'
					name='price'
					type='number'
					min='0'
					placeholder='Price'
					value={form.price}
					onChange={handleChange}
					required
				/>
				<input
					className='w-full border p-2 rounded'
					name='sizes'
					placeholder='Sizes (comma separated)'
					value={form.sizes}
					onChange={handleChange}
					required
				/>
				<select
					className='w-full border p-2 rounded'
					name='category'
					value={form.category}
					onChange={handleChange}
				>
					{categories.map((cat) => (
						<option key={cat}>{cat}</option>
					))}
				</select>
				<select
					className='w-full border p-2 rounded'
					name='gender'
					value={form.gender}
					onChange={handleChange}
				>
					{genders.map((g) => (
						<option key={g}>{g}</option>
					))}
				</select>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='bestSeller'
						checked={form.bestSeller}
						onChange={handleChange}
					/>
					Best Seller
				</label>
				<div>
					<div className='mb-2 flex gap-2 flex-wrap'>
						{Array.isArray(form.images) &&
							form.images.map((img, idx) => (
								<img
									key={idx}
									src={img}
									alt='product'
									className='w-16 h-16 object-cover rounded border'
								/>
							))}
					</div>
					<input
						className='w-full border p-2 rounded'
						type='file'
						name='images'
						accept='image/*'
						multiple
						onChange={handleImageChange}
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
					disabled={loading}
				>
					{loading ? "Updating..." : "Update Product"}
				</button>
			</form>
		</div>
	);
};

export default EditProduct;