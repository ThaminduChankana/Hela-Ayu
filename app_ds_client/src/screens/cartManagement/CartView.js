import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { listCart, updateCartAction, deleteCartAction } from "../../actions/cartManagementActions/cartAction";
import { createOrderAction } from "../../actions/orderManagementActions/orderAction";
import { API_ENDPOINT } from "../../config";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import { authHeader } from "../../actions/userManagementActions/customerActions";

export default function CartView() {
	const [total, setTotal] = useState(0);
	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const cartList = useSelector((state) => state.cartList);
	const { loading, carts, error } = cartList;

	const cartDelete = useSelector((state) => state.cartDelete);
	const { loading: loadingDelete, error: errorDelete } = cartDelete;

	const history = useHistory();

	function decreaseQuanity(id, quantity) {
		if (quantity > 1) dispatch(updateCartAction(id, quantity - 1));
	}

	function increaseQuanity(id, quantity) {
		dispatch(updateCartAction(id, quantity + 1));
	}

	const deleteHandler = (id) => {
		dispatch(deleteCartAction(id));
	};

	const checkout = () => {
		dispatch(createOrderAction(customerInfo._id, total));
	};

	useEffect(() => {
		const fetchingTotal = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/cart-items/cart/total/${customerInfo._id}`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setTotal(data.totalPrice);
		};

		fetchingTotal();
		localStorage.setItem("total", total);
		dispatch(listCart());
	}, [dispatch, history, customerInfo._id, total]);

	if (customerInfo) {
		return (
			<div
				style={{
					minHeight: 700,
					marginLeft: "20%",
					marginRight: "20%",
					marginBottom: "100px",
				}}
			>
				<br></br>
				<br></br>
				<h1 style={{ fontWeight: "400", fontSize: "50px" }}>Total Price : Rs {total}</h1>
				<br></br>
				<br></br>
				{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
				{loadingDelete && <Loading />}
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Table style={{ background: "white" }}>
					<>
						<tbody>
							{carts?.reverse().map((cart) => (
								<tr
									key={cart._id}
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
									}}
								>
									<td
										style={{
											fontSize: 20,
										}}
									>
										<img
											style={{
												height: "100px",
												width: "100px",
												borderColor: "black",
												borderWidth: "4px",
											}}
											src={cart.picURL}
											alt=""
										></img>
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{cart.productName}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{cart.productCode}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										Rs {cart.price}
									</td>

									<td
										style={{
											fontSize: 20,
										}}
									>
										<Button
											style={{
												fontSize: 15,
												backgroundColor: "black",
												borderRadius: 0,
												border: "3px solid white",
											}}
											onClick={() => decreaseQuanity(cart._id, cart.quantity)}
										>
											<i class="fa-solid fa-circle-minus"></i>
										</Button>
										&emsp;
										{cart.quantity}
										&emsp;
										<Button
											style={{
												fontSize: 15,
												backgroundColor: "black",
												borderRadius: 0,
												border: "3px solid white",
											}}
											onClick={() => increaseQuanity(cart._id, cart.quantity)}
										>
											<i class="fa-solid fa-circle-plus"></i>
										</Button>
									</td>
									<td>
										<Button
											style={{
												fontSize: 15,
												backgroundColor: "red",
												borderRadius: 0,
												border: "3px solid white",
											}}
											onClick={() => deleteHandler(cart._id)}
										>
											<i
												class="fa-solid fa-trash"
												onClick={() => deleteHandler(cart._id)}
												style={{ cursor: "pointer" }}
											></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</>
				</Table>

				<Button
					style={{
						paddingRight: "5px",
						paddingLeft: "5px",
						width: "130px",
						backgroundColor: "black",
						border: "3px solid white",
						fontSize: "18px",
						height: "50px",
						borderRadius: "0px",
						borderWidth: "5px white",
					}}
					onClick={() => checkout()}
				>
					Checkout
				</Button>

				<br></br>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}
