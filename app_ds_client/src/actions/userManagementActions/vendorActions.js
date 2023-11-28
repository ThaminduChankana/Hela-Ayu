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
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";

// vendor loggin action
export const vendorLogin = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: VENDOR_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		//call the backend route
		const { data } = await axios.post(`${API_ENDPOINT}/user/vendor/login`, { email, password, isAdmin: false }, config);

		dispatch({ type: VENDOR_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Vendor Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/vendor";
		}, 2000);
		localStorage.setItem("vendorInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: VENDOR_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
//creating authheader for vendor
export function authHeader() {
	let vendor = JSON.parse(localStorage.getItem("vendorInfo"));

	if (vendor && vendor.token) {
		return { Authorization: `Bearer ${vendor.token}` };
	} else {
		return {};
	}
}

//vendor log out action
export const vendorLogout = () => async (dispatch) => {
	localStorage.removeItem("vendorInfo");
	dispatch({ type: VENDOR_LOGOUT });
};

// register to system action
export const vendorRegister =
	(
		name,
		telephone,
		homeAddress,
		email,
		password,
		businessName,
		businessAddress,
		website,
		businessRegNumber,
		description,
		pic
	) =>
	async (dispatch) => {
		try {
			dispatch({ type: VENDOR_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			//call the backend route
			const { data } = await axios.post(
				`${API_ENDPOINT}/user/vendor/register`,
				{
					name,
					telephone,
					homeAddress,
					email,
					password,
					businessName,
					businessAddress,
					website,
					businessRegNumber,
					description,
					pic,
				},
				config
			);

			dispatch({ type: VENDOR_REGISTER_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Vendor Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/vendor-login";
			}, 2000);
		} catch (error) {
			dispatch({
				type: VENDOR_REGISTER_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			});
		}
	};

// vendors to view their profile action
export const vendorViewProfile = (vendor) => async (dispatch, getState) => {
	try {
		dispatch({ type: VENDOR_VIEW_REQUEST });

		const {
			vendor_Login: { vendorInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${vendorInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/user/vendor/view`, vendor, config);

		dispatch({ type: VENDOR_VIEW_SUCCESS, payload: data });

		dispatch({ type: VENDOR_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("vendorInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: VENDOR_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//vendor to update their profile action
export const vendorUpdateProfile = (vendor) => async (dispatch, getState) => {
	try {
		dispatch({ type: VENDOR_UPDATE_REQUEST });

		const {
			vendor_Login: { vendorInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${vendorInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.put(`${API_ENDPOINT}/user/vendor/edit`, vendor, config);

		dispatch({ type: VENDOR_UPDATE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Vendor Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/vendor-view";
		}, 2000);
		dispatch({ type: VENDOR_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("vendorInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: VENDOR_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// vendor to delete their profile action
export const vendorDeleteProfile = (vendor) => async (dispatch, getState) => {
	try {
		dispatch({ type: VENDOR_DELETE_REQUEST });

		const {
			vendor_Login: { vendorInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${vendorInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.delete(`${API_ENDPOINT}/user/vendor/delete`, config);

		dispatch({ type: VENDOR_DELETE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Vendor Account Delete Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		window.location.href = "/";

		dispatch({ type: VENDOR_LOGOUT });
		localStorage.removeItem("vendorInfo");
	} catch (error) {
		dispatch({
			type: VENDOR_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//get all of vendors list for  admin action
export const vendorsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: VENDOR_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/user/admin/vendors`, config);

		dispatch({
			type: VENDOR_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: VENDOR_LIST_FAIL,
			payload: message,
		});
	}
};

// view vendors profile by  admin action
export const vendorViewProfileById =
	(
		id,
		name,
		telephone,
		homeAddress,
		email,
		password,
		businessName,
		businessAddress,
		website,
		businessRegNumber,
		description,
		pic
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_VIEW_BY_ID_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			//call the backend route
			const { data } = await axios.get(
				`${API_ENDPOINT}/user/admin/vendor/profile/view/${id}`,
				{
					id,
					name,
					telephone,
					homeAddress,
					email,
					password,
					businessName,
					businessAddress,
					website,
					businessRegNumber,
					description,
					pic,
				},
				config
			);

			dispatch({
				type: VENDOR_VIEW_BY_ID_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: VENDOR_VIEW_BY_ID_FAIL,
				payload: message,
			});
		}
	};

// vendor to update their profile by admin action
export const vendorUpdateProfileById =
	(
		id,
		name,
		telephone,
		homeAddress,
		email,
		password,
		businessName,
		businessAddress,
		website,
		businessRegNumber,
		description,
		pic
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_UPDATE_BY_ID_REQUEST,
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

			//call the backend route
			const { data } = await axios.put(
				`${API_ENDPOINT}/user/admin/vendor/profile/edit/${id}`,
				{
					name,
					telephone,
					homeAddress,
					email,
					password,
					businessName,
					businessAddress,
					website,
					businessRegNumber,
					description,
					pic,
				},
				config
			);

			dispatch({
				type: VENDOR_UPDATE_BY_ID_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Vendor Account Update Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-vendors";
			}, 2000);
		} catch (error) {
			const message = "Vendor Update Failed !!!";
			dispatch({
				type: VENDOR_UPDATE_BY_ID_FAIL,
				payload: message,
			});
		}
	};

//vendor to delete their profilr by admin action
export const vendorDeleteProfileById = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VENDOR_DELETE_BY_ID_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.delete(`${API_ENDPOINT}/user/admin/vendor/profile/view/${id}`, config);

		dispatch({
			type: VENDOR_DELETE_BY_ID_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Vendor Delete Failed !!!";
		dispatch({
			type: VENDOR_DELETE_BY_ID_FAIL,
			payload: message,
		});
	}
};
