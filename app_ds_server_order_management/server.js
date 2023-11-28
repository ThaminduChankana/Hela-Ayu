const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Establish server and database connection
dotenv.config();
connectDB();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("Order API is Running");
});

app.use("/order", orderRoutes);

app.use(notFound);
app.use(errorHandler);

// Order management service run on port 5008
const PORT = process.env.PORT || 5008;
app.listen(PORT, console.log(`Order Server Started on port ${PORT}..`));
