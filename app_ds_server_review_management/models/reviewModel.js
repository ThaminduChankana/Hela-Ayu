/**
 * This model is implemented for
 * the Review  management
 */
const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Product",
	},
	email: {
		type: String,
		required: true,
	},
	reviewName: {
		type: String,
		required: true,
	},
	reviewTittle: {
		type: String,
		required: true,
	},
	reviewDescription: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
