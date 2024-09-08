const dispatch = require("../models/dispatch");

exports.createDispatch = async (req, res) => {
    try {
        const newDispatch = new dispatch(req.body); // Use 'dispatch' here instead of 'Dispatch'
        const savedDispatch = await newDispatch.save(); // Save the dispatch to the database
        res.status(200).json(savedDispatch);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getDispatchs = async (req, res) => {
    try {
        const dispatchs = await dispatch.find({});
        res.status(200).json(dispatchs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateDispatch = async (req, res) => {
    const dispatchId = req.params.id; // Get the dispatch ID from the request parameters

    try {
        // Find the dispatch by its ID and update it with the new data from the request body
        const updatedDispatch = await dispatch.findByIdAndUpdate(dispatchId, req.body, { new: true });

        if (!updatedDispatch) {
            return res.status(404).json({ error: "Dispatch not found" });
        }

        res.status(200).json(updatedDispatch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDispatch = async (req, res) => {
    const dispatchId = req.params.id; // Get the dispatch ID from the request parameters

    try {
        // Find the dispatch by its ID and remove it from the database
        const deletedDispatch = await dispatch.findByIdAndRemove(dispatchId);

        if (!deletedDispatch) {
            return res.status(404).json({ error: "Dispatch not found" });
        }

        res.status(200).json({ message: "Dispatch deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getDispatchById = async (req, res) => {
    const dispatchId = req.params.id; // Get the dispatch ID from the URL parameter

    try {
        // Find the dispatch by its ID
        const foundDispatch = await dispatch.findById(dispatchId);

        if (!foundDispatch) {
            return res.status(404).json({ error: "Dispatch not found" });
        }

        res.status(200).json(foundDispatch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};