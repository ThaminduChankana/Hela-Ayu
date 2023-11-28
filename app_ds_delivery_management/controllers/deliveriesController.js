const Delivery = require("../models/deliveriesModel");
const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

// create a delivery according to  order id
const createDelivery = asyncHandler(async (req, res) => {
	const {
		order,
		customer,
		customerName,
		customerEmail,
		customerPhone,
		deliveryServiceName,
		deliveryServiceEmail,
		deliveryServicePhone,
		status,
	} = req.body;

	const orders = await Order.findById(order);

	const orderId = orders.orderID;

	if (
		!order ||
		!customer ||
		!customerName ||
		!customerEmail ||
		!customerPhone ||
		!deliveryServiceName ||
		!deliveryServiceEmail ||
		!deliveryServicePhone ||
		!status
	) {
		res.status(400);
		throw new Error("Please Fill all the fields");
	} else {
		const delivery = new Delivery({
			order,
			customer,
			orderId,
			customerName,
			customerEmail,
			customerPhone,
			deliveryServiceName,
			deliveryServiceEmail,
			deliveryServicePhone,
			status,
		});

		const createDelivery = await delivery.save();

		res.status(201).json(createDelivery);
	}
});
// get  delivery for each single customer
const getDeliveriesForEachCustomer = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	const deliveries = await Delivery.find({ customer: customer._id });
	res.json(deliveries);
});
// get all of deliveries
const getDeliveries = asyncHandler(async (req, res) => {
	const deliveries = await Delivery.find();
	res.json(deliveries);
});

// get deliveries according to their id
const getDeliveryById = asyncHandler(async (req, res) => {
	const delivery = await Delivery.findById(req.params.id);
	if (delivery) {
		res.json(delivery);
	} else {
		res.status(404).json({ message: "Delivery not found" });
	}
});

// update delivery status
const updateDelivery = asyncHandler(async (req, res) => {
	const { status } = req.body;

	const delivery = await Delivery.findById(req.params.id);
	if (delivery) {
		delivery.status = status;

		const updatedDelivery = await delivery.save();
		res.json(updatedDelivery);
	} else {
		res.status(404);
		throw new Error("Delivery not found");
	}
});

module.exports = {
	createDelivery,
	getDeliveriesForEachCustomer,
	getDeliveries,
	getDeliveryById,
	updateDelivery,
};
