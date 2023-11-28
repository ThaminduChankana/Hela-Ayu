const express = require("express");
const {
	getCartItems,
	addToCart,
	updateCart,
	deleteCartItem,
	deleteAllCartItems,
	getTotal,
} = require("../controllers/cartController");
const { protectCustomer } = require("../middleware/authCustomerMiddleware");
const router = express.Router();

// Routes for the cart management service
router.route("/:id").get(protectCustomer, getCartItems);
router.route("/total/:id").get(protectCustomer, getTotal);
router.route("/add").post(protectCustomer, addToCart);
router
	.route("/:id")
	.delete(protectCustomer, deleteCartItem)
	.put(protectCustomer, updateCart)
	.delete(protectCustomer, deleteAllCartItems);
router.route("/all/:id").delete(protectCustomer, deleteAllCartItems);

module.exports = router;
