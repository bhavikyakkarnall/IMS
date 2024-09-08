const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderID: {type: String, trim: true, required: true},
    staffID: {type: String, trim: true, required: true},
    orderDate: {type: String, trim: true, required: true},
    orderStatus: {type: String, trim: true, required: true},
    dispatchID: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("order", orderSchema);