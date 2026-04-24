import express from "express";
import {createFooter, getFooter, updateFooter, deleteFooter} from "../controllers/footerController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", getFooter);
router.post("/", adminAuth, createFooter);
router.put("/:id", adminAuth, updateFooter);
router.delete("/:id", adminAuth, deleteFooter);

export default router;
