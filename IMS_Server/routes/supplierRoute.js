let express = require("express");
let router = express.Router();

const supplierController = require("../controllers/supplierController")

router.post("/supplier",supplierController.createSupplier)
router.get("/supplier", supplierController.getSuppliers)
router.get("/supplier/:id", supplierController.getSupplierById);
router.put("/supplier/:id", supplierController.updateSupplier)
router.delete("/supplier/:id", supplierController.deleteSupplier)

module.exports = router;