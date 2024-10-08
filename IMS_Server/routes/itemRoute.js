let express = require("express");
let router = express.Router();

const itemController = require("../controllers/itemController")

router.post("/item",itemController.createItem)
router.get("/items", itemController.getItems)
router.get("/item/:id", itemController.getItemById);
router.put("/item/:id", itemController.updateItem)
router.delete("/item/:id", itemController.deleteItem)
router.get("/item/serial/:serial", itemController.getItemBySerial)
router.get("/item/itemid/:ItemID", itemController.getItemByItemID)
router.get("/item/cs/:cs", itemController.getItemByCS)

module.exports = router;