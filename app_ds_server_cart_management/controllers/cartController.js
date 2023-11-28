const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Get cart items for a particular customer
const getCartItems = asyncHandler(async (req, res) => {
	const items = await Cart.find({ customer: req.params.id });
	res.json(items);
});

// Get total price of a particular customer
const getTotal = asyncHandler(async (req, res) => {
	var loopData = {};
	var loopData = new Object();
	const items = await Cart.find({ customer: req.params.id });
	var total = 0;
	var i = 0;
	while (i < items.length) {
		total = total + (items[i].price - items[i].discountPrice) * items[i].quantity;
		i++;
	}
	var loopData = {
		totalPrice: total,
	};
	res.json(loopData);
});

// Add a product to a cart
const addToCart = asyncHandler(async (req, res) => {
	const { customer, productName, category, productCode, picURL, price, discountNote, discountPrice, quantity } =
		req.body;

	if (
		!customer ||
		!productName ||
		!category ||
		!productCode ||
		!picURL ||
		!price ||
		!discountNote ||
		!discountPrice ||
		!quantity
	) {
		res.status(400);
		throw new Error("Failed adding items to cart");
	} else {
		const item = await Cart.findOne({
			customer: customer,
			productName: productName,
		});
		// Check whether the item is already in cart
		if (item) {
			throw new Error("Already in cart");
		} else {
			const product = await Product.findOne({
				productCode: productCode,
			});
			// Update the product availability
			if (product) {
				product.quantity = product.quantity - 1;
				const updatedProduct = await product.save();
			}
			// Save the item to cart
			const cart = new Cart({
				customer,
				productName,
				category,
				productCode,
				picURL,
				price,
				discountNote,
				discountPrice,
				quantity,
			});

			const createdCart = await cart.save();

			res.status(201).json(createdCart);
		}
	}
});

// Update the product quantity of a cart item
const updateCart = asyncHandler(async (req, res) => {
	const { quantity } = req.body;

	const cart = await Cart.findById(req.params.id);

	const product = await Product.findOne({ productCode: cart.productCode });
	var previousQuantity = cart.quantity;

	// If the adding product has no enough stock in system
	if (product.quantity <= 0) {
		// If the cart item is decreasing
		if (previousQuantity > quantity) {
			product.quantity = product.quantity + 1;
			const updatedProduct = await product.save();
			// increase the product availability and update the cart
			if (cart) {
				cart.quantity = quantity;

				const updatedCart = await cart.save();
				res.json(updatedCart);
			} else {
				res.status(404);
				throw new Error("Item not found");
			}
			// If the cart item is increasing
		} else if (previousQuantity < quantity) {
			throw new Error("Out of stock");
		}
	} // If the product has enough stocks
	else {
		// Increase the product availability
		if (previousQuantity > quantity) {
			product.quantity = product.quantity + 1;
			const updatedProduct = await product.save();
		} // Decrease the product availability
		else if (previousQuantity < quantity) {
			product.quantity = product.quantity - 1;
			const updatedProduct = await product.save();
		}
		// Update the cart
		if (cart) {
			cart.quantity = quantity;

			const updatedCart = await cart.save();
			res.json(updatedCart);
		} else {
			res.status(404);
			throw new Error("Item not found");
		}
	}
});

// Delete one cart item from the cart
const deleteCartItem = asyncHandler(async (req, res) => {
	const cart = await Cart.findById(req.params.id);

	const product = await Product.findOne({ productCode: cart.productCode });
	const quantity = cart.quantity;

	// Update the cart and increase the product availability
	if (cart) {
		await cart.remove();
		product.quantity = product.quantity + quantity;
		await product.save();
		res.json({ message: "Item Removed" });
	} else {
		res.status(404);
		throw new Error("Item not Found");
	}
});

// Delete all the cart items from the cart when customer is checking out
const deleteAllCartItems = asyncHandler(async (req, res) => {
	await Cart.deleteMany({ customer: req.params.id });

	Cart.deleteMany({ customer: req.params.id })
		.then((result) => {
			res.json({ message: "Items Removed" });
		})
		.catch((err) => {
			res.status(404);
			throw new Error("Items not Found");
		});
});

module.exports = {
	getCartItems,
	addToCart,
	updateCart,
	deleteCartItem,
	deleteAllCartItems,
	getTotal,
};
