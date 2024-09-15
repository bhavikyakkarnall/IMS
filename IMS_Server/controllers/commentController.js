const comment = require("../models/comment");

exports.createComment = async (req, res) => {
    try {
        const newComment = new comment(req.body); // Use 'comment' here instead of 'Comment'
        const savedComment = await newComment.save(); // Save the comment to the database
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await comment.find({});
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

exports.updateComment = async (req, res) => {
    const commentId = req.params.id; // Get the comment ID from the request parameters

    try {
        // Find the comment by its ID and update it with the new data from the request body
        const updatedComment = await comment.findByIdAndUpdate(commentId, req.body, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id; // Get the comment ID from the request parameters

    try {
        // Find the comment by its ID and remove it from the database
        const deletedComment = await comment.findByIdAndRemove(commentId);

        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getCommentById = async (req, res) => {
    const commentId = req.params.id; // Get the comment ID from the URL parameter

    try {
        // Find the comment by its ID
        const foundComment = await comment.findById(commentId);

        if (!foundComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json(foundComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get comments by itemID
exports.getCommentsByItemId = async (req, res) => {
    const itemId = req.params.itemId; // Get the item ID from the request parameters
    // console.log("Item ID:", itemId); // Log the itemId to check if it matches

    try {
        // Find all comments with the matching itemID
        const comments = await comment.find({ itemID: itemId });
        // console.log(comments)

        /* if (!comments || comments.length === 0) {
            // console.log("No comments found for itemID:", itemId);
            return res.status(404).json({ error: "No comments found for this item" });
        } */

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


