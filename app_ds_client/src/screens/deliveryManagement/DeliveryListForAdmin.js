import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deliveriesListForAdminAction } from "../../actions/deliveryManagementActions/deliveriesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./deliveryLists.css";

export default function AdminDeliveryList() {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const adminDeliveryList = useSelector((state) => state.adminDeliveryList);
	const { loading, deliveries, error } = adminDeliveryList;

	console.log(deliveries);

	const history = useHistory();
	useEffect(() => {
		dispatch(deliveriesListForAdminAction());
	}, [dispatch, history, adminInfo]);

	if (adminInfo) {
		return (
			<div className="deliveryAdminList">
				<br></br>
				<MainScreen title={`Delivery List - Admin ..`}>
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
													href={`/update-delivery/${delivery._id}`}
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
