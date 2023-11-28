const express = require("express");
const {
	registerVendor,
	authVendor,
	getVendorProfile,
	updateVendorProfile,
	deleteVendorProfile,
} = require("../controllers/vendorController");
const { protect } = require("../middleware/authVendorMiddleware");
const router = express.Router();

//Routes for Vendor Account Operations
router.route("/register").post(registerVendor);
router.route("/login").post(authVendor);
router.route("/view").get(protect, getVendorProfile);
router.route("/edit").put(protect, updateVendorProfile);
router.route("/delete").delete(protect, deleteVendorProfile);

module.exports = router;
