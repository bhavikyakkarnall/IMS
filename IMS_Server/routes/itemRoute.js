let express = require("express");
let router = express.Router();

const itemController = require("../controllers/itemController")

router.post("/item",itemController.createItem)
router.get("/item", itemController.getItems)
router.get("/item/:id", itemController.getItemById);
router.put("/item/:id", itemController.updateItem)
router.delete("/item/:id", itemController.deleteItem)

module.exports = router;