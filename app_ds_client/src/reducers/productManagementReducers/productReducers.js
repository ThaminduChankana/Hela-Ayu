import {
	PRODUCTS_LIST_FOR_VENDOR_REQUEST,
	PRODUCTS_LIST_FOR_VENDOR_SUCCESS,
	PRODUCTS_LIST_FOR_VENDOR_FAIL,
	PRODUCTS_LIST_FOR_ADMIN_REQUEST,
	PRODUCTS_LIST_FOR_ADMIN_SUCCESS,
	PRODUCTS_LIST_FOR_ADMIN_FAIL,
	PRODUCTS_CREATE_REQUEST,
	PRODUCTS_CREATE_SUCCESS,
	PRODUCTS_CREATE_FAIL,
	PRODUCTS_UPDATE_BY_VENDOR_REQUEST,
	PRODUCTS_UPDATE_BY_VENDOR_SUCCESS,
	PRODUCTS_UPDATE_BY_VENDOR_FAIL,
	PRODUCTS_DELETE_BY_VENDOR_REQUEST,
	PRODUCTS_DELETE_BY_VENDOR_SUCCESS,
	PRODUCTS_DELETE_BY_VENDOR_FAIL,
	PRODUCTS_UPDATE_BY_ADMIN_REQUEST,
	PRODUCTS_UPDATE_BY_ADMIN_SUCCESS,
	PRODUCTS_UPDATE_BY_ADMIN_FAIL,
	PRODUCTS_DELETE_BY_ADMIN_REQUEST,
	PRODUCTS_DELETE_BY_ADMIN_SUCCESS,
	PRODUCTS_DELETE_BY_ADMIN_FAIL,
} from "../../constants/productManagementConstants/productConstants";

export const vendorProductListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCTS_LIST_FOR_VENDOR_REQUEST:
			return { loading: true };
		case PRODUCTS_LIST_FOR_VENDOR_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCTS_LIST_FOR_VENDOR_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const adminProductListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCTS_LIST_FOR_ADMIN_REQUEST:
			return { loading: true };
		case PRODUCTS_LIST_FOR_ADMIN_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCTS_LIST_FOR_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCTS_CREATE_REQUEST:
			return { loading: true };
		case PRODUCTS_CREATE_SUCCESS:
			return { loading: false, success: true };
		case PRODUCTS_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productUpdateByVendorReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCTS_UPDATE_BY_VENDOR_REQUEST:
			return { loading: true };
		case PRODUCTS_UPDATE_BY_VENDOR_SUCCESS:
			return { loading: false, success: true };
		case PRODUCTS_UPDATE_BY_VENDOR_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const productUpdateByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCTS_UPDATE_BY_ADMIN_REQUEST:
			return { loading: true };
		case PRODUCTS_UPDATE_BY_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case PRODUCTS_UPDATE_BY_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const productDeleteByVendorReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCTS_DELETE_BY_VENDOR_REQUEST:
			return { loading: true };
		case PRODUCTS_DELETE_BY_VENDOR_SUCCESS:
			return { loading: false, success: true };
		case PRODUCTS_DELETE_BY_VENDOR_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const productDeleteByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCTS_DELETE_BY_ADMIN_REQUEST:
			return { loading: true };
		case PRODUCTS_DELETE_BY_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case PRODUCTS_DELETE_BY_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
