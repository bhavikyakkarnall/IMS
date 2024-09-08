const mongoose = require("mongoose");

const backorderSchema = new mongoose.Schema({
    backorderID: {type: String, trim: true, required: true},
    orderID: {type: String, trim: true, required: true},
    productID: {type: String, trim: true, required: true},
    quantity: {type: String, trim: true, required: true},
    expectedDate: {type: String, trim: true, required: true},
    status: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("backorder", backorderSchema);