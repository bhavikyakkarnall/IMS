const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    supplierID: {type: String, trim: true, required: true, unique: true},
    suppliertName: {type: String, trim: true, required: true},
    contactPerson: {type: String, trim: true, required: true},
    phone: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true},
    address: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("supplier", supplierSchema);
