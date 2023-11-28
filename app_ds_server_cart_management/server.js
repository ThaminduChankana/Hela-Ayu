const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const cartRoutes = require("./routes/cartRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Establish server and database connection
dotenv.config();
connectDB();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("Cart API is Running");
});

app.use("/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

// cart management service run on port 5004
const PORT = process.env.PORT || 5004;
app.listen(PORT, console.log(`Cart Server Started on port ${PORT}..`));
