import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MainScreen from "../../components/MainScreen";
import { API_ENDPOINT } from "../../config";
import { createCartAction } from "../../actions/cartManagementActions/cartAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./product-view.css";

export default function SingleProduct({ match, history }) {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [productCode, setProductCode] = useState("");
	const [description, setDescription] = useState("");
	const [picURL, setPicURL] = useState("");
	const [price, setPrice] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [usage, setUsage] = useState("");
	const [warnings, setWarnings] = useState("");
	const [discountNote, setDiscountNote] = useState("");
	const [quantity, setQuantity] = useState("");
	const [discount, setDiscount] = useState("");

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const cartCreate = useSelector((state) => state.cartCreate);
	const { loading, error } = cartCreate;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/items/products/${match.params.id}`);
			setTitle(data.title);
			setCategory(data.category);
			setProductCode(data.productCode);
			setDescription(data.description);
			setPicURL(data.picURL);
			setPrice(data.price);
			setIngredients(data.ingredients);
			setUsage(data.usage);
			setWarnings(data.warnings);
			setDiscountNote(data.discountNote);
			setQuantity(data.quantity);
			setDiscount(data.discountPrice);
		};

		fetching();
	});
	function addToCart(title, category, productCode, picURL, price, discountNote, discountPrice) {
		dispatch(
			createCartAction(customerInfo._id, title, category, productCode, picURL, price, discountNote, discountPrice, 1)
		);
	}

	return (
		<div className="singlePlanView">
			<br></br>
			<br></br>
			<MainScreen title="">
				<h1
					style={{
						fontSize: "35px",
						fontWeight: "bold",
						letterSpacing: "3px",
					}}
				>
					{title} ({productCode})
				</h1>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<div className="product-card">
					<div className="details">
						<div className="big-img">
							<img
								src={picURL}
								alt=""
								style={{
									width: "500px",
									height: "750px",
									borderRadius: "15px",
								}}
							></img>
							<h2
								style={{
									fontSize: "30px",
									marginTop: "25px",
									fontWeight: "bold",
									color: "red",
								}}
							>
								Availability : {quantity}
							</h2>
						</div>
						<div className="box">
							<h2>Details</h2>
							<p>{description}</p>
							<h2>Ingredients</h2>
							<p>{ingredients}</p>
							<h2>Usage</h2>
							<p>{usage}</p>
							<h2>Warnings</h2>
							<p>{warnings}</p>
							<div className="row" style={{ margin: "50px" }}>
								<span>
									<h2 style={{ textDecoration: "line-through", fontSize: "30px" }}>Rs {price}</h2>
								</span>
								<span>
									<h2 style={{ fontSize: "30px" }}>{discountNote}</h2>
								</span>
							</div>
							<Button
								onClick={() => addToCart(title, category, productCode, picURL, price, discountNote, discount)}
								disabled={quantity <= 0}
								className="cart"
							>
								Add To Cart
							</Button>
							&emsp;
							<Button
								href={`/product-review-list/${match.params.id}`}
								style={{ marginLeft: "100px", background: "red" }}
								className="cart"
							>
								Reviews
							</Button>
						</div>
					</div>
				</div>
				<br></br>
				<br></br>
			</MainScreen>
		</div>
	);
}
