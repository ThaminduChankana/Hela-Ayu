const express = require("express");
const dotenv = require("dotenv");
const app = express();
const deliveryRoutes = require("./routes/deliveriesRoutes");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(express.json());

app.use("*", cors());

app.get("/", (req, res) => {
	res.send("Delivery API is Running");
});

//delivery start server route
app.use("/delivery", deliveryRoutes);

const PORT = process.env.PORT || 5007;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
