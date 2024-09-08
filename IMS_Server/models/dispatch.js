const mongoose = require("mongoose");

const dispatchSchema = new mongoose.Schema({
    dispatchID: {type: String, trim: true, required: true},
    orderID: {type: String, trim: true, required: true},
    DispatchDate: {type: String, trim: true, required: true},
    courierService: {type: String, trim: true, required: true},
    trackingNumber: {type: String, trim: true, required: true},
    dispatchStatus: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("dispatch", dispatchSchema);