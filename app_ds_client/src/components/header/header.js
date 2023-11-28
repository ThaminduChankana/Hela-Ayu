import React from "react";
import "./navbar.css";
import image1 from "./logo1.png";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header({ setSearch }) {
	const vendor_Login = useSelector((state) => state.vendor_Login);
	const { vendorInfo } = vendor_Login;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	return (
		<div className="Navbar">
			<div className="leftSide">
				<img style={{ height: "160px", width: "300px" }} src={image1} alt="" />
			</div>
			<div className="rightSide">
				<div className="links">
					<ButtonGroup className="mb-2" size="lg" style={{ width: "100%", marginTop: "2%" }}>
						<Button variant="" style={{ color: "#29C379", fontSize: "20px", marginLeft: "35px" }} href="/">
							HOME
						</Button>

						<Button variant="" style={{ color: "#29C379", fontSize: "20px", marginLeft: "35px" }} href="/aboutus">
							ABOUT US
						</Button>

						<Button variant="" style={{ color: "#29C379", fontSize: "20px", marginLeft: "35px" }} href="/">
							REVIEWS
						</Button>

						<Button variant="" style={{ color: "#29C379", fontSize: "20px", marginLeft: "35px" }} href="/contactus">
							CONTACT US
						</Button>
						{customerInfo ? (
							<Button
								variant=""
								style={{
									color: "#29C379",
									fontSize: "20px",
									marginLeft: "35px",
								}}
								href="/customer-cart"
							>
								CART
							</Button>
						) : (
							<></>
						)}
					</ButtonGroup>
				</div>

				{adminInfo || customerInfo || vendorInfo ? (
					<></>
				) : (
					<Link to="/login-select">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "75px",
								backgroundColor: "#29C379",
								borderBlockColor: "#4D5551",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Login
						</Button>
					</Link>
				)}
				{adminInfo ? (
					<Link to="/admin">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "150px",
								backgroundColor: "#29C379",
								borderBlockColor: "#4D5551",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Dashboard
						</Button>
					</Link>
				) : (
					<></>
				)}
				{customerInfo ? (
					<Link to="/customer">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "150px",
								backgroundColor: "#29C379",
								borderBlockColor: "#4D5551",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Dashboard
						</Button>
					</Link>
				) : (
					<></>
				)}
				{vendorInfo ? (
					<Link to="/vendor">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "150px",
								backgroundColor: "#29C379",
								borderBlockColor: "#4D5551",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Dashboard
						</Button>
					</Link>
				) : (
					<></>
				)}
			</div>
			<br />
		</div>
	);
}

export default Header;
