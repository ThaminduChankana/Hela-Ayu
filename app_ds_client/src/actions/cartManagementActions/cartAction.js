import {
	PRODUCT_CART_LIST_FAIL,
	PRODUCT_CART_LIST_REQUEST,
	PRODUCT_CART_LIST_SUCCESS,
	CART_LIST_FAIL,
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	CART_CREATE_FAIL,
	CART_CREATE_REQUEST,
	CART_CREATE_SUCCESS,
	CART_UPDATE_REQUEST,
	CART_UPDATE_SUCCESS,
	CART_UPDATE_FAIL,
	CART_DELETE_FAIL,
	CART_DELETE_REQUEST,
	CART_DELETE_SUCCESS,
	ALL_CART_DELETE_FAIL,
	ALL_CART_DELETE_REQUEST,
	ALL_CART_DELETE_SUCCESS,
} from "../../constants/cartManagementConstants/cartConstants";
import { API_ENDPOINT } from "../../config";
import axios from "axios";
import swal from "sweetalert";

// Action to get the all products for customer view
export const listCartProducts = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CART_LIST_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/items/products/`);

		dispatch({
			type: PRODUCT_CART_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: PRODUCT_CART_LIST_FAIL,
			payload: message,
		});
	}
};

// Action to display all the cart items of a particular customer
export const listCart = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_LIST_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/cart-items/cart/${customerInfo._id}`, config);

		dispatch({
			type: CART_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: CART_LIST_FAIL,
			payload: message,
		});
	}
};

// Action to add a product to the cart
export const createCartAction =
	(customer, productName, category, productCode, picURL, price, discountNote, discountPrice, quantity) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: CART_CREATE_REQUEST,
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
				`${API_ENDPOINT}/cart-items/cart/add`,
				{
					customer,
					productName,
					category,
					productCode,
					picURL,
					price,
					discountNote,
					discountPrice,
					quantity,
				},
				config
			);

			dispatch({
				type: CART_CREATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Product is added to cart.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/";
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: CART_CREATE_FAIL,
				payload: message,
			});
		}
	};

// Action to update the quantity of a cart item
export const updateCartAction = (id, quantity) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_UPDATE_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.put(`${API_ENDPOINT}/cart-items/cart/${id}`, { quantity }, config);

		dispatch({
			type: CART_UPDATE_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Quantity is updated",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/customer-cart";
		}, 2000);
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: CART_UPDATE_FAIL,
			payload: message,
		});
	}
};

// Action to delete one cart item
export const deleteCartAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_DELETE_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/cart-items/cart/${id}`, config);

		dispatch({
			type: CART_DELETE_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Item is removed",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/customer-cart";
		}, 2000);
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: CART_DELETE_FAIL,
			payload: message,
		});
	}
};

// Action to delete all cart items from the cart when checkout
export const deleteAllCartAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ALL_CART_DELETE_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/cart-items/cart/all/${id}`, config);

		dispatch({
			type: ALL_CART_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ALL_CART_DELETE_FAIL,
			payload: message,
		});
	}
};
