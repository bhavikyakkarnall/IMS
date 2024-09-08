const credential = require("../models/credential");

exports.createCredential = async (req, res) => {
    try {
        const newCredential = new credential(req.body); // Use 'credential' here instead of 'Credential'
        const savedCredential = await newCredential.save(); // Save the credential to the database
        res.status(200).json(savedCredential);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getCredentials = async (req, res) => {
    try {
        const credentials = await credential.find({});
        res.status(200).json(credentials);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateCredential = async (req, res) => {
    const credentialId = req.params.id; // Get the credential ID from the request parameters

    try {
        // Find the credential by its ID and update it with the new data from the request body
        const updatedCredential = await credential.findByIdAndUpdate(credentialId, req.body, { new: true });

        if (!updatedCredential) {
            return res.status(404).json({ error: "Credential not found" });
        }

        res.status(200).json(updatedCredential);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCredential = async (req, res) => {
    const credentialId = req.params.id; // Get the credential ID from the request parameters

    try {
        // Find the credential by its ID and remove it from the database
        const deletedCredential = await credential.findByIdAndRemove(credentialId);

        if (!deletedCredential) {
            return res.status(404).json({ error: "Credential not found" });
        }

        res.status(200).json({ message: "Credential deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getCredentialById = async (req, res) => {
    const credentialId = req.params.id; // Get the credential ID from the URL parameter

    try {
        // Find the credential by its ID
        const foundCredential = await credential.findById(credentialId);

        if (!foundCredential) {
            return res.status(404).json({ error: "Credential not found" });
        }

        res.status(200).json(foundCredential);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};