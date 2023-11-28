const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();

dotenv.config();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});

/*
	This is the gateway which is directly exposed to the clients to retrieve data. For security purposes this gate way restricts direct access to the services.
*/
 
app.use("/user", proxy("http://localhost:5002")); //proxy to access user management service
app.use("/items", proxy("http://localhost:5003")); //proxy to access product management service
app.use("/cart-items", proxy("http://localhost:5004")); //proxy to access cart management service
app.use("/pay", proxy("http://localhost:5005")); //proxy to access payment management service
app.use("/rate", proxy("http://localhost:5006")); //proxy to access review management service
app.use("/deliveries", proxy("http://localhost:5007")); //proxy to access delivery management service
app.use("/orders", proxy("http://localhost:5008")); //proxy to access order management service

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
