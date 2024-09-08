const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema({
    orderProductID: {type: String, trim: true, required: true},
    orderID: {type: String, trim: true, required: true},
    productID: {type: String, trim: true, required: true},
    quantity: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("orderProduct", orderProductSchema);