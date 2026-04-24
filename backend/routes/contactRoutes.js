import express from "express";
import {getContact, saveContact} from "../controllers/contactController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", getContact);
router.post("/", adminAuth, saveContact);

export default router;
