import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
	"pk_test_51MzPn6ECpT6ND4zosJuGtpS0CTaaqJnQalJ1m602lKp7eQpQw2b48xeiqBEioXMwLzSRY65VoQDXD5l8XFQotzcd00dervuBEl";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
	return (
		<>
			<br />
			<br />
			<br />
			<br />
			<Elements stripe={stripeTestPromise}>
				<PaymentForm />
			</Elements>
		</>
	);
}
