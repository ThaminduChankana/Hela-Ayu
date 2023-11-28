const express = require("express");
const {
	createDelivery,
	getDeliveriesForEachCustomer,
	getDeliveries,
	getDeliveryById,
	updateDelivery,
} = require("../controllers/deliveriesController");

const router = express.Router();

//delivery routes  for customer
router.route("/create").post(createDelivery);
router.route("/all").get(getDeliveries);

//delivery routes  for admin
router.route("/customer/all/:id").get(getDeliveriesForEachCustomer);
router.route("/get/:id").get(getDeliveryById).put(updateDelivery);

module.exports = router;
