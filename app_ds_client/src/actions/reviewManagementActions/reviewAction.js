import {
	REVIEW_CUSTOMER_CREATE_REQUEST,
	REVIEW_CUSTOMER_CREATE_SUCCESS,
	REVIEW_CUSTOMER_CREATE_FAIL,
	REVIEW_CUSTOMER_LIST_REQUEST,
	REVIEW_CUSTOMER_LIST_SUCCESS,
	REVIEW_CUSTOMER_LIST_FAIL,
} from "../../constants/reviewManagementConstants/reviewConstants";
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";

// adding auth header for customer
export function authHeaderForCustomer() {
	let customer = JSON.parse(localStorage.getItem("customerInfo"));

	if (customer && customer.token) {
		return { Authorization: `Bearer ${customer.token}` };
	} else {
		return {};
	}
}

// create a review by customer action
export const ReviewCustomerCreateAction =
	(product, email, reviewName, reviewTittle, reviewDescription, rating) => async (dispatch, getState) => {
		try {
			dispatch({
				type: REVIEW_CUSTOMER_CREATE_REQUEST,
			});
			const {
				customer_Login: { customerInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${customerInfo.token}`,
				},
			};

			//call the backend route
			const { data } = await axios.post(
				`${API_ENDPOINT}/rate/review/customer/review/create`,
				{
					product,
					email,
					reviewName,
					reviewTittle,
					reviewDescription,
					rating,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "The Rating Successfully Submitted.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: REVIEW_CUSTOMER_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = "Review creation failed";
			dispatch({
				type: REVIEW_CUSTOMER_CREATE_FAIL,
				payload: message,
			});

			swal({
				title: "Error!",
				text: "Something is Wrong",
				type: "error",
			});
		}
	};

// get review customer list action
export const ReviewCustomerListAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: REVIEW_CUSTOMER_LIST_REQUEST,
		});

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/rate/review/product/get/${id}`);

		dispatch({
			type: REVIEW_CUSTOMER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: REVIEW_CUSTOMER_LIST_FAIL,
			payload: message,
		});
	}
};
