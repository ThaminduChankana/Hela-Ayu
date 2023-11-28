const express = require("express");
const { protectCustomer } = require("../middleware/authCustomerMiddleware");
const { getReviews, createReview, getReviewsForEachProduct } = require("../controllers/reviewController");
const router = express.Router();

// review creation customer routes
router.route("/customer/review/create").post(protectCustomer, createReview);
router.route("/customer/review/get").get(protectCustomer, getReviews);

// public review routes
router.route("/get").get(getReviews);
router.route("/product/get/:id").get(getReviewsForEachProduct);

module.exports = router;
