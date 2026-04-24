/**
 * Portfolio Routes
 * Defines API endpoints for portfolio management
 */
import express from "express";
import {savePortfolio, getPortfolio} from "../controllers/portfolioController.js";
import adminAuth from "../adminAuth.js";

const router = express.Router();

// POST /api/portfolio - Save complete portfolio data (admin only)
router.post("/", adminAuth, savePortfolio);

// GET /api/portfolio - Retrieve complete portfolio data
router.get("/", getPortfolio);

export default router;