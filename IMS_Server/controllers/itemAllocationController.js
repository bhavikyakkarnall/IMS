const itemAllocation = require("../models/itemAllocation");

exports.createItemAllocation = async (req, res) => {
    try {
        const newItemAllocation = new itemAllocation(req.body); // Use 'itemAllocation' here instead of 'ItemAllocation'
        const savedItemAllocation = await newItemAllocation.save(); // Save the itemAllocation to the database
        res.status(200).json(savedItemAllocation);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getItemAllocations = async (req, res) => {
    try {
        const itemAllocations = await itemAllocation.find({});
        res.status(200).json(itemAllocations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateItemAllocation = async (req, res) => {
    const itemAllocationId = req.params.id; // Get the itemAllocation ID from the request parameters

    try {
        // Find the itemAllocation by its ID and update it with the new data from the request body
        const updatedItemAllocation = await itemAllocation.findByIdAndUpdate(itemAllocationId, req.body, { new: true });

        if (!updatedItemAllocation) {
            return res.status(404).json({ error: "ItemAllocation not found" });
        }

        res.status(200).json(updatedItemAllocation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItemAllocation = async (req, res) => {
    const itemAllocationId = req.params.id; // Get the itemAllocation ID from the request parameters

    try {
        // Find the itemAllocation by its ID and remove it from the database
        const deletedItemAllocation = await itemAllocation.findByIdAndRemove(itemAllocationId);

        if (!deletedItemAllocation) {
            return res.status(404).json({ error: "ItemAllocation not found" });
        }

        res.status(200).json({ message: "ItemAllocation deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getItemAllocationById = async (req, res) => {
    const itemAllocationId = req.params.id; // Get the itemAllocation ID from the URL parameter

    try {
        // Find the itemAllocation by its ID
        const foundItemAllocation = await itemAllocation.findById(itemAllocationId);

        if (!foundItemAllocation) {
            return res.status(404).json({ error: "ItemAllocation not found" });
        }

        res.status(200).json(foundItemAllocation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};