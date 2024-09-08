let express = require("express");
let router = express.Router();

const credentialController = require("../controllers/credentialController")

router.post("/credential",credentialController.createCredential)
router.get("/credential", credentialController.getCredentials)
router.get("/credential/:id", credentialController.getCredentialById);
router.put("/credential/:id", credentialController.updateCredential)
router.delete("/credential/:id", credentialController.deleteCredential)

module.exports = router;