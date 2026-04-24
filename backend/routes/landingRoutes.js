import express from "express";
import {createLanding, getLanding} from "../controllers/landingController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", getLanding);
router.post("/", adminAuth, createLanding);

export default router;
