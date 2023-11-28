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
} from "../../constants/deliveryManagementConstants/deliveriesConstants";
import { API_ENDPOINT } from "../../config";
import axios from "axios";
import swal from "sweetalert";

//actions for create delivery
export const createDeliveryAction =
	(
		order,
		customer,
		customerName,
		customerEmail,
		customerPhone,
		deliveryServiceName,
		deliveryServiceEmail,
		deliveryServicePhone,
		status
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: CREATE_DELIVERY_REQUEST,
			});

			const {
				customer_Login: { customerInfo },
			} = getState();

			//call the backend route
			const { data } = await axios.post(`${API_ENDPOINT}/deliveries/delivery/create`, {
				order,
				customer,
				customerName,
				customerEmail,
				customerPhone,
				deliveryServiceName,
				deliveryServiceEmail,
				deliveryServicePhone,
				status,
			});

			dispatch({
				type: CREATE_DELIVERY_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Delivery is created",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = `/customer-deliveries/${customerInfo._id}`;
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: CREATE_DELIVERY_FAIL,
				payload: message,
			});
		}
	};

//  get delivery all customer list action
export const deliveriesListForCustomerAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELIVERY_LIST_FOR_CUSTOMER_REQUEST,
		});

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/deliveries/delivery/customer/all/${id}`);

		dispatch({
			type: DELIVERY_LIST_FOR_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: DELIVERY_LIST_FOR_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

// get delivery list for admin  action
export const deliveriesListForAdminAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELIVERY_LIST_FOR_ADMIN_REQUEST,
		});

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/deliveries/delivery/all`);

		dispatch({
			type: DELIVERY_LIST_FOR_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: DELIVERY_LIST_FOR_ADMIN_FAIL,
			payload: message,
		});
	}
};

// update delivery status action
export const updateDeliveryStatusAction = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_DELIVERY_REQUEST,
		});

		//call the backend route
		const { data } = await axios.put(`${API_ENDPOINT}/deliveries/delivery/get/${id}`, { status });

		dispatch({
			type: UPDATE_DELIVERY_SUCCESS,
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
			window.location.href = "/admin-deliveries";
		}, 2000);
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: UPDATE_DELIVERY_FAIL,
			payload: message,
		});
	}
};
