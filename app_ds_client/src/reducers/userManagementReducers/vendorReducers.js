import {
	VENDOR_LOGIN_FAIL,
	VENDOR_LOGIN_REQUEST,
	VENDOR_LOGIN_SUCCESS,
	VENDOR_LOGOUT,
	VENDOR_REGISTER_FAIL,
	VENDOR_REGISTER_REQUEST,
	VENDOR_REGISTER_SUCCESS,
	VENDOR_VIEW_FAIL,
	VENDOR_VIEW_REQUEST,
	VENDOR_VIEW_SUCCESS,
	VENDOR_UPDATE_FAIL,
	VENDOR_UPDATE_REQUEST,
	VENDOR_UPDATE_SUCCESS,
	VENDOR_DELETE_FAIL,
	VENDOR_DELETE_REQUEST,
	VENDOR_DELETE_SUCCESS,
	VENDOR_LIST_FAIL,
	VENDOR_LIST_REQUEST,
	VENDOR_LIST_SUCCESS,
	VENDOR_VIEW_BY_ID_FAIL,
	VENDOR_VIEW_BY_ID_REQUEST,
	VENDOR_VIEW_BY_ID_SUCCESS,
	VENDOR_UPDATE_BY_ID_FAIL,
	VENDOR_UPDATE_BY_ID_REQUEST,
	VENDOR_UPDATE_BY_ID_SUCCESS,
	VENDOR_DELETE_BY_ID_FAIL,
	VENDOR_DELETE_BY_ID_REQUEST,
	VENDOR_DELETE_BY_ID_SUCCESS,
} from "../../constants/userManagementConstants/vendorConstants";

export const vendorLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_LOGIN_REQUEST:
			return { loading: true };
		case VENDOR_LOGIN_SUCCESS:
			return { loading: false, vendorInfo: action.payload };
		case VENDOR_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const vendorRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_REGISTER_REQUEST:
			return { loading: true };
		case VENDOR_REGISTER_SUCCESS:
			return { loading: false, vendorInfo: action.payload };
		case VENDOR_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const vendorViewReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_VIEW_REQUEST:
			return { loading: true };
		case VENDOR_VIEW_SUCCESS:
			return { loading: false, vendorInfo: action.payload };
		case VENDOR_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const vendorUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_UPDATE_REQUEST:
			return { loading: true };
		case VENDOR_UPDATE_SUCCESS:
			return { loading: false, vendorInfo: action.payload, success: true };
		case VENDOR_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const vendorDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_DELETE_REQUEST:
			return { loading: true };
		case VENDOR_DELETE_SUCCESS:
			return { loading: false, vendorInfo: action.payload, success: true };
		case VENDOR_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const vendorListReducer = (state = { vendors: [] }, action) => {
	switch (action.type) {
		case VENDOR_LIST_REQUEST:
			return { loading: true };
		case VENDOR_LIST_SUCCESS:
			return { loading: false, vendors: action.payload };
		case VENDOR_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const vendorViewByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case VENDOR_VIEW_BY_ID_SUCCESS:
			return { loading: false, vendorInfo: action.payload, success: true };
		case VENDOR_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const vendorUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case VENDOR_UPDATE_BY_ID_SUCCESS:
			return { loading: false, vendorInfo: action.payload, success: true };
		case VENDOR_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const vendorDeleteByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_DELETE_BY_ID_REQUEST:
			return { loading: true };
		case VENDOR_DELETE_BY_ID_SUCCESS:
			return { loading: false, vendorInfo: action.payload, success: true };
		case VENDOR_DELETE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
