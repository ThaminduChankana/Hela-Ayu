import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	adminLoginReducer,
	adminRegisterReducer,
	adminViewReducer,
	adminUpdateReducer,
} from "./reducers/userManagementReducers/adminReducers";

import {
	customerLoginReducer,
	customerRegisterReducer,
	customerViewReducer,
	customerUpdateReducer,
	customerDeleteReducer,
	customerListReducer,
	customerViewByIdReducer,
	customerUpdateByIdReducer,
	customerDeleteByIdReducer,
} from "./reducers/userManagementReducers/customerReducers";

import { CustomerCreateReducer, CustomerReviewListReducer } from "./reducers/reviewManagementReducers/reviewReducers";

import {
	vendorLoginReducer,
	vendorRegisterReducer,
	vendorViewReducer,
	vendorUpdateReducer,
	vendorDeleteReducer,
	vendorListReducer,
	vendorViewByIdReducer,
	vendorUpdateByIdReducer,
	vendorDeleteByIdReducer,
} from "./reducers/userManagementReducers/vendorReducers";

import {
	vendorProductListReducer,
	adminProductListReducer,
	productCreateReducer,
	productUpdateByVendorReducer,
	productUpdateByAdminReducer,
	productDeleteByVendorReducer,
	productDeleteByAdminReducer,
} from "./reducers/productManagementReducers/productReducers";

import {
	cartProductListReducer,
	cartListReducer,
	cartCreateReducer,
	cartUpdateReducer,
	cartDeleteReducer,
	allCartDeleteReducer,
} from "./reducers/cartManagementReducers/cartReducer";

import {
	orderCreateReducer,
	customerOrderListReducer,
	adminOrderListReducer,
	orderUpdateStatusReducer,
	customerOrderUpdateStatusReducer,
} from "./reducers/orderManagementReducers/orderReducer";

import {
	deliveryListForCustomerReducer,
	deliveryListForAdminReducer,
	deliveryCreateReducer,
	deliveryUpdateReducer,
	deliveryGetByIdReducer,
	deliveryUpdateByIdReducer,
} from "./reducers/deliveryManagementReducers/deliveriesReducer";

const reducer = combineReducers({
	admin_Login: adminLoginReducer,
	adminRegistration: adminRegisterReducer,
	adminView: adminViewReducer,
	adminUpdate: adminUpdateReducer,
	customer_Login: customerLoginReducer,
	customerRegistration: customerRegisterReducer,
	customerView: customerViewReducer,
	customerUpdate: customerUpdateReducer,
	customerList: customerListReducer,
	customerDelete: customerDeleteReducer,
	customerViewById: customerViewByIdReducer,
	customerUpdateById: customerUpdateByIdReducer,
	customerDeleteById: customerDeleteByIdReducer,
	vendor_Login: vendorLoginReducer,
	vendorRegistration: vendorRegisterReducer,
	vendorView: vendorViewReducer,
	vendorUpdate: vendorUpdateReducer,
	vendorList: vendorListReducer,
	vendorDelete: vendorDeleteReducer,
	vendorViewById: vendorViewByIdReducer,
	vendorUpdateById: vendorUpdateByIdReducer,
	vendorDeleteById: vendorDeleteByIdReducer,

	adminProductList: adminProductListReducer,
	vendorProductList: vendorProductListReducer,
	productCreate: productCreateReducer,
	productUpdateByVendor: productUpdateByVendorReducer,
	productUpdateByAdmin: productUpdateByAdminReducer,
	productDeleteByVendor: productDeleteByVendorReducer,
	productDeleteByAdmin: productDeleteByAdminReducer,

	cartProductList: cartProductListReducer,
	cartList: cartListReducer,
	cartCreate: cartCreateReducer,
	cartUpdate: cartUpdateReducer,
	cartDelete: cartDeleteReducer,
	cartDeleteAll: allCartDeleteReducer,

	Review_Customer_Create: CustomerCreateReducer,
	Review_Cus_List: CustomerReviewListReducer,

	orderCreate: orderCreateReducer,
	customerOrderList: customerOrderListReducer,
	adminOrderList: adminOrderListReducer,
	orderUpdateStatus: orderUpdateStatusReducer,
	customerOrderStatus: customerOrderUpdateStatusReducer,

	customerDeliveryList: deliveryListForCustomerReducer,
	adminDeliveryList: deliveryListForAdminReducer,
	deliveryCreate: deliveryCreateReducer,
	deliveryUpdateStatus: deliveryUpdateReducer,
	deliveryViewById: deliveryGetByIdReducer,
	deliveryUpdateById: deliveryUpdateByIdReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null;

const customerInfoFromStorage = localStorage.getItem("customerInfo")
	? JSON.parse(localStorage.getItem("customerInfo"))
	: null;

const vendorInfoFromStorage = localStorage.getItem("vendorInfo")
	? JSON.parse(localStorage.getItem("vendorInfo"))
	: null;

const initialState = {
	admin_Login: { adminInfo: adminInfoFromStorage },
	customer_Login: { customerInfo: customerInfoFromStorage },
	vendor_Login: { vendorInfo: vendorInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
