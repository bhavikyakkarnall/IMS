let express = require("express");
let router = express.Router();

const dispatchController = require("../controllers/dispatchController")

router.post("/dispatch",dispatchController.createDispatch)
router.get("/dispatch", dispatchController.getDispatchs)
router.get("/dispatch/:id", dispatchController.getDispatchById);
router.put("/dispatch/:id", dispatchController.updateDispatch)
router.delete("/dispatch/:id", dispatchController.deleteDispatch)

module.exports = router;