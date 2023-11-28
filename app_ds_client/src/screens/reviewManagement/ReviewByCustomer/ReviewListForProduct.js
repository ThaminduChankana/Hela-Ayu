import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { ReviewCustomerListAction } from "../../../actions/reviewManagementActions/reviewAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import "./ReviewCustomer.css";

const ReviewList = ({ match }) => {
	const dispatch = useDispatch();

	const Review_Cus_List = useSelector((state) => state.Review_Cus_List);
	const { loading, UIReview, error } = Review_Cus_List;

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(ReviewCustomerListAction(match.params.id));
	}, [dispatch, match.params.id]);

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className="reviewCustomerList">
			<br></br>
			<MainScreen title={`Reiviews For The Product`}>
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
							Review List
						</h1>
					</Col>
					<Col>
						<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
							<Form inline>
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
				<br></br>

				<ButtonGroup variant="success" className="mb-2" size="lg" style={{ width: "100%" }}>
					<Button variant="success" href={`/single-product-view/${match.params.id}`}>
						Back to Products
					</Button>

					{customerInfo ? (
						<Button variant="success" href={`/customer-review-create/${match.params.id}`}>
							+ Create Review
						</Button>
					) : (
						<></>
					)}
				</ButtonGroup>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<br></br>
				{UIReview?.reverse()
					.filter((filteredReviews) => filteredReviews.reviewName.includes(search))
					.map((reviewCustomer) => (
						<Accordion>
							<Card
								style={{
									margin: 20,
									borderRadius: 25,
									borderWidth: 1.0,
									borderColor: "rgb(0,0,0,0.5)",
									paddingInline: 10,
									background: "rgb(235, 235, 235)",
								}}
							>
								<Card.Header
									style={{
										borderRadius: 25,
										marginTop: 10,
										borderColor: "black",
										background: "#4E6E81",
										color: "white",
									}}
								>
									<center>
										<h5 style={{ fontFamily: "cursive", marginTop: "10px", fontSize: "25px", fontWeight: "bolder" }}>
											{reviewCustomer.reviewTittle}
										</h5>

										<h5 style={{ marginTop: "10px", fontSize: "25px" }}> Rating - {reviewCustomer.rating}</h5>
									</center>
									<span
										style={{
											color: "black",
											textDecoration: "none",
											flex: 1,
											cursor: "pointer",
											alignSelf: "center",
											fontSize: 18,
										}}
									></span>
								</Card.Header>
								<Card.Body>
									<Row>
										<Col md={6}>
											<h5>E-Mail - {reviewCustomer.email}</h5>
											<h5> Name - {reviewCustomer.reviewName}</h5>
											<h5>Tittle - {reviewCustomer.reviewTittle}</h5>
											<h5>Description- {reviewCustomer.reviewDescription}</h5>
											<h5>rating - {reviewCustomer.rating}</h5>

											<br></br>
										</Col>
									</Row>
									<br></br>
								</Card.Body>
							</Card>
						</Accordion>
					))}
				<br></br>
			</MainScreen>
		</div>
	);
};

export default ReviewList;
