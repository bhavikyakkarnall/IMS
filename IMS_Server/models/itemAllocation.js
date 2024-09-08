const mongoose = require("mongoose");

const itemAllocationSchema = new mongoose.Schema({
    itemAllocationID: {type: String, trim: true, required: true},
    itemID: {type: String, trim: true, required: true},
    custNumber: {type: String, trim: true, required: true},
    siteNumber: {type: String, trim: true, required: true},
    staffID: {type: String, trim: true, required: true},
    AllocationDate: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("itemAllocation", itemAllocationSchema);