const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

// Get all orders of a particular customer
const getCustomerOrders = asyncHandler(async (req, res) => {
	const items = await Order.find({ customer: req.params.id });
	res.json(items);
});

// Get all the orders by admin
const getAdminOrders = asyncHandler(async (req, res) => {
	const items = await Order.find();
	res.json(items);
});

// Create a order
const createOrder = asyncHandler(async (req, res) => {
	var status = "pending";
	var products = "";
	var i = 0;
	const { customer, total } = req.body;
	var orderID = Math.floor(Math.random() * 100000);

	if (!customer || !total) {
		res.status(400);
		throw new Error("Failed creating order");
	} else {
		const items = await Cart.find({
			customer: customer,
		});

		// Add the cart items to order
		while (i < items.length) {
			products = products + items[i].productName + " : " + items[i].quantity;
			if (i != items.length - 1) {
				products = products + " , ";
			}
			i++;
		}
		// Save the order
		const order = new Order({
			customer,
			products,
			orderID,
			total,
			status,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// Update the order status
const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;

	const order = await Order.findById(req.params.id);

	if (order) {
		order.status = status;

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

module.exports = {
	createOrder,
	getCustomerOrders,
	getAdminOrders,
	updateOrderStatus,
};
