import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AdminRegisterScreen from "./screens/userManagement/registerUser/AdminRegisterScreen";
import CustomerRegisterScreen from "./screens/userManagement/registerUser/CustomerRegisterScreen";
import AdminLogin from "./screens/userManagement/login/AdminLoginScreen";
import CustomerLogin from "./screens/userManagement/login/CustomerLoginScreen";
import VendorLogin from "./screens/userManagement/login/VendorLoginScreen";
import VendorRegisterScreen from "./screens/userManagement/registerUser/VendorRegisterScreen";
import AdminViewScreen from "./screens/userManagement/viewUser/AdminViewScreen";
import CustomerViewScreen from "./screens/userManagement/viewUser/CustomerViewScreen";
import VendorViewScreen from "./screens/userManagement/viewUser/VendorViewScreen";
import AdminEditScreen from "./screens/userManagement/editUser/AdminEditScreen";
import CustomerEditScreen from "./screens/userManagement/editUser/CustomerEditScreen";
import VendorEditScreen from "./screens/userManagement/editUser/VendorEditScreen";
import CustomerListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/CustomerListForAdminScreen";
import VendorListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/VendorListForAdminScreen";
import CustomerEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/CustomerEditByAdminScreen";
import VendorEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/VendorEditByAdminScreen";
import ProductsListForVendorScreen from "./screens/productManagement/vendorProductManagement/productsListForVendor/ProductsListForVendorScreen";
import ProductsListForAdminScreen from "./screens/productManagement/adminProductManagement/productsListForAdmin/ProductsListForAdminScreen";
import AddProductByVendorScreen from "./screens/productManagement/vendorProductManagement/addProduct/AddProductByVendorScreen";
import SingleProductForVendorScreen from "./screens/productManagement/vendorProductManagement/getSingleProductForVendor/SingleProductForVendorScreen";
import SingleProductForAdminScreen from "./screens/productManagement/adminProductManagement/getSingleProductForAdmin/SingleProductForAdminScreen";
import LoginSelectorScreen from "./screens/static/loginSelect/LoginSelectorScreen";
import AdminLandingScreen from "./screens/static/landingPages/AdminLandingScreen";
import CustomerLandingScreen from "./screens/static/landingPages/CustomerLandingScreen";
import VendorLandingScreen from "./screens/static/landingPages/VendorLandingScreen";
import CustomerProductView from "./screens/cartManagement/CustomerProductView";
import SingleProduct from "./screens/cartManagement/SingleProduct";
import CartView from "./screens/cartManagement/CartView";
import ReviewCustomerCreate from "./screens/reviewManagement/ReviewByCustomer/ReviewCustomerCreate";
import ReviewList from "./screens/reviewManagement/ReviewByCustomer/ReviewListForProduct";
import CustomerOrderList from "./screens/orderManagement/CustomerOrderList";
import AdminOrderList from "./screens/orderManagement/AdminOrderList";
import AdminUpdateOrder from "./screens/orderManagement/AdminUpdateOrder";
import StripeContainer from "./screens/CardPayment/StripeContainer";
import DeliveriesCreate from "./screens/deliveryManagement/DeliveriesCreate";
import AdminDeliveryList from "./screens/deliveryManagement/DeliveryListForAdmin";
import AdminUpdateDelivery from "./screens/deliveryManagement/AdminUpdateDelivery";
import CustomerDeliveryList from "./screens/deliveryManagement/DeliveriesForEachCustomer";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Route path="/login-select" component={LoginSelectorScreen} exact />
				<Route path="/admin-login" component={AdminLogin} />
				<Route path="/customer-login" component={CustomerLogin} />
				<Route path="/vendor-login" component={VendorLogin} />
				<Route path="/admin-register" component={AdminRegisterScreen} exact />
				<Route path="/customer-register" component={CustomerRegisterScreen} exact />
				<Route path="/vendor-register" component={VendorRegisterScreen} exact />
				<Route path="/admin-view" component={AdminViewScreen} exact />
				<Route path="/customer-view" component={CustomerViewScreen} exact />
				<Route path="/vendor-view" component={VendorViewScreen} exact />
				<Route path="/admin-edit" component={AdminEditScreen} exact />
				<Route path="/customer-edit" component={CustomerEditScreen} exact />
				<Route path="/vendor-edit" component={VendorEditScreen} exact />
				<Route path="/admin-customers" component={CustomerListForAdminScreen} exact />
				<Route path="/admin-vendors" component={VendorListForAdminScreen} exact />
				<Route path="/admin-customer-edit/:id" component={CustomerEditByAdminScreen} exact />
				<Route path="/admin-vendor-edit/:id" component={VendorEditByAdminScreen} exact />
				<Route path="/admin" component={AdminLandingScreen} exact />
				<Route path="/customer" component={CustomerLandingScreen} exact />
				<Route path="/vendor" component={VendorLandingScreen} exact />
				<Route path="/vendor-products" component={ProductsListForVendorScreen} exact />
				<Route path="/admin-products" component={ProductsListForAdminScreen} exact />
				<Route path="/vendor-product-add" component={AddProductByVendorScreen} exact />
				<Route path="/vendor-product-edit/:id" component={SingleProductForVendorScreen} exact />
				<Route path="/admin-product-edit/:id" component={SingleProductForAdminScreen} exact />
				<Route path="/login-selector" component={LoginSelectorScreen} exact />
				<Route path="/" component={CustomerProductView} exact />
				<Route path="/single-product-view/:id" component={SingleProduct} exact />
				<Route path="/customer-cart" component={CartView} exact />
				<Route path="/customer-review-create/:id" component={ReviewCustomerCreate} exact />
				<Route path="/product-review-list/:id" component={ReviewList} exact />
				<Route path="/customer-orders" component={CustomerOrderList} exact />
				<Route path="/customer-deliveries/:id" component={CustomerDeliveryList} exact />
				<Route path="/admin-orders" component={AdminOrderList} exact />
				<Route path="/admin-deliveries" component={AdminDeliveryList} exact />
				<Route path="/update-order/:id" component={AdminUpdateOrder} exact />
				<Route path="/update-delivery/:id" component={AdminUpdateDelivery} exact />
				<Route path="/payment/:id" component={StripeContainer} exact />
				<Route path="/delivery-create/:id" component={DeliveriesCreate} exact />
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
