/**
 * About Routes
 * Defines API endpoints for about section management
 */

import express from "express";
import aboutController from "../controllers/aboutController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

// GET /api/about - Retrieve about section data
router.get("/", aboutController.getAbout);

// POST /api/about - Create or update about section data (admin only)
router.post("/", adminAuth, aboutController.createAbout);

module.exports = router;
