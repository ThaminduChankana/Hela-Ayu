import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import { vendorUpdateProfile, vendorDeleteProfile } from "../../../actions/userManagementActions/vendorActions";
import swal from "sweetalert";
import "./EditScreen.css";

const VendorEditScreen = () => {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [homeAddress, setHomeAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("");
	const [password, setPassword] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessAddress, setBusinessAddress] = useState("");
	const [website, setWebsite] = useState("");
	const [businessRegNumber, setBusinessRegNumber] = useState("");
	const [description, setDescription] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();

	const vendor_Login = useSelector((state) => state.vendor_Login);
	const { vendorInfo } = vendor_Login;

	const vendorUpdate = useSelector((state) => state.vendorUpdate);
	const { loading, error } = vendorUpdate;

	const vendorDelete = useSelector((state) => state.vendorDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = vendorDelete;

	useEffect(() => {
		setName(vendorInfo.name);
		setTelephone(vendorInfo.telephone);
		setHomeAddress(vendorInfo.homeAddress);
		setEmail(vendorInfo.email);
		setBusinessName(vendorInfo.businessName);
		setBusinessAddress(vendorInfo.businessAddress);
		setWebsite(vendorInfo.website);
		setBusinessRegNumber(vendorInfo.businessRegNumber);
		setDescription(vendorInfo.description);
		setPic(vendorInfo.pic);
	}, [vendorInfo, vendorDelete, successDelete, loadingDelete, errorDelete]);

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "vendorProfile");
			data.append("cloud_name", "dfmnpw0yp");
			fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			const vendorUpdatedInfo = {
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
			};
			dispatch(vendorUpdateProfile(vendorUpdatedInfo));
		}
	};

	const deleteHandler = (vendorInfo) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(vendorDeleteProfile(vendorInfo));

					swal({
						title: "Success!",
						text: "Deleted Account Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Account",
					type: "error",
				});
			});
	};

	if (vendorInfo) {
		return (
			<div className="editBg">
				<MainScreen title="EDIT - VENDOR">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/vendor"
					>
						{" "}
						Back to Dashboard
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
						<div className="loginContainer">
							<br></br>
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
							</div>
							<br></br>
							<Row className="VendorProfileContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="vendorViewName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
											></Form.Control>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicAddress">
											<Form.Label>Home Address</Form.Label>
											<Form.Control
												type="textArea"
												value={homeAddress}
												onChange={(e) => setHomeAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
										</Form.Group>
										<br></br>
										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												value={password}
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="confirmPassword">
											<Form.Label>Confirm Password</Form.Label>
											<Form.Control
												type="password"
												value={confirmpassword}
												placeholder="Confirm Password"
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicBusinessName">
											<Form.Label>Business Name</Form.Label>
											<Form.Control
												type="text"
												value={businessName}
												placeholder="Enter Business Name"
												onChange={(e) => setBusinessName(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicBusinessAddress">
											<Form.Label>Business Address</Form.Label>
											<Form.Control
												type="textArea"
												value={businessAddress}
												placeholder="Enter Business Address"
												onChange={(e) => setBusinessAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicWebsite">
											<Form.Label>Website</Form.Label>
											<Form.Control
												type="text"
												value={website}
												placeholder="Enter Website"
												onChange={(e) => setWebsite(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicBusinessRegNo">
											<Form.Label>Business Registration Number</Form.Label>
											<Form.Control
												type="text"
												value={businessRegNumber}
												placeholder="Enter Business Registration Number"
												onChange={(e) => setBusinessRegNumber(e.target.value)}
												required
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
												required
												rows={7}
											/>
										</Form.Group>
										<br></br>
										{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
										<Form.Group controlId="pic">
											<Form.Label>Profile Picture</Form.Label>
											&emsp;
											<input
												type="file"
												accept="image/*"
												id="vendor-pic"
												onChange={(e) => postDetails(e.target.files[0])}
											/>
										</Form.Group>
										<br></br>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Update
										</Button>
										&emsp;
										<Button
											variant="danger"
											onClick={deleteHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Delete
										</Button>
									</Form>
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
							<br></br>
						</div>
					</Card>
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
};

export default VendorEditScreen;
