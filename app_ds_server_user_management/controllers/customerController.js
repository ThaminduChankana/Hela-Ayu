const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// register  customer profile
const registerCustomer = asyncHandler(async (req, res) => {
	const { name, telephone, address, email, password, pic } = req.body;

	const customerExists = await Customer.findOne({ email });
	if (customerExists) {
		res.status(400);
		throw new Error("Customer Profile Exists !");
	}

	const customer = new Customer({
		name,
		telephone,
		address,
		email,
		password,
		pic,
	});

	const salt = await bcrypt.genSalt(10);

	customer.password = await bcrypt.hash(password, salt);

	await customer.save();

	if (customer) {
		res.status(201).json({
			_id: customer._id,
			name: customer.name,
			telephone: customer.telephone,
			address: customer.address,
			email: customer.email,
			pic: customer.pic,
			token: generateToken(customer._id),
		});
	} else {
		res.status(400);
		throw new Error("Customer Registration Failed !");
	}
});

//authenticate customer profile
const authCustomer = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const customer = await Customer.findOne({ email });

	if (!customer) {
		res.status(400);
		throw new Error("Invalid Email or Password");
	}

	const isMatch = await bcrypt.compare(password, customer.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	} else {
		res.status(201).json({
			_id: customer._id,
			name: customer.name,
			telephone: customer.telephone,
			address: customer.address,
			email: customer.email,
			pic: customer.pic,
			regDate: customer.regDate,
			token: generateToken(customer._id),
		});
	}
});

//get all of customers list
const getCustomers = asyncHandler(async (req, res) => {
	const customers = await Customer.find();
	res.json(customers);
});

// view customer profile by customer
const getCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(400);
		throw new Error("Customer not found !");
	}
});

// view customer profile by admin
const getCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(400);
		throw new Error("Customer not found !");
	}
});

//update customer profile by customer
const updateCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		customer.name = req.body.name || customer.name;
		customer.telephone = req.body.telephone || customer.telephone;
		customer.address = req.body.address || customer.address;
		customer.email = req.body.email || customer.email;
		customer.pic = req.body.pic || customer.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			customer.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedCustomer = await customer.save();

		res.json({
			_id: updatedCustomer._id,
			name: updatedCustomer.name,
			telephone: updatedCustomer.telephone,
			address: updatedCustomer.address,
			email: updatedCustomer.email,
			pic: updatedCustomer.pic,
			token: generateToken(updatedCustomer._id),
		});
	} else {
		res.status(404);
		throw new Error("Customer Not Found !");
	}
});

//update customer profile by admin
const updateCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		customer.name = req.body.name || customer.name;
		customer.telephone = req.body.telephone || customer.telephone;
		customer.address = req.body.address || customer.address;
		customer.email = req.body.email || customer.email;
		customer.pic = req.body.pic || customer.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			customer.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedCustomer = await customer.save();

		res.json({
			_id: updatedCustomer._id,
			name: updatedCustomer.name,
			telephone: updatedCustomer.telephone,
			address: updatedCustomer.address,
			email: updatedCustomer.email,
			pic: updatedCustomer.pic,
			token: generateToken(updatedCustomer._id),
		});
	} else {
		res.status(404);
		throw new Error("Customer Not Found !");
	}
});

// delete customer profile by  customer
const deleteCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		await customer.remove();
		res.json({ message: "Customer Removed !" });
	} else {
		res.status(404);
		throw new Error("Customer not Found !");
	}
});

// delete customer profile by admin
const deleteCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		await customer.remove();
		res.json({ message: "Customer Removed !" });
	} else {
		res.status(404);
		throw new Error("Customer not Found !");
	}
});

module.exports = {
	registerCustomer,
	authCustomer,
	getCustomers,
	getCustomerProfile,
	getCustomerProfileById,
	updateCustomerProfile,
	updateCustomerProfileById,
	deleteCustomerProfile,
	deleteCustomerProfileById,
};
