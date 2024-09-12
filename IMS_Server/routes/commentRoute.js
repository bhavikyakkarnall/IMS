let express = require("express");
let router = express.Router();

const commentController = require("../controllers/commentController")

router.post("/comment",commentController.createComment);
router.get("/comments", commentController.getComments);
router.get("/comment/:id", commentController.getCommentById);
router.put("/comment/:id", commentController.updateComment);
router.delete("/comment/:id", commentController.deleteComment);
router.get("/comments/item/:itemId", commentController.getCommentByItemID)


module.exports = router;