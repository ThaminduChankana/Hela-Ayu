const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//add a product according to vendor's email
const addProduct = asyncHandler(async (req, res) => {
	const {
		vendorEmail,
		title,
		category,
		productBrand,
		productCode,
		description,
		picURL,
		price,
		ingredients,
		usage,
		warnings,
		discountNote,
		discountPrice,
		quantity,
	} = req.body;

	if (
		!vendorEmail ||
		!title ||
		!category ||
		!productBrand ||
		!productCode ||
		!description ||
		!picURL ||
		!price ||
		!ingredients ||
		!usage ||
		!warnings ||
		!discountNote ||
		!discountPrice ||
		!quantity
	) {
		res.status(400);
		throw new Error("Please Fill all the fields");
	} else {
		const product = new Product({
			vendor: req.vendor._id,
			vendorEmail,
			title,
			category,
			productBrand,
			productCode,
			description,
			picURL,
			price,
			ingredients,
			usage,
			warnings,
			discountNote,
			discountPrice,
			quantity,
		});

		const addedProduct = await product.save();

		res.status(201).json(addedProduct);
	}
});

//get all of products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

//get products for each of vendors
const getProductsForEachVendor = asyncHandler(async (req, res) => {
	const products = await Product.find({ vendor: req.vendor._id });
	res.json(products);
});

//get product according to their id
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

//update product details
const updateProduct = asyncHandler(async (req, res) => {
	const {
		title,
		category,
		productBrand,
		productCode,
		description,
		picURL,
		price,
		ingredients,
		usage,
		warnings,
		discountNote,
		discountPrice,
		quantity,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.title = title;
		product.category = category;
		product.productBrand = productBrand;
		product.productCode = productCode;
		product.description = description;
		product.picURL = picURL;
		product.price = price;
		product.ingredients = ingredients;
		product.usage = usage;
		product.warnings = warnings;
		product.discountNote = discountNote;
		product.discountPrice = discountPrice;
		product.quantity = quantity;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// delete a single product
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: "Product  Removed" });
	} else {
		res.status(404);
		throw new Error("Product  not Found");
	}
});

module.exports = {
	addProduct,
	getProducts,
	getProductsForEachVendor,
	getProductById,
	updateProduct,
	deleteProduct,
};
