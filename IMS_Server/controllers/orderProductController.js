const orderProduct = require("../models/orderProduct");

exports.createOrderProduct = async (req, res) => {
    try {
        const newOrderProduct = new orderProduct(req.body); // Use 'orderProduct' here instead of 'OrderProduct'
        const savedOrderProduct = await newOrderProduct.save(); // Save the orderProduct to the database
        res.status(200).json(savedOrderProduct);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getOrderProducts = async (req, res) => {
    try {
        const orderProducts = await orderProduct.find({});
        res.status(200).json(orderProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateOrderProduct = async (req, res) => {
    const orderProductId = req.params.id; // Get the orderProduct ID from the request parameters

    try {
        // Find the orderProduct by its ID and update it with the new data from the request body
        const updatedOrderProduct = await orderProduct.findByIdAndUpdate(orderProductId, req.body, { new: true });

        if (!updatedOrderProduct) {
            return res.status(404).json({ error: "OrderProduct not found" });
        }

        res.status(200).json(updatedOrderProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrderProduct = async (req, res) => {
    const orderProductId = req.params.id; // Get the orderProduct ID from the request parameters

    try {
        // Find the orderProduct by its ID and remove it from the database
        const deletedOrderProduct = await orderProduct.findByIdAndRemove(orderProductId);

        if (!deletedOrderProduct) {
            return res.status(404).json({ error: "OrderProduct not found" });
        }

        res.status(200).json({ message: "OrderProduct deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderProductById = async (req, res) => {
    const orderProductId = req.params.id; // Get the orderProduct ID from the URL parameter

    try {
        // Find the orderProduct by its ID
        const foundOrderProduct = await orderProduct.findById(orderProductId);

        if (!foundOrderProduct) {
            return res.status(404).json({ error: "OrderProduct not found" });
        }

        res.status(200).json(foundOrderProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};