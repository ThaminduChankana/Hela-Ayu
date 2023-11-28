import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { ReviewCustomerCreateAction } from "../../../actions/reviewManagementActions/reviewAction";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import { API_ENDPOINT } from "../../../config";
import "./ReviewCustomer.css";

export default function ReviewCustomerCreate({ match, history }) {
	const [productId, setProductId] = useState("");
	const [reviewTittle, setReviewTittle] = useState("");
	const [reviewDescription, setReviewDescription] = useState("");
	const [rating, setRating] = useState("");
	const [productName, setProductName] = useState("");

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/items/products/${match.params.id}`);
			setProductId(data._id);
			setProductName(data.title);
		};
		fetching();
	}, [match.params.id]);

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const Review_Customer_Create = useSelector((state) => state.Review_Customer_Create);
	const { loading, error } = Review_Customer_Create;

	const [email, setEmail] = useState(customerInfo.email);
	const [reviewName, setReviewName] = useState(customerInfo.name);

	const resetHandler = () => {
		setEmail("");
		setReviewName("");
		setReviewTittle("");
		setReviewDescription("");
		setRating("");
	};
	const submitHandler = (e) => {
		e.preventDefault();

		// const sendingData = { productId, email, reviewName, reviewTittle, reviewDescription, rating };
		// console.log(sendingData)

		dispatch(ReviewCustomerCreateAction(productId, email, reviewName, reviewTittle, reviewDescription, rating));

		resetHandler();
		// history.push("/");
	};

	if (customerInfo) {
		return (
			<div className="RatingsBackgroundCreate">
				<MainScreen title={"Enter Your Rating"}>
					<Button
						variant="success"
						style={{
							marginLeft: 10,
							marginBottom: 6,
							float: "left",
							fontSize: 15,
						}}
						size="lg"
						href={`/product-review-list/${match.params.id}`}
					>
						Back to the reviews List
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

							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="productId">
									<Form.Label>Product Name</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="productid"
										value={productName}
										readOnly
									/>
								</Form.Group>
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" value={customerInfo.email} placeholder="Enter  Your Email" readOnly />
								</Form.Group>

								<Form.Group controlId="reviewName">
									<Form.Label>Name</Form.Label>
									<Form.Control value={customerInfo.name} placeholder="Enter Your Name" readOnly />
								</Form.Group>

								<Form.Group controlId="reviewTittle">
									<Form.Label>Tittle</Form.Label>
									<Form.Control
										type="reviewTittle"
										value={reviewTittle}
										placeholder="Enter Your Review's Tittle "
										onChange={(e) => setReviewTittle(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="reviewDescription">
									<Form.Label> Description</Form.Label>
									<Form.Control
										as="textarea"
										type="reviewDescription"
										value={reviewDescription}
										placeholder="Enter the Description"
										onChange={(e) => setReviewDescription(e.target.value)}
										required
									/>
								</Form.Group>
								<div className="form-group">
									<label className="rating">Rating</label>
									<select
										className="form-control"
										id="CustomerRating"
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										required
									>
										<option>Select Your Rating</option>
										<option value="1">1 - ⭐ </option>
										<option value="2">2 - ⭐ ⭐ </option>
										<option value="3">3 - ⭐ ⭐ ⭐ </option>
										<option value="4">4 - ⭐ ⭐ ⭐ ⭐ </option>
										<option value="5">5 - ⭐ ⭐ ⭐ ⭐ ⭐ </option>
									</select>
								</div>
								<br></br>

								<h4>Remember that once you submitted the reviews you can not change after that </h4>
								<br></br>
								{loading && <Loading size={50} />}

								<Button type="submit" variant="success">
									Submit
								</Button>

								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset
								</Button>
								{/* <Button variant="info" onClick={demoHandler}>
                  Demo
                </Button> */}
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
