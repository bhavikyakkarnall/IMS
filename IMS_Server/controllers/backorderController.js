const backorder = require("../models/backorder");

exports.createBackorder = async (req, res) => {
    try {
        const newBackorder = new backorder(req.body); // Use 'backorder' here instead of 'Backorder'
        const savedBackorder = await newBackorder.save(); // Save the backorder to the database
        res.status(200).json(savedBackorder);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getBackorders = async (req, res) => {
    try {
        const backorders = await backorder.find({});
        res.status(200).json(backorders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateBackorder = async (req, res) => {
    const backorderId = req.params.id; // Get the backorder ID from the request parameters

    try {
        // Find the backorder by its ID and update it with the new data from the request body
        const updatedBackorder = await backorder.findByIdAndUpdate(backorderId, req.body, { new: true });

        if (!updatedBackorder) {
            return res.status(404).json({ error: "Backorder not found" });
        }

        res.status(200).json(updatedBackorder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBackorder = async (req, res) => {
    const backorderId = req.params.id; // Get the backorder ID from the request parameters

    try {
        // Find the backorder by its ID and remove it from the database
        const deletedBackorder = await backorder.findByIdAndRemove(backorderId);

        if (!deletedBackorder) {
            return res.status(404).json({ error: "Backorder not found" });
        }

        res.status(200).json({ message: "Backorder deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getBackorderById = async (req, res) => {
    const backorderId = req.params.id; // Get the backorder ID from the URL parameter

    try {
        // Find the backorder by its ID
        const foundBackorder = await backorder.findById(backorderId);

        if (!foundBackorder) {
            return res.status(404).json({ error: "Backorder not found" });
        }

        res.status(200).json(foundBackorder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};