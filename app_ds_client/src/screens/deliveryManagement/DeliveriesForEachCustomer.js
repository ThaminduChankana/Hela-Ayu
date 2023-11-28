import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deliveriesListForCustomerAction } from "../../actions/deliveryManagementActions/deliveriesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./deliveryLists.css";

export default function CustomerDeliveryList({ match }) {
	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const customerDeliveryList = useSelector((state) => state.customerDeliveryList);
	const { loading, deliveries, error } = customerDeliveryList;

	console.log(deliveries);

	const history = useHistory();
	useEffect(() => {
		dispatch(deliveriesListForCustomerAction(match.params.id));
	}, [dispatch, history, customerInfo, match.params.id]);

	if (customerInfo) {
		return (
			<div className="deliveryCustomerList">
				<br></br>
				<MainScreen title={`Delivery List - Customer..`}>
					<div
						style={{
							minHeight: 700,
							marginBottom: "100px",
						}}
					>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{loading && <Loading />}
						<Table style={{ background: "white", marginTop: 50, borderRadius: 10 }}>
							<>
								<th>Order ID</th>
								<th>Customer Name</th>
								<th>Customer Email</th>
								<th>Customer Phone</th>
								<th>Delivery Service</th>
								<th>Order Status</th>
								<tbody>
									{deliveries?.reverse().map((delivery) => (
										<tr
											key={delivery._id}
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
												{delivery.orderId}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{delivery.customerName}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{delivery.customerEmail}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{delivery.customerPhone}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{delivery.deliveryServiceName}
											</td>

											<td>
												<Button
													style={{
														fontSize: 15,
														backgroundColor: "green",
														borderRadius: 0,
														border: "3px solid white",
													}}
													disabled={delivery.status === "pending"}
												>
													{delivery.status}
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
