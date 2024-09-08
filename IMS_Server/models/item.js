const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemID: {type: String, trim: true, required: true, unique: true},
    productID: {type: String, trim: true, required: true},
    cs: {type: String, trim: true, required: true},
    serial: {type: String, trim: true, required: true},
    location: {type: String, trim: true, required: true},
    receivedDate: {type: String, trim: true, required: true},
    status: {type: String, trim: true, required: true},
    phoneNumber: {type: String, trim: true, required: true},
    simNumber: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("item", itemSchema);
