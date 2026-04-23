import express from "express";
import contactController from "../controllers/contactController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", contactController.getContact);
router.post("/", adminAuth, contactController.saveContact);

module.exports = router;
