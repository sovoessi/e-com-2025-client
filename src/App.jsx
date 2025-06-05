import { useAppContext } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoreDashboard from "./pages/StoreDashboard";
import Shop from "./pages/Shop";
import AddProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const { user } = useAppContext();

	return (
		<>
			<ToastContainer />
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/shop'
					element={<Shop />}
				/>
				<Route
					path='/admin/store'
					element={user ? <StoreDashboard /> : <Login />}
				/>
				<Route
					path='/admin/register'
					element={<Register />}
				/>
				<Route
					path='/admin/store/add-product'
					element={<AddProduct />}
				/>
				<Route
					path='/admin/store/list-products'
					element={<ListProducts />}
				/>
				<Route
					path='/admin/store/edit-product/:id'
					element={<EditProduct />}
				/>
				<Route
					path='/admin/store/orders'
					element={<Orders />}
				/>
				<Route
					path='/admin/store/orders/:id'
					element={<OrderDetails />}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
