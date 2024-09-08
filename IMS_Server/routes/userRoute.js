let express = require("express");
let router = express.Router();

const userController = require("../controllers/userController")

router.post("/user",userController.createUser)
router.get("/user", userController.getUsers)
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser)
router.delete("/user/:id", userController.deleteUser)

module.exports = router;