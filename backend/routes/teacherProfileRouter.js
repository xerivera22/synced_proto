import express from "express";
import {
    createTeacherProfile,
    deleteTeacherProfile,
    getTeacherProfileById,
    getTeacherProfiles,
    updateTeacherProfile,
} from "../controllers/teacherProfileController.js";

const teacherProfileRouter = express.Router();

// GET all teacher profiles
teacherProfileRouter.get("/", getTeacherProfiles);

// GET single teacher profile by ID
teacherProfileRouter.get("/:id", getTeacherProfileById);

// POST create new teacher profile
teacherProfileRouter.post("/", createTeacherProfile);

// PUT update teacher profile
teacherProfileRouter.put("/:id", updateTeacherProfile);

// DELETE teacher profile
teacherProfileRouter.delete("/:id", deleteTeacherProfile);

export default teacherProfileRouter;
