const express = require("express");
const dotenv = require("dotenv");
const app = express();
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Product API is Running");
});

//product start server route
app.use("/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5003;
app.listen(PORT, console.log(`Product Server Started on port ${PORT}..`));
