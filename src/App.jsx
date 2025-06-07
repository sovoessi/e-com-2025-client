import { useAppContext } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import StoreDashboard from "./pages/admin/StoreDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ListProducts from "./pages/admin/ListProducts";
import EditProduct from "./pages/admin/EditProduct";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import OrderDetailsAdmin from "./pages/admin/OrderDetailsAdmin";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";

import ProductPage from "./pages/store/ProductPage";
import Shop from "./pages/store/Shop";
import Cart from "./pages/store/Cart";
import OrdersUser from "./pages/store/OrdersUser";
import OrderDetailsUser from "./pages/store/OrderDetailsUser";
import Profile from "./pages/store/Profile";
import PlaceOrder from "./pages/store/PlaceOrder";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";



function App() {
	const { user, isAdmin } = useAppContext();

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
					path='/shop/login'
					element={<Login />}
				/>

				<Route
					path='/shop/register'
					element={<Register />}
				/>
				<Route
					path='/shop/place-order'
					element={<PlaceOrder />}
				/>
				<Route
					path='/shop/orders'
					element={<OrdersUser />}
				/>
				<Route
					path='/shop/orders/:id'
					element={<OrderDetailsUser />}
				/>
				<Route
				path="/shop/profile"
				element={user ? <Profile/>:<Login />}
				/>
				<Route
					path='/admin/store'
					element={isAdmin ? <StoreDashboard /> : <Login />}
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
					element={<OrdersAdmin />}
				/>
				<Route
					path='/admin/store/orders/:id'
					element={<OrderDetailsAdmin />}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
