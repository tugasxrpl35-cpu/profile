const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footerController");
const adminAuth = require("../adminAuth");

router.get("/", footerController.getFooter);
router.post("/", adminAuth, footerController.createFooter);
router.put("/:id", adminAuth, footerController.updateFooter);
router.delete("/:id", adminAuth, footerController.deleteFooter);

module.exports = router;
