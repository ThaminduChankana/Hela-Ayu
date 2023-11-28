const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const cartSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Customer",
	},
	productName: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	productCode: {
		type: String,
		required: true,
	},
	picURL: {
		type: String,
		required: true,
		default: "https://res.cloudinary.com/dfmnpw0yp/image/upload/v1679235307/assets/tsuh9f6v1reihgqxwxrz.ico",
	},
	price: {
		type: Number,
		required: true,
	},
	discountNote: {
		type: String,
		required: true,
	},
	discountPrice: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
