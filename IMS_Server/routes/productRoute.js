let express = require("express");
let router = express.Router();

const productController = require("../controllers/productController")

router.post("/product",productController.createProduct)
router.get("/product", productController.getProducts)
router.get("/product/:id", productController.getProductById);
router.put("/product/:id", productController.updateProduct)
router.delete("/product/:id", productController.deleteProduct)

module.exports = router;