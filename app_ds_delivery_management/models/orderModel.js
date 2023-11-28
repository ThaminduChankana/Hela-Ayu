/**
 * This model is implemented for
 * the Order management
 */
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const orderSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Customer",
	},
	products: {
		type: String,
		required: true,
	},
	orderID: {
		type: String,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
