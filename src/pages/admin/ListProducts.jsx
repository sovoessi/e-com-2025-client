import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const { fetchProducts, deleteProductById, loading, navigate } = useAppContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => navigate("/admin/store/add-product")}
          >
            Add Product
          </button>
          <Link
            to="/admin/store"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 border border-gray-300 transition"
            aria-label="Back to Dashboard"
          >
            Back to Dashboard
          </Link>
          </div>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Best Seller</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    {p.images && p.images[0] && (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">${p.price}</td>
                  <td className="p-2 border">{p.category}</td>
                  <td className="p-2 border">
                    {p.bestSeller ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    <Link
                      to={`/admin/store/edit-product/${p._id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListProducts;