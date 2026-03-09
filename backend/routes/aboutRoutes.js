const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const aboutController = require("../controllers/aboutController");
const adminAuth = require("../adminAuth");

router.get("/", aboutController.getAbout);
router.post("/", adminAuth, upload.single("avatar"), aboutController.createAbout);

module.exports = router;
