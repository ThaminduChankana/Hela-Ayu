const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("User API is Running");
});

//user management routes
app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/vendor", vendorRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
