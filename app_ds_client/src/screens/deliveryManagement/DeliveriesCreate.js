import React, { useState, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Loading from "../../components/Loading";
import { createDeliveryAction } from "../../actions/deliveryManagementActions/deliveriesAction";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";

export default function DeliveriesCreate({ match, history }) {
	const orderID = useParams();

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const deliveryCreate = useSelector((state) => state.deliveryCreate);
	const { loading, error } = deliveryCreate;

	const [customerName] = useState(customerInfo.name);
	const [customerEmail] = useState(customerInfo.email);
	const [customerPhone] = useState(customerInfo.telephone);
	const [order] = useState(orderID.id);
	const customerId = useState(customerInfo._id);
	const str = customerId.toString();
	const customer = str.split(",").shift();

	const [deliveryServiceName, setDeliveryServiceName] = useState("");
	const [deliveryServiceEmail, setDeliveryServiceEmail] = useState("");
	const [deliveryServicePhone, setDeliveryServicePhone] = useState("");
	const [deliveryStatus, setDeliveryStatus] = useState("Processing");

	const formDelivery = useRef();
	const [isSend, setisSend] = useState(false);

	const resetHandler = () => {
		setDeliveryServiceName("");
		setDeliveryServicePhone("");
	};
	const submitHandler = (e) => {
		e.preventDefault();

		const sendingData = {
			order,
			customer,
			customerName,
			customerEmail,
			customerPhone,
			deliveryServiceName,
			deliveryServiceEmail,
			deliveryServicePhone,
			deliveryStatus,
		};
		console.log(sendingData);

		dispatch(
			createDeliveryAction(
				order,
				customer,
				customerName,
				customerEmail,
				customerPhone,
				deliveryServiceName,
				deliveryServiceEmail,
				deliveryServicePhone,
				deliveryStatus
			)
		);

		resetHandler();

		emailjs
			.sendForm("service_a0dl37h", "template_nolrmc6", formDelivery.current, "-l-yfdg2kBiYgzEht")
			.then((result) => {
				console.log(result.text);
				setisSend(true);
				setTimeout(() => {
					setisSend(false);
				}, 2500);
			})
			.catch((error) => {
				console.log(error.text);
			});
	};

	if (customerInfo) {
		return (
			<div className="DeliveriesBackgroundCreate">
				<MainScreen title={"Enter Your Delivery Preferences"}>
					<Button
						variant="success"
						style={{
							marginLeft: 10,
							marginBottom: 6,
							float: "left",
							fontSize: 15,
						}}
						size="lg"
						href={`/customer-deliveries/${customerInfo._id}`}
					>
						Back to the Deliveries List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "0%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<Card.Body>
							<br></br>

							<Form onSubmit={submitHandler} ref={formDelivery}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="">
									<Form.Label>Order Id</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="orderId"
										value={order}
										readOnly
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="Name">
									<Form.Label>Name</Form.Label>
									<Form.Control value={customerInfo.name} placeholder="Enter Your Name" readOnly />
								</Form.Group>
								<br></br>
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										value={customerInfo.email}
										placeholder="Enter  Your Email"
										name="useremail"
										readOnly
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="email">
									<Form.Label>Phone Number</Form.Label>
									<Form.Control
										type="email"
										value={customerInfo.telephone}
										placeholder="Enter  Your Phone Number"
										readOnly
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="deliveryServiceName">
									<Form.Label>Delivery Service Name</Form.Label>
									<select
										className="form-control"
										id="deleveryServiceName"
										value={deliveryServiceName}
										onChange={(e) => setDeliveryServiceName(e.target.value)}
										name="servicename"
										required
									>
										<option>Select Your Preffered Delivery Partner</option>
										<option value="DHL">DHL</option>
										<option value="Eco Air">Eco Air</option>
										<option value="Pick Me">Pick Me</option>
										<option value="Uber">Uber</option>
									</select>
								</Form.Group>
								<br></br>
								<Form.Group controlId="deliveryServiceEmail">
									<Form.Label> Delivery Service Email</Form.Label>
									<select
										className="form-control"
										id="deleveryServiceMail"
										value={deliveryServiceEmail}
										onChange={(e) => setDeliveryServiceEmail(e.target.value)}
										required
									>
										<option>Select Delivery Partner Mail</option>
										<option value="dhlshipping@co.lk">DHL - dhlshipping@co.lk</option>
										<option value="ecoshipping@co.lk">Eco Air - ecoshipping@co.lk</option>
										<option value="pickmedrops@pickme.com">Pick Me - pickmedrops@pickme.com</option>
										<option value="uberconnect@uberblog.com">Uber - uberconnect@uberblog.com</option>
									</select>
								</Form.Group>
								<br></br>
								<Form.Group controlId="deliveryServicePhone">
									<Form.Label> Delivery Service Phone</Form.Label>
									<select
										className="form-control"
										id="deleveryServiceTelephone"
										value={deliveryServicePhone}
										onChange={(e) => setDeliveryServicePhone(e.target.value)}
										name="servicemobile"
										required
									>
										<option>Select Delivery Partner Phone</option>
										<option value="0777896532">DHL - 0777896532</option>
										<option value="0118956556">Eco Air - 0118956556</option>
										<option value="0115896236">Pick Me - 0115896236</option>
										<option value="0775689565">Uber - 0775689565</option>
									</select>
								</Form.Group>
								<br></br>
								<Form.Group controlId="status">
									<Form.Label>Status</Form.Label>
									<select
										className="form-control"
										id="deleveryStatus"
										value={deliveryStatus}
										onChange={(e) => setDeliveryStatus(e.target.value)}
										required
									>
										<option value="Processing">Processing</option>
									</select>
								</Form.Group>

								<br></br>
								<br></br>

								{loading && <Loading size={50} />}

								<Button type="submit" variant="success">
									Submit
								</Button>

								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset
								</Button>
							</Form>
							<br></br>
						</Card.Body>
					</Card>
					<br></br>
					<br></br>
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
