import {
	DELIVERY_LIST_FOR_CUSTOMER_REQUEST,
	DELIVERY_LIST_FOR_CUSTOMER_SUCCESS,
	DELIVERY_LIST_FOR_CUSTOMER_FAIL,
	DELIVERY_LIST_FOR_ADMIN_REQUEST,
	DELIVERY_LIST_FOR_ADMIN_SUCCESS,
	DELIVERY_LIST_FOR_ADMIN_FAIL,
	CREATE_DELIVERY_REQUEST,
	CREATE_DELIVERY_SUCCESS,
	CREATE_DELIVERY_FAIL,
	UPDATE_DELIVERY_REQUEST,
	UPDATE_DELIVERY_SUCCESS,
	UPDATE_DELIVERY_FAIL,
	DELIVERY_VIEW_BY_ID_REQUEST,
	DELIVERY_VIEW_BY_ID_SUCCESS,
	DELIVERY_VIEW_BY_ID_FAIL,
	DELIVERY_UPDATE_BY_ID_REQUEST,
	DELIVERY_UPDATE_BY_ID_SUCCESS,
	DELIVERY_UPDATE_BY_ID_FAIL,
} from "../../constants/deliveryManagementConstants/deliveriesConstants";

export const deliveryListForCustomerReducer = (state = { deliveries: [] }, action) => {
	switch (action.type) {
		case DELIVERY_LIST_FOR_CUSTOMER_REQUEST:
			return { loading: true };
		case DELIVERY_LIST_FOR_CUSTOMER_SUCCESS:
			return { loading: false, deliveries: action.payload };
		case DELIVERY_LIST_FOR_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deliveryListForAdminReducer = (state = { deliveries: [] }, action) => {
	switch (action.type) {
		case DELIVERY_LIST_FOR_ADMIN_REQUEST:
			return { loading: true };
		case DELIVERY_LIST_FOR_ADMIN_SUCCESS:
			return { loading: false, deliveries: action.payload };
		case DELIVERY_LIST_FOR_ADMIN_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deliveryCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_DELIVERY_REQUEST:
			return { loading: true };
		case CREATE_DELIVERY_SUCCESS:
			return { loading: false, success: true };
		case CREATE_DELIVERY_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deliveryUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_DELIVERY_REQUEST:
			return { loading: true };
		case UPDATE_DELIVERY_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_DELIVERY_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const deliveryGetByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case DELIVERY_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case DELIVERY_VIEW_BY_ID_SUCCESS:
			return { loading: false, success: true };
		case DELIVERY_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const deliveryUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case DELIVERY_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case DELIVERY_UPDATE_BY_ID_SUCCESS:
			return { loading: false, success: true };
		case DELIVERY_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
