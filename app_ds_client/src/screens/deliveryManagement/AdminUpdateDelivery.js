import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryStatusAction } from "../../actions/deliveryManagementActions/deliveriesAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

export default function AdminUpdateDelivery({ match, history }) {
	const [status, setStatus] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const deliveryUpdateStatus = useSelector((state) => state.deliveryUpdateStatus);
	const { loading, error } = deliveryUpdateStatus;

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateDeliveryStatusAction(match.params.id, status));
	};
	if (adminInfo) {
		return (
			<div
				className="adminUpdate"
				style={{
					background: "#088395",
				}}
			>
				<br></br>
				<br></br>
				<MainScreen title="">
					<br></br>
					<br></br>

					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-deliveries"
					>
						{" "}
						Back To Delivery List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "60%",
							bdeliveryWidth: 0,
							padding: 15,
							outline: "none",
							marginLeft: 300,
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="reply">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Status
									</Form.Label>
									<br></br>
									<br></br>

									<select
										style={{
											height: "35px",
											width: "100%",
											bdeliveryRadius: 5,
											bdeliveryColor: "#808080",
											bdeliveryWidth: 0.5,
										}}
										onChange={(e) => setStatus(e.target.value)}
									>
										<option value="Processing">Processing</option>
										<option value="Dispatched">Dispatched</option>
										<option value="Delivered">Delivered</option>
									</select>
								</Form.Group>

								{loading && <Loading size={50} />}
								<br></br>
								<Button style={{ fontSize: 15, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
							</Form>
						</Card.Body>
						<br></br>
					</Card>
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
