/**
 * About Routes
 * Defines API endpoints for about section management
 */

const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
const adminAuth = require("../adminAuth");

// GET /api/about - Retrieve about section data
router.get("/", aboutController.getAbout);

// POST /api/about - Create or update about section data (admin only)
router.post("/", adminAuth, aboutController.createAbout);

module.exports = router;
