let express = require("express");
let router = express.Router();

const backendController = require("../controllers/backorderController")

router.post("/backend",backendController.createBackorder)
router.get("/backend", backendController.getBackorders)
router.get("/backend/:id", backendController.getBackorderById);
router.put("/backend/:id", backendController.updateBackorder)
router.delete("/backend/:id", backendController.deleteBackorder)

module.exports = router;