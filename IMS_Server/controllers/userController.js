const user = require("../models/user");

exports.createUser = async (req, res) => {
    try {
        const newUser = new user(req.body); // Use 'user' here instead of 'User'
        const savedUser = await newUser.save(); // Save the user to the database
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters

    try {
        // Find the user by its ID and update it with the new data from the request body
        const updatedUser = await user.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters

    try {
        // Find the user by its ID and remove it from the database
        const deletedUser = await user.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the URL parameter

    try {
        // Find the user by its ID
        const foundUser = await user.findById(userId);

        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(foundUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};