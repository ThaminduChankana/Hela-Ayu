const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//get all of reviews for products
const getReviews = asyncHandler(async (req, res) => {
	const review = await Review.find();
	res.json(review);
});

// create  a new review according to the product
const createReview = asyncHandler(async (req, res) => {
	const { product, email, reviewName, reviewTittle, reviewDescription, rating } = req.body;

	const products = await Product.findOne({ _id: product });
	console.log(products);

	if (!product || !email || !reviewName || !reviewTittle || !reviewDescription || !rating) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const review = new Review({
			product,
			email,
			reviewName,
			reviewTittle,
			reviewDescription,
			rating,
		});

		const createReview = await review.save();

		res.status(201).json(createReview);
		console.log(req.body);
	}
});

// get reviews for  each single product
const getReviewsForEachProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	const review = await Review.find({ product: product._id });

	res.json(review);
});

module.exports = {
	createReview,
	getReviews,
	getReviewsForEachProduct,
};
