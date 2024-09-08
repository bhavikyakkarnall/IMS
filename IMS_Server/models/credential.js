const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
    credentialID: {type: String, trim: true, required: true},
    staffID: {type: String, trim: true, required: true},
    username: {type: String, trim: true, required: true},
    password: {type: String, trim: true, required: true},
    company: {type: String, trim: true, required: true},
    lastLogin: {type: String, trim: true, required: true},
    lastPasswordChange: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("credential", credentialSchema);