let express = require("express");
let router = express.Router();

const orderProductController = require("../controllers/orderProductController")

router.post("/orderProduct",orderProductController.createOrderProduct)
router.get("/orderProducts", orderProductController.getOrderProducts)
router.get("/orderProduct/:id", orderProductController.getOrderProductById);
router.put("/orderProduct/:id", orderProductController.updateOrderProduct)
router.delete("/orderProduct/:id", orderProductController.deleteOrderProduct)

module.exports = router;