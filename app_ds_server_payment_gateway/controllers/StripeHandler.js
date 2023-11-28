const StripeKey =
	"sk_test_51MzPn6ECpT6ND4zo8vk7nXcJnuRCvoYpJ8bf5ct1rvBWXzFFUVNbeLl8G0azQyNskSblztUOuq7ioGDBcZPOOyjW00tbE0q4fG";
const Stripe = require("stripe");
const stripe = new Stripe(StripeKey);

//create a payment in stripe payment gateway
const createPaymentIntent = async (req, res) => {
	let { amount, id } = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Hela Ayu Pay",
			payment_method: id,
			confirm: true,
		});
		res.json({
			message: "Payment successful",
			success: true,
			payment,
		});
	} catch (error) {
		console.log("Error", error);
		res.json({
			message: "Payment failed",
			success: false,
		});
	}
};

module.exports = {
	createPaymentIntent,
};
