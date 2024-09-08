require("dotenv").config();
const express = require("express");
let dbConnect = require("./dbConnect");
// let itemRoute = require('./routes/itemRoute');
// let supplierRoute = require('./routes/supplierRoute');
let backorderRoute = require('./routes/backorderRoute');
let credentialRoute = require('./routes/credentialRoute');
let dispatchRoute = require('./routes/dispatchRoute');
let itemRoute = require('./routes/itemRoute');
let itemAllocationRoute = require('./routes/itemAllocation');
let orderRoute = require('./routes/orderRoute');
let orderProductRoute = require('./routes/orderProductRoute');
let productRoute = require('./routes/productRoute');
let supplierRoute = require('./routes/supplierRoute');
let userRoute = require('./routes/userRoute');

const cors = require("cors");
const supplier = require("./models/supplier");
const app = express();

app.use(express.json());
app.use(cors());


// app.use('/api', verifyToken, itemRoute)

// app.use('/api', supplierRoute)
// app.use('/api', itemRoute);
// app.use('/api', supplierRoute)

app.use('/api', backorderRoute);
app.use('/api', credentialRoute);
app.use('/api', dispatchRoute);
app.use('/api', itemRoute);
app.use('/api', itemAllocationRoute);
app.use('/api', orderRoute);
app.use('/api', orderProductRoute);
app.use('/api', productRoute);
app.use('/api', userRoute);
app.use('/api', supplierRoute)


app.get("/", (req, res) => {
    res.json({ message: "Welcome to myMongoDB application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});