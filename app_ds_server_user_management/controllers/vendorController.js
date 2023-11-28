const asyncHandler = require("express-async-handler");
const Vendor = require("../models/vendorModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// register vendor profile
const registerVendor = asyncHandler(async (req, res) => {
	const {
		name,
		telephone,
		homeAddress,
		email,
		password,
		businessName,
		businessAddress,
		website,
		businessRegNumber,
		description,
		pic,
	} = req.body;

	const vendorExists = await Vendor.findOne({ email });
	if (vendorExists) {
		res.status(400);
		throw new Error("Vendor Profile Exists !");
	}

	const vendor = new Vendor({
		name,
		telephone,
		homeAddress,
		email,
		password,
		businessName,
		businessAddress,
		website,
		businessRegNumber,
		description,
		pic,
	});

	const salt = await bcrypt.genSalt(10);

	vendor.password = await bcrypt.hash(password, salt);

	await vendor.save();

	if (vendor) {
		res.status(201).json({
			_id: vendor._id,
			name: vendor.name,
			telephone: vendor.telephone,
			homeAddress: vendor.homeAddress,
			email: vendor.email,
			businessName: vendor.businessName,
			businessAddress: vendor.businessAddress,
			website: vendor.website,
			businessRegNumber: vendor.businessRegNumber,
			description: vendor.description,
			pic: vendor.pic,
			token: generateToken(vendor._id),
		});
	} else {
		res.status(400);
		throw new Error("Vendor Registration Failed !");
	}
});
//authenticate vendor profile
const authVendor = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const vendor = await Vendor.findOne({ email });

	if (!vendor) {
		res.status(400);
		throw new Error("Invalid Email or Password");
	}

	const isMatch = await bcrypt.compare(password, vendor.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	} else {
		res.status(201).json({
			_id: vendor._id,
			name: vendor.name,
			telephone: vendor.telephone,
			homeAddress: vendor.homeAddress,
			email: vendor.email,
			businessName: vendor.businessName,
			businessAddress: vendor.businessAddress,
			website: vendor.website,
			businessRegNumber: vendor.businessRegNumber,
			description: vendor.description,
			pic: vendor.pic,
			token: generateToken(vendor._id),
		});
	}
});
//get all of vendors list
const getVendors = asyncHandler(async (req, res) => {
	const vendors = await Vendor.find();
	res.json(vendors);
});

// view vendor profile by vendor
const getVendorProfile = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.vendor._id);

	if (vendor) {
		res.json(vendor);
	} else {
		res.status(400);
		throw new Error("Vendor not found !");
	}
});

// view vendor profile by admin
const getVendorProfileById = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params._id);

	if (vendor) {
		res.json(vendor);
	} else {
		res.status(400);
		throw new Error("Vendor not found !");
	}
});

//update vendor profile by customer
const updateVendorProfile = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.vendor._id);

	if (vendor) {
		vendor.name = req.body.name || vendor.name;
		vendor.telephone = req.body.telephone || vendor.telephone;
		vendor.homeAddress = req.body.homeAddress || vendor.homeAddress;
		vendor.email = req.body.email || vendor.email;
		vendor.businessName = req.body.businessName || vendor.businessName;
		vendor.businessAddress = req.body.businessAddress || vendor.businessAddress;
		vendor.website = req.body.website || vendor.website;
		vendor.businessRegNumber = req.body.businessRegNumber || vendor.businessRegNumber;
		vendor.description = req.body.description || vendor.description;
		vendor.pic = req.body.pic || vendor.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			vendor.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedVendor = await vendor.save();

		res.json({
			_id: updatedVendor._id,
			name: updatedVendor.name,
			telephone: updatedVendor.telephone,
			homeAddress: updatedVendor.homeAddress,
			email: updatedVendor.email,
			businessName: updatedVendor.businessName,
			businessAddress: updatedVendor.businessAddress,
			website: updatedVendor.website,
			businessRegNumber: updatedVendor.businessRegNumber,
			description: updatedVendor.description,
			pic: updatedVendor.pic,
			token: generateToken(updatedVendor._id),
		});
	} else {
		res.status(404);
		throw new Error("Vendor Not Found !");
	}
});

//update vendor profile by admin
const updateVendorProfileById = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params._id);

	if (vendor) {
		vendor.name = req.body.name || vendor.name;
		vendor.telephone = req.body.telephone || vendor.telephone;
		vendor.homeAddress = req.body.homeAddress || vendor.homeAddress;
		vendor.email = req.body.email || vendor.email;
		vendor.businessName = req.body.businessName || vendor.businessName;
		vendor.businessAddress = req.body.businessAddress || vendor.businessAddress;
		vendor.website = req.body.website || vendor.website;
		vendor.businessRegNumber = req.body.businessRegNumber || vendor.businessRegNumber;
		vendor.description = req.body.description || vendor.description;
		vendor.pic = req.body.pic || vendor.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			vendor.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedVendor = await vendor.save();

		res.json({
			_id: updatedVendor._id,
			name: updatedVendor.name,
			telephone: updatedVendor.telephone,
			homeAddress: updatedVendor.homeAddress,
			email: updatedVendor.email,
			businessName: updatedVendor.businessName,
			businessAddress: updatedVendor.businessAddress,
			website: updatedVendor.website,
			businessRegNumber: updatedVendor.businessRegNumber,
			description: updatedVendor.description,
			pic: updatedVendor.pic,
			token: generateToken(updatedVendor._id),
		});
	} else {
		res.status(404);
		throw new Error("Vendor Not Found !");
	}
});

// delete vendor profile by  vendor
const deleteVendorProfile = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.vendor._id);

	if (vendor) {
		await vendor.remove();
		res.json({ message: "Vendor Removed !" });
	} else {
		res.status(404);
		throw new Error("Vendor not Found !");
	}
});

// delete vendor profile by admin
const deleteVendorProfileById = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params._id);

	if (vendor) {
		await vendor.remove();
		res.json({ message: "Vendor Removed !" });
	} else {
		res.status(404);
		throw new Error("Vendor not Found !");
	}
});

module.exports = {
	registerVendor,
	authVendor,
	getVendors,
	getVendorProfile,
	getVendorProfileById,
	updateVendorProfile,
	updateVendorProfileById,
	deleteVendorProfile,
	deleteVendorProfileById,
};
