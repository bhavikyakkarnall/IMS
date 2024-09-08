const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    staffID: {type: String, trim: true, required: true},
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    company: {type: String, trim: true, required: true},
    address: {type: String, trim: true, required: true},
    phone: {type: String, trim: true, required: true},
    emailId: {type: String, trim: true, required: true, unique: true},
    role: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("user", userSchema);
