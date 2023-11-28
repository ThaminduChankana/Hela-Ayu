import React from "react";
import "./footer.css";
import logo1 from "./logo1.png";
import { Row } from "react-bootstrap";

const Footer = () => {
	return (
		<div className="main-footer">
			<div className="container">
				<div className="row">
					{/* Column1 */}
					<div className="col">
						<img src={logo1} alt="" style={{ width: "60%", height: "90%" }} />
					</div>
					<div>
						<Row>
							{/* Column2 */}
							<div className="col" style={{ marginTop: "5%" }}>
								<h4>QUICK LINKS</h4>
								<li className="list-unstyled">
									<a href="/">Home</a>
									<br></br>
									<a href="/aboutus">About Us</a>
									<br></br>
									<a href="/">Products</a>
									<br></br>
								</li>
							</div>
							{/* Column3 */}
							<div className="col" style={{ marginTop: "5%" }}>
								<h4>POPULAR LINKS</h4>
								<li className="list-unstyled">
									<a href="/contactus">Contact Us</a>
									<br></br>
									<a href="/login-select">Sign Up</a>
									<br></br>
									<a href="/terms-and-conditions">Sign In</a>
									<br></br>
									<a href="/">Terms And Conditions</a>
								</li>
							</div>
							{/* Column4 */}
							<div className="col" style={{ marginTop: "5%" }}>
								<h4>CONTACT</h4>
								<ul className="list-unstyled">
									<li>ADDRESS : Hela Ayu Corporation, Galle Road, Colombo</li>
									<br></br>
									<li>PHONE : 077 7785441</li>
									<li>EMAIL : hela-ayu@gmail.com</li>
								</ul>
							</div>
						</Row>
					</div>
				</div>
				<hr />
				<div className="row">
					<p className="col-sm">
						&copy;{new Date().getFullYear()} site by DreamSeers | Hela Ayu | All rights reserved |
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
