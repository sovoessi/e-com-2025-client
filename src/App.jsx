import { useAppContext } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoreDashboard from "./pages/admin/StoreDashboard";
import ProductPage from "./pages/store/ProductPage";
import Shop from "./pages/store/Shop";
import Cart from "./pages/store/Cart";
import AddProduct from "./pages/admin/AddProduct";
import ListProducts from "./pages/admin/ListProducts";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import PlaceOrder from "./pages/store/PlaceOrder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

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
					path='/contact'
					element={<ContactUs />}
				/>
				<Route
					path='/about'
					element={<AboutUs />}
				/>
				<Route
					path='/privacy-policy'
					element={<PrivacyPolicy />}
				/>
				<Route
					path='/terms'
					element={<Terms />}
				/>
				<Route
					path='/shop'
					element={<Shop />}
				/>
				<Route
					path='/shop/products/:productId'
					element={<ProductPage />}
				/>
				<Route
					path='/shop/cart'
					element={<Cart />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/shop/place-order'
					element={<PlaceOrder />}
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
