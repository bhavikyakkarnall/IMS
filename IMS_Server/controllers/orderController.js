const order = require("../models/order");

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new order(req.body); // Use 'order' here instead of 'Order'
        const savedOrder = await newOrder.save(); // Save the order to the database
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await order.find({});
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    const orderId = req.params.id; // Get the order ID from the request parameters

    try {
        // Find the order by its ID and update it with the new data from the request body
        const updatedOrder = await order.findByIdAndUpdate(orderId, req.body, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id; // Get the order ID from the request parameters

    try {
        // Find the order by its ID and remove it from the database
        const deletedOrder = await order.findByIdAndRemove(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    const orderId = req.params.id; // Get the order ID from the URL parameter

    try {
        // Find the order by its ID
        const foundOrder = await order.findById(orderId);

        if (!foundOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(foundOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};