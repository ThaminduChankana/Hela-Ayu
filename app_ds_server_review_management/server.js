const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("Review API is running...");
});

//review server start route
app.use("/review", reviewRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5006;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
