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

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return { loading: true };
		case CREATE_ORDER_SUCCESS:
			return { loading: false, success: true };
		case CREATE_ORDER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const customerOrderListReducer = (state = { customerOrders: [] }, action) => {
	switch (action.type) {
		case MY_ORDERS_REQUEST:
			return { loading: true };
		case MY_ORDERS_SUCCESS:
			return { loading: false, customerOrders: action.payload };
		case MY_ORDERS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const adminOrderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, orders: action.payload };
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const orderUpdateStatusReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_ORDER_REQUEST:
			return { loading: true };
		case UPDATE_ORDER_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_ORDER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const customerOrderUpdateStatusReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_UPDATE_ORDER_REQUEST:
			return { loading: true };
		case CUSTOMER_UPDATE_ORDER_SUCCESS:
			return { loading: false, success: true };
		case CUSTOMER_UPDATE_ORDER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
