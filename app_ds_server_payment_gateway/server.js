const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("Payment API is Running");
});

//payment server route
app.use("/stripe", paymentRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, console.log(`Payment Server Started on port ${PORT}..`));
