/**
 * Portfolio Routes
 * Defines API endpoints for portfolio management
 */

const express = require("express");
const router = express.Router();

const portfolioController = require("../controllers/portfolioController");
const adminAuth = require("../adminAuth");

// POST /api/portfolio - Save complete portfolio data (admin only)
router.post("/", adminAuth, portfolioController.savePortfolio);

// GET /api/portfolio - Retrieve complete portfolio data
router.get("/", portfolioController.getPortfolio);

module.exports = router;