const supplier = require("../models/supplier");

exports.createSupplier = async (req, res) => {
    try {
        const newSupplier = new supplier(req.body); // Use 'supplier' here instead of 'Supplier'
        const savedSupplier = await newSupplier.save(); // Save the supplier to the database
        res.status(200).json(savedSupplier);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await supplier.find({});
        res.status(200).json(suppliers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateSupplier = async (req, res) => {
    const supplierId = req.params.id; // Get the supplier ID from the request parameters

    try {
        // Find the supplier by its ID and update it with the new data from the request body
        const updatedSupplier = await supplier.findByIdAndUpdate(supplierId, req.body, { new: true });

        if (!updatedSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.status(200).json(updatedSupplier);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    const supplierId = req.params.id; // Get the supplier ID from the request parameters

    try {
        // Find the supplier by its ID and remove it from the database
        const deletedSupplier = await supplier.findByIdAndRemove(supplierId);

        if (!deletedSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getSupplierById = async (req, res) => {
    const supplierId = req.params.id; // Get the supplier ID from the URL parameter

    try {
        // Find the supplier by its ID
        const foundSupplier = await supplier.findById(supplierId);

        if (!foundSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.status(200).json(foundSupplier);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};