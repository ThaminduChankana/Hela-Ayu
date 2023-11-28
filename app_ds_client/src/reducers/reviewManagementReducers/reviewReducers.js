import {
	REVIEW_CUSTOMER_CREATE_REQUEST,
	REVIEW_CUSTOMER_CREATE_SUCCESS,
	REVIEW_CUSTOMER_CREATE_FAIL,
	REVIEW_CUSTOMER_LIST_REQUEST,
	REVIEW_CUSTOMER_LIST_SUCCESS,
	REVIEW_CUSTOMER_LIST_FAIL,
} from "../../constants/reviewManagementConstants/reviewConstants";

export const CustomerCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case REVIEW_CUSTOMER_CREATE_REQUEST:
			return { loading: true };
		case REVIEW_CUSTOMER_CREATE_SUCCESS:
			return { loading: false, success: true };
		case REVIEW_CUSTOMER_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const CustomerReviewListReducer = (state = { review: [] }, action) => {
	switch (action.type) {
		case REVIEW_CUSTOMER_LIST_REQUEST:
			return { loading: true };
		case REVIEW_CUSTOMER_LIST_SUCCESS:
			return { loading: false, UIReview: action.payload };
		case REVIEW_CUSTOMER_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
