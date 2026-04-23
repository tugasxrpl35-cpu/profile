import express from "express";
import landingController from "../controllers/landingController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", landingController.getLanding);
router.post("/", adminAuth, landingController.createLanding);

module.exports = router;
