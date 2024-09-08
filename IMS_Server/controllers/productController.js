const product = require("../models/product");

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new item(req.body); // Use 'item' here instead of 'Item'
        const savedProduct = await newProduct.save(); // Save the item to the database
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await product.find({});
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters

    try {
        // Find the product by its ID and update it with the new data from the request body
        const updatedProduct = await product.findByIdAndUpdate(productId, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters

    try {
        // Find the item by its ID and remove it from the database
        const deletedProduct = await product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL parameter

    try {
        // Find the product by its ID
        const foundProduct = await product.findById(productId);

        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(foundProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};