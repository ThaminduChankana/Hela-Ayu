import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatusAction } from "../../actions/orderManagementActions/orderAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

export default function AdminUpdateOrder({ match, history }) {
	const [status, setStatus] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const orderUpdateStatus = useSelector((state) => state.orderUpdateStatus);
	const { loading, error } = orderUpdateStatus;

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateOrderStatusAction(match.params.id, status));
	};
	if (adminInfo) {
		return (
			<div
				className="adminUpdate"
				style={{
					minHeight: 200,
				}}
			>
				<br></br>
				<br></br>
				<MainScreen title="">
					<br></br>
					<br></br>
					<br></br>
					<h1 style={{ fontWeight: "400", fontSize: "50px" }}>UPDATE ORDER STATUS</h1>
					<br></br>

					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-orders"
					>
						{" "}
						Back To Order List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<br></br>

					<Card
						style={{
							width: "60%",
							borderWidth: 0,
							outline: "none",
							marginLeft: 150,
							background: "black",
							borderRadius: 0,
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="reply">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
										}}
									>
										Status
									</Form.Label>
									<br></br>
									<br></br>

									<select
										style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#808080", borderWidth: 0.5 }}
										onChange={(e) => setStatus(e.target.value)}
									>
										<option value="pending">Pending</option>
										<option value="confirm">Confirm</option>
									</select>
								</Form.Group>

								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 15, marginTop: 10, borderRadius: "0px" }} type="submit" variant="primary">
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
