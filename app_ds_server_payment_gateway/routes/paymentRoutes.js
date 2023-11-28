const express = require("express");
const { createPaymentIntent } = require("../controllers/StripeHandler");
const router = express.Router();

//payment api route
router.route("/payment").post(createPaymentIntent);

module.exports = router;
