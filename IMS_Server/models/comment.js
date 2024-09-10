const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentID: {type: String, trim: true, required: true},
    itemID: {type: String, trim: true, required: true},
    comment: {type: String, trim: true, required: true},
    userId: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("comment", commentSchema);