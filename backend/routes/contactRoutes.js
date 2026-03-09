const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const adminAuth = require("../adminAuth");

router.get("/", contactController.getContact);
router.post("/", adminAuth, contactController.saveContact);

module.exports = router;
