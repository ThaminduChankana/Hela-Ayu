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

export const cartProductListReducer = (state = { cartProducts: [] }, action) => {
	switch (action.type) {
		case PRODUCT_CART_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_CART_LIST_SUCCESS:
			return { loading: false, cartProducts: action.payload };
		case PRODUCT_CART_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const cartListReducer = (state = { carts: [] }, action) => {
	switch (action.type) {
		case CART_LIST_REQUEST:
			return { loading: true };
		case CART_LIST_SUCCESS:
			return { loading: false, carts: action.payload };
		case CART_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const cartCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CART_CREATE_REQUEST:
			return { loading: true };
		case CART_CREATE_SUCCESS:
			return { loading: false, success: true };
		case CART_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const cartUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case CART_UPDATE_REQUEST:
			return { loading: true };
		case CART_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case CART_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const cartDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CART_DELETE_REQUEST:
			return { loading: true };
		case CART_DELETE_SUCCESS:
			return { loading: false, success: true };
		case CART_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const allCartDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ALL_CART_DELETE_REQUEST:
			return { loading: true };
		case ALL_CART_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ALL_CART_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
