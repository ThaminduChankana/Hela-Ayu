import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	MY_ORDERS_REQUEST,
	MY_ORDERS_SUCCESS,
	MY_ORDERS_FAIL,
	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_FAIL,
	CUSTOMER_UPDATE_ORDER_REQUEST,
	CUSTOMER_UPDATE_ORDER_SUCCESS,
	CUSTOMER_UPDATE_ORDER_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from "../../constants/orderManagementConstants/orderConstant";
import { deleteAllCartAction } from "../cartManagementActions/cartAction";
import { API_ENDPOINT } from "../../config";
import axios from "axios";
import swal from "sweetalert";

// Action to create an order
export const createOrderAction = (customer, total) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.post(
			`${API_ENDPOINT}/orders/order/create`,
			{
				customer,
				total,
			},
			config
		);

		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Order is created",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/customer-orders";
			dispatch(deleteAllCartAction(customerInfo._id));
		}, 2000);
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: message,
		});
	}
};

// Action to get all orders of a particular customer
export const listCustomerOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: MY_ORDERS_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/orders/order/get-customer-orders/${customerInfo._id}`, config);

		dispatch({
			type: MY_ORDERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: MY_ORDERS_FAIL,
			payload: message,
		});
	}
};

// Action for the admin to get all the orders
export const adminCustomerOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/orders/order/get-admin-orders`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: message,
		});
	}
};

// Action for the admin to confirm the order
export const updateOrderStatusAction = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_ORDER_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};
		const { data } = await axios.put(`${API_ENDPOINT}/orders/order/order-admin/${id}`, { status }, config);

		dispatch({
			type: UPDATE_ORDER_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Orders status is updated",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/admin-orders";
		}, 2000);
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: UPDATE_ORDER_FAIL,
			payload: message,
		});
	}
};

// Action for updating the order status to paid when payment is done
export const customerUpdateOrderStatusAction = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CUSTOMER_UPDATE_ORDER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.put(`${API_ENDPOINT}/orders/order/order-customer-status/${id}`, { status }, config);

		dispatch({
			type: CUSTOMER_UPDATE_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: CUSTOMER_UPDATE_ORDER_FAIL,
			payload: message,
		});
	}
};
