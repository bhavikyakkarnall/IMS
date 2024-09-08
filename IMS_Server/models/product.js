const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productID: {type: String, trim: true, required: true},
    productName: {type: String, trim: true, required: true},
    description: {type: String, trim: true, required: true},
    category: {type: String, trim: true, required: true},
    supplierID: {type: String, trim: true, required: true},
    price: {type: String, trim: true, required: true},
    stockQuantity: {type: String, trim: true, required: true, unique: true},
    reorder_level: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("product", productSchema);
