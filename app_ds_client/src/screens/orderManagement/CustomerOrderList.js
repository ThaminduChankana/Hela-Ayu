import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { listCustomerOrders } from "../../actions/orderManagementActions/orderAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./orderLists.css";

export default function CustomerOrderList() {
	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const customerOrderList = useSelector((state) => state.customerOrderList);
	const { loading, customerOrders, error } = customerOrderList;

	const history = useHistory();
	useEffect(() => {
		dispatch(listCustomerOrders());
	}, [dispatch, history, customerInfo]);

	if (customerInfo) {
		return (
			<div className="orderCustomerList">
				<br></br>
				<MainScreen title="">
					<div
						style={{
							minHeight: 700,
							marginBottom: "100px",
						}}
					>
						<br></br>
						<h1 style={{ fontWeight: "400", fontSize: "50px" }}>ORDER LIST</h1>
						<br></br>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{loading && <Loading />}
						<Table style={{ background: "white", borderRadius: 10, width: "1000px" }}>
							<>
								<tbody>
									{customerOrders?.reverse().map((order) => (
										<tr
											key={order._id}
											style={{
												boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
												borderRadius: 10,
											}}
										>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{order.orderID}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{order.products}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{order.total}
											</td>
											<td>
												<Button
													href={`/payment/${order._id}`}
													style={{
														fontSize: 15,
														backgroundColor: "red",
														borderRadius: 0,
														border: "3px solid white",
													}}
													disabled={order.status === "pending" || order.status === "paid"}
												>
													{order.status}
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</>
						</Table>

						<br></br>
					</div>
				</MainScreen>
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
