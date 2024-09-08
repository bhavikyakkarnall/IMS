const item = require("../models/item");

exports.createItem = async (req, res) => {
    try {
        const newItem = new item(req.body); // Use 'item' here instead of 'Item'
        const savedItem = await newItem.save(); // Save the item to the database
        res.status(200).json(savedItem);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await item.find({});
        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    const itemId = req.params.id; // Get the item ID from the request parameters

    try {
        // Find the item by its ID and update it with the new data from the request body
        const updatedItem = await item.findByIdAndUpdate(itemId, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    const itemId = req.params.id; // Get the item ID from the request parameters

    try {
        // Find the item by its ID and remove it from the database
        const deletedItem = await item.findByIdAndRemove(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getItemById = async (req, res) => {
    const itemId = req.params.id; // Get the item ID from the URL parameter

    try {
        // Find the item by its ID
        const foundItem = await item.findById(itemId);

        if (!foundItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(foundItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};