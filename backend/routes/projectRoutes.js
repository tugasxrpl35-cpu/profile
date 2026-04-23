import express from "express";
import projectController from "../controllers/projectController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.post("/", adminAuth, projectController.createProject);
router.put("/:id", adminAuth, projectController.updateProject);
router.delete("/:id", adminAuth, projectController.deleteProject);

module.exports = router;