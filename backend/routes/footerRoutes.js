import express from "express";
import footerController from "../controllers/footerController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", footerController.getFooter);
router.post("/", adminAuth, footerController.createFooter);
router.put("/:id", adminAuth, footerController.updateFooter);
router.delete("/:id", adminAuth, footerController.deleteFooter);

module.exports = router;
