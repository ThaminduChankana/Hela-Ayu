import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import MainScreen from "../../../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProductByAdmin,
	productsListForAdmin,
} from "../../../../actions/productManagementActions/productActions";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import swal from "sweetalert";
import "./productLists.css";

const ProductsListForAdminScreen = () => {
	const dispatch = useDispatch();

	const adminProductList = useSelector((state) => state.adminProductList);
	const { loading, products, error } = adminProductList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const productCreate = useSelector((state) => state.productCreate);
	const { success: successCreate } = productCreate;

	const productUpdateByAdmin = useSelector((state) => state.productUpdateByAdmin);
	const { success: successUpdate } = productUpdateByAdmin; //taking out products update state from redux

	const [search, setSearch] = useState("");

	const productDeleteByAdmin = useSelector((state) => state.productDeleteByAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDeleteByAdmin;

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
					dispatch(deleteProductByAdmin(id));
					swal({
						title: "Success!",
						text: "Deleted Product Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Product",
					type: "error",
				});
			});
	};
	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const history = useHistory();

	useEffect(() => {
		dispatch(productsListForAdmin());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, successCreate, history, adminInfo, successUpdate, successDelete]);
	if (adminInfo) {
		return (
			<div className="adminProductList">
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
								Products List
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

					<Button variant="success" href="/admin" style={{ float: "left", fontSize: "15px" }}>
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
							{products &&
								products
									.filter(
										(filteredProducts) =>
											filteredProducts.title.toLowerCase().includes(search.toLowerCase()) ||
											filteredProducts.productBrand.includes(search.toLowerCase)
									)
									.reverse()
									.map((adminProductList) => (
										<AccordionItem key={adminProductList._id} className="listContainer">
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
																	Product Name : &emsp;
																	{adminProductList.title}{" "}
																</label>{" "}
																<br></br>
																<label className="name" style={{ paddingInline: 20, fontSize: 18 }}>
																	Product Brand : &emsp;
																	{adminProductList.productBrand}
																</label>{" "}
															</span>
															<div>
																<Button
																	style={{ marginTop: 20, fontSize: 15 }}
																	href={`/admin-product-edit/${adminProductList._id}`}
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
																	onClick={() => deleteHandler(adminProductList._id)}
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
																<h5>Vendor Email - {adminProductList.vendorEmail}</h5>
																<h5>Product Name - {adminProductList.title}</h5>
																<h5>Product Category - {adminProductList.category}</h5>
																<h5>Product Brand - {adminProductList.productBrand}</h5>
																<h5>Product Code - {adminProductList.productCode}</h5>
																<h5>Description - {adminProductList.description}</h5>
																<h5>Price - {adminProductList.price}</h5>
																<h5>Product Ingredients - {adminProductList.ingredients}</h5>
																<h5>Usage - {adminProductList.usage}</h5>
																<h5>Warnings - {adminProductList.warnings}</h5>
																<h5>Discount Note - {adminProductList.discountNote}</h5>
																<h5>Discount Price - {adminProductList.discountPrice}</h5>
																<h5>Quantity - {adminProductList.quantity}</h5>
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
																		width: "50%",
																		height: "70%",
																	}}
																	src={adminProductList.picURL}
																	alt={adminProductList.name}
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
															/>
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

export default ProductsListForAdminScreen;
