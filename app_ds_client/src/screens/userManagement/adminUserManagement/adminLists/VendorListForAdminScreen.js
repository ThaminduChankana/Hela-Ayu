import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vendorDeleteProfileById, vendorsList } from "../../../../actions/userManagementActions/vendorActions";
import Loading from "../../../../components/Loading";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import ErrorMessage from "../../../../components/ErrorMessage";
import swal from "sweetalert";
import "./userLists.css";

const VendorListForAdminScreen = () => {
	const dispatch = useDispatch();

	const vendorList = useSelector((state) => state.vendorList);
	const { loading, vendors, error } = vendorList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const vendorUpdate = useSelector((state) => state.vendorUpdate);
	const { success: successUpdate } = vendorUpdate;

	const vendorDeleteById = useSelector((state) => state.vendorDeleteById);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = vendorDeleteById;

	const history = useHistory();

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(vendorsList());
		if (!adminInfo) {
			history.push("/access-denied", { replace: true });
		}
	}, [dispatch, history, adminInfo, vendorDeleteById, successDelete, successUpdate]);

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(vendorDeleteProfileById(id));
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

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	if (adminInfo) {
		return (
			<div className="vendorList">
				<br></br>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "500px",
									color: "azure",
									fontStyle: "italic",
								}}
							>
								Vendors List
							</h1>
						</Col>
						<Col>
							<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
								<Form>
									<input
										type="text"
										placeholder="Search..."
										style={{
											width: 400,
											height: 40,
											borderRadius: 50,
											padding: "10px",
											paddingLeft: "15px",
											fontSize: 18,
										}}
										onChange={searchHandler}
									/>
								</Form>
							</div>
						</Col>
					</Row>
					<br></br>

					<Button variant="success" href="/admin">
						Back to Dashboard
					</Button>

					<br></br>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loading && <Loading />}
					{loadingDelete && <Loading />}
					<br></br>
					<div className="listContainer">
						<Accordion allowZeroExpanded>
							{vendors &&
								vendors
									.filter(
										(filteredVendors) =>
											filteredVendors.name.toLowerCase().includes(search.toLowerCase()) ||
											filteredVendors.email.includes(search)
									)
									.reverse()
									.map((vendorList) => (
										<AccordionItem key={vendorList._id} className="listContainer">
											<Card
												style={{
													margin: 10,
													borderRadius: 25,
													borderWidth: 1.0,
													borderColor: "rgb(0,0,0,0.5)",
													marginTop: 20,
													paddingInline: 10,
													background: "rgb(235, 235, 235)",
												}}
											>
												<AccordionItemHeading>
													<AccordionItemButton>
														<Card.Header
															style={{
																display: "flex",
																paddingInline: 10,
																borderRadius: 25,
																marginTop: 10,
																marginBottom: 10,
																borderColor: "black",
																background: "#76BA99",
															}}
														>
															<span
																style={{
																	color: "black",
																	textDecoration: "none",
																	flex: 1,
																	cursor: "pointer",
																	alignSelf: "center",
																	fontSize: 18,
																}}
															>
																<label
																	className="nic"
																	style={{
																		paddingInline: 20,
																		marginTop: 10,
																		fontSize: 18,
																	}}
																>
																	Vendor Email : &emsp;
																	{vendorList.email}{" "}
																</label>{" "}
																<br></br>
																<label className="name" style={{ paddingInline: 20, fontSize: 18 }}>
																	Vendor Name : &emsp;
																	{vendorList.name}
																</label>{" "}
															</span>
															<div>
																<Button
																	style={{ marginTop: 20, fontSize: 15 }}
																	href={`/admin-vendor-edit/${vendorList._id}`}
																>
																	Edit
																</Button>
															</div>
															&emsp;
															<div>
																<Button
																	style={{ marginTop: 20, fontSize: 15 }}
																	variant="danger"
																	className="mx-2"
																	onClick={() => deleteHandler(vendorList._id)}
																>
																	Delete
																</Button>
															</div>
														</Card.Header>
													</AccordionItemButton>
												</AccordionItemHeading>
												<AccordionItemPanel>
													<Card.Body>
														<Row>
															<Col md={6}>
																<h5>Name - {vendorList.name}</h5>
																<h5>Telephone - {vendorList.telephone}</h5>
																<h5>Home Address - {vendorList.homeAddress}</h5>
																<h5>Email - {vendorList.email}</h5>
																<h5>Business Name - {vendorList.businessName}</h5>
																<h5>Business Address - {vendorList.businessAddress}</h5>
																<h5>Business Registration Number - {vendorList.businessRegNumber}</h5>
																<h5>
																	Description - <br></br>
																	{vendorList.description}
																</h5>{" "}
																<br></br>
															</Col>
															<Col
																style={{
																	display: "flex",
																	alignItems: "center",
																	width: "500px",
																	justifyContent: "center",
																}}
															>
																<img
																	style={{
																		width: "75%",
																		height: "100%",
																	}}
																	src={vendorList.pic}
																	alt={vendorList.name}
																	className="profilePic"
																/>
															</Col>
														</Row>
														<br></br>
														<blockquote className="blockquote mb-0">
															<Card.Footer
																className="text-muted"
																style={{
																	borderRadius: 20,
																	background: "white",
																}}
															>
																Registered Date - <cite title="Source Title"> {vendorList.regDate}</cite>
															</Card.Footer>
														</blockquote>
													</Card.Body>
												</AccordionItemPanel>
											</Card>
										</AccordionItem>
									))}
						</Accordion>
					</div>

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

export default VendorListForAdminScreen;
