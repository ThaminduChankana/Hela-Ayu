import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { vendorLogout } from "../../../actions/userManagementActions/vendorActions";
import "./landingScreen.css";
import MainScreen from "../../../components/MainScreen";

const VendorLandingScreen = ({ history }) => {
	const vendor_Login = useSelector((state) => state.vendor_Login);
	const { vendorInfo } = vendor_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(vendorLogout());
		history.push("/");
	};
	if (vendorInfo) {
		return (
			<div className="vendorBackground">
				<MainScreen title={`Welcome Back ${vendorInfo && vendorInfo.name} ...`}>
					<Button
						variant="danger"
						onClick={logoutHandler}
						className="logoutBtn"
						style={{ float: "right", marginTop: 3, fontSize: 15 }}
					>
						Logout
					</Button>

					<br></br>
					<br></br>
					<br></br>
					<div className="loginContainer">
						<Card
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.8)",
								marginLeft: "10%",
								marginRight: "10%",
							}}
						>
							<div className="intro-text">
								<br></br>
								<br></br>
								<div>
									<a href="/vendor-view">
										<Button id="landingBtn" variant="success" size="lg" style={{ width: 350, height: 75 }}>
											My Account
										</Button>
									</a>
									&emsp;
									<a href="/vendor-products">
										<Button id="landingBtn" variant="success" size="lg" style={{ width: 350, height: 75 }}>
											View Products
										</Button>
									</a>
								</div>
							</div>
							<br></br>
							<br></br>
						</Card>
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
};

export default VendorLandingScreen;
