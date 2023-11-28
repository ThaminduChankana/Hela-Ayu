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
	deleteProductByVendor,
	productsListForVendor,
} from "../../../../actions/productManagementActions/productActions";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import swal from "sweetalert";
import "./productLists.css";

const ProductsListForVendorScreen = () => {
	const dispatch = useDispatch();

	const vendorProductList = useSelector((state) => state.vendorProductList);
	const { loading, products, error } = vendorProductList;

	const vendor_Login = useSelector((state) => state.vendor_Login);
	const { vendorInfo } = vendor_Login;

	const productCreate = useSelector((state) => state.productCreate);
	const { success: successCreate } = productCreate;

	const productUpdateByVendor = useSelector((state) => state.productUpdateByVendor);
	const { success: successUpdate } = productUpdateByVendor; //taking out products update state from redux

	console.log(vendorProductList);

	const [search, setSearch] = useState("");

	const productDeleteByVendor = useSelector((state) => state.productDeleteByVendor);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDeleteByVendor;

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
					dispatch(deleteProductByVendor(id));
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
		dispatch(productsListForVendor());
		if (!vendorInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, successCreate, history, vendorInfo, successUpdate, successDelete]);
	if (vendorInfo) {
		return (
			<div className="vendorProductList">
				<br></br>
				<MainScreen title={`Welcome Back ${vendorInfo && vendorInfo.name}..`}>
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

					<Button variant="success" href="/vendor-product-add" style={{ float: "right", fontSize: "15px" }}>
						+ Add New Product
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
									.map((vendorProductList) => (
										<AccordionItem key={vendorProductList._id} className="listContainer">
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
																	{vendorProductList.title}{" "}
																</label>{" "}
																<br></br>
																<label className="name" style={{ paddingInline: 20, fontSize: 18 }}>
																	Product Brand : &emsp;
																	{vendorProductList.productBrand}
																</label>{" "}
															</span>
															<div>
																<Button
																	style={{ marginTop: 20, fontSize: 15 }}
																	href={`/vendor-product-edit/${vendorProductList._id}`}
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
																	onClick={() => deleteHandler(vendorProductList._id)}
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
																<h5>Product Name - {vendorProductList.title}</h5>
																<h5>Product Category - {vendorProductList.category}</h5>
																<h5>Product Brand - {vendorProductList.productBrand}</h5>
																<h5>Product Code - {vendorProductList.productCode}</h5>
																<h5>Description - {vendorProductList.description}</h5>
																<h5>Price - {vendorProductList.price}</h5>
																<h5>Product Ingredients - {vendorProductList.ingredients}</h5>
																<h5>Usage - {vendorProductList.usage}</h5>
																<h5>Warnings - {vendorProductList.warnings}</h5>
																<h5>Discount Note - {vendorProductList.discountNote}</h5>
																<h5>Discount Price - {vendorProductList.discountPrice}</h5>
																<h5>Quantity - {vendorProductList.quantity}</h5>
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
																	src={vendorProductList.picURL}
																	alt={vendorProductList.title}
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

export default ProductsListForVendorScreen;
