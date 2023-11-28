/**
 * This model is implemented for
 * the Vendor management
 */
const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		telephone: {
			type: String,
			required: true,
		},
		homeAddress: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		businessName: {
			type: String,
			required: true,
		},
		businessAddress: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		pic: {
			type: String,
			required: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default image which apply in the user
		},
		regDate: {
			type: String,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	}
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
