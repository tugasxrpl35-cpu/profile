import express from "express";
import {getAbout, createAbout} from "../controllers/aboutController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", getAbout);
router.post("/", adminAuth, createAbout);

export default router;
