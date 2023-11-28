const express = require("express");
const { protectVendor } = require("../middleware/authVendorMiddleware");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const {
	addProduct,
	getProducts,
	getProductsForEachVendor,
	getProductById,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

//get product routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

//vendor's product routes
router.route("/vendor/product/add").post(protectVendor, addProduct);
router.route("/vendor/product/get").get(protectVendor, getProductsForEachVendor);
router
	.route("/vendor/product/get/:id")
	.get(protectVendor, getProductById)
	.put(protectVendor, updateProduct)
	.delete(protectVendor, deleteProduct);

//admin's product routes
router.route("/admin/product/get").get(protectAdmin, getProducts);
router
	.route("/admin/product/get/:id")
	.get(protectAdmin, getProductById)
	.put(protectAdmin, updateProduct)
	.delete(protectAdmin, deleteProduct);

module.exports = router;
