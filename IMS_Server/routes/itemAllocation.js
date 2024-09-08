let express = require("express");
let router = express.Router();

const itemAllocationController = require("../controllers/itemAllocationController")

router.post("/itemAllocation",itemAllocationController.createItemAllocation)
router.get("/itemAllocation", itemAllocationController.getItemAllocations)
router.get("/itemAllocation/:id", itemAllocationController.getItemAllocationById);
router.put("/itemAllocation/:id", itemAllocationController.updateItemAllocation)
router.delete("/itemAllocation/:id", itemAllocationController.deleteItemAllocation)

module.exports = router;