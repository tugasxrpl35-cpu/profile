const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const landingController = require("../controllers/landingController");
const adminAuth = require("../adminAuth");

router.get("/", landingController.getLanding);
router.post("/", adminAuth, upload.single("heroImage"), landingController.createLanding);

module.exports = router;
