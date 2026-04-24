import express from "express";
import {getProjects, getProject, createProject, updateProject, deleteProject} from "../controllers/projectController.js";
import adminAuth from "../adminAuth.js";
const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", adminAuth, createProject);
router.put("/:id", adminAuth, updateProject);
router.delete("/:id", adminAuth, deleteProject);

export default router;