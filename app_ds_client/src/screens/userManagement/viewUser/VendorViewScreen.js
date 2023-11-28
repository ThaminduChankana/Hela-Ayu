import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { vendorLogout } from "../../../actions/userManagementActions/vendorActions";
import "./ViewScreen.css";

const VendorViewScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [homeAddress, setHomeAddress] = useState("");
	const [email, setEmail] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessAddress, setBusinessAddress] = useState("");
	const [website, setWebsite] = useState("");
	const [businessRegNumber, setBusinessRegNumber] = useState("");
	const [description, setDescription] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

	const vendor_Login = useSelector((state) => state.vendor_Login);
	const { vendorInfo } = vendor_Login;

	useEffect(() => {
		setName(vendorInfo.name);
		setTelephone(vendorInfo.telephone);
		setHomeAddress(vendorInfo.homeAddress);
		setEmail(vendorInfo.email);
		setPic(vendorInfo.pic);
		setBusinessName(vendorInfo.businessName);
		setBusinessAddress(vendorInfo.businessAddress);
		setWebsite(vendorInfo.website);
		setBusinessRegNumber(vendorInfo.businessRegNumber);
		setDescription(vendorInfo.description);
	}, [vendorInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(vendorLogout());
		history.push("/");
	};

	if (vendorInfo) {
		return (
			<div className="profileViewBg">
				<br></br>
				<MainScreen title="VIEW PROFILE - VENDOR">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/vendor"
					>
						{" "}
						Back to Dashboard
					</Button>
					<Button
						variant="danger"
						onClick={logoutHandler}
						style={{
							float: "right",
							marginTop: 5,
							fontSize: 15,
							marginRight: 10,
						}}
					>
						Logout
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<br></br>
						<div className="loginContainer">
							<Row className="VendorProfileContainer">
								<Col md={6}>
									<Form>
										<Form.Group controlId="vendorViewName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												readOnly
											></Form.Control>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicAddress">
											<Form.Label>Home Address</Form.Label>
											<Form.Control
												type="textArea"
												value={homeAddress}
												onChange={(e) => setHomeAddress(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
										</Form.Group>
									</Form>
									<br></br>
									<Form.Group controlId="vendorFormBasicBusinessAddress">
										<Form.Label>Business Name</Form.Label>
										<Form.Control
											type="text"
											value={businessName}
											onChange={(e) => setBusinessName(e.target.value)}
											readOnly
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicBusinessAddress">
										<Form.Label>Business Address</Form.Label>
										<Form.Control
											type="textArea"
											value={businessAddress}
											onChange={(e) => setBusinessAddress(e.target.value)}
											readOnly
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicWebsite">
										<Form.Label>Website</Form.Label>
										<Form.Control type="text" value={website} onChange={(e) => setWebsite(e.target.value)} readOnly />
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicBusinessRegNo">
										<Form.Label>Business Registration Number</Form.Label>
										<Form.Control
											type="text"
											value={businessRegNumber}
											onChange={(e) => setBusinessRegNumber(e.target.value)}
											readOnly
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicDescription">
										<Form.Label>Description</Form.Label>
										<textarea
											style={{
												width: "100%",
												fontSize: "16px",
												borderRadius: "5px",
											}}
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											readOnly
											rows={7}
										/>
									</Form.Group>
									<br></br>
									<br></br>
									<Button
										variant="primary"
										href="/vendor-edit"
										style={{
											fontSize: 15,
										}}
									>
										Edit profile
									</Button>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={pic}
										alt={name}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 250,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
						</div>
						<br></br>
					</Card>
					<br></br>
				</MainScreen>
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
};

export default VendorViewScreen;
